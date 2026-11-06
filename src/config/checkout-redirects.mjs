/** Checkout destinations. Keep in sync with PRODUCTS in site.ts. */
export const CHECKOUT_URLS = {
  theIsle: 'https://zadeyo.com/go/MOIZ?to=%2Fproducts%2Fthe-isle-novaxware',
  hwidSpoofer: 'https://zadeyo.com/go/MOIZ?to=%2Fproducts%2Fhwid-spoofer',
  cloudDma: 'https://zadeyo.com/go/MOIZ?to=%2Fproducts%2Fcloud-dma',
  ugc: 'https://zadeyo.com/go/MOIZ?to=%2Fproducts%2Fugc',
};

export const CHECKOUT_PATH_REDIRECTS = new Map([
  ['/go/the-isle-cheats', CHECKOUT_URLS.theIsle],
  ['/go/the-isle-cheats/', CHECKOUT_URLS.theIsle],
  ['/go/the-isle-hwid-spoofer', CHECKOUT_URLS.hwidSpoofer],
  ['/go/the-isle-hwid-spoofer/', CHECKOUT_URLS.hwidSpoofer],
  ['/go/hwid-spoofer', CHECKOUT_URLS.hwidSpoofer],
  ['/go/hwid-spoofer/', CHECKOUT_URLS.hwidSpoofer],
  ['/go/cloud-dma', CHECKOUT_URLS.cloudDma],
  ['/go/cloud-dma/', CHECKOUT_URLS.cloudDma],
  ['/go/ugc-account-recovery', CHECKOUT_URLS.ugc],
  ['/go/ugc-account-recovery/', CHECKOUT_URLS.ugc],
  ['/go/ugc', CHECKOUT_URLS.ugc],
  ['/go/ugc/', CHECKOUT_URLS.ugc],
]);

export function resolveCheckoutPathRedirect(pathname) {
  const direct = CHECKOUT_PATH_REDIRECTS.get(pathname);
  if (direct) return direct;
  if (pathname !== '/' && !pathname.endsWith('/')) {
    return CHECKOUT_PATH_REDIRECTS.get(`${pathname}/`) ?? null;
  }
  return null;
}
