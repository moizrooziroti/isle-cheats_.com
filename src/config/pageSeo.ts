/**
 * Central titles/descriptions for high-traffic routes.
 * One primary keyword per URL. Titles stay under 60 characters.
 */

export interface PageSeoEntry {
  title: string;
  description: string;
}

export const PAGE_SEO: Record<string, PageSeoEntry> = {
  '/': {
    title: 'THE ISLE CHEAT | PC Survival Tools',
    description:
      'THE ISLE CHEATS for PC: player ESP, dinosaur ESP, Cloud DMA, and utilities with verified partner checkout.',
  },
  '/products/': {
    title: 'THE ISLE CHEATS products | Four PC tools',
    description:
      'Four THE ISLE CHEATS products on one page. Each card has its own checkout link and the price listed on the partner page.',
  },
  '/products/the-isle-cheats/': {
    title: 'THE ISLE CHEATS | EVRIMA ESP for PC',
    description:
      'THE ISLE CHEATS for PC survival: player labels, dinosaur ESP, and overlay profiles for EVRIMA.',
  },
  '/products/hwid-spoofer/': {
    title: 'THE ISLE HWID SPOOFER | PC Utility',
    description:
      'THE ISLE HWID SPOOFER — separate PC utility on the Isle catalog with partner checkout.',
  },
  '/products/cloud-dma/': {
    title: 'CLOUD DMA | Add-on for THE ISLE CHEATS',
    description:
      'CLOUD DMA is the add-on listed with THE ISLE CHEATS. Confirm it is required for your license before you buy.',
  },
  '/products/ugc/': {
    title: 'UGC Account recovery | Appeal Notes',
    description:
      'UGC Account recovery — appeal notes and workflows for THE ISLE CHEATS customers.',
  },
  '/blog/': {
    title: 'THE ISLE CHEATS guides | ESP and setup',
    description:
      'Guides for EVRIMA ESP, buying THE ISLE CHEATS, and getting the most from your overlay.',
  },
  '/forum/': {
    title: 'The Isle cheat community forum | THE ISLE CHEATS',
    description:
      'Community discussions on The Isle ESP, EVRIMA survival, HWID utilities, patch-day status, and safe checkout on isle-cheats.com.',
  },
  '/faq/': {
    title: 'FAQ | THE ISLE CHEATS products',
    description:
      'Answers about THE ISLE CHEATS products, ESP, utilities, and partner checkout.',
  },
  '/terms/': {
    title: 'Terms | THE ISLE CHEATS',
    description:
      'Terms for using isle-cheats.com. Licenses are delivered by the checkout partner. We do not store card numbers.',
  },
  '/privacy/': {
    title: 'Privacy Policy | THE ISLE CHEATS',
    description:
      'How isle-cheats.com uses analytics, cookies, and support messages. Payment data stays on the checkout partner.',
  },
  '/privacy-policy/': {
    title: 'Privacy Policy | THE ISLE CHEATS',
    description:
      'How isle-cheats.com uses analytics, cookies, and support messages. Payment data stays on the checkout partner.',
  },
  '/about/': {
    title: 'About | THE ISLE CHEATS',
    description:
      'About THE ISLE CHEATS. Independent PC listings and guides. Not the official game, publisher, or anti-cheat vendor.',
  },
  '/support/': {
    title: 'Contact | THE ISLE CHEATS',
    description:
      'Contact THE ISLE CHEATS for product questions. We do not promise a specific account outcome.',
  },
  '/contact/': {
    title: 'Contact | THE ISLE CHEATS',
    description:
      'Contact THE ISLE CHEATS for product questions. We do not promise a specific account outcome.',
  },
  '/refund-policy/': {
    title: 'Refund Policy | THE ISLE CHEATS',
    description:
      'Refunds for THE ISLE CHEATS purchases are handled by the checkout partner. This site does not store payment cards.',
  },
  '/disclaimer/': {
    title: 'Disclaimer | THE ISLE CHEATS',
    description:
      'Third-party tools may violate the game terms of service. You are responsible for that choice. No safety guarantee is made.',
  },
};

const DEFAULT_LOGO_ALT = 'THE ISLE CHEATS logo';

export const LOGO_ALT_BY_PATH: Record<string, string> = {
  '/': 'THE ISLE CHEATS logo',
  '/products/': 'THE ISLE CHEATS product logo',
};

export function getLogoAltForPath(pathname: string): string {
  return LOGO_ALT_BY_PATH[normalizeSeoPath(pathname)] ?? DEFAULT_LOGO_ALT;
}

export function normalizeSeoPath(pathname: string): string {
  let path = pathname || '/';
  if (!path.startsWith('/')) path = `/${path}`;
  if (path !== '/' && !path.endsWith('/')) path = `${path}/`;
  return path;
}

export function getPageSeoEntry(pathname: string): PageSeoEntry | undefined {
  return PAGE_SEO[normalizeSeoPath(pathname)];
}
