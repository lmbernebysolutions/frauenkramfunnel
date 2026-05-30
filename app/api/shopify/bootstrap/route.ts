import { NextRequest, NextResponse } from "next/server";
import { createStorefrontAccessToken } from "@/lib/shopify-oauth";
import { isShopifyConfigured } from "@/lib/shopify-storefront";

function isAuthorized(request: NextRequest): boolean {
  if (process.env.NODE_ENV === "development") {
    return true;
  }

  const secret = process.env.SHOPIFY_BOOTSTRAP_SECRET?.trim();
  if (!secret) {
    return false;
  }

  const header = request.headers.get("authorization");
  return header === `Bearer ${secret}`;
}

/**
 * Einmaliger Storefront-Token-Bootstrap (Dev oder mit SHOPIFY_BOOTSTRAP_SECRET).
 * Antwort enthält den Token – nur für Admin-Setup, nie öffentlich exponieren.
 */
export async function POST(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (isShopifyConfigured()) {
    return NextResponse.json({
      ok: true,
      message: "SHOPIFY_STOREFRONT_ACCESS_TOKEN ist bereits gesetzt. Kein Bootstrap nötig.",
    });
  }

  try {
    const storefrontAccessToken = await createStorefrontAccessToken();
    const domain =
      process.env.SHOPIFY_STORE_DOMAIN?.trim() ||
      process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN?.trim();

    return NextResponse.json({
      ok: true,
      message: "Storefront-Token erzeugt. In Vercel als SHOPIFY_STOREFRONT_ACCESS_TOKEN hinterlegen.",
      env: {
        SHOPIFY_STORE_DOMAIN: domain,
        SHOPIFY_STOREFRONT_ACCESS_TOKEN: storefrontAccessToken,
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Bootstrap failed";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
