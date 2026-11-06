import { PRODUCTS, type ProductOffer } from '../config/site';

export type ProductPlanId = ProductOffer['id'];

export interface ProductPlan {
  id: ProductPlanId;
  label: string;
  priceUsd: number;
  priceNote: string;
}

const SLUG_ALIASES: Record<string, string> = {
  'hwid-spoofer': 'the-isle-hwid-spoofer',
  ugc: 'ugc-account-recovery',
};

function offersFor(productSlug: string): ProductOffer[] {
  const slug = SLUG_ALIASES[productSlug] ?? productSlug;
  return PRODUCTS.find((product) => product.slug === slug)?.offers ?? [];
}

export function getProductPlans(productSlug: string): ProductPlan[] {
  return offersFor(productSlug);
}

export function formatPlanPrice(usd: number): string {
  return `$${usd}`;
}

/** Plan selection is display-only. Checkout stays on the product CTA. */
export function checkoutUrlWithPlan(baseUrl: string, planId: ProductPlanId): string {
  void planId;
  return baseUrl;
}
