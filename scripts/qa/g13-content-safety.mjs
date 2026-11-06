#!/usr/bin/env node
/** G13: content safety scan */
import fs from 'node:fs';
import path from 'node:path';
import { failGate, passGate, readText, walkDir, DIST, ROOT } from './lib.mjs';

const bannedClaims = [
  /\bundetected\b/i,
  /\bban-proof\b/i,
  /100\s*%\s*safe/i,
  /\bguaranteed\b/i,
  /\bnever\s+detected\b/i,
];

const requiredLegal = ['/privacy-policy/', '/terms/', '/refund-policy/', '/contact/', '/disclaimer/'];
const failures = [];

function isNegatedClaim(text, matchIndex, phrase) {
  const window = text.slice(Math.max(0, matchIndex - 80), matchIndex + phrase.length + 40);
  return /not\s+|no\s+|does not|don't|never claim|without/i.test(window);
}

function scanContent(text, label) {
  const lines = text.split('\n');
  for (const line of lines) {
    if (/^\s*(id|icon|slug|variant|type):/.test(line)) continue;
    for (const re of bannedClaims) {
      re.lastIndex = 0;
      const m = re.exec(line);
      if (m && !isNegatedClaim(line, m.index, m[0])) {
        failures.push(`${label}: banned claim "${m[0]}"`);
      }
    }
  }
}

for (const dir of [path.join(ROOT, 'src'), DIST]) {
  if (!fs.existsSync(dir)) continue;
  for (const file of walkDir(dir)) {
    if (file.includes('starwind') || file.includes('icons/')) continue;
    const text = readText(file);
    scanContent(text, path.relative(ROOT, file));
  }
}

for (const legal of requiredLegal) {
  const file = path.join(DIST, legal.replace(/^\//, ''), 'index.html');
  if (!fs.existsSync(file)) failures.push(`missing legal page ${legal}`);
}

const notFound = path.join(DIST, '404.html');
if (!fs.existsSync(notFound)) failures.push('missing 404.html');

const forumTs = readText(path.join(ROOT, 'src/data/forum.ts'));
if (!/compiled|illustrative|sample/i.test(readText(path.join(ROOT, 'src/pages/forum/index.astro')))) {
  failures.push('forum missing illustrative/sample disclosure');
}

const disclaimer = readText(path.join(DIST, 'disclaimer', 'index.html'));
if (!/responsible|risk|terms/i.test(disclaimer)) failures.push('disclaimer missing risk language');

if (failures.length) {
  failGate('G13', failures);
  process.exit(1);
}
passGate('G13', 'content safety');
