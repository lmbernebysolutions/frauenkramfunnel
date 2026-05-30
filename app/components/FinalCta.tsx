"use client";

import { zIndexClass } from "@/lib/design-tokens";
import { CoverCircleDuo } from "./Icons";
import { SectionBlendBottom, SectionBlendTop } from "./SectionWave";

export default function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-coverSalbei px-6 pb-16 pt-14 md:px-12 md:pb-20 md:pt-20">
      <SectionBlendTop color="#fdfbf7" />
      <CoverCircleDuo
        variant="salbei"
        placement="bottom-right"
        className={`absolute bottom-0 right-0 h-[min(70vw,560px)] w-full max-w-[620px] ${zIndexClass.circles}`}
      />
      <div className={`relative mx-auto max-w-4xl px-6 py-6 text-center md:px-12 md:py-8 ${zIndexClass.text}`}>
        <h2 className="font-heading type-h2 text-white">Befreie deine Haut und deinen Alltag.</h2>
        <p className="font-body type-body mt-5 text-white/90">
          Wähle jetzt dein Paket. Entscheide dich für das Regenerations-Bundle und wir schenken dir die
          Versandkosten.
        </p>
        <a
          href="#angebote"
          className="mt-7 inline-flex min-h-[56px] items-center justify-center rounded-full bg-coverRosa px-8 py-3 font-heading text-base font-bold text-white transition-colors duration-300 hover:bg-coverKhaki focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-coverSalbei"
        >
          → Jetzt Regenerations-Bundle sichern
        </a>
        <p className="font-body mt-4 text-sm text-white/85">
          Einmalige Investition in deine Hautgesundheit. Kein Abonnement, keine automatischen Folgelieferungen.
          14 Tage vollständige Zufriedenheitsgarantie.
        </p>
      </div>
      <SectionBlendBottom color="#fdfbf7" />
    </section>
  );
}
