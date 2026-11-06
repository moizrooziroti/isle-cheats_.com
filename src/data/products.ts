import { t } from '../i18n';
import { checkoutForSlug, checkoutPath } from '../config/checkout';
import { SITE_MEDIA } from '../config/siteMedia';
import type { IconName } from '../components/icons/types';

export interface ProductSlide {
  src: string;
  alt: string;
  caption: string;
  captionDesc: string;
}

export interface ProductOverview {
  title: string;
  paragraphs: string[];
}

export interface AcquisitionStep {
  num: string;
  title: string;
  desc: string;
}

export interface ProductAcquisition {
  title: string;
  steps: AcquisitionStep[];
}

export interface SystemRequirement {
  icon: IconName;
  text: string;
}

export interface ProductPage {
  slug: string;
  kind: 'tier' | 'utility';
  badge: string;
  category?: string;
  tier?: string;
  name: string;
  title: string;
  subtitle: string;
  desc: string;
  features: string[];
  more: number;
  variant?: 'essential' | 'popular' | 'limited';
  buyUrl: string;
  images: ProductSlide[];
  overview: ProductOverview;
  acquisition: ProductAcquisition;
  goodToKnow: string;
  limitations: string;
  fullFeatures: string[];
  systemRequirements: SystemRequirement[];
  about?: { type: 'h2' | 'p'; text: string }[];
  body: { type: 'h2' | 'p'; text: string }[];
  relatedBlogSlugs: string[];
  /** Server-rendered H1 when set. */
  seoH1?: string;
}

export const productRelatedBlogSlugs: Record<string, string[]> = {
  'the-isle-cheats': [
    'the-isle-cheats-features-guide',
    'the-isle-esp-setup',
    'eac-patch-day-checklist',
    'how-to-buy-the-isle-cheats-2026',
  ],
  'hwid-spoofer': ['the-isle-hwid-spoofer-guide', 'eac-verify-the-isle-guide', 'eac-patch-day-checklist'],
  'cloud-dma': ['the-isle-external-loader-guide', 'eac-patch-day-checklist'],
  ugc: ['eac-verify-the-isle-guide', 'the-isle-hwid-spoofer-guide'],
};

const productBase = '/products/';
const M = SITE_MEDIA;

const defaultAcquisitionSteps: AcquisitionStep[] = [
  {
    num: '01',
    title: 'Check status',
    desc: 'Confirm the product is online on isle-cheats.com and partner status pages before purchase—especially after a game or EAC update.',
  },
  {
    num: '02',
    title: 'Pick a plan',
    desc: 'Choose the displayed option on the product page, then use the Buy button.',
  },
  {
    num: '03',
    title: 'Pay securely',
    desc: 'Complete payment on the partner checkout — license and portal access delivered there.',
  },
  {
    num: '04',
    title: 'Launch with confidence',
    desc: 'Portal access unlocks your loader, presets, and ESP modules — follow the partner guide and dominate EVRIMA.',
  },
];

function acquisitionFor(productName: string): ProductAcquisition {
  return {
    title: `How to get ${productName}`,
    steps: defaultAcquisitionSteps,
  };
}

const sharedGoodToKnow =
  'The Isle and Easy Anti-Cheat receive updates. Confirm module availability on live status before you purchase or launch. Cloud DMA is required for full functionality per the product vendor.';

const sharedLimitations =
  'Independent Isle cheat catalog — verified checkout, feature lists, and status updates so you know exactly what you are buying.';

const isleSystemRequirements: SystemRequirement[] = [
  { icon: 'reqWindows', text: 'Windows 10 or 11 (64-bit).' },
  { icon: 'reqSettings', text: 'Administrator access for loader installation.' },
  { icon: 'reqWifi', text: 'Stable internet for portal access and updates.' },
  { icon: 'reqCpu', text: 'PC that meets The Isle published requirements.' },
];

function slide(src: string, alt: string, caption: string, captionDesc: string): ProductSlide[] {
  return [{ src, alt, caption, captionDesc }];
}

function slugFromHref(href: string): string {
  const parts = href.split('/').filter(Boolean);
  return parts[parts.length - 1] || 'the-isle-cheats';
}

const isleSlides = [
  ...slide(
    M.screenshot1,
    'The Isle cheat ESP overlay — player and dinosaur information on PC',
    'Player ESP',
    'Player boxes, distance and species tags in The Isle.',
  ),
  ...slide(
    M.pussycatS2,
    'The Isle cheat dinosaur ESP screenshot on PC',
    'Dinosaur ESP',
    'Animal ESP with growth and stamina readouts.',
  ),
  ...slide(
    M.screenshot3,
    'The Isle cheat menu and visual customization',
    'Cheat menu',
    'Configurable ESP colors and menu controls.',
  ),
];

