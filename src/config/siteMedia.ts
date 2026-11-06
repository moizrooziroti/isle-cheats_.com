/**
 * Content photography comes only from CONTENT_IMAGES.
 * The header mark stays the brand logo.
 */

import { CONTENT_IMAGES, LOGO } from './site';

const [visuals, world, aim, exploits, miscA, miscB] = CONTENT_IMAGES;

export const SITE_MEDIA = {
  logo: LOGO,
  hero: visuals,
  screenshot1: world,
  screenshot2: aim,
  screenshot3: exploits,
  screenshot4: miscA,
  screenshot5: miscB,
  gallery3: exploits,
  pussycatS1: miscA,
  pussycatS2: world,
} as const;

const BLOG_SLUGS = [
  'the-isle-cheats-features-guide',
  'the-isle-esp-setup',
  'eac-patch-day-checklist',
  'how-to-buy-the-isle-cheats-2026',
  'the-isle-hwid-spoofer-guide',
  'eac-verify-the-isle-guide',
  'the-isle-external-loader-guide',
  'the-isle-mod-menu',
  'the-isle-cheat-engine',
] as const;

/** Blog hero / card images keyed by slug. Each one is one of the six approved screenshots. */
export const BLOG_IMAGE_BY_SLUG: Record<string, string> = Object.fromEntries(
  BLOG_SLUGS.map((slug, index) => [slug, CONTENT_IMAGES[index % CONTENT_IMAGES.length]]),
);

export function blogImageForSlug(slug: string): string {
  return BLOG_IMAGE_BY_SLUG[slug] ?? CONTENT_IMAGES[0];
}

export function contentImageForKey(key: string): string {
  let total = 0;
  for (const char of key) total += char.charCodeAt(0);
  return CONTENT_IMAGES[total % CONTENT_IMAGES.length];
}
