export interface ForumComment {
  author: string;
  age: string;
  score: number;
  body: string;
  replies?: ForumComment[];
}

import { CONTENT_IMAGES } from '../config/site';

export interface ForumPost {
  slug: string;
  category: string;
  categoryTone: 'purple' | 'blue' | 'green' | 'orange';
  title: string;
  excerpt: string;
  author: string;
  age: string;
  commentsCount: number;
  upvotes: number;
  flair?: string;
  body: string[];
  comments: ForumComment[];
  sourceTitle?: string;
  sourcePath?: string;
  /** Shown on the thread page only when set — feed stays text-first. */
  detailImage?: string;
  detailImageAlt?: string;
}

export const forumCategories = [
  { name: 'General', tone: 'purple', icon: 'users' },
  { name: 'Guides & Builds', tone: 'blue', icon: 'navBlog' },
  { name: 'Patch Talk', tone: 'orange', icon: 'refresh' },
  { name: 'Community', tone: 'green', icon: 'messageCircle' },
] as const;

export function totalForumComments(comments: ForumComment[]): number {
  return comments.reduce((total, comment) => total + 1 + (comment.replies?.length ?? 0), 0);
}

function withCommentCounts(post: Omit<ForumPost, 'commentsCount'>): ForumPost {
  return { ...post, commentsCount: totalForumComments(post.comments) };
}

const [visualsMenu, worldMenu, aimMenu, , miscMenu] = CONTENT_IMAGES;

