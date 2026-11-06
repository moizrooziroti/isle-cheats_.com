import type { IconName } from '../components/icons/types';
import { normalizeInternalPath, productPath, ROUTES } from '../utils/path';

export type FaqTopic =
  | 'all'
  | 'plans'
  | 'esp'
  | 'scripts'
  | 'safety'
  | 'products'
  | 'blog'
  | 'setup';

export interface SiteFaqItem {
  id: string;
  topic: FaqTopic;
  icon: IconName;
  q: string;
  a: string;
  aHtml?: string;
  scopes?: string[];
}

function a(text: string): string {
  return text;
}

function link(text: string, href: string): string {
  return `<a href="${normalizeInternalPath(href)}">${text}</a>`;
}

const mainCheat = link('The Isle Cheats', productPath('the-isle-cheats'));
const productsHub = link('The Isle products', ROUTES.products);
const hwid = link('HWID Spoofer', productPath('hwid-spoofer'));
const cloudDma = link('Cloud DMA', productPath('cloud-dma'));
const ugc = link('UGC Tools', productPath('ugc'));
const faqPage = link('full FAQ', ROUTES.faq);
const blog = link('blog guides', ROUTES.blog);

export const siteFaqs: SiteFaqItem[] = [
  {
    id: 'status',
    topic: 'setup',
    icon: 'faqStatus',
    q: 'Where do I check if The Isle cheats are online?',
    a: a('The live status banner is on isle-cheats.com and in the Discord #status channel. Always check after a The Isle or EAC update.'),
  },
  {
    id: 'after-buy',
    topic: 'setup',
    icon: 'faqAfterBuy',
    q: 'What happens after I buy?',
    a: a('Your portal unlocks the loader, setup guide and config library via our secure checkout. Follow the guide before launching The Isle.'),
  },
  {
    id: 'ban-risk',
    topic: 'safety',
    icon: 'faqBanRisk',
    q: 'Can I get banned using third-party The Isle cheats?',
    a: a('THE ISLE CHEATS gives you ESP and survival tools on EVRIMA — check live status, tune your overlay, and play with the edge you bought.'),
  },
  {
    id: 'platforms',
    topic: 'setup',
    icon: 'faqPlatforms',
    q: 'Which platforms are supported?',
    a: a('The Isle on Windows 10/11 64-bit only (Steam / supported launcher). macOS and Linux are not supported.'),
  },
  {
    id: 'license-move',
    topic: 'setup',
    icon: 'faqLicenseMove',
    q: 'Can I move my license to a new PC?',
    a: a('Yes—use the HWID reset in your portal or open a Discord ticket. Limits depend on your tier.'),
  },
  {
    id: 'products-page',
    topic: 'products',
    icon: 'faqProductsPage',
    q: 'Where are products and utilities listed?',
    a: `${productsHub} lists ${mainCheat}, ${hwid}, ${ugc}, and ${cloudDma} with feature lists and checkout via our partner.`,
  },
  {
    id: 'what-is-esp',
    topic: 'esp',
    icon: 'faqWhatIsEsp',
    q: 'What is The Isle ESP?',
    a: `Player and dinosaur ESP show positions, species, growth, and distance readouts on screen. ${mainCheat} lists the vendor ESP modules for The Isle on PC.`,
    scopes: ['the-isle-cheats'],
  },
  {
    id: 'esp-vs-scripts',
    topic: 'esp',
    icon: 'faqEspVsScripts',
    q: 'What ESP features are listed for The Isle?',
    a: `Vendor docs for ${mainCheat} list player ESP, animal and NPC ESP, species and growth tags, distance readouts, and custom colors. Confirm live status before purchase.`,
  },
  {
    id: 'which-product-main',
    topic: 'plans',
    icon: 'faqWhichTierEsp',
    q: 'Which product is the main The Isle suite?',
    a: `${mainCheat} is the primary enhancement product. Utilities (${hwid}, ${cloudDma}, ${ugc}) are separate checkouts on ${productsHub}.`,
    scopes: ['the-isle-cheats'],
  },
  {
    id: 'cloud-dma-required',
    topic: 'products',
    icon: 'faqWhichTierScripts',
    q: 'Is Cloud DMA required?',
    a: `Partner FAQ states ${cloudDma} is required for full functionality in their stack. It is a one-time lifetime purchase separate from ${mainCheat}.`,
    scopes: ['cloud-dma'],
  },
  {
    id: 'compare-products',
    topic: 'plans',
    icon: 'faqRankTiers',
    q: 'How do I compare products?',
    a: `Open ${productsHub} for The Isle Cheats plus utilities. Each page lists features, pricing, and checkout links.`,
  },
  {
    id: 'pricing-verified',
    topic: 'plans',
    icon: 'faqEliteSlots',
    q: 'Where do listed prices come from?',
    a: a('Product pages show prices verified against the partner storefront. If a plan is missing on the live vendor page, we omit it rather than guess.'),
  },
  {
    id: 'stream-proof',
    topic: 'esp',
    icon: 'faqStreamProof',
    q: 'Can OBS capture my overlay?',
    a: `Stream-proof modes (when offered in the loader) hide overlays from OBS and Discord share. Test a local recording before going live.`,
  },
  {
    id: 'undetected',
    topic: 'safety',
    icon: 'faqUndetected',
    q: 'Does THE ISLE CHEATS promise a clean account?',
    a: a('We ship maintained builds, Discord support, and verified checkout — check the homepage status before every session and enjoy the full ESP suite.'),
  },
  {
    id: 'esp-safer',
    topic: 'safety',
    icon: 'faqEspSafer',
    q: 'Is ESP lower risk than other modules?',
    a: a('Player and dinosaur ESP are the heart of THE ISLE CHEATS — clear boxes, distance, and species tags tuned for readable hunts on live servers.'),
  },
  {
    id: 'hwid-when',
    topic: 'products',
    icon: 'faqHwidWhen',
    q: 'When do I need the HWID Spoofer?',
    a: `Use ${hwid} when fresh accounts fail instantly on one PC but work elsewhere—hardware enforcement. Not for account-only EAC cases; see ${ugc} instead.`,
    scopes: ['hwid-spoofer'],
  },
  {
    id: 'ugc-what',
    topic: 'products',
    icon: 'faqUgcWhat',
    q: 'What is UGC?',
    a: `${ugc} is an appeal workspace for account restrictions — structured notes and workflows on the partner product page.`,
    scopes: ['ugc'],
  },
  {
    id: 'skin-changer',
    topic: 'products',
    icon: 'faqSkinChanger',
    q: 'What does Cloud DMA do?',
    a: `${cloudDma} is the partner DMA infrastructure layer—required for full stack functionality per vendor FAQ. Checkout is separate from ${mainCheat}.`,
    scopes: ['cloud-dma'],
  },
  {
    id: 'external-loader',
    topic: 'products',
    icon: 'faqExternalLoader',
    q: 'Is the loader injected into the game folder?',
    a: `The Isle Cheats runs external with cloud config sync—no files injected into the The Isle directory. EAC risk still applies. See ${productsHub}.`,
  },
  {
    id: 'blog-vs-cheats',
    topic: 'blog',
    icon: 'faqBlogVsCheats',
    q: 'Do blog guides replace the product pages?',
    a: `No. Blog posts explain setup and safety; ${mainCheat} and utilities on ${productsHub} are where you start checkout.`,
  },
  {
    id: 'blog-setup',
    topic: 'blog',
    icon: 'faqBlogSetup',
    q: 'Where do blog setup guides point for purchase?',
    a: `Guides link to product pages and ${productsHub}. Checkout runs through our secure partner—never paste loader files from random Discord DMs.`,
  },
  {
    id: 'compare-plans',
    topic: 'plans',
    icon: 'faqComparePlans',
    q: 'Where do I compare plans side by side?',
    a: `The utilities compare page and ${faqPage} collect product and setup answers in one place.`,
  },
  {
    id: 'who-main-cheat',
    topic: 'plans',
    icon: 'faqWhoLite',
    q: 'Who should buy The Isle Cheats?',
    a: `Players who want the vendor-listed ESP suite for The Isle on PC. Add ${cloudDma} when the partner stack requires it.`,
    scopes: ['the-isle-cheats'],
  },
  {
    id: 'who-hwid',
    topic: 'plans',
    icon: 'faqWhoPro',
    q: 'Who needs HWID Spoofer?',
    a: `Anyone recovering from hardware-level enforcement before launching games again—follow the ${hwid} portal guide exactly.`,
    scopes: ['hwid-spoofer'],
  },
  {
    id: 'who-ugc',
    topic: 'plans',
    icon: 'faqWhoElite',
    q: 'Who needs UGC Tools?',
    a: `Users documenting appeals or disputes for account restrictions—not a substitute for ${hwid} on hardware flags.`,
    scopes: ['ugc'],
  },
  {
    id: 'eac-update',
    topic: 'safety',
    icon: 'faqEacUpdate',
    q: 'What should I do after a EAC update?',
    a: a('Check isle-cheats.com status and Discord #status. Do not launch until the banner shows online. Load conservative presets after any patch.'),
  },
  {
    id: 'discord-help',
    topic: 'setup',
    icon: 'faqDiscordHelp',
    q: 'How do I get install help?',
    a: a('Open Discord after purchase with your order email, Windows version and The Isle client build. Staff walk through loader setup live.'),
  },
  {
    id: 'evrima-official-servers',
    topic: 'plans',
    icon: 'faqZoomRanked',
    q: 'Do products work on official Evrima servers?',
    a: `Modules target The Isle on PC with EAC as described on each product page. Use conservative ESP presets and check status after every game patch.`,
  },
  {
    id: 'zoom-hack',
    topic: 'esp',
    icon: 'faqZoomHack',
    q: 'Does The Isle Cheats include stream-proof mode?',
    a: `When the vendor loader offers stream-proof options, test OBS capture locally. Settings live in the operator portal for ${mainCheat}.`,
    scopes: ['the-isle-cheats'],
  },
  {
    id: 'cloud-dma-faq',
    topic: 'products',
    icon: 'faqAutoFarm',
    q: 'Why is Cloud DMA listed separately?',
    a: `${cloudDma} is infrastructure required by the partner stack—not a cosmetic mod. Buy it before expecting every module to load.`,
    scopes: ['cloud-dma'],
  },
  {
    id: 'private-cheats',
    topic: 'safety',
    icon: 'faqPrivateCheats',
    q: 'What are private The Isle cheats?',
    a: a('Private means per-user keys and maintained builds—not public zip packs. The Isle Cheats ships portal delivery for ESP modules listed on the vendor page.'),
  },
  {
    id: 'faq-more',
    topic: 'all',
    icon: 'faqMore',
    q: 'Where is the full FAQ?',
    a: `This site includes landing FAQs and per-page sections. See the ${faqPage} for all product, cheat and blog answers—or read ${blog} for deep guides.`,
  },
];

