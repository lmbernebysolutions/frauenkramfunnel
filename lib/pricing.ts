/**
 * PAngV-konforme Preislogik (Shopify Live-Stand: Guide 25,90 €, Bundle 57,80 €).
 * Öl-Referenzwert: Lovely Body Oil Einzelhandel Carsta Shop (31,90 €).
 */
export const GUIDE_PAPERBACK_EUR = 25.9;
export const GUIDE_KINDLE_EUR = 10.99;
export const GUIDE_SHIPPING_DACH_EUR = 4.9;
export const BUNDLE_EUR = 57.8;
export const BODY_OIL_REFERENCE_EUR = 31.9;

export function formatPriceDe(eur: number): string {
  return `€${eur.toFixed(2).replace(".", ",")}`;
}

export function getGuidePricingLabels() {
  return {
    priceLabel: `Paperback: ${formatPriceDe(GUIDE_PAPERBACK_EUR)} / Kindle: ${formatPriceDe(GUIDE_KINDLE_EUR)}`,
    shippingLabel: `Versandkosten: ${formatPriceDe(GUIDE_SHIPPING_DACH_EUR)} (DACH).`,
  } as const;
}

export function getBundleEinzelwertEur(): number {
  return GUIDE_PAPERBACK_EUR + BODY_OIL_REFERENCE_EUR + GUIDE_SHIPPING_DACH_EUR;
}

export function getBundleSavingsEur(): number {
  return Math.round((getBundleEinzelwertEur() - BUNDLE_EUR) * 100) / 100;
}

export function getBundlePricingLabels() {
  const compareAt = getBundleEinzelwertEur();
  const savings = getBundleSavingsEur();

  return {
    priceLabel: `Preis: ${formatPriceDe(BUNDLE_EUR)}`,
    compareAtPriceLabel: `Einzelwert: ${formatPriceDe(compareAt)}`,
    savingsLabel: `Du sparst ${formatPriceDe(savings)} gegenüber Einzelkauf (Buch + Öl + Versand)`,
  } as const;
}
