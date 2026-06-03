import { hasGrantedConsent } from "@/lib/consent";
import { BUNDLE_EUR, GUIDE_PAPERBACK_EUR } from "@/lib/pricing";
import type { CheckoutPackage } from "@/lib/shopify";

type FbqFn = (...args: unknown[]) => void;

function getFbq(): FbqFn | null {
  if (typeof window === "undefined") {
    return null;
  }

  const fbq = (window as Window & { fbq?: FbqFn }).fbq;
  return typeof fbq === "function" ? fbq : null;
}

export function trackMetaPageView(): void {
  if (!hasGrantedConsent()) {
    return;
  }

  getFbq()?.("track", "PageView");
}

export function trackMetaAddToCart(packageId: CheckoutPackage): void {
  if (!hasGrantedConsent()) {
    return;
  }

  const value = packageId === "bundle" ? BUNDLE_EUR : GUIDE_PAPERBACK_EUR;

  getFbq()?.("track", "AddToCart", {
    content_ids: [packageId],
    content_type: "product",
    content_name: packageId === "bundle" ? "Regenerations-Bundle" : "Praxis-Ratgeber",
    value,
    currency: "EUR",
  });
}

export function updateMetaConsent(granted: boolean): void {
  const fbq = getFbq();
  if (!fbq) {
    return;
  }

  fbq("consent", granted ? "grant" : "revoke");
}
