"use client";

import { type KeyboardEvent, useEffect, useRef, useState } from "react";
import type { ConsentStatus } from "@/lib/consent";
import { persistConsent, readStoredConsent } from "@/lib/consent";

export default function ConsentBanner() {
  const [status, setStatus] = useState<ConsentStatus>(null);
  const [isReady, setIsReady] = useState(false);
  const bannerRef = useRef<HTMLElement | null>(null);
  const denyButtonRef = useRef<HTMLButtonElement | null>(null);
  const grantButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    setStatus(readStoredConsent());
    setIsReady(true);
  }, []);

  const saveConsent = (nextStatus: Exclude<ConsentStatus, null>) => {
    persistConsent(nextStatus);
    setStatus(nextStatus);
  };

  useEffect(() => {
    if (!isReady || status) {
      return;
    }

    grantButtonRef.current?.focus();
  }, [isReady, status]);

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

  if (!isReady || status) {
    return null;
  }

  return (
    <aside
      ref={bannerRef}
      role="dialog"
      aria-labelledby="consent-title"
      aria-describedby="consent-description"
      onKeyDown={handleDialogKeyDown}
      className="fixed bottom-4 left-4 right-4 z-[60] rounded-2xl border border-stone-300 bg-coverCanvas p-4 shadow-lg md:left-auto md:max-w-xl"
    >
      <p id="consent-title" className="font-heading text-sm font-bold text-erdton900">
        Datenschutz & Einwilligung
      </p>
      <p id="consent-description" className="font-body mt-2 text-sm leading-relaxed text-stone-700">
        Wir nutzen Analyse- und Marketing-Technologien ausschließlich mit Ihrer ausdrücklichen Einwilligung.
      </p>
      <div className="mt-4 flex flex-wrap gap-3">
        <button
          ref={denyButtonRef}
          type="button"
          onClick={() => saveConsent("denied")}
          className="inline-flex min-h-[48px] items-center rounded-full border border-stone-300 px-5 font-heading text-sm font-bold text-stone-700 transition-colors duration-300 hover:bg-stone-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coverCanvas focus-visible:ring-offset-2 focus-visible:ring-offset-erdton900"
        >
          Ablehnen
        </button>
        <button
          ref={grantButtonRef}
          type="button"
          onClick={() => saveConsent("granted")}
          className="inline-flex min-h-[56px] items-center rounded-full bg-coverRosa px-5 font-heading text-sm font-bold text-erdton900 transition-colors duration-300 hover:bg-[#c28f8e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coverCanvas focus-visible:ring-offset-2 focus-visible:ring-offset-erdton900"
        >
          Einwilligen
        </button>
      </div>
    </aside>
  );
}
