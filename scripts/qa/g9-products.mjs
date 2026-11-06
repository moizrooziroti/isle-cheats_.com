#!/usr/bin/env node
/** G9: products layout Playwright */
import { chromium } from 'playwright';
import { failGate, passGate } from './lib.mjs';

const BASE = process.env.QA_BASE_URL ?? 'http://127.0.0.1:3000';
const viewports = [
  { width: 360, height: 740, name: '360' },
  { width: 390, height: 844, name: '390' },
  { width: 768, height: 1024, name: '768' },
  { width: 1024, height: 768, name: '1024' },
  { width: 1440, height: 900, name: '1440' },
];

const failures = [];
const browser = await chromium.launch({ headless: true });
const context = await browser.newContext();
const page = await context.newPage();

async function assertNoOverflow() {
  const ok = await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1);
  if (!ok) failures.push(`horizontal overflow at ${page.viewportSize()?.width}px on ${page.url()}`);
}

for (const vp of viewports) {
  await page.setViewportSize({ width: vp.width, height: vp.height });
  await page.goto(`${BASE}/products/`, { waitUntil: 'networkidle' });
  await assertNoOverflow();

  const cards = page.locator('[data-catalog-card]');
  const count = await cards.count();
  if (count !== 4) failures.push(`${vp.name}: expected 4 cards, got ${count}`);

  if (vp.width >= 1024) {
    const cols = await page.evaluate(() => {
      const grid = document.querySelector('.grid');
      if (!grid) return 0;
      return getComputedStyle(grid).gridTemplateColumns.split(' ').filter(Boolean).length;
    });
    if (cols !== 4) failures.push(`${vp.name}: expected 4 columns, got ${cols}`);
  } else if (vp.width < 768) {
    const cols = await page.evaluate(() => {
      const grid = document.querySelector('.grid');
      return getComputedStyle(grid).gridTemplateColumns.split(' ').filter(Boolean).length;
    });
    if (cols !== 2) failures.push(`${vp.name}: expected 2 columns, got ${cols}`);
  }

  const imgsInCards = await page.locator('[data-catalog-card] img').count();
  if (imgsInCards > 0) failures.push(`${vp.name}: images inside product cards`);

  const firstPlacement = await cards.nth(0).getAttribute('data-price-placement');
  if (firstPlacement !== 'top') failures.push('first card price not on top');

  const secondPlacement = await cards.nth(1).getAttribute('data-price-placement');
  if (secondPlacement === 'top') failures.push('non-first card has price on top');

  const buyHref = await cards.nth(0).locator('a.catalog-card__buy, a[class*="catalog-card__buy"]').first().getAttribute('href');
  if (!buyHref?.includes('zadeyo.com')) failures.push('buy button missing checkout href');

  await cards.nth(0).locator('.catalog-card__view').click();
  await page.waitForLoadState('networkidle');
  if (!page.url().includes('/products/')) failures.push('view button navigation failed');
  await page.goBack();
}

const productPaths = [
  '/products/the-isle-cheats/',
  '/products/hwid-spoofer/',
  '/products/cloud-dma/',
  '/products/ugc/',
];
for (const p of productPaths) {
  await page.goto(`${BASE}${p}`, { waitUntil: 'networkidle' });
  if (!(await page.locator('h1').count())) failures.push(`missing h1 on ${p}`);
  await assertNoOverflow();
}

await browser.close();

if (failures.length) {
  failGate('G9', failures);
  process.exit(1);
}
passGate('G9', 'products layout + navigation');
