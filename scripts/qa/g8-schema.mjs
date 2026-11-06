#!/usr/bin/env node
/** G8: JSON-LD validation */
import fs from 'node:fs';
import { failGate, passGate, readText, walkDir, DIST } from './lib.mjs';

const failures = [];

for (const file of walkDir(DIST)) {
  const html = readText(file);
  const blocks = [...html.matchAll(/<script type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
  for (const block of blocks) {
    const raw = block[1].trim();
    try {
      JSON.parse(raw);
    } catch (e) {
      failures.push(`Invalid JSON-LD in ${file}: ${e.message}`);
    }
    if (/AggregateRating|Review|ratingValue|reviewCount/i.test(raw)) {
      failures.push(`Fabricated ratings/reviews in ${file}`);
    }
  }
}

if (failures.length) {
  failGate('G8', failures);
  process.exit(1);
}
passGate('G8', 'JSON-LD parses, no fake ratings');
