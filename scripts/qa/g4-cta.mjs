#!/usr/bin/env node
/** G4: checkout link integrity in dist HTML */
import fs from 'node:fs';
import { failGate, passGate, loadSiteConfig, readText, walkDir, DIST } from './lib.mjs';

const { slugToUrl, checkout } = loadSiteConfig();
const allowed = new Set(Object.values(checkout));
const failures = [];

function stripTags(html) {
  return html.replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<[^>]+>/g, ' ');
}

function checkRel(href, tag) {
  if (!tag.includes('rel=')) return 'missing rel';
  const rel = tag.match(/rel=["']([^"']+)["']/i)?.[1] ?? '';
  for (const part of ['sponsored', 'nofollow', 'noopener']) {
    if (!rel.includes(part)) return `rel missing ${part}`;
  }
  return null;
}

for (const file of walkDir(DIST)) {
  const html = readText(file);
  const re = /<a\s[^>]*href=["'](https:[^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi;
  let m;
  while ((m = re.exec(html)) !== null) {
    const fullTag = m[0].slice(0, m[0].indexOf('>') + 1);
    const href = m[1];
    const visible = stripTags(m[2]).replace(/\s+/g, ' ').trim();
    if (!href.includes('zadeyo.com')) continue;
    if (!allowed.has(href)) {
      failures.push(`Unlisted purchase URL: ${href} in ${file}`);
    }
    const relErr = checkRel(href, fullTag);
    if (relErr) failures.push(`${relErr} for ${href}`);
    if (/\bzadeyo\b/i.test(visible)) failures.push(`Visible brand zadeyo in link text: "${visible.slice(0, 60)}"`);
    if (/\bnovaxware\b/i.test(visible)) failures.push(`Visible novaxware in link text`);
  }
}

const rogueZadeyo = /href=["']https:\/\/zadeyo[^"']+["']/g;
for (const file of walkDir(DIST)) {
  const html = readText(file);
  let m;
  while ((m = rogueZadeyo.exec(html)) !== null) {
    const href = m[0].match(/https:[^"']+/)?.[0];
    if (href && !allowed.has(href)) failures.push(`Rogue checkout: ${href}`);
  }
}

if (failures.length) {
  failGate('G4', [...new Set(failures)].slice(0, 30));
  process.exit(1);
}
passGate('G4', `${allowed.size} checkout URLs verified`);
