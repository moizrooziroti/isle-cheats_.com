import type { SitemapItem } from '@astrojs/sitemap';
import { blogPosts } from '../data/blog';
import { INDEXED_BLOG_SLUGS } from '../data/blog/indexedSlugs';
import { parseBlogDate } from '../utils/schema';

const indexedBlogPaths = new Set(INDEXED_BLOG_SLUGS.map((slug) => `/blog/${slug}/`));

const buildDate = new Date().toISOString();

const blogLastmod = new Map<string, string>(
  blogPosts.map((post) => [`/blog/${post.slug}/`, parseBlogDate(post.date)] as const),
);

function pathnameFromUrl(url: string): string {
  const path = new URL(url).pathname;
  return path.endsWith('/') ? path : `${path}/`;
}

export function sitemapSerialize(item: SitemapItem): SitemapItem | undefined {
  const path = pathnameFromUrl(item.url);

  if (path.includes('/404') || path.startsWith('/go/') || path.includes('/rss.xml')) {
    return undefined;
  }

  if (path.startsWith('/blog/') && path !== '/blog/' && !indexedBlogPaths.has(path)) {
    return undefined;
  }

  const origin = new URL(item.url).origin;
  item.url = new URL(path, `${origin}/`).href;

  item.lastmod = buildDate;

  if (path === '/') {
    item.priority = 1;
    return item;
  }

  if (path === '/blog/') {
    item.priority = 0.9;
    return item;
  }

  if (path.startsWith('/blog/')) {
    item.priority = 0.7;
    item.lastmod = blogLastmod.get(path) ?? buildDate;
    return item;
  }

  if (path.startsWith('/products/')) {
    item.priority = 0.8;
    return item;
  }

  if (
    path === '/about/' ||
    path === '/support/' ||
    path === '/privacy/' ||
    path === '/privacy-policy/' ||
    path === '/terms/' ||
    path === '/faq/'
  ) {
    item.priority = 0.5;
    return item;
  }

  if (path === '/forum/') {
    item.priority = 0.6;
    return item;
  }

  item.priority = 0.6;
  return item;
}
