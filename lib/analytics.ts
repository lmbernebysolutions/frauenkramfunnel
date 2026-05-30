import { hasGrantedConsent } from "@/lib/consent";

type CapiPayload = Record<string, unknown>;

interface DispatchResult {
  skipped: boolean;
  reason?: "no-consent" | "network-error";
}

export async function dispatchCapiEvent(
  eventName: string,
  payload: CapiPayload,
): Promise<DispatchResult> {
  if (!hasGrantedConsent()) {
    return { skipped: true, reason: "no-consent" };
  }

  try {
    const response = await fetch("/api/capi-proxy", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event: eventName,
        data: payload,
        timestamp: Math.floor(Date.now() / 1000),
      }),
      keepalive: true,
    });

    if (!response.ok) {
      return { skipped: true, reason: "network-error" };
    }

    return { skipped: false };
  } catch {
    return { skipped: true, reason: "network-error" };
  }
}
