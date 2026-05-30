export type CheckoutPackage = "guide" | "bundle";

export interface CheckoutResult {
  checkoutUrl: string;
  cartId: string;
}

export class CheckoutError extends Error {
  constructor(
    message: string,
    public readonly code: "CONFIG" | "SHOPIFY" | "NETWORK",
  ) {
    super(message);
    this.name = "CheckoutError";
  }
}

/** Client: Warenkorb anlegen und zur Shopify-Checkout-URL weiterleiten. */
export async function redirectToShopifyCheckout(packageId: CheckoutPackage): Promise<void> {
  const response = await fetch("/api/checkout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ packageId, quantity: 1 }),
  });

  let payload: { checkoutUrl?: string; error?: string; code?: string } = {};

  try {
    payload = (await response.json()) as typeof payload;
  } catch {
    throw new CheckoutError("Ungültige Server-Antwort beim Checkout.", "NETWORK");
  }

  if (!response.ok || !payload.checkoutUrl) {
    throw new CheckoutError(
      payload.error ?? "Checkout konnte nicht gestartet werden.",
      (payload.code as CheckoutError["code"]) ?? "SHOPIFY",
    );
  }

  window.location.assign(payload.checkoutUrl);
}
