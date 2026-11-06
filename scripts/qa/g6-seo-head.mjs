#!/usr/bin/env node
/** G6: SEO head audit → docs/seo-audit.md */
import fs from 'node:fs';
import path from 'node:path';
import { DIST, ROOT, failGate, passGate, readText, walkDir } from './lib.mjs';

const SITE = 'https://isle-cheats.com';
const failures = [];
const rows = [];

function pathFromFile(file) {
  const rel = path.relative(DIST, file).replace(/\\/g, '/');
  if (rel === 'index.html') return '/';
  return `/${rel.replace(/index\.html$/, '')}`;
}

function isNoindex(html) {
  return /noindex/i.test(html.match(/name=["']robots["'][^>]*content=["']([^"']+)["']/i)?.[1] ?? '');
}

for (const file of walkDir(DIST)) {
  const html = readText(file);
  const urlPath = pathFromFile(file);
  if (urlPath.includes('/404')) continue;
  if (isNoindex(html)) continue;

  const title = html.match(/<title>([^<]*)<\/title>/i)?.[1]?.trim() ?? '';
  const desc = html.match(/name=["']description["'][^>]*content=["']([^"']*)["']/i)?.[1] ?? '';
  const canonical = html.match(/rel=["']canonical["'][^>]*href=["']([^"']+)["']/i)?.[1] ?? '';
  const ogTitle = html.match(/property=["']og:title["'][^>]*content=["']([^"']*)["']/i)?.[1] ?? '';
  const twitter = html.match(/name=["']twitter:card["']/i);
  const h1s = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)].map((m) => m[1].replace(/<[^>]+>/g, '').trim());

  if (!title || title.length > 60) failures.push(`${urlPath}: title length ${title.length} (${title.slice(0, 40)}…)`);
  if (!desc || desc.length > 160) failures.push(`${urlPath}: meta desc length ${desc.length}`);
  if (!canonical.startsWith(SITE)) failures.push(`${urlPath}: canonical ${canonical}`);
  if (!ogTitle) failures.push(`${urlPath}: missing og:title`);
  if (!twitter) failures.push(`${urlPath}: missing twitter:card`);
  if (h1s.length !== 1) failures.push(`${urlPath}: h1 count ${h1s.length}`);

  const primary = title.split('|')[0]?.trim() ?? title;
  rows.push({ urlPath, title, h1: h1s[0] ?? '', primary, canonical });
}

const titleSet = new Map();
const primarySet = new Map();
for (const r of rows) {
  if (titleSet.has(r.title)) failures.push(`Duplicate title: ${r.title} (${r.urlPath} & ${titleSet.get(r.title)})`);
  titleSet.set(r.title, r.urlPath);
  if (primarySet.has(r.primary)) failures.push(`Duplicate primary keyword: ${r.primary}`);
  primarySet.set(r.primary, r.urlPath);
}

const md = [
  '# SEO audit (generated)',
  '',
  '| URL | Title | H1 | Primary keyword | Canonical |',
  '| --- | --- | --- | --- | --- |',
  ...rows.map((r) => `| ${r.urlPath} | ${r.title.replace(/\|/g, '\\|')} | ${r.h1.replace(/\|/g, '\\|')} | ${r.primary.replace(/\|/g, '\\|')} | ${r.canonical} |`),
].join('\n');
fs.writeFileSync(path.join(ROOT, 'docs', 'seo-audit.md'), md);

if (failures.length) {
  failGate('G6', failures.slice(0, 25));
  process.exit(1);
}
passGate('G6', `${rows.length} indexable pages audited`);
