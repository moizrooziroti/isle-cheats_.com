#!/usr/bin/env node
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import { ROOT, QA_OUT, ensureDir } from './lib.mjs';

const gates = [
  'g1-build.mjs',
  'g2-validators.mjs',
  'g3-leftovers.mjs',
  'g4-cta.mjs',
  'g5-links.mjs',
  'g6-seo-head.mjs',
  'g7-crawlability.mjs',
  'g8-schema.mjs',
  'g9-products.mjs',
  'g10-browser.mjs',
  'g11-assets.mjs',
  'g13-content-safety.mjs',
  'g14-content-quality.mjs',
  'g12-lighthouse.mjs',
];

const PORT = process.env.PORT || '3000';
const BASE = `http://127.0.0.1:${PORT}`;
const iteration = Number(process.env.QA_ITERATION ?? '1');
const skipLighthouse = process.env.QA_SKIP_LH === '1';

ensureDir(QA_OUT);
ensureDir(path.join(ROOT, 'docs'));

function runGate(script) {
  return new Promise((resolve) => {
    const child = spawn('node', [path.join('scripts', 'qa', script)], {
      cwd: ROOT,
      env: { ...process.env, QA_BASE_URL: BASE },
      stdio: 'inherit',
    });
    child.on('close', (code) => resolve(code ?? 1));
  });
}

function waitForServer(maxMs = 20000) {
  const start = Date.now();
  return new Promise((resolve, reject) => {
    const tick = () => {
      http.get(`${BASE}/`, (res) => {
        res.resume();
        if (res.statusCode && res.statusCode < 500) resolve(true);
        else if (Date.now() - start > maxMs) reject(new Error('server not ready'));
        else setTimeout(tick, 400);
      }).on('error', () => {
        if (Date.now() - start > maxMs) reject(new Error('server not ready'));
        else setTimeout(tick, 400);
      });
    };
    tick();
  });
}

const results = {};
let exitCode = 0;

for (const gate of ['g1-build.mjs']) {
  const code = await runGate(gate);
  results[gate] = code === 0 ? 'PASS' : 'FAIL';
  if (code !== 0) exitCode = 1;
}

if (exitCode) {
  appendLog();
  process.exit(1);
}

const server = spawn('node', ['scripts/serve.mjs'], {
  cwd: ROOT,
  env: { ...process.env, PORT },
  stdio: ['ignore', 'pipe', 'pipe'],
});

try {
  await waitForServer();
  const list = skipLighthouse ? gates.filter((g) => g !== 'g12-lighthouse.mjs') : gates.slice(1);
  for (const gate of list) {
    const code = await runGate(gate);
    results[gate] = code === 0 ? 'PASS' : 'FAIL';
    if (code !== 0) exitCode = 1;
  }
} finally {
  server.kill('SIGTERM');
}

appendLog();
process.exit(exitCode);

function appendLog() {
  const logPath = path.join(ROOT, 'docs', 'qa-loop-log.md');
  const header = fs.existsSync(logPath) ? '' : '# QA loop log\n\n';
  const table = Object.entries(results)
    .map(([g, s]) => `| ${g.replace('.mjs', '').toUpperCase()} | ${s} |`)
    .join('\n');
  const block = `${header}## Iteration ${iteration}\n\n| Gate | Result |\n| --- | --- |\n${table}\n\nStatus: ${exitCode === 0 ? 'ALL PASS' : 'FAILURES'}\n\n`;
  fs.appendFileSync(logPath, block);
  console.log('\n--- QA summary ---');
  console.log(table);
}
