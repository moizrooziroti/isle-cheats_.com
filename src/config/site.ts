export const SITE_NAME = 'THE ISLE CHEATS';
export const PRIMARY_KEYWORD = 'THE ISLE CHEATS';
export const HOME_KEYWORD = 'THE ISLE CHEAT';
export const SITE_DOMAIN = 'isle-cheats.com';
export const SITE_URL = `https://${SITE_DOMAIN}`;
export const PRODUCT_BASE = '/products/';
export const TITLE_PREFIX = SITE_NAME;
export const SUPPORT_EMAIL = `support@${SITE_DOMAIN}`;
export const DISCORD_URL = 'https://discord.com/invite/Vu85F8auQS';

export const LOGO =
  'https://ooszazcwzmwhitdxwtom.supabase.co/storage/v1/object/public/seo-media-library/the-isle/1242b160-0414-44df-95cc-e45319c48f50/1793306924189-jbyii9-logo.webp';

/** The only content images used for the hero, products, blog, forum, and social cards. */
export const CONTENT_IMAGES = [
  'https://ooszazcwzmwhitdxwtom.supabase.co/storage/v1/object/public/seo-media-library/the-isle/c7f7b806-cb3e-4eea-8fa1-eca85c479073/1793620085967-dw3mlg-zadeyo-theisle-1-visuals.webp',
  'https://ooszazcwzmwhitdxwtom.supabase.co/storage/v1/object/public/seo-media-library/the-isle/986c4da2-dda6-40d4-9002-5802ae47beb5/1793624308504-oeh2f0-zadeyo-theisle-2-world.webp',
  'https://ooszazcwzmwhitdxwtom.supabase.co/storage/v1/object/public/seo-media-library/the-isle/c7f7b806-cb3e-4eea-8fa1-eca85c479073/1793620086945-5tl7fj-zadeyo-theisle-2-aimbot.webp',
  'https://ooszazcwzmwhitdxwtom.supabase.co/storage/v1/object/public/seo-media-library/the-isle/c7f7b806-cb3e-4eea-8fa1-eca85c479073/1793620088182-i1jjcd-zadeyo-theisle-3-exploits.webp',
  'https://ooszazcwzmwhitdxwtom.supabase.co/storage/v1/object/public/seo-media-library/the-isle/c7f7b806-cb3e-4eea-8fa1-eca85c479073/1793620089254-lnm0f2-zadeyo-theisle-4-misc.webp',
  'https://ooszazcwzmwhitdxwtom.supabase.co/storage/v1/object/public/seo-media-library/the-isle/986c4da2-dda6-40d4-9002-5802ae47beb5/1793624309424-dtktr8-zadeyo-theisle-3-misc.webp',
] as const;

export const SOCIAL_IMAGES = [CONTENT_IMAGES[0], CONTENT_IMAGES[1]] as const;

export interface ProductOffer {
  id: 'monthly' | 'lifetime';
  label: string;
  priceUsd: number;
  priceNote: string;
}

export interface SiteProduct {
  slug: string;
  name: string;
  primaryKeyword: string;
  offers: ProductOffer[];
  shortDescription: string;
  /** One-line hero pitch — benefit-led, shown on the homepage. */
  heroPitch: string;
  keyFeatures: string[];
  ctaUrl: string;
  seoTitle: string;
  metaDescription: string;
}

/** Card label from the durations listed on the affiliate product page. */
export function offerPriceLabel(offers: ProductOffer[]): string {
  return offers.map((offer) => `$${offer.priceUsd}`).join(' / ');
}

