#!/usr/bin/env node
/** G14: content quality — blog uniqueness & structure */
import fs from 'node:fs';
import path from 'node:path';
import { failGate, passGate, readText, ROOT } from './lib.mjs';

const postsFile = readText(path.join(ROOT, 'src/data/blog/posts.ts'));
const failures = [];

const slugRe = /slug:\s*'([^']+)'/g;
const slugs = [...postsFile.matchAll(slugRe)].map((m) => m[1]);

const titleRe = /title:\s*'([^']+)'/g;
const titles = [...postsFile.matchAll(titleRe)].map((m) => m[1]);
if (new Set(titles).size !== titles.length) failures.push('duplicate blog titles');

for (const slug of slugs) {
  const chunk = postsFile.split(`slug: '${slug}'`)[1]?.slice(0, 4000) ?? '';
  if (!chunk.includes('date:')) failures.push(`${slug}: missing date`);
  if (!/\/products\//.test(chunk) && !/\]\(\/products\//.test(chunk)) {
    failures.push(`${slug}: missing internal product link`);
  }
}

function tokenize(text) {
  return text.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').split(/\s+/).filter((w) => w.length > 3);
}

function jaccard(a, b) {
  const sa = new Set(a);
  const sb = new Set(b);
  const inter = [...sa].filter((x) => sb.has(x)).length;
  const union = new Set([...sa, ...sb]).size;
  return union ? inter / union : 0;
}

const bodies = [...postsFile.matchAll(/body:\s*\[([\s\S]*?)\],\s*\n\s*related/sg)].map((m) => m[1]);
for (let i = 0; i < bodies.length; i++) {
  for (let j = i + 1; j < bodies.length; j++) {
    const sim = jaccard(tokenize(bodies[i]), tokenize(bodies[j]));
    if (sim > 0.4) failures.push(`blog overlap ${slugs[i]} vs ${slugs[j]}: ${(sim * 100).toFixed(0)}%`);
  }
}

if (failures.length) {
  failGate('G14', failures.slice(0, 20));
  process.exit(1);
}
passGate('G14', `${slugs.length} blog posts checked`);
