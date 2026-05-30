"use client";

import Image from "next/image";
import { heroContent } from "@/lib/content";
import { zIndexClass } from "@/lib/design-tokens";
import { CoverCircleDuo, HexagonCluster } from "./Icons";

export default function Hero() {
  return (
    <section className={`relative overflow-hidden bg-coverSalbei px-6 pb-14 pt-16 md:px-10 md:pb-16 md:pt-24 ${zIndexClass.canvas}`}>
      <CoverCircleDuo
        variant="salbei"
        className={`absolute left-0 top-0 h-[min(70vw,560px)] w-full max-w-[620px] ${zIndexClass.circles}`}
      />
      <HexagonCluster
        variant="hero"
        className={`pointer-events-none absolute bottom-4 right-[6%] hidden h-52 w-72 md:block ${zIndexClass.hexagons}`}
      />
      <HexagonCluster
        variant="hero"
        className={`pointer-events-none absolute bottom-2 left-1/2 block h-24 w-36 -translate-x-1/2 scale-50 md:hidden ${zIndexClass.hexagons}`}
      />
      <div className="relative mx-auto flex w-full max-w-4xl flex-col items-center text-center">
        <p className={`relative font-heading type-micro mb-5 max-w-3xl text-white tracking-widest ${zIndexClass.text}`}>
          {heroContent.preHeadline}
        </p>
        <h1 className={`relative font-heading type-h1 text-white ${zIndexClass.text}`}>{heroContent.headline}</h1>
        <p
          className={`relative font-body mt-4 max-w-[21rem] text-pretty text-sm leading-snug text-white/90 sm:mt-5 sm:max-w-xl sm:text-[0.9375rem] sm:leading-relaxed md:max-w-2xl md:text-base md:leading-relaxed lg:max-w-3xl ${zIndexClass.text}`}
        >
          {heroContent.subHeadline}
        </p>
        <p className={`relative font-body mt-8 text-sm text-white/90 ${zIndexClass.text}`}>{heroContent.confidenceCue}</p>
        <a
          href="#angebote"
          className={`mt-4 inline-flex min-h-[56px] items-center justify-center rounded-full bg-coverRosa px-7 py-3 font-heading text-base font-bold text-white shadow-md transition-all duration-300 hover:bg-[#c28f8e] hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-coverSalbei active:scale-[0.97] active:shadow-none ${zIndexClass.cta}`}
        >
          {heroContent.ctaLabel}
        </a>
        <ul className="font-body mt-4 flex flex-col items-center gap-1 text-sm text-white/90 md:flex-row md:gap-0">
          {heroContent.microcopyLines.map((line, index) => (
            <li key={line} className="flex items-center">
              {index > 0 ? (
                <span className="mx-2 hidden text-white/70 md:inline" aria-hidden="true">
                  |
                </span>
              ) : null}
              {line}
            </li>
          ))}
        </ul>
      </div>
      <div className={`relative mx-auto mt-8 w-[255px] pb-8 md:w-[315px] md:pb-10 ${zIndexClass.product}`}>
        <Image
          src="/images/buchcover-ohne-text.webp"
          alt="Buchcover Frauenkram: Haut und Wechseljahre"
          width={315}
          height={420}
          priority
          sizes="(max-width: 768px) 255px, 315px"
          className="h-auto w-full rounded-2xl object-cover shadow-xl"
        />
        <p className="absolute -bottom-5 left-1/2 w-[240px] -translate-x-1/2 rounded-full border border-coverKhaki/50 bg-coverRosa/95 px-4 py-2 text-center font-heading text-xs font-bold text-white shadow-md md:w-[290px]">
          {heroContent.expertBadge}
        </p>
      </div>
    </section>
  );
}
