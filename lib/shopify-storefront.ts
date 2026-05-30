import "server-only";

export type CheckoutPackage = "guide" | "bundle";

interface CartCreateResponse {
  data?: {
    cartCreate?: {
      cart?: { id: string; checkoutUrl: string } | null;
      userErrors?: { field: string[] | null; message: string }[];
    };
  };
  errors?: { message: string }[];
}

const CART_CREATE_MUTATION = `
  mutation createCartWithLineItems($lines: [CartLineInput!]!) {
    cartCreate(input: { lines: $lines }) {
      cart {
        id
        checkoutUrl
      }
      userErrors {
        field
        message
      }
    }
  }
`;

function getVariantId(packageId: CheckoutPackage): string | null {
  const envKey =
    packageId === "guide"
      ? process.env.SHOPIFY_VARIANT_ID_GUIDE
      : process.env.SHOPIFY_VARIANT_ID_BUNDLE;
  const value = envKey?.trim();
  return value && value.length > 0 ? value : null;
}

function getStorefrontConfig(): { domain: string; token: string } | null {
  const domain = process.env.SHOPIFY_STORE_DOMAIN?.trim();
  const token = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN?.trim();

  if (!domain || !token) {
    return null;
  }

  return { domain: domain.replace(/^https?:\/\//, "").replace(/\/$/, ""), token };
}

export function isShopifyConfigured(): boolean {
  const config = getStorefrontConfig();
  if (!config) {
    return false;
  }

  return Boolean(getVariantId("guide") && getVariantId("bundle"));
}

export async function createShopifyCheckout(
  packageId: CheckoutPackage,
  quantity = 1,
): Promise<{ checkoutUrl: string; cartId: string }> {
  const config = getStorefrontConfig();
  const variantId = getVariantId(packageId);

  if (!config || !variantId) {
    throw new Error("SHOPIFY_NOT_CONFIGURED");
  }

  const apiVersion = process.env.SHOPIFY_STOREFRONT_API_VERSION?.trim() || "2024-10";
  const endpoint = `https://${config.domain}/api/${apiVersion}/graphql.json`;

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": config.token,
    },
    body: JSON.stringify({
      query: CART_CREATE_MUTATION,
      variables: {
        lines: [{ merchandiseId: variantId, quantity: Math.min(Math.max(quantity, 1), 10) }],
      },
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`SHOPIFY_HTTP_${response.status}`);
  }

  const json = (await response.json()) as CartCreateResponse;

  if (json.errors?.length) {
    throw new Error(json.errors.map((entry) => entry.message).join("; "));
  }

  const userErrors = json.data?.cartCreate?.userErrors ?? [];
  if (userErrors.length > 0) {
    throw new Error(userErrors.map((entry) => entry.message).join("; "));
  }

  const cart = json.data?.cartCreate?.cart;
  if (!cart?.checkoutUrl || !cart.id) {
    throw new Error("SHOPIFY_EMPTY_CART");
  }

  return { checkoutUrl: cart.checkoutUrl, cartId: cart.id };
}
