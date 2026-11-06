#!/usr/bin/env node
/** G7: robots, sitemap, noindex consistency */
import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import { DIST, ROOT, failGate, passGate, readText, walkDir } from './lib.mjs';

const BASE = process.env.QA_BASE_URL ?? 'http://127.0.0.1:3000';
const failures = [];

const robots = readText(path.join(ROOT, 'public', 'robots.txt'));
if (!robots.includes('Sitemap: https://isle-cheats.com/sitemap.xml')) failures.push('robots missing sitemap');
if (/Disallow:\s*\/\s*$/m.test(robots)) failures.push('robots blocks entire site');

async function fetch(pathname) {
  return new Promise((resolve, reject) => {
    http.get(`${BASE}${pathname}`, (res) => {
      let body = '';
      res.on('data', (d) => (body += d));
      res.on('end', () => resolve({ status: res.statusCode, body }));
    }).on('error', reject);
  });
}

const sitemapFiles = ['sitemap-index.xml', 'sitemap-0.xml'].map((f) => path.join(DIST, f)).filter(fs.existsSync);
if (!sitemapFiles.length) failures.push('no sitemap in dist');

let urls = [];
for (const sf of sitemapFiles) {
  const xml = readText(sf);
  urls.push(...[...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]));
}

for (const url of urls) {
  if (!url.startsWith('https://isle-cheats.com/')) failures.push(`sitemap non-prod URL: ${url}`);
  if (url.includes('/forum/')) failures.push(`forum in sitemap: ${url}`);
  try {
    const pathname = new URL(url).pathname;
    const local = await fetch(pathname);
    if (local.status !== 200) failures.push(`${pathname} sitemap URL status ${local.status}`);
    if (/noindex/i.test(local.body)) failures.push(`noindex on sitemap URL ${pathname}`);
  } catch (e) {
    failures.push(`Could not fetch ${url}: ${e.message}`);
  }
}

for (const file of walkDir(DIST)) {
  const html = readText(file);
  const rel = path.relative(DIST, file);
  if (rel.includes('404')) continue;
  const robotsMeta = html.match(/name=["']robots["'][^>]*content=["']([^"']+)["']/i)?.[1] ?? '';
  if (/noindex/i.test(robotsMeta) && urls.some((u) => u.endsWith(pathFromDist(rel)))) {
    failures.push(`noindex on indexed sitemap page ${rel}`);
  }
}

function pathFromDist(rel) {
  const p = rel.replace(/\\/g, '/').replace(/index\.html$/, '');
  return p ? `/${p}` : '/';
}

if (failures.length) {
  failGate('G7', failures.slice(0, 25));
  process.exit(1);
}
passGate('G7', `${urls.length} sitemap URLs OK`);
