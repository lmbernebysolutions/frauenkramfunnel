import type { PricingOption } from "@/types/funnel";

const VAT_TOKEN = "inkl. MwSt.";
const PAID_SHIPPING_PATTERN =
  /(?:versandkosten:|premium-versand|zzgl\.)[\s\S]{0,80}€?\s*\d{1,3},\d{2}/i;
const EURO_AMOUNT_PATTERN = /€(?:\d{1,3}(?:\.\d{3})+|\d+),\d{2}/g;

export function hasValidPriceDisclosure(option: PricingOption): boolean {
  const matches = option.priceLabel.match(EURO_AMOUNT_PATTERN) ?? [];

  if (option.id === "guide") {
    return matches.length >= 2;
  }

  return matches.length >= 1;
}

export function hasVatDisclosure(option: PricingOption): boolean {
  return option.vatLabel.includes(VAT_TOKEN);
}

export function hasValidShippingDisclosure(option: PricingOption): boolean {
  if (option.id === "bundle") {
    const freeShippingCopy = `${option.shippingLabel} ${option.savingsLabel ?? ""}`;
    return /kostenlosem premium-versand|gratis versand/i.test(freeShippingCopy);
  }

  return (
    PAID_SHIPPING_PATTERN.test(option.shippingLabel) ||
    PAID_SHIPPING_PATTERN.test(option.priceLabel)
  );
}

export function validatePricingOption(option: PricingOption): string[] {
  const errors: string[] = [];

  if (!hasValidPriceDisclosure(option)) {
    errors.push("Preisangabe fehlt oder ist nicht im erwarteten Euro-Format.");
  }

  if (!hasVatDisclosure(option)) {
    errors.push("Preisangabe ohne unmittelbaren MwSt.-Hinweis.");
  }

  if (!hasValidShippingDisclosure(option)) {
    errors.push("Versandangabe unvollständig oder nicht PAngV-konform.");
  }

  return errors;
}
