export type CheckoutPackage = "guide" | "bundle";

function cleanDomain(domain: string): string {
  return domain.replace(/^https?:\/\//, "").replace(/\/$/, "");
}

export function getShopifyStoreDomain(): string | null {
  const domain =
    process.env.SHOPIFY_STORE_DOMAIN?.trim() ||
    process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN?.trim();
  return domain ? cleanDomain(domain) : null;
}

export function getShopifyVariantGid(packageId: CheckoutPackage): string | null {
  const value =
    packageId === "guide"
      ? process.env.SHOPIFY_VARIANT_ID_GUIDE?.trim() ||
        process.env.NEXT_PUBLIC_VARIANT_GUIDE?.trim()
      : process.env.SHOPIFY_VARIANT_ID_BUNDLE?.trim() ||
        process.env.NEXT_PUBLIC_VARIANT_BUNDLE?.trim();

  return value && value.length > 0 ? value : null;
}

/** Numerische Variant-ID aus Shopify-GID (für /cart/… Permalinks). */
export function gidToNumericVariantId(gid: string): string | null {
  const match = gid.match(/ProductVariant\/(\d+)/);
  return match?.[1] ?? null;
}

export function buildShopifyCartPermalink(
  packageId: CheckoutPackage,
  quantity = 1,
): string | null {
  const domain = getShopifyStoreDomain();
  const gid = getShopifyVariantGid(packageId);
  if (!domain || !gid) {
    return null;
  }

  const numericId = gidToNumericVariantId(gid);
  if (!numericId) {
    return null;
  }

  const qty = Math.min(Math.max(quantity, 1), 10);
  return `https://${domain}/cart/${numericId}:${qty}`;
}
