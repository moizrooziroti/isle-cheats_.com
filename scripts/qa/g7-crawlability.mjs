#!/usr/bin/env node
/** G7: robots, sitemap, noindex consistency */
import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import https from 'node:https';
import { DIST, ROOT, failGate, passGate, readText, walkDir } from './lib.mjs';

const envOrigin = process.env.PUBLIC_CANONICAL_ORIGIN;

const DEFAULT_ORIGIN = 'https://isle-cheats.com';
let expectedOrigin = DEFAULT_ORIGIN;
if (envOrigin?.startsWith('http')) {
  expectedOrigin = envOrigin.replace(/\/$/, '');
} else if (process.env.QA_BASE_URL) {
  try {
    expectedOrigin = new URL(process.env.QA_BASE_URL).origin;
  } catch {
    /* keep default */
  }
}

/** Base URL for HTTP fetches: local preview server, or same as sitemap origin when canonical is set. */
const BASE =
  process.env.QA_BASE_URL?.trim() ||
  (envOrigin?.startsWith('http') ? expectedOrigin : 'http://127.0.0.1:3000');

const failures = [];

const robotsPath = fs.existsSync(path.join(DIST, 'robots.txt'))
  ? path.join(DIST, 'robots.txt')
  : path.join(ROOT, 'public', 'robots.txt');
const robots = readText(robotsPath);
const robotsHasPrimarySitemap = robots.includes(`Sitemap: ${expectedOrigin}/sitemap.xml`);
if (!robotsHasPrimarySitemap) failures.push('robots missing sitemap line for expected origin');
if (/Disallow:\s*\/\s*$/m.test(robots)) failures.push('robots blocks entire site');

function getUrl(pathname) {
  const base = BASE.endsWith('/') ? BASE.slice(0, -1) : BASE;
  const path = pathname.startsWith('/') ? pathname : `/${pathname}`;
  return `${base}${path}`;
}

async function fetch(pathname) {
  const url = getUrl(pathname);
  const client = url.startsWith('https:') ? https : http;
  return new Promise((resolve, reject) => {
    client.get(url, (res) => {
      let body = '';
      res.on('data', (d) => (body += d));
      res.on('end', () => resolve({ status: res.statusCode, body }));
    }).on('error', reject);
  });
}

const sitemapFiles = ['sitemap.xml', 'sitemap-index.xml', 'sitemap-0.xml']
  .map((f) => path.join(DIST, f))
  .filter(fs.existsSync);
if (!sitemapFiles.length) failures.push('no sitemap in dist');

let urls = [];
for (const sf of sitemapFiles) {
  const xml = readText(sf);
  urls.push(...[...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]));
}

for (const url of urls) {
  if (!url.startsWith(`${expectedOrigin}/`) && url !== `${expectedOrigin}`) {
    failures.push(`sitemap URL wrong origin (expected ${expectedOrigin}): ${url}`);
  }
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
