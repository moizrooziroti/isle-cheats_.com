/** Old Fortnite-era blog slugs → current Isle guides (301 targets for astro.config). */
export const BLOG_LEGACY_REDIRECTS: Record<string, string> = {
  'fortnite-cheats-features-guide': '/blog/the-isle-cheats-features-guide/',
  'fortnite-esp-wallhack-setup': '/blog/the-isle-esp-setup/',
  'how-to-buy-fortnite-cheats-2026': '/blog/how-to-buy-the-isle-cheats-2026/',
  'fortnite-hwid-spoofer-after-ban': '/blog/the-isle-hwid-spoofer-guide/',
  'eac-bypass-fortnite-guide': '/blog/eac-verify-the-isle-guide/',
  'fortnite-external-cheat-guide': '/blog/the-isle-external-loader-guide/',
};

const removedFortniteArticles = [
  'fortnite-cheat-codes-guide',
  'fortnite-console-cheats-tips',
  'how-to-use-fortnite-cheat-codes',
  'fortnite-console-commands-cheats',
  'fortnite-lite-vs-pro',
  'fortnite-elite-tier-guide',
  'fortnite-aimbot-ranked-guide',
  'fortnite-aimbot-combat-guide',
  'fortnite-radar-hack-guide',
  'fortnite-skin-changer-guide',
  'fortnite-stream-proof-setup',
  'fortnite-combat-assist-combat-guide',
  'fortnite-combat-assist-live-servers-guide',
];

for (const slug of removedFortniteArticles) {
  BLOG_LEGACY_REDIRECTS[slug] = '/blog/';
}

export function blogRedirectEntries(): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [slug, target] of Object.entries(BLOG_LEGACY_REDIRECTS)) {
    out[`/blog/${slug}/`] = target;
  }
  return out;
}