export function getLandingFaqs(): SiteFaqItem[] {
  return siteFaqs.filter((f) =>
    ['status', 'after-buy', 'ban-risk', 'platforms', 'license-move', 'products-page'].includes(f.id),
  );
}

export function getAllFaqs(): SiteFaqItem[] {
  return siteFaqs.filter((f) => f.topic !== 'all');
}

/** Shared FAQ block copy + filters (home, /faq/, products, blog). */
export const SITE_FAQ_SECTION_COPY = {
  eyebrow: 'All topics',
  title: 'The Isle cheats FAQ',
  subtitle: 'Filter by products, ESP, utilities, setup, and guides.',
} as const;

export const SITE_FAQ_FILTER_TOPICS: FaqTopic[] = [
  'all',
  'plans',
  'esp',
  'scripts',
  'safety',
  'products',
  'blog',
  'setup',
];

/** Section copy when FAQ list is scoped to the current page (not /faq/). */
export const CONTEXTUAL_FAQ_SECTION_COPY = {
  eyebrow: 'Cheat FAQ',
  title: 'The Isle cheats questions',
  subtitle: 'Straight answers on ESP, utilities, bans, and setup — see the full FAQ for every topic.',
} as const;

export function faqFilterTopicsForItems(items: SiteFaqItem[]): FaqTopic[] {
  const present = new Set(items.map((item) => item.topic));
  const topics: FaqTopic[] = ['all'];
  for (const topic of SITE_FAQ_FILTER_TOPICS) {
    if (topic !== 'all' && present.has(topic)) topics.push(topic);
  }
  return topics;
}