export const PRODUCTS: SiteProduct[] = [
  {
    slug: 'the-isle-cheats',
    name: 'THE ISLE CHEATS',
    primaryKeyword: 'THE ISLE CHEATS',
    offers: [
      { id: 'monthly', label: 'Monthly', priceUsd: 35, priceNote: '31 days of access' },
      { id: 'lifetime', label: 'Lifetime', priceUsd: 150, priceNote: 'Unlimited access' },
    ],
    shortDescription: 'EVRIMA vision and awareness tools for PC survival.',
    heroPitch: 'Main EVRIMA cheat suite — player ESP, dinosaur ESP, nests, growth.',
    keyFeatures: [
      'Player and dinosaur labels',
      'Distance and growth readouts',
      'Nest and carcass markers',
      'Saveable overlay profiles',
      'Windows 10 and 11',
    ],
    ctaUrl: 'https://zadeyo.com/go/MOIZ?to=%2Fproducts%2Fthe-isle-novaxware',
    seoTitle: 'THE ISLE CHEATS | EVRIMA ESP for PC',
    metaDescription:
      'THE ISLE CHEATS for PC survival: player labels, dinosaur ESP, and overlay profiles for EVRIMA.',
  },
  {
    slug: 'the-isle-hwid-spoofer',
    name: 'THE ISLE HWID SPOOFER',
    primaryKeyword: 'THE ISLE HWID SPOOFER',
    offers: [{ id: 'lifetime', label: 'Lifetime', priceUsd: 150, priceNote: 'Unlimited access' }],
    shortDescription: 'A separate PC utility listed for hardware-identifier changes.',
    heroPitch: 'Hardware utility for PC recovery workflows.',
    keyFeatures: [
      'Sold separately from the main suite',
      'For hardware-level PC recovery alongside the main suite.',
      'Separate lifetime checkout on the partner page',
      'Restore point recommended first',
      'You accept the risk of the tool',
    ],
    ctaUrl: 'https://zadeyo.com/go/MOIZ?to=%2Fproducts%2Fhwid-spoofer',
    seoTitle: 'THE ISLE HWID SPOOFER | PC Utility',
    metaDescription:
      'THE ISLE HWID SPOOFER is a separate PC utility on the Isle catalog — partner checkout and feature list on this page.',
  },
  {
    slug: 'ugc-account-recovery',
    name: 'UGC TOOL FOR ACCOUNT RECOVERY',
    primaryKeyword: 'UGC Account recovery',
    offers: [
      { id: 'monthly', label: 'Monthly', priceUsd: 35, priceNote: '31 days of access' },
      { id: 'lifetime', label: 'Lifetime', priceUsd: 150, priceNote: 'Unlimited access' },
    ],
    shortDescription: 'Appeal and dispute notes for restricted accounts.',
    heroPitch: 'Appeal and dispute notes for restricted accounts.',
    keyFeatures: [
      'Appeal checklist and case notes',
      'Account recovery workflows',
      'Pairs with THE ISLE CHEATS support path',
      'Pairs with the main product page',
      'Checkout stays on the partner link',
    ],
    ctaUrl: 'https://zadeyo.com/go/MOIZ?to=%2Fproducts%2Fugc',
    seoTitle: 'UGC Account recovery | Appeal Notes',
    metaDescription:
      'UGC Account recovery organizes appeal notes for THE ISLE CHEATS customers on the partner checkout.',
  },
  {
    slug: 'cloud-dma',
    name: 'CLOUD DMA',
    primaryKeyword: 'CLOUD DMA',
    offers: [{ id: 'lifetime', label: 'Lifetime', priceUsd: 50, priceNote: 'Unlimited access' }],
    shortDescription: 'Add-on the vendor lists as required for the full suite.',
    heroPitch: 'Cloud stack add-on for the full cheat suite.',
    keyFeatures: [
      'Listed as required for the full suite',
      'One purchase, separate from ESP',
      'Does not change game rules',
      'Check status before you launch',
      'Lifetime price listed on the partner page',
    ],
    ctaUrl: 'https://zadeyo.com/go/MOIZ?to=%2Fproducts%2Fcloud-dma',
    seoTitle: 'CLOUD DMA | Add-on for THE ISLE CHEATS',
    metaDescription:
      'CLOUD DMA is the add-on listed with THE ISLE CHEATS. Confirm it is required for your license before you buy.',
  },
];

export function productBySlug(slug: string): SiteProduct | undefined {
  return PRODUCTS.find((product) => product.slug === slug);
}
