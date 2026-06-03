"use client";

import { useEffect, useState } from "react";
import { CONSENT_CHANGE_EVENT, readStoredConsent } from "@/lib/consent";

/** Syncs marketing consent (`granted` | `denied` | pending `null`). */
export function useMarketingConsent(): boolean {
  const [isGranted, setIsGranted] = useState(false);

  useEffect(() => {
    const syncConsent = () => {
      setIsGranted(readStoredConsent() === "granted");
    };

    syncConsent();
    window.addEventListener(CONSENT_CHANGE_EVENT, syncConsent);
    window.addEventListener("storage", syncConsent);

    return () => {
      window.removeEventListener(CONSENT_CHANGE_EVENT, syncConsent);
      window.removeEventListener("storage", syncConsent);
    };
  }, []);

  return isGranted;
}
