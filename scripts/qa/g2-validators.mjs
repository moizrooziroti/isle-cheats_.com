#!/usr/bin/env node
/** G2: domain, sitemap, checkout, image, SEO config validators */
import fs from 'node:fs';
import path from 'node:path';
import { DIST, ROOT, failGate, passGate, readText, walkDir } from './lib.mjs';

const SITE = 'isle-cheats.com';
const failures = [];

function checkDomain() {
  const astro = readText(path.join(ROOT, 'astro.config.mjs'));
  if (!astro.includes(`site: 'https://${SITE}'`)) {
    failures.push(`astro.config site must be https://${SITE}`);
  }
  const siteTs = readText(path.join(ROOT, 'src/config/site.ts'));
  if (!siteTs.includes(SITE)) failures.push('site.ts missing production domain');
}

function checkSitemap() {
  const indexPath = path.join(DIST, 'sitemap-index.xml');
  const sitemap0 = path.join(DIST, 'sitemap-0.xml');
  if (!fs.existsSync(indexPath) && !fs.existsSync(sitemap0)) {
    failures.push('dist missing sitemap');
    return;
  }
  const xml = fs.existsSync(sitemap0) ? readText(sitemap0) : readText(indexPath);
  if (xml.includes('localhost') || xml.includes('127.0.0.1')) failures.push('sitemap has local URLs');
  if (xml.includes('/go/')) failures.push('sitemap lists checkout /go/ URLs');
  if (xml.includes('/forum/')) failures.push('sitemap lists forum URLs (should be excluded)');
}

function checkCheckoutSync() {
  const siteTs = readText(path.join(ROOT, 'src/config/site.ts'));
  const redirects = readText(path.join(ROOT, 'src/config/checkout-redirects.mjs'));
  const urlRe = /ctaUrl:\s*'(https:[^']+)'/g;
  let m;
  while ((m = urlRe.exec(siteTs)) !== null) {
    if (!redirects.includes(m[1])) {
      failures.push(`ctaUrl not in checkout-redirects: ${m[1]}`);
    }
  }
}

function checkImages() {
  const allowed = readText(path.join(ROOT, 'src/config/site.ts'));
  if (!allowed.includes('CONTENT_IMAGES')) failures.push('CONTENT_IMAGES missing');
  const srcFiles = walkDir(path.join(ROOT, 'src')).filter((f) => f.endsWith('.astro') || f.endsWith('.ts'));
  for (const file of srcFiles) {
    const text = readText(file);
    if (/\.png['"]/.test(text) && !file.includes('starwind')) {
      // allow only if in public - flag local png in src components
      if (/src=["'][^"']+\.png/.test(text)) failures.push(`local png reference: ${path.relative(ROOT, file)}`);
    }
  }
}

function checkSeoConfig() {
  const pageSeo = readText(path.join(ROOT, 'src/config/pageSeo.ts'));
  if (!pageSeo.includes("'/products/'")) failures.push('pageSeo missing /products/');
  if (!pageSeo.includes("'/forum/'")) failures.push('pageSeo missing /forum/');
}

if (!fs.existsSync(DIST)) {
  failGate('G2', 'dist missing — run g1-build first');
  process.exit(1);
}

checkDomain();
checkSitemap();
checkCheckoutSync();
checkImages();
checkSeoConfig();

if (failures.length) {
  failGate('G2', failures);
  process.exit(1);
}
passGate('G2', 'domain, sitemap, checkout, images, seo config');
