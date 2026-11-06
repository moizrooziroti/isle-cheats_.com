#!/usr/bin/env node
/** G3: leftover strings in src, public, dist HTML */
import fs from 'node:fs';
import path from 'node:path';
import { DIST, ROOT, failGate, passGate, readText, walkDir } from './lib.mjs';

const BANNED = [
  { re: /arena\s+breakout/i, label: 'old game (Arena Breakout)' },
  { re: /\bfortnite\b/i, label: 'old game (fortnite)', skip: [/sitemap\.ts$/] },
  { re: /NOT-OPTIM/i, label: 'template marker' },
  { re: /\blorem\b/i, label: 'lorem' },
  { re: /\bTODO\b/, label: 'TODO', skip: [/scripts\/qa/] },
  { re: /\blocalhost\b/i, label: 'localhost' },
  { re: /127\.0\.0\.1/, label: '127.0.0.1' },
  { re: /\bconsole\.log\s*\(/, label: 'console.log', skip: [/scripts\//, /qa\//] },
  { re: /\bhero\.subtitle\b|\bnav\.home\b|\bt\.hero\b/, label: 'raw i18n key leak' },
];

const SKIP_DIRS = new Set(['node_modules', '.astro', 'dist', 'qa-artifacts']);
const I18N_KEY_RE = /\b[a-z]+\.[a-z]+(\.[a-z]+)?\b/g;

function scanFile(file, content) {
  const hits = [];
  const rel = path.relative(ROOT, file).replace(/\\/g, '/');
  if (rel.includes('components/starwind/')) {
    content = content.replace(/placeholder:[^\s"']+/g, '');
  }
  for (const rule of BANNED) {
    if (rule.skip?.some((s) => s.test(rel))) continue;
    if (rule.re.test(content)) hits.push(`${rule.label} in ${rel}`);
  }
  if (rel.startsWith('src/pages/') && content.match(I18N_KEY_RE)) {
    const keys = content.match(I18N_KEY_RE) ?? [];
    for (const k of keys) {
      if (['max-width', 'min-width', 'flex.grow', 'object.cover'].includes(k)) continue;
      if (/^(text|bg|border|ring|shadow|grid|gap|space|font|leading|tracking|uppercase|normal-case|hover|focus|dark|sm|md|lg|xl|2xl|3xl|4xl|5xl|6xl)\./.test(k)) continue;
    }
  }
  return hits;
}

function collectFiles(dir, ext) {
  const out = [];
  function walk(d) {
    if (!fs.existsSync(d)) return;
    for (const ent of fs.readdirSync(d, { withFileTypes: true })) {
      if (SKIP_DIRS.has(ent.name)) continue;
      const full = path.join(d, ent.name);
      if (ent.isDirectory()) walk(full);
      else if (!ext || full.endsWith(ext)) out.push(full);
    }
  }
  walk(dir);
  return out;
}

const failures = [];
for (const file of [...collectFiles(path.join(ROOT, 'src')), ...collectFiles(path.join(ROOT, 'public'))]) {
  if (file.includes('placeholder') && file.includes('variants.ts')) continue;
  const text = readText(file);
  failures.push(...scanFile(file, text));
}

for (const file of walkDir(DIST)) {
  const text = readText(file);
  for (const rule of BANNED) {
    if (rule.re.test(text)) failures.push(`${rule.label} in dist ${path.relative(DIST, file)}`);
  }
}

if (failures.length) {
  failGate('G3', [...new Set(failures)].slice(0, 40));
  process.exit(1);
}
passGate('G3', 'no banned leftovers');
