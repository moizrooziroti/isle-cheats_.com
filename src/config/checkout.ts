import { CHECKOUT_URLS } from './checkout-redirects.mjs';

/**
 * External checkout URLs — server-side redirect targets only (never use as visible href).
 */
export const CHECKOUT = CHECKOUT_URLS;

export type CheckoutProduct = keyof typeof CHECKOUT;

/** URL slug for /go/[slug]/ checkout redirect pages. */
export const CHECKOUT_SLUGS: Record<CheckoutProduct, string> = {
  theIsle: 'the-isle-cheats',
  hwidSpoofer: 'the-isle-hwid-spoofer',
  cloudDma: 'cloud-dma',
  ugc: 'ugc-account-recovery',
};

export const CHECKOUT_SLUG_TO_PRODUCT = Object.fromEntries(
  Object.entries(CHECKOUT_SLUGS).map(([product, slug]) => [slug, product as CheckoutProduct]),
) as Record<string, CheckoutProduct>;

/** Internal checkout path shown to users (hides external URL on hover). */
export function checkoutPath(product: CheckoutProduct = 'theIsle'): string {
  return `/go/${CHECKOUT_SLUGS[product]}/`;
}

/** Default product checkout redirect (replaces legacy Discord CTAs). */
export const PRIMARY_CHECKOUT_PATH = checkoutPath('theIsle');

/** Map internal product slugs to checkout redirect paths. */
export function checkoutForSlug(slug: string): string {
  switch (slug) {
    case 'hwid-spoofer':
    case 'the-isle-hwid-spoofer':
      return CHECKOUT.hwidSpoofer;
    case 'cloud-dma':
      return CHECKOUT.cloudDma;
    case 'ugc':
    case 'ugc-account-recovery':
    case 'account-recovery':
      return CHECKOUT.ugc;
    case 'the-isle-cheats':
    default:
      return CHECKOUT.theIsle;
  }
}

/** Resolve blog CTA or legacy href values to internal checkout paths. */
export function resolveCheckoutHref(href: string): string {
  if (!href.startsWith('http')) {
    return href.startsWith('/') ? href : `/${href}`;
  }

  for (const [product, url] of Object.entries(CHECKOUT) as [CheckoutProduct, string][]) {
    if (href === url || href.startsWith(`${url}?`) || href.startsWith(`${url}/`)) {
      return checkoutPath(product);
    }
  }

  if (href.includes('%2Fthe-isle-novaxware') || href.includes('/the-isle-novaxware')) {
    return checkoutPath('theIsle');
  }
  if (href.includes('%2Fthe-isle-cheats') || href.includes('/the-isle-cheats')) {
    return checkoutPath('theIsle');
  }
  if (href.includes('%2Fhwid-spoofer') || href.includes('/hwid-spoofer')) {
    return checkoutPath('hwidSpoofer');
  }
  if (href.includes('%2Fcloud-dma') || href.includes('/cloud-dma')) {
    return checkoutPath('cloudDma');
  }
  if (href.includes('%2Fugc') || href.includes('/ugc') || href.includes('%2Fgame-accounts') || href.includes('/game-accounts')) {
    return checkoutPath('ugc');
  }

  return href;
}
