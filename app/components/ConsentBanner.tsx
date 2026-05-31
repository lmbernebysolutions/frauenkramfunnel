"use client";

import Link from "next/link";
import { type KeyboardEvent, useCallback, useEffect, useRef, useSyncExternalStore } from "react";
import type { ConsentStatus } from "@/lib/consent";
import { CONSENT_CHANGE_EVENT, persistConsent, readStoredConsent } from "@/lib/consent";

function subscribeToConsent(onStoreChange: () => void): () => void {
  const handler = () => onStoreChange();
  window.addEventListener(CONSENT_CHANGE_EVENT, handler);
  window.addEventListener("storage", handler);
  return () => {
    window.removeEventListener(CONSENT_CHANGE_EVENT, handler);
    window.removeEventListener("storage", handler);
  };
}

function getConsentSnapshot(): ConsentStatus {
  return readStoredConsent();
}

function getServerConsentSnapshot(): ConsentStatus {
  return null;
}

export default function ConsentBanner() {
  const status = useSyncExternalStore(subscribeToConsent, getConsentSnapshot, getServerConsentSnapshot);
  const bannerRef = useRef<HTMLElement | null>(null);
  const denyButtonRef = useRef<HTMLButtonElement | null>(null);
  const grantButtonRef = useRef<HTMLButtonElement | null>(null);

  const saveConsent = useCallback((nextStatus: Exclude<ConsentStatus, null>) => {
    persistConsent(nextStatus);
  }, []);

  useEffect(() => {
    if (status !== null) {
      return;
    }
    grantButtonRef.current?.focus();
  }, [status]);

  const handleDialogKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === "Escape") {
      event.preventDefault();
      saveConsent("denied");
      return;
    }

    if (event.key !== "Tab") {
      return;
    }

    const focusableElements = [denyButtonRef.current, grantButtonRef.current].filter(
      Boolean,
    ) as HTMLButtonElement[];

    if (focusableElements.length === 0) {
      return;
    }

    const activeElement = document.activeElement;
    const currentIndex = focusableElements.findIndex((element) => element === activeElement);
    const nextIndex = event.shiftKey
      ? (currentIndex - 1 + focusableElements.length) % focusableElements.length
      : (currentIndex + 1) % focusableElements.length;

    event.preventDefault();
    focusableElements[nextIndex]?.focus();
  };

  if (status !== null) {
    return null;
  }

  return (
    <aside
      ref={bannerRef}
      role="dialog"
      aria-labelledby="consent-title"
      aria-describedby="consent-description"
      onKeyDown={handleDialogKeyDown}
      className="fixed bottom-4 left-4 right-4 z-[70] rounded-2xl border border-coverSand bg-coverCanvas p-4 shadow-lg md:left-auto md:max-w-xl"
    >
      <p id="consent-title" className="font-heading text-sm font-bold text-erdton900">
        Datenschutz & Einwilligung
      </p>
      <p id="consent-description" className="font-body mt-2 text-sm leading-relaxed text-erdton900/85">
        Wir nutzen Analyse- und Marketing-Technologien ausschließlich mit deiner ausdrücklichen Einwilligung. Details
        findest du in unserer{" "}
        <Link
          href="/datenschutz"
          className="underline underline-offset-4 transition-colors duration-300 hover:text-erdton900"
        >
          Datenschutzerklärung
        </Link>
        .
      </p>
      <div className="mt-4 flex flex-wrap gap-3">
        <button
          ref={denyButtonRef}
          type="button"
          onClick={() => saveConsent("denied")}
          className="inline-flex min-h-[48px] items-center rounded-full border border-coverSand px-5 font-heading text-sm font-bold text-erdton900 transition-colors duration-300 hover:bg-coverSand/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coverKhaki focus-visible:ring-offset-2 focus-visible:ring-offset-coverCanvas"
        >
          Ablehnen
        </button>
        <button
          ref={grantButtonRef}
          type="button"
          onClick={() => saveConsent("granted")}
          className="inline-flex min-h-[56px] items-center rounded-full bg-coverRosa px-5 font-heading text-sm font-bold text-white transition-colors duration-300 hover:bg-[#c28f8e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coverKhaki focus-visible:ring-offset-2 focus-visible:ring-offset-coverCanvas"
        >
          Einwilligen
        </button>
      </div>
    </aside>
  );
}
