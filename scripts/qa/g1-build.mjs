#!/usr/bin/env node
/** G1: build, astro check, eslint */
import fs from 'node:fs';
import path from 'node:path';
import { DIST, ROOT, failGate, passGate, run, runOrThrow } from './lib.mjs';

const outDir = path.join(ROOT, 'docs', 'qa-artifacts');

async function main() {
  fs.mkdirSync(outDir, { recursive: true });
  const log = [];

  let install = await run('npm', ['install']);
  fs.writeFileSync(path.join(outDir, 'g1-npm-install.txt'), install.stdout + install.stderr);
  if (install.code !== 0) {
    failGate('G1', 'npm install failed');
    process.exit(1);
  }

  let build = await run('npm', ['run', 'build']);
  fs.writeFileSync(path.join(outDir, 'g1-build.txt'), build.stdout + build.stderr);
  if (build.code !== 0 || !fs.existsSync(DIST)) {
    failGate('G1', 'npm run build failed or dist missing');
    process.exit(1);
  }

  let check = await run('npx', ['astro', 'check']);
  fs.writeFileSync(path.join(outDir, 'g1-astro-check.txt'), check.stdout + check.stderr);
  const errorMatch = check.stdout.match(/(\d+) errors/) ?? check.stderr.match(/(\d+) errors/);
  const errorCount = errorMatch ? Number(errorMatch[1]) : check.code !== 0 ? 1 : 0;
  if (errorCount > 0) {
    failGate('G1', `astro check reported ${errorCount} errors`);
    process.exit(1);
  }

  const eslintConfig = path.join(ROOT, 'eslint.config.js');
  if (fs.existsSync(eslintConfig)) {
    let lint = await run('npx', ['eslint', 'src', '--max-warnings', '0', '--quiet']);
    fs.writeFileSync(path.join(outDir, 'g1-eslint.txt'), lint.stdout + lint.stderr);
    if (lint.code !== 0) {
      failGate('G1', 'eslint failed');
      process.exit(1);
    }
  } else {
    log.push('eslint skipped (no eslint.config.js)');
  }

  passGate('G1', log.join('; ') || 'build + astro check OK');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
