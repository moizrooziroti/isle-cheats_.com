/** Blog posts listed on /blog/ and included in sitemap-blog.xml */
export const INDEXED_BLOG_SLUGS = [
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

export type IndexedBlogSlug = (typeof INDEXED_BLOG_SLUGS)[number];

export function isIndexedBlogSlug(slug: string): boolean {
  return (INDEXED_BLOG_SLUGS as readonly string[]).includes(slug);
}
