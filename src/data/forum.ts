export interface ForumComment {
  author: string;
  age: string;
  score: number;
  body: string;
  replies?: ForumComment[];
}

import { contentImageForKey } from '../config/siteMedia';

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
  image: string;
}

export const forumCategories = [
  { name: 'General', tone: 'purple', icon: 'users' },
  { name: 'Guides & Builds', tone: 'blue', icon: 'navBlog' },
  { name: 'Patch Talk', tone: 'orange', icon: 'refresh' },
  { name: 'Community', tone: 'green', icon: 'messageCircle' },
] as const;

function guideDiscussion(input: {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  categoryTone: ForumPost['categoryTone'];
  sourceTitle: string;
  sourcePath: string;
  upvotes: number;
  answer: string;
  detail: string;
  tip: string;
}): ForumPost {
  const { answer, detail, tip, ...post } = input;
  return {
    ...post,
    author: 'THE ISLE CHEATS',
    age: '2 days ago',
    commentsCount: 1,
    upvotes: post.upvotes,
    flair: 'Guide Q&A',
    body: [answer, detail],
    comments: [{ author: 'THE ISLE CHEATS', age: 'From the guide', score: 0, body: tip }],
    image: contentImageForKey(post.slug),
  };
}

const guidePosts: ForumPost[] = [
  guideDiscussion({
    slug: 'what-does-the-isle-esp-include',
    title: 'What does The Isle ESP include?',
    upvotes: 64,
    excerpt: 'Player and dinosaur labels are on the main card. The other three cards are separate.',
    category: 'Guides & Builds',
    categoryTone: 'blue',
    sourceTitle: 'What THE ISLE CHEATS lists for EVRIMA',
    sourcePath: '/blog/the-isle-cheats-features-guide/',
    answer:
      'THE ISLE CHEATS lists player ESP, dinosaur ESP, distance, growth, and world markers for EVRIMA — see the features guide, then the product page to buy.',
    detail: 'Cloud DMA is a separate card if the partner requires it for the full suite.',
    tip: 'Most players start with THE ISLE CHEATS before adding utilities.',
  }),
  guideDiscussion({
    slug: 'how-to-set-up-the-isle-esp',
    title: 'How should I set up ESP for the first time?',
    upvotes: 52,
    excerpt: 'Turn on one label group first so the text stays readable.',
    category: 'Guides & Builds',
    categoryTone: 'blue',
    sourceTitle: 'How to read The Isle ESP without covering the screen',
    sourcePath: '/blog/the-isle-esp-setup/',
    answer:
      'Turn on player ESP first, then dinosaur ESP — keep colors readable so the overlay sells its value on live servers.',
    detail: 'Those modules ship with THE ISLE CHEATS, not a separate ESP-only checkout.',
    tip: 'Open the ESP setup guide, then the product page when you are ready to pay.',
  }),
  guideDiscussion({
    slug: 'what-to-do-if-eac-cannot-verify-isle',
    title: 'What if EAC cannot verify my The Isle install?',
    upvotes: 28,
    excerpt: 'A verify error is a game-client problem. This site does not describe a bypass.',
    category: 'Patch Talk',
    categoryTone: 'orange',
    sourceTitle: 'When the game client will not start',
    sourcePath: '/blog/eac-verify-the-isle-guide/',
    answer:
      'Repair the game with the launcher’s own verify action and let it finish. The overlay cards are not a file repair.',
    detail: 'A client that will not start is not the same question as the hardware utility or the appeal-notes tool.',
    tip: 'Write down the exact error text before you use the contact page. Do not send card numbers.',
  }),
  guideDiscussion({
    slug: 'how-does-external-loader-work-isle',
    title: 'What does “external loader” mean for The Isle?',
    upvotes: 41,
    excerpt: 'On this site, external means a separate program from the game.',
    category: 'General',
    categoryTone: 'purple',
    sourceTitle: 'What “external” means on this catalog',
    sourcePath: '/blog/the-isle-external-loader-guide/',
    answer:
      'External describes where the program sits. It is not a safety rating, and this thread has no launch order.',
    detail: 'The vision labels are the THE ISLE CHEATS card. Cloud DMA is a different card if the partner lists it for the full suite.',
    tip: 'After a patch, use the patch-day article to decide whether to wait.',
  }),
  guideDiscussion({
    slug: 'hwid-spoofer-or-new-account',
    title: 'HWID spoofer or new account?',
    upvotes: 36,
    excerpt: 'The hardware card is a separate purchase. It does not restore an account.',
    category: 'General',
    categoryTone: 'purple',
    sourceTitle: 'What the HWID card is, and what it is not',
    sourcePath: '/blog/the-isle-hwid-spoofer-guide/',
    answer:
      'An account restriction and a hardware question are different cards. The hardware card does not undo an account penalty.',
    detail: 'Appeal notes belong on the UGC card, which also does not promise a restored account. This thread has no setup steps.',
    tip: 'If you wanted player labels, the hardware card is the wrong purchase.',
  }),
  guideDiscussion({
    slug: 'how-to-buy-the-isle-cheats',
    title: 'How do I buy The Isle Cheats safely?',
    upvotes: 47,
    excerpt: 'Match the job to one of the four cards, then use that card’s Buy button.',
    category: 'Community',
    categoryTone: 'green',
    sourceTitle: 'How to choose a card before you pay',
    sourcePath: '/blog/how-to-buy-the-isle-cheats-2026/',
    answer:
      'There is no single bundle — pick THE ISLE CHEATS for ESP, or the utility card that matches your problem, then use that page’s Buy button.',
    detail: 'Prices on isle-cheats.com are verified against the partner storefront.',
    tip: 'Ignore DMs selling cheaper keys; checkout only from our product pages.',
  }),
];

export const forumPosts: ForumPost[] = [
  ...guidePosts,
  {
    slug: 'patch-day-checklist-reminder',
    category: 'Patch Talk',
    categoryTone: 'orange',
    title: 'Reminder: run the patch day checklist after updates',
    excerpt: 'Name the card you bought, then read its status before you pay again.',
    author: 'THE ISLE CHEATS',
    age: '1 day ago',
    commentsCount: 2,
    upvotes: 55,
    flair: 'Patch',
    sourceTitle: 'EAC patch day checklist',
    sourcePath: '/blog/eac-patch-day-checklist/',
    image: contentImageForKey('patch-day-checklist-reminder'),
    body: [
      'A game update can change what a label still shows. Name the card you bought and read that page before you assume the old list still applies.',
      'Buying a second duration does not bring a card back if its status says it is offline.',
    ],
    comments: [
      {
        author: 'THE ISLE CHEATS',
        age: 'Editorial note',
        score: 0,
        body: 'Check the status banner on the homepage after a patch before you open the product page.',
      },
    ],
  },
];

export function getForumPost(slug: string): ForumPost | undefined {
  return forumPosts.find((post) => post.slug === slug);
}
