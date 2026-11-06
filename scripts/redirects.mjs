/** Static path redirects (301). Keys are pathname without query/hash. */
export const PATH_REDIRECTS = new Map([
  ['/blog', '/blog/'],
  ['/about', '/about/'],
  ['/contact', '/contact/'],
  ['/support', '/contact/'],
  ['/support/', '/contact/'],
  ['/privacy', '/privacy-policy/'],
  ['/privacy/', '/privacy-policy/'],
  ['/terms', '/terms/'],
  ['/faq', '/faq/'],
  ['/cheats', '/products/'],
  ['/cheats/', '/products/'],
  ['/products/the-isle-hwid-spoofer', '/products/hwid-spoofer/'],
  ['/products/the-isle-hwid-spoofer/', '/products/hwid-spoofer/'],
  ['/products/ugc-account-recovery', '/products/ugc/'],
  ['/products/ugc-account-recovery/', '/products/ugc/'],
]);

export const TRAILING_SLASH_SKIP = /\.[a-z0-9]+$/i;

export function resolvePathRedirect(pathname) {
  const direct = PATH_REDIRECTS.get(pathname);
  if (direct) return direct;

  if (pathname !== '/' && !pathname.endsWith('/') && !TRAILING_SLASH_SKIP.test(pathname)) {
    return `${pathname}/`;
  }

  return null;
}
