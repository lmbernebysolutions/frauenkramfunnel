export type ConsentStatus = "granted" | "denied" | null;

export const CONSENT_STORAGE_KEY = "frauenkram_analytics_consent";
export const LEGACY_CONSENT_STORAGE_KEY = "consent_status";
export const CONSENT_CHANGE_EVENT = "frauenkram-consent-change";

const isConsentStatus = (value: string | null): value is Exclude<ConsentStatus, null> =>
  value === "granted" || value === "denied";

export function readStoredConsent(): ConsentStatus {
  if (typeof window === "undefined") {
    return null;
  }

  const primary = window.localStorage.getItem(CONSENT_STORAGE_KEY);
  const legacy = window.localStorage.getItem(LEGACY_CONSENT_STORAGE_KEY);
  const normalizedPrimary = isConsentStatus(primary) ? primary : null;
  const normalizedLegacy = isConsentStatus(legacy) ? legacy : null;

  if (normalizedLegacy && !normalizedPrimary) {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, normalizedLegacy);
    return normalizedLegacy;
  }

  return normalizedPrimary ?? null;
}

export function persistConsent(nextStatus: Exclude<ConsentStatus, null>): void {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(CONSENT_STORAGE_KEY, nextStatus);
  window.localStorage.setItem(LEGACY_CONSENT_STORAGE_KEY, nextStatus);
  void fetch("/api/consent", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status: nextStatus }),
    keepalive: true,
  });
  window.dispatchEvent(new CustomEvent(CONSENT_CHANGE_EVENT, { detail: nextStatus }));
}

export function hasGrantedConsent(): boolean {
  return readStoredConsent() === "granted";
}
