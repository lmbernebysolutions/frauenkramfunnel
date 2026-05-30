"use client";

import { zIndexClass } from "@/lib/design-tokens";
import { CoverCircleDuo } from "./Icons";

export default function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-coverSalbei px-6 py-16 md:px-12 md:py-24">
      <CoverCircleDuo
        variant="salbei"
        placement="bottom-right"
        className={`absolute bottom-0 right-0 h-[min(70vw,560px)] w-full max-w-[620px] ${zIndexClass.circles}`}
      />
      <div className={`relative mx-auto max-w-4xl px-6 py-12 text-center md:px-12 ${zIndexClass.text}`}>
        <h2 className="font-heading type-h2 text-white">Befreien Sie Ihre Haut und Ihren Alltag.</h2>
        <p className="font-body type-body mt-5 text-white/90">
          Wählen Sie jetzt Ihr Paket. Entscheiden Sie sich für das Regenerations-Bundle und wir schenken Ihnen
          die Versandkosten.
        </p>
        <a
          href="#angebote"
          className="mt-7 inline-flex min-h-[56px] items-center justify-center rounded-full bg-coverRosa px-8 py-3 font-heading text-base font-bold text-white transition-colors duration-300 hover:bg-coverKhaki focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-coverSalbei"
        >
          → Jetzt Regenerations-Bundle sichern
        </a>
        <p className="font-body mt-4 text-sm text-white/85">
          Einmalige Investition in Ihre Hautgesundheit. Kein Abonnement, keine automatischen Folgelieferungen.
          14 Tage vollständige Zufriedenheitsgarantie.
        </p>
      </div>
    </section>
  );
}
