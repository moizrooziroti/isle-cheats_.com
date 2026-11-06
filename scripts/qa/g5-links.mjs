#!/usr/bin/env node
/** G5: linkinator crawl on preview server (expects BASE_URL env) */
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { ROOT, failGate, passGate, QA_OUT, ensureDir } from './lib.mjs';

const BASE = process.env.QA_BASE_URL ?? 'http://127.0.0.1:4321';
const outFile = path.join(QA_OUT, 'g5-linkinator.txt');

ensureDir(QA_OUT);

function runLinkinator() {
  return new Promise((resolve) => {
    const args = [
      'linkinator',
      `${BASE}/`,
      '--recurse',
      '--skip',
      'https://zadeyo.com,https://discord.com,https://ooszazcwzmwhitdxwtom.supabase.co',
      '--format',
      'json',
    ];
    const child = spawn('npx', args, { cwd: ROOT, shell: true, stdio: ['ignore', 'pipe', 'pipe'] });
    let out = '';
    child.stdout.on('data', (d) => (out += d));
    child.stderr.on('data', (d) => (out += d));
    child.on('close', (code) => resolve({ code: code ?? 1, out }));
  });
}

const result = await runLinkinator();
fs.writeFileSync(outFile, result.out);

let broken = [];
try {
  const parsed = JSON.parse(result.out);
  broken = (parsed.links ?? []).filter((l) => l.state === 'BROKEN');
} catch {
  if (/BROKEN|✖|error/i.test(result.out)) {
    failGate('G5', 'linkinator reported errors — see g5-linkinator.txt');
    process.exit(1);
  }
}

if (broken.length) {
  failGate(
    'G5',
    broken.slice(0, 15).map((l) => `${l.parent ?? '?'} → ${l.url}`),
  );
  process.exit(1);
}

if (result.code !== 0 && broken.length === 0) {
  passGate('G5', 'linkinator completed (non-json output)');
  process.exit(0);
}

passGate('G5', `crawled ${BASE}`);