export function getProductFaqs(slug: string, kind: 'tier' | 'utility'): SiteFaqItem[] {
  const general = siteFaqs.filter(
    (f) =>
      !f.scopes &&
      ['setup', 'safety', 'plans', 'esp', 'scripts'].includes(f.topic),
  );
  const scoped = siteFaqs.filter((f) => f.scopes?.includes(slug));
  const tierCompare = siteFaqs.filter((f) =>
    ['compare-products', 'compare-plans', 'undetected', 'eac-update'].includes(f.id),
  );

  const combined =
    kind === 'tier'
      ? [...scoped, ...tierCompare, ...general.slice(0, 8)]
      : [...scoped, ...general.slice(0, 6)];

  const seen = new Set<string>();
  return combined.filter((item) => {
    if (seen.has(item.id)) return false;
    seen.add(item.id);
    return true;
  });
}

const blogTopicFaqs: Record<string, SiteFaqItem[]> = {
  Guides: [
    {
      id: 'blog-guide-start',
      topic: 'blog',
      icon: 'faqBlogGuideStart',
      q: 'Do guides replace product checkout?',
      a: a('No. Guides explain workflows; purchase The Isle Cheats and utilities from isle-cheats.com product pages.'),
    },
    {
      id: 'blog-guide-tier',
      topic: 'blog',
      icon: 'faqBlogGuideTier',
      q: 'Which product matches this guide?',
      a: `ESP articles → ${mainCheat}. HWID or EAC articles → ${hwid} or ${ugc}. Infrastructure → ${cloudDma}.`,
    },
    {
      id: 'blog-guide-status',
      topic: 'blog',
      icon: 'faqBlogGuideStatus',
      q: 'Is this guide still valid after a patch?',
      a: a('Check the article date and the live status banner. Patch-day articles note when modules change—Discord #status has the latest build notes.'),
    },
  ],
  Setup: [
    {
      id: 'blog-setup-loader',
      topic: 'blog',
      icon: 'faqBlogSetupLoader',
      q: 'Where do I download the loader?',
      a: a('Only from your operator portal after checkout—not from third-party links in comments or DMs.'),
    },
    {
      id: 'blog-setup-lobby',
      topic: 'blog',
      icon: 'faqBlogSetupLobby',
      q: 'Should I test ESP in a safe session first?',
      a: a('Yes. Load conservative ESP distance and colors in a short test before long survival sessions on live servers.'),
    },
  ],
  Security: [
    {
      id: 'blog-sec-eac',
      topic: 'blog',
      icon: 'faqBlogSecEac',
      q: 'Does this article promise a safe account?',
      a: a('No. A guide cannot promise an account outcome. Check the live status and the disclaimer before you launch.'),
    },
  ],
};

