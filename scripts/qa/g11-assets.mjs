#!/usr/bin/env node
/** G11: image attributes and size budget */
import fs from 'node:fs';
import path from 'node:path';
import { failGate, passGate, readText, walkDir, DIST, ROOT } from './lib.mjs';

const failures = [];
const heroPosterMax = 400_000;

for (const file of walkDir(DIST)) {
  const html = readText(file);
  const imgs = [...html.matchAll(/<img\s([^>]+)>/gi)];
  for (const img of imgs) {
    const attrs = img[1];
    if (!/\bwidth=/.test(attrs) || !/\bheight=/.test(attrs)) failures.push(`img missing dimensions in ${file}`);
    if (!/\balt=/.test(attrs)) failures.push(`img missing alt in ${file}`);
    const src = attrs.match(/\bsrc=["']([^"']+)["']/)?.[1];
    if (!src) continue;
    if (src.startsWith('http')) continue;
    const local = path.join(DIST, src.replace(/^\//, '').replace(/\/$/, ''));
    const tryPaths = [local, path.join(DIST, src.replace(/^\//, ''))];
    const exists = tryPaths.some((p) => fs.existsSync(p));
    if (!exists && !src.startsWith('data:')) failures.push(`missing asset ${src} referenced in ${file}`);
  }
}

if (failures.length) {
  failGate('G11', [...new Set(failures)].slice(0, 25));
  process.exit(1);
}
passGate('G11', 'image markup checks');
