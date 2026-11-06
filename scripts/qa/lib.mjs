import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
export const DIST = path.join(ROOT, 'dist');
export const QA_OUT = path.join(ROOT, 'docs', 'qa-artifacts');

export function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

export function run(cmd, args, opts = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, args, {
      cwd: ROOT,
      shell: process.platform === 'win32',
      stdio: ['ignore', 'pipe', 'pipe'],
      ...opts,
    });
    let stdout = '';
    let stderr = '';
    child.stdout?.on('data', (d) => {
      stdout += d.toString();
    });
    child.stderr?.on('data', (d) => {
      stderr += d.toString();
    });
    child.on('error', reject);
    child.on('close', (code) => {
      resolve({ code: code ?? 1, stdout, stderr });
    });
  });
}

export async function runOrThrow(label, cmd, args) {
  const result = await run(cmd, args);
  if (result.code !== 0) {
    const err = new Error(`${label} failed (exit ${result.code})\n${result.stdout}\n${result.stderr}`);
    err.result = result;
    throw err;
  }
  return result;
}

export function walkDir(dir, acc = []) {
  if (!fs.existsSync(dir)) return acc;
  for (const name of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, name.name);
    if (name.isDirectory()) walkDir(full, acc);
    else if (name.name.endsWith('.html')) acc.push(full);
  }
  return acc;
}

export function listHtmlFiles(dir) {
  return walkDir(dir);
}

export function readText(file) {
  return fs.readFileSync(file, 'utf8');
}

export function failGate(gate, messages) {
  const lines = Array.isArray(messages) ? messages : [messages];
  console.error(`\n[${gate}] FAIL`);
  for (const line of lines) console.error(`  - ${line}`);
  return false;
}

export function passGate(gate, detail = '') {
  console.log(`[${gate}] PASS${detail ? `: ${detail}` : ''}`);
  return true;
}

export function loadSiteConfig() {
  // Parse PRODUCTS ctaUrl from site.ts without importing TS
  const siteTs = readText(path.join(ROOT, 'src/config/site.ts'));
  const checkoutMjs = readText(path.join(ROOT, 'src/config/checkout-redirects.mjs'));
  const slugToUrl = {};
  const slugRe = /slug:\s*'([^']+)'[\s\S]*?ctaUrl:\s*'([^']+)'/g;
  let m;
  while ((m = slugRe.exec(siteTs)) !== null) {
    slugToUrl[m[1]] = m[2];
  }
  const checkout = {};
  const ckRe = /(\w+):\s*'(https:[^']+)'/g;
  while ((m = ckRe.exec(checkoutMjs)) !== null) {
    if (m[1] !== 'resolveCheckoutPathRedirect') checkout[m[1]] = m[2];
  }
  return { slugToUrl, checkout, siteDomain: 'isle-cheats.com' };
}