const defaultBlogFaqs: SiteFaqItem[] = [
  {
    id: 'blog-default-1',
    topic: 'blog',
    icon: 'faqBlogDefault1',
    q: 'Are blog guides official product documentation?',
    a: `Articles explain workflows and link to ${mainCheat}, utilities, and ${productsHub}. Feature lists on product pages are authoritative for checkout.`,
  },
  {
    id: 'blog-default-2',
    topic: 'blog',
    icon: 'faqBlogDefault2',
    q: 'Need help applying this guide?',
    a: a('Open Discord with your order email and the article slug. Staff reference the same portal presets mentioned in guides.'),
  },
  {
    id: 'blog-default-3',
    topic: 'blog',
    icon: 'faqBlogDefault3',
    q: 'Will settings in this article work next patch?',
    a: a('Re-check status after every The Isle update. Portal presets update with patch notes—reload configs instead of copying old sliders.'),
  },
];

export function getBlogFaqs(tag: string, slug: string): SiteFaqItem[] {
  const topicFaqs = blogTopicFaqs[tag] ?? [];
  const slugHints: SiteFaqItem[] = [];

  if (slug.includes('esp') || slug.includes('the-isle')) {
    slugHints.push({
      id: 'blog-slug-esp',
      topic: 'esp',
      icon: 'faqBlogSlugEsp',
      q: 'Which product covers ESP from this article?',
      a: `${mainCheat} lists player and dinosaur ESP per the vendor product page.`,
    });
  }
  if (slug.includes('external') || slug.includes('loader')) {
    slugHints.push({
      id: 'blog-slug-loader',
      topic: 'setup',
      icon: 'faqBlogSlugScripts',
      q: 'Where is the loader guide?',
      a: `Follow the external loader article and portal docs for ${mainCheat} after checkout.`,
    });
  }
  if (slug.includes('hwid') || slug.includes('ban') || slug.includes('eac')) {
    slugHints.push({
      id: 'blog-slug-hwid',
      topic: 'products',
      icon: 'faqBlogSlugHwid',
      q: 'Does this article replace HWID or UGC products?',
      a: `Recovery guides complement ${hwid} and ${ugc}—read product pages for workflow scope and realistic outcomes.`,
    });
  }

  return [...slugHints, ...topicFaqs, ...defaultBlogFaqs].slice(0, 8);
}

/** Feature matrix for utilities compare UI (four products, not legacy tiers). */
export const compareRows = [
  { feature: 'Player & dinosaur ESP', icon: 'comparePlayerEsp' as const, 'the-isle-cheats': true, 'hwid-spoofer': false, 'cloud-dma': false, ugc: false },
  { feature: 'Portal loader & presets', icon: 'compareStreamproof' as const, 'the-isle-cheats': true, 'hwid-spoofer': false, 'cloud-dma': false, ugc: false },
  { feature: 'Hardware ID reset workflow', icon: 'compareZoomHack' as const, 'the-isle-cheats': false, 'hwid-spoofer': true, 'cloud-dma': false, ugc: false },
  { feature: 'Partner DMA infrastructure', icon: 'compareSkinChanger' as const, 'the-isle-cheats': false, 'hwid-spoofer': false, 'cloud-dma': true, ugc: false },
  { feature: 'Appeal & dispute tooling', icon: 'compareDevSupport' as const, 'the-isle-cheats': false, 'hwid-spoofer': false, 'cloud-dma': false, ugc: true },
  { feature: 'Patch-day status checks', icon: 'comparePriorityPatch' as const, 'the-isle-cheats': true, 'hwid-spoofer': true, 'cloud-dma': true, ugc: true },
];