const rawForumPosts: Omit<ForumPost, 'commentsCount'>[] = [
  {
    slug: 'what-does-the-isle-esp-include',
    category: 'Guides & Builds',
    categoryTone: 'blue',
    title: 'What does The Isle ESP actually show on EVRIMA?',
    excerpt:
      'Trying to figure out if the main suite covers dino ESP or if I need Cloud DMA too. What are you all running?',
    author: 'MossRipper',
    age: '3 days ago',
    upvotes: 64,
    flair: 'Question',
    detailImage: visualsMenu,
    detailImageAlt: 'Visuals tab with player and dinosaur ESP toggles',
    sourceTitle: 'THE ISLE CHEATS feature list for EVRIMA',
    sourcePath: '/blog/the-isle-cheats-features-guide/',
    body: [
      'New to the game and EVRIMA feels brutal without info. I keep seeing [THE ISLE CHEATS](/products/the-isle-cheats/) mentioned for player ESP, dino labels, nests, and growth — but the catalog also lists [Cloud DMA](/products/cloud-dma/) as its own card.',
      'For those who bought already: does the main package cover everything you need for awareness, or did you add Cloud DMA for the full menu? Not asking for launch steps — just what the purchase actually includes.',
    ],
    comments: [
      {
        author: 'RexMainEVRIMA',
        age: '3 days ago',
        score: 41,
        body: 'Main card is player + dino ESP, distance, growth readouts, world markers — that is what most of us run daily. Cloud DMA is only if the partner page says your setup needs it for the full external suite.',
        replies: [
          {
            author: 'MossRipper',
            age: '3 days ago',
            score: 8,
            body: 'That helps. I will read the features guide first then grab the main card.',
          },
        ],
      },
      {
        author: 'NestCamper',
        age: '2 days ago',
        score: 22,
        body: 'The [features guide](/blog/the-isle-cheats-features-guide/) breaks down each toggle group. I turned on player names first, then dino species — way easier to read than enabling everything at once.',
      },
      {
        author: 'islemods_staff',
        age: '2 days ago',
        score: 15,
        body: 'Official note: four separate products on isle-cheats.com — match the job to the card before checkout. Vision tools live on THE ISLE CHEATS; utilities are HWID, Cloud DMA, and UGC.',
      },
    ],
  },
  {
    slug: 'how-to-set-up-the-isle-esp',
    category: 'Guides & Builds',
    categoryTone: 'blue',
    title: 'First-time ESP setup — what order do you enable things?',
    excerpt:
      'Overlay looks like a Christmas tree when I enable everything. How do you keep it readable on a 1080p screen?',
    author: 'CeratoFresh',
    age: '5 days ago',
    upvotes: 52,
    flair: 'Tips',
    detailImage: worldMenu,
    detailImageAlt: 'World and radar ESP options in the menu',
    sourceTitle: 'How to read The Isle ESP without clutter',
    sourcePath: '/blog/the-isle-esp-setup/',
    body: [
      'Just picked up [THE ISLE CHEATS](/products/the-isle-cheats/) and the first session I enabled every label. Could not see the river I was drinking from.',
      'What is your minimal setup for hunting without covering the whole screen? Colors, distance filter, anything — share configs ideas, not keys.',
    ],
    comments: [
      {
        author: 'TrikeTank',
        age: '5 days ago',
        score: 36,
        body: 'Player names + dino species only at first. Add distance after you are comfortable. The [ESP setup article](/blog/the-isle-esp-setup/) walks through the same order.',
      },
      {
        author: 'CeratoFresh',
        age: '4 days ago',
        score: 11,
        body: 'Did player then dino — huge difference. Saved a profile in misc so I do not redo it every launch.',
        replies: [
          {
            author: 'UtahScout',
            age: '4 days ago',
            score: 6,
            body: 'Profiles are underrated. I have one for herb pathing and one for ambush nights.',
          },
        ],
      },
      {
        author: 'GlowLine',
        age: '3 days ago',
        score: 19,
        body: 'Drop snaplines until you know you want them. Box ESP is enough for me at mid range on EVRIMA.',
      },
    ],
  },
  {
    slug: 'what-to-do-if-eac-cannot-verify-isle',
    category: 'Patch Talk',
    categoryTone: 'orange',
    title: 'EAC “cannot verify” after Steam update — game fix or cheat issue?',
    excerpt:
      'Launcher verify failed twice. Game never reaches menu. Is anyone else stuck before they even load in?',
    author: 'SteamVerifyFail',
    age: '1 week ago',
    upvotes: 28,
    flair: 'Troubleshooting',
    sourceTitle: 'When the game client will not start',
    sourcePath: '/blog/eac-verify-the-isle-guide/',
    body: [
      'Steam updated overnight and now Easy Anti-Cheat throws verify errors. I have not touched any overlay yet — just want the base game running again.',
      'What actually fixed this for you? Repair install, delete easyanticheat folder, reboot — looking for the boring client fixes, not cheat talk.',
    ],
    comments: [
      {
        author: 'PatchDayDave',
        age: '1 week ago',
        score: 18,
        body: 'Steam verify integrity, run as admin once, reboot. Worked for me last month. Write down the exact error before you post on support — helps a ton.',
      },
      {
        author: 'SteamVerifyFail',
        age: '6 days ago',
        score: 5,
        body: 'Verify + reboot did it. Game boots again. Will read the [EAC verify guide](/blog/eac-verify-the-isle-guide/) before I touch anything else.',
      },
      {
        author: 'islemods_staff',
        age: '6 days ago',
        score: 9,
        body: 'Verify errors are client-side. Fix the game first; utility cards on our site are unrelated to a broken install.',
      },
    ],
  },
  {
    slug: 'how-does-external-loader-work-isle',
    category: 'General',
    categoryTone: 'purple',
    title: '“External loader” — separate window or injected?',
    excerpt:
      'Sales pages say external but I am not sure what that means for The Isle. ELI5 from someone who uses it?',
    author: 'LoaderCurious',
    age: '4 days ago',
    upvotes: 41,
    flair: 'Question',
    detailImage: miscMenu,
    detailImageAlt: 'Misc menu with hotkeys and config save options',
    sourceTitle: 'What external means on this catalog',
    sourcePath: '/blog/the-isle-external-loader-guide/',
    body: [
      'Coming from other games where “internal” meant injected menus. Here the site keeps saying [external loader](/blog/the-isle-external-loader-guide/) for [THE ISLE CHEATS](/products/the-isle-cheats/).',
      'Does external just mean the overlay draws on top without being inside the game process, or is there more to it? Trying to buy the right card.',
    ],
    comments: [
      {
        author: 'OverlayFan',
        age: '4 days ago',
        score: 27,
        body: 'On this catalog external = separate program, overlay on top. Not a rating of safety — just architecture. Vision stuff is the main product page.',
      },
      {
        author: 'LoaderCurious',
        age: '3 days ago',
        score: 4,
        body: 'Got it — external vs Cloud DMA still confuses me but the loader guide cleared up the wording.',
        replies: [
          {
            author: 'CloudOptional',
            age: '3 days ago',
            score: 7,
            body: 'Cloud DMA is another card entirely. Read partner notes on [Cloud DMA](/products/cloud-dma/) if your checkout mentions it.',
          },
        ],
      },
    ],
  },
  {
    slug: 'hwid-spoofer-or-new-account',
    category: 'General',
    categoryTone: 'purple',
    title: 'HWID ban — spoofer card or just a new Steam account?',
    excerpt:
      'Account flagged, fresh install still blocked. Which product on isle-cheats.com is actually for hardware locks?',
    author: 'FreshPCWhoDis',
    age: '6 days ago',
    upvotes: 36,
    flair: 'Question',
    sourceTitle: 'What the HWID card is, and what it is not',
    sourcePath: '/blog/the-isle-hwid-spoofer-guide/',
    body: [
      'Hardware ban vibes — new account on the same PC does nothing. I see [THE ISLE HWID SPOOFER](/products/hwid-spoofer/) and [UGC tools](/products/ugc/) and I am not sure which is for which problem.',
      'Did anyone use the HWID card for a clean machine fingerprint without expecting it to undo an account ban? And UGC is appeal notes only, right?',
    ],
    comments: [
      {
        author: 'BanAppealVet',
        age: '6 days ago',
        score: 21,
        body: 'HWID utility ≠ account restore. UGC is paperwork help, not a magic unban. Read the [HWID guide](/blog/the-isle-hwid-spoofer-guide/) before paying.',
      },
      {
        author: 'FreshPCWhoDis',
        age: '5 days ago',
        score: 6,
        body: 'Bought the HWID card for the right reason — not for ESP. Wish I had read that first.',
      },
      {
        author: 'islemods_staff',
        age: '5 days ago',
        score: 12,
        body: 'Match the problem to the card: vision = THE ISLE CHEATS, hardware ID = HWID spoofer, appeal drafting = UGC. Support can point you before checkout.',
      },
    ],
  },
  {
    slug: 'how-to-buy-the-isle-cheats',
    category: 'Community',
    categoryTone: 'green',
    title: 'Safest way to buy — site checkout vs random Discord DMs?',
    excerpt:
      'Guy in general chat offered lifetime for half price. Smells off. Where do you actually pay?',
    author: 'FirstTimeBuyer',
    age: '2 days ago',
    upvotes: 47,
    flair: 'Discussion',
    sourceTitle: 'How to choose a card before you pay',
    sourcePath: '/blog/how-to-buy-the-isle-cheats-2026/',
    body: [
      'Want [THE ISLE CHEATS](/products/the-isle-cheats/) monthly first. isle-cheats.com shows four products with Buy buttons — is that the only legit path?',
      'Anyone get scammed by third-party key sellers? Trying not to learn the hard way.',
    ],
    comments: [
      {
        author: 'CheckoutOnly',
        age: '2 days ago',
        score: 33,
        body: 'Pay only from the product page you picked — partner portal linked there. Prices on site match what I paid. Ignore cheap DMs.',
      },
      {
        author: 'MonthlyThenLife',
        age: '1 day ago',
        score: 14,
        body: 'Started monthly on the main card, upgraded later. [Buying guide](/blog/how-to-buy-the-isle-cheats-2026/) explains the four cards so you do not grab HWID when you wanted ESP.',
      },
      {
        author: 'FirstTimeBuyer',
        age: '1 day ago',
        score: 3,
        body: 'Went through the real checkout — key in minutes. Discord on the support page for status checks only.',
      },
    ],
  },
  {
    slug: 'patch-day-checklist-reminder',
    category: 'Patch Talk',
    categoryTone: 'orange',
    title: 'Patch dropped — checklist before you panic rebuy',
    excerpt:
      'EVRIMA hotfix today. Status banner red on homepage. Who is waiting vs who is still playing?',
    author: 'PatchWatcher',
    age: '18 hours ago',
    upvotes: 55,
    flair: 'PSA',
    detailImage: aimMenu,
    detailImageAlt: 'Aimbot tab screenshot — check product status after patches',
    sourceTitle: 'EAC patch day checklist',
    sourcePath: '/blog/eac-patch-day-checklist/',
    body: [
      'Another EVRIMA patch — homepage status matters more than Reddit rumors. Name the card you bought and read that product page before you assume ESP is “broken.”',
      'Buying a second month does not fix an offline card. Discord from [support](/support/) for live updates; forum for searchable tips after things stabilize.',
    ],
    comments: [
      {
        author: 'WaitOrPlay',
        age: '16 hours ago',
        score: 24,
        body: 'Waited six hours last patch, came back online without repurchasing. [Patch day checklist](/blog/eac-patch-day-checklist/) is the move.',
      },
      {
        author: 'PatchWatcher',
        age: '12 hours ago',
        score: 8,
        body: 'Banner green again for me. Saved my config profile before relaunch.',
      },
      {
        author: 'islemods_staff',
        age: '10 hours ago',
        score: 11,
        body: 'After updates: check banner → product status → then play. No launch instructions in threads — use guides when status is green.',
      },
    ],
  },
];

export const forumPosts: ForumPost[] = rawForumPosts.map(withCommentCounts);

export function getForumPost(slug: string): ForumPost | undefined {
  return forumPosts.find((post) => post.slug === slug);
}