const productContent: Record<
  string,
  {
    images: ProductSlide[];
    goodToKnow: string;
    limitations: string;
    systemRequirements: SystemRequirement[];
    fullFeatures: string[];
    overview: ProductOverview;
  }
> = {
  'the-isle-cheats': {
    images: isleSlides,
    goodToKnow: sharedGoodToKnow,
    limitations: sharedLimitations,
    systemRequirements: isleSystemRequirements,
    fullFeatures: [
      'Player ESP',
      'NPC ESP',
      'Animal ESP',
      'Box',
      'Snapline',
      'Name',
      'Distance',
      'Corpse',
      'Health',
      'Stamina',
      'Growth',
      'Species',
      'Player Direction',
      'Head Dot',
      'Visible Check',
      'Gore',
      'Fruit',
      'Water',
      'Max Distance',
      'Crosshair',
      'Fullbright',
      'Show FPS',
      'Custom Menu Key',
      'Custom Panic Key',
      'Custom ESP Colors',
    ],
    overview: {
      title: 'Buy The Isle: The Isle Cheats',
      paragraphs: [
        'Enhancement suite for The Isle dinosaur survival: player and world ESP, radar-style awareness, visual customization, and saveable configs — with vendor support for English or Russian menus.',
        'Always check live status before launch, especially after game or Easy Anti-Cheat updates. Cloud DMA is required for full functionality on the vendor product page.',
        'Checkout on isle-cheats.com redirects to our partner store for the Isle cheat license. You will complete payment and portal access there; we list features and verified plan prices on this page for comparison.',
        'Typical modules include player ESP, dinosaur ESP, distance and species labels, stamina and growth readouts, and overlay tuning for Evrima on Windows 10/11. Open the FAQ for setup tips and Support if checkout needs a hand.',
      ],
    },
  },
  'hwid-spoofer': {
    images: slide(
      M.gallery3,
      'HWID spoofer for the Isle cheat users — PC hardware ban recovery',
      'HWID tools',
      'Hardware ID spoofing workflow after a ban.',
    ),
    goodToKnow:
      'Sold separately from THE ISLE CHEATS — lifetime checkout on the partner page for hardware recovery workflows.',
    limitations:
      'Built for players who need a hardware utility alongside the main cheat suite. Feature list and Buy link on this page.',
    systemRequirements: [
      { icon: 'reqWindows', text: 'Windows 10 or 11 64-bit with administrator access.' },
      { icon: 'reqRestorePoint', text: 'System restore point recommended before running.' },
      { icon: 'reqWifi', text: 'Internet for portal verification.' },
    ],
    fullFeatures: [
      'Sold as its own product',
      'Separate from the main suite',
      'Hardware recovery utility',
      'Partner checkout',
      'Lifetime plan on the product page',
    ],
    overview: {
      title: 'HWID Spoofer',
      paragraphs: [
        'A separate PC utility listed beside THE ISLE CHEATS — partner page covers scope and checkout.',
        'Pair with the main suite when you need hardware-level recovery tools on the same catalog.',
      ],
    },
  },
  'cloud-dma': {
    images: slide(
      M.screenshot5,
      'Cloud DMA infrastructure for the Isle cheat on PC',
      'Cloud DMA',
      'Mandatory infrastructure layer for supported cheats.',
    ),
    goodToKnow:
      'Cloud DMA is a one-time lifetime purchase on the vendor store ($50 USD at time of verification). Required before other cheat features can run.',
    limitations:
      'Requires compatible DMA hardware, USB 3.0, and Windows 10/11 64-bit per vendor requirements. Not a substitute for game licenses.',
    systemRequirements: [
      { icon: 'reqWindows', text: 'Windows 10 / 11 (64-bit).' },
      { icon: 'reqCpu', text: 'Compatible DMA hardware device.' },
      { icon: 'reqWifi', text: 'Internet connection for activation.' },
    ],
    fullFeatures: [
      'Add-on listed with the main suite',
      'Sold separately from ESP',
      'Confirm it is required before you buy',
      'Lifetime price listed on the partner page',
      'Checkout on the partner link',
    ],
    overview: {
      title: 'Cloud DMA',
      paragraphs: [
        'Mandatory infrastructure layer for the vendor cheat ecosystem. One lifetime purchase—no renewals on the vendor FAQ at time of verification.',
        'Required for full The Isle cheat functionality per vendor system requirements.',
      ],
    },
  },
  ugc: {
    images: slide(
      M.pussycatS1,
      'UGC Tools for the Isle cheat — account appeal workspace',
      'UGC Tools',
      'Appeal workflows and dispute automation.',
    ),
    goodToKnow:
      'Gather order email, account details, and restriction screenshots before opening support. UGC structures appeals for faster, cleaner case notes.',
    limitations:
      'Appeal workspace for account restrictions — workflows and tracking on the partner product page.',
    systemRequirements: [
      { icon: 'reqWindows', text: 'Windows 10 / 11 (64-bit).' },
      { icon: 'reqSettings', text: 'Run loader as Administrator.' },
      { icon: 'reqWifi', text: 'Internet for portal and support.' },
    ],
    fullFeatures: ['Custom appeal workflows', 'Dispute automation', 'Case documentation', 'Status tracking'],
    overview: {
      title: 'UGC Tools',
      paragraphs: [
        'Account recovery workspace for building custom appeal workflows and automating restriction disputes on supported platforms (vendor description).',
        'Check live product status before purchase. Checkout uses the Zadeyo partner store at /products/ugc.',
      ],
    },
  },
};

