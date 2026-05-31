/**
 * PAngV-konforme Preislogik (Shopify Live-Stand: Guide 25,90 €, Bundle 57,80 €).
 * Öl-Referenzwert: Lovely Body Oil Einzelhandel Carsta Shop (31,90 €).
 * Premium-Versand Taschenbuch: 6,99 € mit Sendungsverfolgung.
 */
export const GUIDE_PAPERBACK_EUR = 25.9;
export const GUIDE_KINDLE_EUR = 10.99;
export const GUIDE_PREMIUM_SHIPPING_EUR = 6.99;
export const BUNDLE_EUR = 57.8;
export const BODY_OIL_REFERENCE_EUR = 31.9;

export function formatPriceDe(eur: number): string {
  return `€${eur.toFixed(2).replace(".", ",")}`;
}

/** Preis ohne Währungssymbol (für eingebettete Copy). */
export function formatAmountDe(eur: number): string {
  return eur.toFixed(2).replace(".", ",");
}

export function getGuidePricingLabels() {
  return {
    priceLabel: `Paperback: ${formatPriceDe(GUIDE_PAPERBACK_EUR)} (zzgl. ${formatPriceDe(GUIDE_PREMIUM_SHIPPING_EUR)} Premium-Versand mit Sendungsverfolgung) / Kindle: ${formatPriceDe(GUIDE_KINDLE_EUR)}`,
    shippingLabel: `Premium-Versand Taschenbuch: ${formatPriceDe(GUIDE_PREMIUM_SHIPPING_EUR)} (DACH, mit Sendungsverfolgung).`,
  } as const;
}

export function getBundleEinzelwertEur(): number {
  return GUIDE_PAPERBACK_EUR + BODY_OIL_REFERENCE_EUR + GUIDE_PREMIUM_SHIPPING_EUR;
}

export function getBundleSavingsEur(): number {
  return Math.round((getBundleEinzelwertEur() - BUNDLE_EUR) * 100) / 100;
}

export function getBundlePricingLabels() {
  const compareAt = getBundleEinzelwertEur();

  return {
    priceLabel: `Preis: ${formatPriceDe(BUNDLE_EUR)}`,
    compareAtPriceLabel: `Einzelwert: ${formatPriceDe(compareAt)}`,
    savingsLabel: `Inklusive kostenlosem Premium-Versand (Du sparst ${formatAmountDe(GUIDE_PREMIUM_SHIPPING_EUR)} €)`,
  } as const;
}
