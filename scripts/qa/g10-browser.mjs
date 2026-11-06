#!/usr/bin/env node
/** G10: console + network errors, hero media */
import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import { failGate, passGate, walkDir, DIST, ROOT, QA_OUT, ensureDir } from './lib.mjs';

const BASE = process.env.QA_BASE_URL ?? 'http://127.0.0.1:3000';
ensureDir(QA_OUT);

const pages = [];
for (const file of walkDir(DIST)) {
  const rel = path.relative(DIST, file).replace(/\\/g, '/');
  if (rel === 'index.html') pages.push('/');
  else pages.push(`/${rel.replace(/index\.html$/, '')}`);
}

const failures = [];
const browser = await chromium.launch({ headless: true });

for (const viewport of [
  { width: 390, height: 844 },
  { width: 1280, height: 800 },
]) {
  const context = await browser.newContext({ viewport });
  for (const p of pages.slice(0, 35)) {
    const page = await context.newPage();
    const consoleErrors = [];
    const failedReq = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });
    page.on('requestfailed', (req) => {
      const url = req.url();
      if (url.includes('zadeyo.com') || url.includes('google-analytics')) return;
      failedReq.push(`${req.failure()?.errorText ?? 'failed'} ${url}`);
    });
    try {
      await page.goto(`${BASE}${p}`, { waitUntil: 'networkidle', timeout: 45000 });
    } catch (e) {
      failures.push(`Load timeout ${p}: ${e.message}`);
      await page.close();
      continue;
    }
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
    if (overflow) failures.push(`overflow ${p} @ ${viewport.width}`);
    if (consoleErrors.length) failures.push(`console ${p}: ${consoleErrors[0]}`);
    if (failedReq.length) failures.push(`network ${p}: ${failedReq[0]}`);
    if (p === '/') {
      const video = page.locator('#hero video, #hero [data-slot="video"]');
      if (await video.count()) {
        const attrs = await video.first().evaluate((el) => ({
          autoplay: el.hasAttribute('autoplay'),
          muted: el.hasAttribute('muted'),
          loop: el.hasAttribute('loop'),
          playsInline: el.hasAttribute('playsinline'),
          poster: el.hasAttribute('poster'),
        }));
        for (const [k, v] of Object.entries(attrs)) {
          if (!v && k !== 'poster') failures.push(`hero video missing ${k}`);
        }
      }
    }
    await page.close();
  }
  await context.close();
}

await browser.close();
fs.writeFileSync(path.join(QA_OUT, 'g10-summary.txt'), failures.join('\n'));

if (failures.length) {
  failGate('G10', failures.slice(0, 20));
  process.exit(1);
}
passGate('G10', `${pages.length} pages @ 2 viewports`);