const tierBodies: Record<string, ProductPage['body']> = {
  'the-isle-cheats': [
    {
      type: 'p',
      text: 'Buy The Isle cheats for PC with ESP for players, NPCs, and dinosaurs, plus utilities listed on the vendor page. This independent site helps you compare products and reach checkout—not the game developer.',
    },
  ],
};

const utilityBodies: Record<string, ProductPage['body']> = {
  'hwid-spoofer': [
    {
      type: 'p',
      text: 'HWID Spoofer is sold separately from The Isle cheats. Use it only when hardware-level bans require a clean identifier profile.',
    },
  ],
  'cloud-dma': [
    {
      type: 'p',
      text: 'Cloud DMA is required for full cheat functionality on the vendor The Isle product page. Purchase it once before or with your game cheat license.',
    },
  ],
  ugc: [
    {
      type: 'p',
      text: 'UGC Tools helps organize appeals and disputes. It is not a cheat module for in-game advantages.',
    },
  ],
};

function buildTierPages(): ProductPage[] {
  return t.cheats.items.map((cheat) => {
    const slug = slugFromHref(cheat.href);
    const content = productContent[slug];
    return {
      slug,
      kind: 'tier',
      badge: cheat.badge,
      tier: cheat.tier,
      name: cheat.name,
      title: cheat.title,
      ...(slug === 'the-isle-cheats' ? { seoH1: 'Buy The Isle: The Isle Cheats' } : {}),
      subtitle: cheat.desc,
      desc: cheat.desc,
      features: cheat.features,
      more: cheat.more,
      variant: cheat.variant,
      buyUrl: checkoutForSlug(slug),
      images: content.images,
      overview: content.overview,
      acquisition: acquisitionFor(cheat.title),
      goodToKnow: content.goodToKnow,
      limitations: content.limitations,
      fullFeatures: content.fullFeatures,
      systemRequirements: content.systemRequirements,
      body: tierBodies[slug] ?? [],
      relatedBlogSlugs: productRelatedBlogSlugs[slug] ?? [],
    };
  });
}

function buildUtilityPages(): ProductPage[] {
  return t.products.items
    .filter((p) => p.href !== productBase)
    .map((product) => {
      const slug = slugFromHref(product.href);
      const content = productContent[slug];
      return {
        slug,
        kind: 'utility',
        badge: product.badge,
        category: product.category,
        name: product.title,
        title: product.title,
        subtitle: product.subtitle,
        desc: product.desc,
        features: product.features,
        more: product.more,
        buyUrl: checkoutForSlug(slug),
        images: content.images,
        overview: content.overview,
        acquisition: acquisitionFor(product.title),
        goodToKnow: content.goodToKnow,
        limitations: content.limitations,
        fullFeatures: content.fullFeatures,
        systemRequirements: content.systemRequirements,
        body: utilityBodies[slug] ?? [],
        relatedBlogSlugs: productRelatedBlogSlugs[slug] ?? [],
      };
    });
}

export const productPages: ProductPage[] = [...buildTierPages(), ...buildUtilityPages()];

export const cheatPages = productPages.filter((p) => p.kind === 'tier');

export function getProductPage(slug: string) {
  return productPages.find((p) => p.slug === slug);
}

export function getCheatPage(slug: string) {
  return cheatPages.find((p) => p.slug === slug);
}

export function getAllProductSlugs() {
  return productPages.map((p) => p.slug);
}

export function getAllCheatSlugs() {
  return cheatPages.map((p) => p.slug);
}

export const heroSlides: ProductSlide[] = [
  {
    src: M.hero,
    alt: 'The Isle cheat hero — Ceratosaurus survival on PC',
    caption: 'The Isle',
    captionDesc: 'Dinosaur survival on PC.',
  },
  ...isleSlides,
];

export const productHub = {
  path: productBase,
  title: t.products.title,
  subtitle: t.products.subtitle,
  description:
    'The Isle cheats for PC plus HWID Spoofer, Cloud DMA, and UGC Tools—four products with separate checkout links.',
  buyUrl: checkoutPath('theIsle'),
};
