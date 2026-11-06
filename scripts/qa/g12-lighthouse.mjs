#!/usr/bin/env node
/** G12: Lighthouse CI — run separately with npm run qa:lighthouse */
import fs from 'node:fs';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { ROOT, failGate, passGate, QA_OUT, ensureDir } from './lib.mjs';

const BASE = process.env.QA_BASE_URL ?? 'http://127.0.0.1:3000';
ensureDir(QA_OUT);

const urls = [
  `${BASE}/`,
  `${BASE}/products/`,
  `${BASE}/products/the-isle-cheats/`,
  `${BASE}/blog/the-isle-cheats-features-guide/`,
];

const thresholds = {
  performance: 0.95,
  seo: 0.98,
  accessibility: 0.95,
  'best-practices': 0.95,
};

function runLhci() {
  return new Promise((resolve) => {
    const child = spawn(
      'npx',
      ['lhci', 'autorun', '--config=./lighthouserc.cjs'],
      { cwd: ROOT, shell: true, env: { ...process.env, QA_BASE_URL: BASE }, stdio: ['ignore', 'pipe', 'pipe'] },
    );
    let out = '';
    child.stdout.on('data', (d) => (out += d));
    child.stderr.on('data', (d) => (out += d));
    child.on('close', (code) => resolve({ code: code ?? 1, out }));
  });
}

const result = await runLhci();
fs.writeFileSync(path.join(QA_OUT, 'g12-lighthouse.txt'), result.out);

const failures = [];
for (const [metric, min] of Object.entries(thresholds)) {
  const re = new RegExp(`${metric}[^\\d]*(\\d+(?:\\.\\d+)?)`, 'i');
  const scores = [...result.out.matchAll(new RegExp(`${metric}.*?([0-9\\.]+)`, 'gi'))].map((m) => Number(m[1]));
  const best = scores.length ? Math.max(...scores) / (scores[0] > 1 ? 100 : 1) : null;
  if (best !== null && best < min) failures.push(`${metric} ${best} < ${min}`);
}

if (result.code !== 0 && failures.length === 0) {
  failures.push('lhci autorun failed — see g12-lighthouse.txt');
}

if (failures.length) {
  failGate('G12', failures);
  process.exit(1);
}
passGate('G12', 'Lighthouse thresholds met');
