"use client";

import { useState } from "react";
import { dispatchCapiEvent, trackCommerceAddToCart } from "@/lib/analytics";
import { pricingOptions, pricingTimeline } from "@/lib/content";
import { CheckoutError, redirectToShopifyCheckout } from "@/lib/shopify";
import { zIndexClass } from "@/lib/design-tokens";
import { validatePricingOption } from "@/lib/pricing-validation";
import { HexagonCluster } from "./Icons";
import { PricingProductVisual } from "./PricingProductVisual";

export default function PricingSection() {
  const [selectedOption, setSelectedOption] = useState<"guide" | "bundle" | null>(null);
  const [marketingOptIn, setMarketingOptIn] = useState(false);
  const [checkoutState, setCheckoutState] = useState<"idle" | "processing">("idle");
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  const validationByOption = Object.fromEntries(
    pricingOptions.map((option) => [option.id, validatePricingOption(option)]),
  ) as Record<"guide" | "bundle", string[]>;

  const hasValidSelection = selectedOption !== null;
  const selectedOptionErrors = selectedOption ? validationByOption[selectedOption] : [];
  const hasSelectedOptionErrors = selectedOptionErrors.length > 0;
  const hasOtherOptionErrors = Object.entries(validationByOption).some(
    ([optionId, errors]) => optionId !== selectedOption && errors.length > 0,
  );
  const canCheckout = hasValidSelection && !hasSelectedOptionErrors && checkoutState === "idle";

  const handleCheckout = async () => {
    if (!canCheckout || !selectedOption) {
      return;
    }

    setCheckoutError(null);
    setCheckoutState("processing");

    try {
      trackCommerceAddToCart(selectedOption);
      await dispatchCapiEvent("InitiateCheckout", {
        selected_package: selectedOption,
        marketing_opt_in: marketingOptIn,
        funnel_step: "pricing_section",
      });
      await redirectToShopifyCheckout(selectedOption);
    } catch (error) {
      const message =
        error instanceof CheckoutError
          ? error.message
          : "Checkout konnte nicht gestartet werden. Bitte versuche es erneut.";
      setCheckoutError(message);
      setCheckoutState("idle");
    }
  };

  return (
    <section id="angebote" className="bg-coverCanvas px-6 py-16 md:px-10 md:py-20">
      <div className="mx-auto max-w-4xl">
        <h2 className="text-center text-balance font-heading type-h2 text-erdton900">
          So stabilisierst du Haut und Hormone
        </h2>
        <ol className="mt-6 space-y-2">
          {pricingTimeline.map((item) => (
            <li key={item} className="font-body type-body text-erdton900/80">
              • {item}
            </li>
          ))}
        </ol>
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 md:items-center md:gap-5">
          {pricingOptions.map((option) => {
            const isSelected = selectedOption === option.id;
            const isBundle = option.id === "bundle";
            const cardLayerClass = isBundle
              ? "order-1 z-20 md:scale-[1.05]"
              : "order-2 z-10";
            const exactOfferCopy =
              option.id === "guide"
                ? "Der Praxis-Ratgeber | „Frauenkram: Haut und Wechseljahre\" — vollgepackt mit Fachwissen und Routinen. Das theoretische Fachfundament für den Wandel."
                : "Das Regenerations-Bundle | „Frauenkram\" (Taschenbuch) + Lovely Body Oil. Unterstütze deine Haut zusätzlich von außen mit diesem nährenden, exklusiven Körperöl.";

            return (
              <div
                key={option.id}
                className={`relative rounded-3xl border-2 transition-all duration-300 ${cardLayerClass} ${
                  isSelected
                    ? "border-coverSalbei bg-coverSalbeiSoft shadow-lg ring-2 ring-coverKhaki ring-offset-2 ring-offset-coverCanvas"
                    : "border-coverSand bg-coverCanvas shadow-sm hover:border-coverKhaki/70"
                }`}
              >
                <button
                  type="button"
                  onClick={() => {
                    setSelectedOption(option.id);
                    setCheckoutError(null);
                  }}
                  aria-pressed={isSelected}
                  aria-label={`${option.name} – ${isSelected ? "ausgewählt" : "nicht ausgewählt"}`}
                  className="w-full rounded-3xl p-6 text-left"
                >
                <span
                  className={`relative mb-4 inline-flex min-h-[32px] items-center gap-2 rounded-full px-3 py-1 font-heading text-xs font-bold uppercase tracking-wide ${zIndexClass.text} ${
                    isSelected
                      ? "bg-coverSalbei text-white"
                      : "border border-coverSand bg-coverCanvas text-erdton900/55"
                  }`}
                  aria-hidden="true"
                >
                  <span
                    className={`inline-flex h-4 w-4 items-center justify-center rounded-full border-2 ${
                      isSelected ? "border-white bg-white text-coverSalbei" : "border-coverKhaki bg-coverCanvas"
                    }`}
                  >
                    {isSelected ? (
                      <svg viewBox="0 0 12 12" className="h-2.5 w-2.5" aria-hidden="true">
                        <path
                          d="M2.5 6.2L5.1 8.8L9.5 3.8"
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.8"
                        />
                      </svg>
                    ) : null}
                  </span>
                  {isSelected ? "Deine Auswahl" : "Paket wählen"}
                </span>
                <PricingProductVisual variant={option.id} />
                {isBundle ? (
                  <HexagonCluster
                    variant="pricing"
                    className={`pointer-events-none absolute -right-6 -top-8 h-32 w-44 opacity-80 ${zIndexClass.hexagons}`}
                  />
                ) : null}
                {option.isBestseller ? (
                  <>
                    <span
                      className={`absolute left-5 top-0 inline-flex -translate-y-1/2 items-center bg-coverKhaki px-4 py-1 font-heading text-xs font-bold text-erdton900 shadow-sm ${zIndexClass.product}`}
                      style={{ clipPath: "polygon(0 0, 92% 0, 100% 50%, 92% 100%, 0 100%, 6% 50%)" }}
                    >
                      BESTSELLER
                    </span>
                    <span className="sr-only">Bestseller-Paket</span>
                  </>
                ) : null}
                <h3 className={`relative font-heading type-h3 text-erdton900 ${zIndexClass.text}`}>{option.name}</h3>
                <p className={`relative font-body mt-2 text-sm leading-relaxed text-erdton900/80 ${zIndexClass.text}`}>{exactOfferCopy}</p>
                {option.compareAtPriceLabel ? (
                  <p className={`relative font-body mt-4 text-sm text-erdton900/60 ${zIndexClass.text}`}>
                    <span className="sr-only">Normalpreis </span>
                    <span aria-hidden="true" className="line-through decoration-erdton900/40">
                      {option.compareAtPriceLabel}
                    </span>
                  </p>
                ) : null}
                <p
                  className={`relative font-heading text-lg font-bold text-erdton900 ${zIndexClass.text} ${
                    option.compareAtPriceLabel ? "mt-1" : "mt-4"
                  }`}
                >
                  {option.priceLabel}
                </p>
                <p className={`relative font-body mt-1 text-xs text-erdton900/75 ${zIndexClass.text}`}>{option.vatLabel}</p>
                {option.savingsLabel ? (
                  <p
                    className={`relative font-heading mt-2 text-sm font-bold text-coverSalbei ${zIndexClass.text}`}
                  >
                    {option.savingsLabel}
                  </p>
                ) : null}
                {option.shippingLabel ? (
                  <p className={`relative font-body mt-2 text-sm text-erdton900/80 ${zIndexClass.text}`}>
                    {option.shippingLabel}
                  </p>
                ) : null}
                {validationByOption[option.id].length > 0 ? (
                  <ul className={`relative mt-3 space-y-1 text-xs text-erdton900/80 ${zIndexClass.text}`}>
                    {validationByOption[option.id].map((error) => (
                      <li key={error}>• {error}</li>
                    ))}
                  </ul>
                ) : null}
                </button>
                {option.learnMoreLink ? (
                  <div className="border-t border-coverSand/70 px-6 pb-5 pt-3">
                    <a
                      href={option.learnMoreLink.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-[48px] items-center font-body text-sm text-erdton900/70 underline-offset-4 transition-colors duration-300 hover:text-erdton900 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coverKhaki focus-visible:ring-offset-2 focus-visible:ring-offset-coverCanvas"
                    >
                      {option.learnMoreLink.label}
                    </a>
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
        <div className="surface-brand-gradient mt-8 rounded-3xl border border-coverSand p-6">
          <div className="flex min-h-[48px] items-center">
            <label
              htmlFor="marketing-opt-in"
              className="flex min-h-[48px] w-full cursor-pointer items-center gap-3 rounded-xl px-1"
            >
              <input
                id="marketing-opt-in"
                type="checkbox"
                checked={marketingOptIn}
                onChange={(event) => setMarketingOptIn(event.target.checked)}
                className="h-5 w-5 rounded border-coverSand accent-coverRosa focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coverCanvas focus-visible:ring-offset-2 focus-visible:ring-offset-erdton900"
              />
              <span className="font-body text-sm leading-relaxed text-erdton900/85">
                Ja, ich möchte optional Informationen zu neuen Inhalten, Workshops und Angeboten erhalten.
              </span>
            </label>
          </div>
          <p className="font-body mt-2 text-xs text-erdton900/75">
            Diese Einwilligung ist freiwillig und keine Voraussetzung für den Kauf.
          </p>
          {!hasValidSelection ? (
            <p className="font-body mt-4 text-sm text-erdton900/80" role="status" aria-live="polite">
              Bitte wähle zuerst ein Paket aus, um mit dem Checkout fortzufahren.
            </p>
          ) : (
            <p className="font-body mt-4 text-sm font-medium text-erdton900" role="status" aria-live="polite">
              Gewählt:{" "}
              <span className="font-heading font-bold">
                {pricingOptions.find((option) => option.id === selectedOption)?.name}
              </span>
            </p>
          )}
          {hasSelectedOptionErrors ? (
            <p className="font-body mt-4 text-sm text-erdton900/80" role="status" aria-live="polite">
              Checkout ist derzeit blockiert, weil beim gewählten Paket Pflichtangaben zu Preis, MwSt. oder Versand nicht vollständig sind.
            </p>
          ) : null}
          {hasOtherOptionErrors ? (
            <p className="font-body mt-2 text-xs text-erdton900/75" role="status" aria-live="polite">
              Hinweis: Nicht ausgewählte Pakete enthalten derzeit inkonsistente Pflichtangaben.
            </p>
          ) : null}
          {checkoutError ? (
            <p className="font-body mt-4 text-sm text-erdton900" role="alert">
              {checkoutError}
            </p>
          ) : null}
          <button
            type="button"
            onClick={handleCheckout}
            disabled={!canCheckout}
            aria-disabled={!canCheckout}
            className={`mt-6 inline-flex min-h-[56px] w-full items-center justify-center rounded-full px-6 py-3 font-heading text-base font-bold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coverKhaki focus-visible:ring-offset-2 focus-visible:ring-offset-coverCanvas ${
              canCheckout
                ? "bg-coverRosa text-white hover:bg-[#c28f8e] focus-visible:ring-coverCanvas focus-visible:ring-offset-erdton900"
                : "cursor-not-allowed border border-coverSand/80 bg-coverSand/35 text-erdton900/50"
            } ${checkoutState === "processing" ? "cursor-wait opacity-80" : ""}`}
          >
            {checkoutState === "processing" ? "Checkout wird vorbereitet..." : "→ Weiter zum Checkout"}
          </button>
        </div>
      </div>
    </section>
  );
}
