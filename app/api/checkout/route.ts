import { NextRequest, NextResponse } from "next/server";
import { createShopifyCheckout, isShopifyConfigured, type CheckoutPackage } from "@/lib/shopify-storefront";

interface CheckoutBody {
  packageId?: unknown;
  quantity?: unknown;
}

function isCheckoutPackage(value: unknown): value is CheckoutPackage {
  return value === "guide" || value === "bundle";
}

function isSameOriginRequest(request: NextRequest): boolean {
  const fetchSite = request.headers.get("sec-fetch-site");
  const fetchMode = request.headers.get("sec-fetch-mode");
  const origin = request.headers.get("origin");
  const referer = request.headers.get("referer");
  const requestOrigin = request.nextUrl.origin;

  if (fetchSite !== "same-origin" || fetchMode !== "cors") {
    return false;
  }

  if (!origin || !referer || origin !== requestOrigin) {
    return false;
  }

  return referer.startsWith(`${requestOrigin}/`);
}

export async function POST(request: NextRequest) {
  if (!isSameOriginRequest(request)) {
    return NextResponse.json({ error: "Forbidden origin", code: "FORBIDDEN" }, { status: 403 });
  }

  if (!isShopifyConfigured()) {
    return NextResponse.json(
      {
        error:
          "Shopify Checkout ist noch nicht konfiguriert. Bitte SHOPIFY_STORE_DOMAIN, SHOPIFY_STOREFRONT_ACCESS_TOKEN und Variant-IDs setzen.",
        code: "CONFIG",
      },
      { status: 503 },
    );
  }

  let parsed: CheckoutBody;

  try {
    parsed = (await request.json()) as CheckoutBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body", code: "VALIDATION" }, { status: 400 });
  }

  if (!isCheckoutPackage(parsed.packageId)) {
    return NextResponse.json({ error: "Invalid packageId", code: "VALIDATION" }, { status: 400 });
  }

  const quantity =
    typeof parsed.quantity === "number" && Number.isFinite(parsed.quantity)
      ? Math.min(Math.max(Math.floor(parsed.quantity), 1), 10)
      : 1;

  try {
    const { checkoutUrl, cartId } = await createShopifyCheckout(parsed.packageId, quantity);
    return NextResponse.json({ checkoutUrl, cartId });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Checkout failed";
    return NextResponse.json({ error: message, code: "SHOPIFY" }, { status: 502 });
  }
}
