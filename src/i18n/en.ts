import type { Translations } from './types';
import { PRIMARY_CHECKOUT_PATH } from '../config/checkout';
import { DISCORD_URL, PRODUCT_BASE } from '../config/site';
import { BLOG_IMAGE_BY_SLUG } from '../config/siteMedia';

const productBase = PRODUCT_BASE;

export const en: Translations = {
  site: {
    name: 'THE ISLE CHEATS',
    domain: 'isle-cheats.com',
    title: 'THE ISLE CHEAT | PC Survival Tools',
    description:
      'Compare the Isle cheat for PC at isle-cheats.com — ESP, HWID Spoofer, Cloud DMA, and UGC Tools with verified pricing. Independent guide; not affiliated with the game developer.',
    discord: DISCORD_URL,
  },
  nav: [
    { href: `${productBase}`, label: 'Products' },
    { href: '/blog/', label: 'Blog' },
    { href: '/forum/', label: 'Forum' },
    { href: '/faq/', label: 'FAQ' },
    { href: '/support/', label: 'Support' },
  ],
  hero: {
    status: 'The Isle — check status',
    eyebrow: 'THE ISLE CHEATS',
    titleLine1: 'THE ISLE CHEATS',
    titleLine2: 'Player & dinosaur ESP for EVRIMA',
    subtitle:
      'Four Isle products on one catalog — main ESP suite, hardware utility, Cloud DMA, and UGC tools. Each name links to its product page.',
    ctaPrimary: 'Buy The Isle Cheats',
    ctaDiscord: 'Join Discord',
    modesLabel: 'Focus',
    modes: ['Evrima', 'Player ESP', 'Dinosaur ESP', 'Survival'],
    metrics: [
      { label: 'Stream-safe', strong: 'Yes' },
      { label: 'Patch speed', strong: '<24h' },
      { label: 'Users', strong: '300+' },
      { label: 'Support', strong: '24/7' },
    ],
  },
  features: {
    eyebrow: 'Cheat features',
    title: 'The Isle cheat modules',
    subtitle:
      'Player ESP, dinosaur ESP, and survival awareness — modules aligned with the vendor The Isle product page (Evrima / EAC).',
    items: [
      {
        title: 'Player ESP',
        subtitle: 'See survivors on the map',
        desc: 'Highlight other players with boxes, distance, and name tags so you can avoid ambushes or plan hunts.',
        bullets: [
          'Player boxes and distance readouts',
          'Custom ESP colors',
          'Team / threat filtering where supported',
        ],
        tags: ['The Isle ESP', 'player ESP', 'survival'],
        bento: 'sm:col-span-2 lg:col-span-12 lg:col-start-1 lg:row-start-1',
      },
      {
        title: 'Dinosaur & animal ESP',
        subtitle: 'Track threats and prey',
        desc: 'Spot dinosaurs, NPCs, and wildlife through terrain — species and growth info when exposed by the loader.',
        bullets: [
          'Animal and NPC ESP',
          'Species and growth labels',
          'Distance and direction cues',
        ],
        tags: ['dinosaur ESP', 'animal ESP', 'The Isle cheats'],
        bento: 'sm:col-span-2 lg:col-span-8 lg:col-start-1 lg:row-start-2',
      },
      {
        title: 'Visual overlays',
        subtitle: 'Readable in dense foliage',
        desc: 'Tune line thickness, opacity, and max render distance for Evrima maps and night cycles.',
        bullets: ['Max ESP distance sliders', 'Color profiles per species', 'Stream-friendly overlay modes'],
        tags: ['wallhack', 'ESP settings', 'Evrima'],
        bento: 'sm:col-span-2 lg:col-span-4 lg:col-start-9 lg:row-start-2',
      },
      {
        title: 'Cloud DMA',
        subtitle: 'Required infrastructure',
        desc: 'Vendor stack expects Cloud DMA for full functionality — one-time lifetime access per partner FAQ.',
        bullets: ['DMA hardware layer', 'Firmware updates via vendor', 'Separate product checkout'],
        tags: ['cloud DMA', 'isle-cheats', 'lifetime'],
        bento: 'sm:col-span-2 lg:col-span-6 lg:col-start-1 lg:row-start-3',
      },
      {
        title: 'HWID Spoofer',
        subtitle: 'Hardware recovery utility',
        desc: 'Separate hardware utility — pairs with the main suite when you need a fresh PC path.',
        bullets: ['Sold separately', 'Lifetime partner checkout', 'Listed on its own product page'],
        tags: ['HWID spoofer', 'EAC', 'utility'],
        bento: 'sm:col-span-2 lg:col-span-6 lg:col-start-7 lg:row-start-3',
      },
      {
        title: 'UGC Tools',
        subtitle: 'Appeals & disputes',
        desc: 'Structured appeal and dispute workflows for account restrictions (vendor game-accounts product).',
        bullets: ['Appeal templates', 'Case documentation', 'Status tracking'],
        tags: ['UGC tools', 'appeals', 'account'],
        bento:
          'sm:col-span-2 lg:col-span-8 lg:row-span-2 lg:col-start-1 lg:row-start-4',
      },
      {
        title: 'Stream Proof',
        subtitle: 'Hide overlays on stream',
        desc: 'Keep ESP on your monitor while OBS or Game Bar records a clean feed.',
        bullets: ['OBS-safe capture modes', 'Per-module toggles', 'Portal setup notes'],
        tags: ['stream proof', 'OBS safe', 'overlay'],
        bento:
          'sm:col-span-2 lg:col-span-4 lg:row-span-2 lg:col-start-9 lg:row-start-4',
      },
      {
        title: 'Cloud config & EAC updates',
        subtitle: 'After every patch',
        desc: 'After a game update, read the product status before you assume the same labels still apply.',
        bullets: ['Name the card you bought', 'Read status before paying again', 'Discord for status notes'],
        tags: ['cloud sync', 'EAC updates', 'patch day'],
        bento: 'sm:col-span-2 lg:col-span-6 lg:col-start-1 lg:row-start-6',
      },
      {
        title: 'Evrima focus',
        subtitle: 'PC survival servers',
        desc: 'Built for The Isle on Windows PC — confirm branch compatibility on the product page before you buy.',
        bullets: ['Evrima-focused vendor notes', 'Conservative defaults after patches', 'Status check before launch'],
        tags: ['Evrima', 'The Isle PC', 'buy The Isle cheats'],
        bento: 'sm:col-span-2 lg:col-span-6 lg:col-start-7 lg:row-start-6',
      },
    ],
  },
  whyUs: {
    eyebrow: 'Why our cheats',
    title: 'The Isle cheats that stay online',
    subtitle:
      'Verified partner checkout, patch-day guides, and 24/7 Discord — built for players who want The Isle cheats that stay online.',
    usLabel: 'The Isle Cheats',
    otherLabel: 'Typical shop',
    rows: [
      {
        title: 'Loader updates after patches',
        desc: 'New builds usually go out within hours of a The Isle or EAC update. Check Discord #status before you queue.',
      },
      {
        title: 'Conservative ESP defaults',
        desc: 'Vendor presets emphasize readable ESP distances and colors before you push sliders on live servers.',
      },
      {
        title: 'Discord support',
        desc: 'People on Discord help with loader setup, weapon configs and HWID resets. Coverage is 24/7.',
      },
      {
        title: 'External loader + stream proof',
        desc: 'External loader with OBS-safe mode so overlays stay off your stream.',
      },
      {
        title: 'Cloud configs',
        desc: 'Save ESP and overlay settings and load them on another PC through the operator portal.',
      },
      {
        title: 'HWID resets',
        desc: 'Hardware resets and license moves go through Discord. Most shops lock you to one PC.',
      },
    ],
    metrics: [
      {
        value: '<24h',
        title: 'Patch turnaround',
        desc: 'Usual time to ship a loader after a big The Isle or EAC update.',
      },
      {
        value: '24/7',
        title: 'Support',
        desc: 'Discord help for setup, configs and account issues.',
      },
      {
        value: '300+',
        title: 'Users',
        desc: 'PC players using ESP and utilities on isle-cheats.com.',
      },
    ],
  },
  setup: {
    eyebrow: 'Setup',
    titleLead: 'Buy cheats. Play in',
    titleHighlight: 'three steps',
    intro:
      'Pick your product, hit Buy on the partner checkout, and load ESP on EVRIMA. Discord is there if you want help choosing.',
    ctaPrimary: 'Buy cheats',
    ctaSecondary: 'Setup FAQ',
    ctaPrimaryHref: productBase,
    ctaSecondaryHref: '/faq/',
    steps: [
      {
        step: 'Step 1',
        title: 'Open the product page',
        desc: 'Open the product you want and use the Buy button on that page.',
      },
      {
        step: 'Step 2',
        title: 'Read the listing',
        desc: 'Check the feature list and the terms note before you pay on the partner page.',
      },
      {
        step: 'Step 3',
        title: 'Check status',
        desc: 'Look at the status note on this site after a game update, then decide whether to launch.',
      },
    ],
  },
  compatibility: {
    eyebrow: 'Platform',
    title: 'Windows PC',
    subtitle: 'Check the status banner after The Isle updates before you launch.',
    items: ['Windows 10 & 11', 'Steam / game launcher', 'The Isle (Evrima)', 'Auto updater', 'Config cloud sync', 'Discord support', 'HWID reset', 'External loader'],
  },
  cheats: {
    eyebrow: 'Primary product',
    title: 'The Isle Cheats',
    subtitle: 'Main PC enhancement suite — player ESP, dinosaur ESP, and modules listed on the vendor product page.',
    viewAll: 'View product details',
    explore: 'Explore',
    items: [
      {
        badge: 'Popular',
        tier: 'PC',
        name: 'The Isle',
        title: 'The Isle Cheats',
        desc: 'Buy The Isle cheats with player ESP, NPC and animal ESP, visual options, and combat utilities per vendor documentation. Cloud DMA required for full functionality.',
        features: ['Player ESP', 'Animal ESP', 'NPC ESP', 'Species & growth', 'Distance tags', 'Custom ESP colors'],
        more: 24,
        href: `${productBase}the-isle-cheats/`,
        variant: 'popular',
      },
    ],
  },
  products: {
    eyebrow: 'Shop',
    title: 'Buy The Isle cheats & utilities',
    subtitle:
      'Four PC products for the Isle cheat stack — main ESP suite, HWID Spoofer, Cloud DMA, and UGC Tools. Each listing links to its own checkout.',
    hubSections: [
      {
        heading: 'Buy: What you can buy',
        paragraphs: [
          'The main The Isle Cheats package covers player ESP, dinosaur ESP, and visual overlays tuned for Evrima on Windows. Utilities sit alongside it: HWID Spoofer for hardware ban recovery, Cloud DMA as required infrastructure on the vendor FAQ, and UGC Tools for appeal workflows.',
          'Every card below opens a detail page with feature lists, system requirements, and a Buy button that routes through our secure checkout redirect. Prices are copied from the partner store when we verify them — see each product page for the latest numbers.',
        ],
      },
      {
        heading: 'Before checkout',
        paragraphs: [
          'Read the FAQ for Cloud DMA requirements and ban risk. After a The Isle or Easy Anti-Cheat patch, check the homepage status banner and Discord #status before launching. Need help choosing? Visit Support or browse setup threads on the Forum.',
        ],
      },
    ],
    viewAll: 'View all products',
    get: 'Buy',
    explore: 'Explore',
    items: [
      {
        badge: 'Available',
        category: 'System utility',
        title: 'HWID Spoofer',
        subtitle: 'Hardware ban recovery',
        desc: 'Separate PC hardware utility with lifetime partner checkout.',
        features: ['Sold separately', 'Hardware recovery path', 'Partner checkout', 'Listed on its own product page'],
        more: 6,
        href: `${productBase}hwid-spoofer/`,
      },
      {
        badge: 'Required',
        category: 'Infrastructure',
        title: 'Cloud DMA',
        subtitle: 'Lifetime access',
        desc: 'Mandatory Cloud DMA layer for the vendor cheat ecosystem—one-time lifetime purchase per vendor FAQ.',
        features: ['DMA hardware access', 'Lifetime license', 'Firmware updates', 'Vendor support'],
        more: 3,
        href: `${productBase}cloud-dma/`,
      },
      {
        badge: 'Available',
        category: 'Account tools',
        title: 'UGC Tools',
        subtitle: 'Appeals & disputes',
        desc: 'UGC Tools for custom appeal workflows and dispute automation (vendor game-accounts destination).',
        features: ['Appeal workflows', 'Dispute automation', 'Case documentation', 'Status tracking'],
        more: 2,
        href: `${productBase}ugc/`,
      },
    ],
  },
  blog: {
    eyebrow: 'Guides',
    title: 'The Isle cheats guides',
    subtitle: 'ESP setup, Evrima notes, compatibility questions, and EAC patch-day checks.',
    latestTitle: 'Guides: ESP, Evrima & patch-day tips',
    latestSubtitle: 'Filter by topic or sort to find ESP, Evrima, and patch-day guides.',
    filterAll: 'All articles',
    sortLabel: 'Sort by',
    sortNewest: 'Newest first',
    sortOldest: 'Oldest first',
    sortShortRead: 'Shortest read',
    sortLongRead: 'Longest read',
    emptyFilter: 'No articles match this filter.',
    viewAll: 'View all articles',
    read: 'Read',
    items: [
      {
        tag: 'Features',
        title: 'The Isle cheats features: ESP, dinosaurs, and utilities',
        slug: 'the-isle-cheats-features-guide',
        image: BLOG_IMAGE_BY_SLUG['the-isle-cheats-features-guide'],
        desc: 'What the vendor lists for The Isle — player ESP, animal ESP, Cloud DMA requirement, and checkout flow.',
        date: 'Aug 18, 2026',
        readTime: '12 min read',
      },
      {
        tag: 'Setup',
        title: 'The Isle ESP setup for Evrima',
        slug: 'the-isle-esp-setup',
        image: BLOG_IMAGE_BY_SLUG['the-isle-esp-setup'],
        desc: 'Distance caps, colors, and readability tips for player and dinosaur ESP on live servers.',
        date: 'Aug 15, 2026',
        readTime: '5 min read',
      },
      {
        tag: 'Updates',
        title: 'EAC patch day checklist for The Isle cheats',
        slug: 'eac-patch-day-checklist',
        image: BLOG_IMAGE_BY_SLUG['eac-patch-day-checklist'],
        desc: 'Status banner, loader reload, and conservative profiles after every The Isle or EAC update.',
        date: 'Aug 13, 2026',
        readTime: '5 min read',
      },
      {
        tag: 'Guides',
        title: 'How to buy The Isle cheats in 2026',
        slug: 'how-to-buy-the-isle-cheats-2026',
        image: BLOG_IMAGE_BY_SLUG['how-to-buy-the-isle-cheats-2026'],
        desc: 'Step-by-step purchase walkthrough for The Isle Cheats and utilities via secure checkout.',
        date: 'Aug 12, 2026',
        readTime: '5 min read',
      },
      {
        tag: 'Guides',
        title: 'HWID Spoofer vs new account after EAC ban',
        slug: 'the-isle-hwid-spoofer-guide',
        image: BLOG_IMAGE_BY_SLUG['the-isle-hwid-spoofer-guide'],
        desc: 'When to spoof hardware, when to start fresh, and how utilities on isle-cheats.com fit each path.',
        date: 'Aug 13, 2026',
        readTime: '7 min read',
      },
      {
        tag: 'Troubleshooting',
        title: 'EAC unable to verify The Isle — fixes',
        slug: 'eac-verify-the-isle-guide',
        image: BLOG_IMAGE_BY_SLUG['eac-verify-the-isle-guide'],
        desc: 'File integrity, cold reboots, and when to use UGC appeal workflows after EAC errors.',
        date: 'Aug 11, 2026',
        readTime: '6 min read',
      },
      {
        tag: 'Guides',
        title: 'External The Isle cheat guide',
        slug: 'the-isle-external-loader-guide',
        image: BLOG_IMAGE_BY_SLUG['the-isle-external-loader-guide'],
        desc: 'How external loaders work on PC and why maintained software beats free paste tools.',
        date: 'Aug 11, 2026',
        readTime: '7 min read',
      },
    ],
  },
  toolkit: {
    eyebrow: 'Cheat menu',
    title: 'The Isle cheat menu, organized',
    subtitle: 'ESP and overlay modules grouped so you can tune survival awareness without clutter.',
    items: [
      { num: '01', label: 'Player ESP', title: 'See other survivors', desc: 'Boxes, distance, and name tags for players on Evrima servers.' },
      { num: '02', label: 'Dino ESP', title: 'Track predators and prey', desc: 'Animal and NPC markers with species and growth where supported.' },
      { num: '03', label: 'Visuals', title: 'Readable overlays', desc: 'Colors, line thickness, and max distance tuned for dense foliage.' },
      { num: '04', label: 'Cloud DMA', title: 'Required stack layer', desc: 'Partner infrastructure product — lifetime checkout separate from main suite.' },
      { num: '05', label: 'Utilities', title: 'HWID & UGC', desc: 'Spoofer and appeal tools with their own product pages.' },
      { num: '06', label: 'Profiles', title: 'Cloud configs', desc: 'Save ESP presets and reload after patches from the operator portal.' },
    ],
  },
  workflow: {
    eyebrow: 'How it works',
    badge: '4 steps',
    titleBefore: 'From buy to',
    titleHighlight: 'in-game cheats.',
    subtitle: 'Pick a product, checkout on the partner page, and load ESP on EVRIMA.',
    ctaLabel: 'Buy cheats',
    ctaHref: productBase,
    ctaSecondary: 'Setup FAQ',
    ctaSecondaryHref: '/faq/',
    items: [
      {
        num: '01',
        phase: 'Before purchase',
        title: 'Check status',
        desc: 'Read the live banner on isle-cheats.com before you buy or launch.',
      },
      {
        num: '02',
        phase: 'Checkout',
        title: 'Pick a product',
        desc: 'Choose The Isle Cheats or a utility (HWID, Cloud DMA, UGC) on the product hub.',
      },
      {
        num: '03',
        phase: 'Loader',
        title: 'Launch and set up',
        desc: 'Download from the portal, load a safe preset, and test ESP in a short private session.',
      },
      {
        num: '04',
        phase: 'In-game',
        title: 'Save your config',
        desc: 'When overlays feel readable, save your ESP preset to the cloud for next session.',
      },
    ],
  },
  fieldNotes: {
    eyebrow: 'Notes',
    title: 'Quick tips',
    items: [
      { num: '01', title: 'After patches', desc: 'Check Discord and the portal status before live servers after a The Isle update.' },
      { num: '02', title: 'Start slow', desc: 'Use default ESP distance and colors first, then raise them only if you need to.' },
      { num: '03', title: 'Discord help', desc: 'Stuck on the loader or configs? Ask in Discord and someone will walk you through it.' },
    ],
  },
  support: {
    eyebrow: 'Support',
    title: 'The Isle cheat support',
    subtitle: 'Loader, HWID, checkout redirects, and account help for isle-cheats.com customers.',
    introParagraphs: [
      'This page is the fastest path to answers when something breaks between checkout and your first safe launch in The Isle. We are an independent listing site — billing and license delivery happen on the partner portal linked from each product page.',
      'Start with the FAQ if you are still deciding what to buy. Open a forum thread for setup walkthroughs that other players can search later. Join Discord for live status during patch days or when Easy Anti-Cheat updates ship.',
    ],
    helpSections: [
      {
        heading: 'Support: The Isle Cheats',
        paragraphs: [
          'After you buy the Isle cheat or a utility, you should receive portal access from the vendor checkout flow. If a redirect fails, note the exact URL and try again in a private window without ad blockers blocking payment scripts.',
          'Keep your order email handy. Support agents match licenses to that address before they reset HWID bindings or resend loader links.',
        ],
      },
      {
        heading: 'Loader and HWID issues',
        paragraphs: [
          'If a product page will not open, write down the error text and contact support. This site does not publish hardware or injection steps.',
          'For HWID Spoofer questions, read the product page limitations: account-only bans are not fixed by spoofing alone. Pair utilities with the main The Isle Cheats guide on the blog when you are returning from a ban.',
        ],
      },
      {
        heading: 'Where to go next',
        paragraphs: [
          'Product details and verified pricing live under Products. Patch-day checks and ESP configuration tips are on the Blog. Pre-purchase questions about Cloud DMA or ban risk are answered on the FAQ.',
        ],
      },
    ],
    channels: [
      {
        icon: 'users',
        title: 'Before you buy',
        desc: 'Ask about The Isle Cheats and utilities before checkout.',
        linkLabel: 'Start checkout',
        href: PRIMARY_CHECKOUT_PATH,
      },
      {
        icon: 'messageCircle',
        title: 'Community forum',
        desc: 'Loader tips, HWID questions, and setup threads from the community.',
        linkLabel: 'Open forum',
        href: '/forum/',
      },
      {
        icon: 'navFaq',
        title: 'FAQ',
        desc: 'Compatibility, bans and setup answers.',
        linkLabel: 'View FAQ',
        href: '/faq/',
      },
      {
        icon: 'clock',
        title: 'Discord',
        desc: 'Live help on ZADEYO — setup, status, and patch-day updates.',
        linkLabel: 'Join Discord',
        href: 'https://discord.com/invite/wmFY3xVtwm',
      },
    ],
    ticketTitle: 'Include in your ticket',
    ticketItems: [
      { title: 'Order email', desc: 'The email you used at checkout on isle-cheats.com.' },
      { title: 'Platform', desc: 'Windows 10 or 11 and your The Isle client version (Evrima).' },
      { title: 'Error detail', desc: 'Screenshot or exact text from the loader or game launcher.' },
    ],
  },
  faq: {
    eyebrow: 'FAQ',
    title: 'The Isle cheats FAQ',
    subtitle: 'Compatibility, bans, products, and setup — straight answers before you buy.',
    items: [
      {
        num: '01',
        q: 'Where do I check if The Isle cheats are online?',
        a: 'The live status banner is on isle-cheats.com and in the Discord #status channel. Always check after a The Isle or EAC update.',
      },
      {
        num: '02',
        q: 'What happens after I buy?',
        a: 'Your portal unlocks the loader, setup guide and config library via our secure checkout. Follow the guide before launching The Isle.',
      },
      {
        num: '03',
        q: 'Can I get banned using third-party The Isle cheats?',
        a: 'Yes—any modification carries risk. EAC and report systems evolve. Read current status and accept the risk before use.',
      },
      {
        num: '04',
        q: 'Which platforms are supported?',
        a: 'The Isle on Windows 10/11 64-bit only (Steam / supported launcher). macOS and Linux are not supported.',
      },
      {
        num: '05',
        q: 'Can I move my license to a new PC?',
        a: 'Yes—use the HWID reset in your portal or open a Discord ticket. Limits depend on your tier.',
      },
      {
        num: '06',
        q: 'Where are products and utilities listed?',
        a: 'The Isle Cheats, HWID Spoofer, UGC, and Cloud DMA live at isle-cheats.com/products/the-isle-cheats with feature lists and checkout via our partner.',
      },
    ],
  },
  footer: {
    tagline: 'The Isle cheats for PC: ESP, survival tools, and utilities.',
    explore: 'Explore',
    exploreLinks: [
      { href: '/', label: 'Feature overview', ariaLabel: 'Features', scrollTarget: 'features' },
      { href: '/products/the-isle-cheats/', label: 'The Isle Cheats', ariaLabel: 'The Isle Cheats' },
      { href: '/products/', label: 'All products & utilities', ariaLabel: 'Products' },
      { href: '/blog/', label: 'Read patch guides', ariaLabel: 'Blog' },
      { href: '/faq/', label: 'Pre-purchase FAQ', ariaLabel: 'FAQ' },
    ],
    support: 'Support',
    legal: 'Legal',
    privacy: 'Privacy Policy',
    terms: 'Terms & Conditions',
    about: 'About',
  },
  legalPages: {
    about: {
      title: 'About isle-cheats.com',
      description:
        'Learn who runs isle-cheats.com, how we list PC products, and how we keep pricing and setup guides accurate.',
      sections: [
        {
          heading: 'Com: The Isle Cheats',
          paragraphs: [
            'isle-cheats.com is an independent PC site focused on The Isle — not the official game website, not the publisher, and not affiliated with the developers of The Isle or Easy Anti-Cheat.',
            'We publish product summaries, verified pricing notes, setup guides, and community discussion threads so players can compare the Isle cheat options and utilities before checkout.',
            'Game names, logos, and screenshots appear only to describe compatibility and features. Trademarks belong to their respective owners.',
          ],
        },
        {
          heading: 'What we list',
          paragraphs: [
            'Our catalog covers four partner products: the main The Isle Cheats ESP suite, HWID Spoofer, Cloud DMA, and UGC Tools. Each has its own detail page, feature list, and checkout redirect.',
            'We do not host the loader or process card payments on isle-cheats.com. Checkout completes on the vendor portal; we link to it with clear labels on every Buy button.',
            'When the vendor changes prices or requirements — for example Cloud DMA lifetime access — we update product copy and the FAQ after verification.',
          ],
        },
        {
          heading: 'How we write guides',
          paragraphs: [
            'Blog posts focus on practical topics: ESP configuration, Evrima branch checks, patch-day status, and HWID recovery workflows. Forum threads summarize those guides for searchable Q&A.',
            'We avoid invented rankings or fake player counts. Status banners and Discord #status reflect what we can confirm from the vendor at the time of publishing.',
          ],
        },
        {
          heading: 'Editorial and affiliate disclosure',
          paragraphs: [
            'Some outbound checkout links are affiliate URLs. That helps fund hosting and guide updates; it does not change the price you pay on the vendor store.',
            'If you find an outdated price or broken redirect, use Support or the Forum so we can fix the listing quickly.',
          ],
        },
        {
          heading: 'Support channels',
          paragraphs: [
            'Use the Support page for loader and checkout questions, the Forum for community threads, and Discord for live patch-day help. Include your order email, Windows version, and The Isle client branch when asking for HWID or license resets.',
          ],
        },
      ],
    },
    privacy: {
      title: 'Privacy Policy | The Isle cheat shop',
      description:
        'How isle-cheats.com handles analytics, cookies, and messages when you browse the Isle cheat listings.',
      sections: [
        {
          heading: 'Privacy: The Isle Cheats',
          paragraphs: [
            'This policy explains what isle-cheats.com collects when you read about the Isle cheat products, open guides, or contact us for support. It does not govern the partner checkout site where you complete purchases.',
            'By using this site you agree to this policy and our Terms & Conditions.',
          ],
        },
        {
          heading: 'Information we collect',
          paragraphs: [
            'We may collect basic analytics such as page views, referral source, device type, browser, and approximate region through Google Analytics when enabled.',
            'We do not store payment card numbers, billing addresses, or license keys on isle-cheats.com. Those are handled by the vendor checkout flow.',
            'If you contact us through Discord or forum posts, we see only the information you choose to share publicly or in tickets.',
          ],
        },
        {
          heading: 'How we use data',
          paragraphs: [
            'Analytics help us see which product pages and guides are useful so we can fix broken links, improve headings, and prioritize patch-day updates.',
            'Support messages are used solely to answer your question and are not sold to third parties.',
          ],
        },
        {
          heading: 'Cookies and similar technologies',
          paragraphs: [
            'We use analytics cookies when Google Analytics is active. You can block or delete cookies in your browser; core pages remain readable without them.',
            'Theme preference (light or dark mode) may be stored locally in your browser and is not used for advertising profiles.',
          ],
        },
        {
          heading: 'Third-party services',
          paragraphs: [
            'Checkout redirects send you to external domains operated by our payment partner. Those sites have their own privacy policies.',
            'Discord links open discord.com; their terms apply when you join a server for the Isle cheat community support.',
          ],
        },
        {
          heading: 'Retention and security',
          paragraphs: [
            'Analytics data is retained according to Google Analytics settings configured for this property. We do not maintain a separate customer database on isle-cheats.com.',
            'We use HTTPS across the public site and keep software dependencies updated, but no internet transmission is perfectly secure.',
          ],
        },
        {
          heading: 'Your choices',
          paragraphs: [
            'You can disable analytics cookies, stop using the site, or request clarification about what we store by contacting us through the Support page.',
            'Purchase and refund rules for the Isle cheat products are described in Terms & Conditions.',
          ],
        },
        {
          heading: 'Children',
          paragraphs: [
            'This site is intended for adults purchasing PC software. We do not knowingly collect personal information from children under 13.',
          ],
        },
        {
          heading: 'Changes',
          paragraphs: [
            'We may update this policy when our analytics stack or contact channels change. The “Last updated” note on legal pages will reflect material edits.',
          ],
        },
      ],
    },
    terms: {
      title: 'Terms for The Isle Cheats | License & Refunds',
      description:
        'Terms for buying The Isle cheats on isle-cheats.com — license use, delivery, refunds and account risk.',
      sections: [
        {
          heading: 'Terms: The Isle Cheats',
          paragraphs: [
            'Last updated: September 2026. By using isle-cheats.com or buying a product listed here, you agree to these Terms & Conditions and our Privacy Policy.',
          ],
        },
        {
          heading: 'What you purchase',
          paragraphs: [
            'We link to partner checkout for The Isle Cheats and utilities (HWID Spoofer, UGC Tools, Cloud DMA) through a portal and Windows loader.',
            'Product pages list what is included when you buy. Features can change when The Isle or Easy Anti-Cheat updates.',
          ],
        },
        {
          heading: 'Checkout and delivery',
          paragraphs: [
            'Payment and license delivery run on external checkout pages. isle-cheats.com does not process or store payment card numbers.',
            'After purchase, use the operator portal linked from your order flow to download the current loader and setup guide before launching The Isle.',
          ],
        },
        {
          heading: 'License use',
          paragraphs: [
            'Licenses are for your personal use only. Do not share loader files, portal logins, or license keys. HWID and device limits depend on your tier and are enforced in the portal.',
          ],
        },
        {
          heading: 'Refunds and purchases',
          paragraphs: [
            'All sales are final once checkout completes. We do not refund change-of-mind purchases, account bans, EAC penalties, or issues caused by ignoring setup guides or running modules while the status banner shows offline.',
            'If the product does not work as described on a supported setup—The Isle on Windows 10/11, current loader from the portal, and the live status banner showing online when you started—contact us through the Support page. Include your order email, Windows version, The Isle build, and screenshots or exact error text from the loader.',
            'We may, at our discretion, offer a fix, replacement access, or partial/full refund when we confirm a fault on our side. We are not obligated to approve every request.',
          ],
        },
        {
          heading: 'Availability and risk',
          paragraphs: [
            'Third-party tools for The Isle can conflict with game updates and anti-cheat systems. You use this software at your own risk, including possible account action.',
            'Check the homepage status banner before every session. Do not queue ranked while modules are offline or misaligned after a patch.',
          ],
        },
        {
          heading: 'Changes',
          paragraphs: [
            'We may update these terms. The “Last updated” date at the top will change when we do. Continued use of the site after changes means you accept the revised terms.',
          ],
        },
        {
          heading: 'Support',
          paragraphs: [
            'For terms, billing, or loader questions, use the buttons on the Support page. See also our Privacy Policy for how we handle site data.',
          ],
        },
      ],
    },
    support: {
      title: 'The Isle Cheat Support | Loader, HWID & Checkout',
      description:
        'The Isle cheat support for loader setup, HWID spoofing, checkout redirects, and product help at isle-cheats.com.',
    },
  },
  ui: {
    skipLink: 'Skip to main content',
    browseCheats: 'Try Now',
    browseCheatsMobile: 'Start checkout',
    homeAria: 'The Isle Cheats home',
    checkoutAria: 'Start checkout',
    discordAria: 'Join The Isle Cheats on Discord',
    menuOpen: 'Open menu',
    menuClose: 'Close menu',
    themeLight: 'Switch to light mode',
    themeDark: 'Switch to dark mode',
    buyPromptEyebrow: 'Ready to play',
    buyPromptTitle: 'Get THE ISLE CHEATS now',
    buyPromptDesc:
      'Player ESP, dinosaur ESP, and survival overlays for EVRIMA — secure partner checkout, pricing verified on our product page.',
    buyPromptLine: 'THE ISLE CHEATS — EVRIMA ESP',
    buyPromptSlogans: [
      "Don't let the island drop you blind — see players and predators first.",
      'Survival is sight. Read the map before anyone reads you.',
      'See the hunt before it sees you — EVRIMA ESP built for The Isle.',
      'Stay on top of every ambush: player ESP and dinosaur ESP in one suite.',
    ],
    buyPromptKicker: 'THE ISLE CHEATS',
    buyPromptSub: 'Player & dinosaur ESP · verified partner checkout',
    buyPromptAria: 'Special offer for THE ISLE CHEATS',
    buyPromptCta: 'Get the cheat',
    buyPromptSecondary: 'Compare all four products',
    buyPromptClose: 'Hide offer',
    buyPromptTab: 'Get ESP',
  },
};
