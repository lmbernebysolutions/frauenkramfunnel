"use client";

import { useState } from "react";
import { faqItems } from "@/lib/content";
import { zIndexClass } from "@/lib/design-tokens";
import { ChevronIcon, HexagonIcon } from "./Icons";

export default function FaqSection() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <section id="faq" className="bg-coverCanvas px-6 py-16 md:px-10 md:py-20">
      <div className="mx-auto w-full max-w-3xl">
        <h2 className="font-heading type-h2 text-center text-erdton900">Häufige Fragen im Überblick</h2>
        <div className="surface-brand-gradient mt-8 overflow-hidden rounded-3xl border border-coverSand">
          {faqItems.map((item, index) => {
            const expanded = expandedId === item.id;
            const contentId = `faq-content-${item.id}`;
            const edgeCutStyle = {
              clipPath: "polygon(28px 0, 100% 0, 100% 100%, 28px 100%, 0 48px)",
            };

            return (
              <div key={item.id} className={index > 0 ? "border-t border-coverSand/80" : ""}>
                <button
                  type="button"
                  aria-expanded={expanded}
                  aria-controls={contentId}
                  onClick={() => setExpandedId(expanded ? null : item.id)}
                  className={`group flex min-h-[72px] w-full items-center justify-between gap-4 px-5 py-5 text-left transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coverKhaki focus-visible:ring-offset-2 focus-visible:ring-offset-coverCanvas md:min-h-[80px] md:px-6 ${
                    expanded ? "bg-coverSalbei/10" : "hover:bg-coverSand/35"
                  }`}
                  style={edgeCutStyle}
                >
                  <h3 className="font-heading type-h3 pr-2 font-bold leading-snug text-erdton900">{item.question}</h3>
                  <span className={`relative inline-flex h-12 w-12 flex-shrink-0 items-center justify-center text-erdton900/50 transition-all duration-300 group-hover:text-coverKhaki ${zIndexClass.hexagons}`}>
                    <HexagonIcon
                      className={`absolute h-10 w-10 transition-transform duration-300 ${expanded ? "rotate-45" : "group-hover:rotate-45"}`}
                    />
                    <ChevronIcon
                      className={`relative h-4 w-4 transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
                    />
                  </span>
                </button>
                <div
                  id={contentId}
                  className={`grid overflow-hidden transition-all duration-300 ease-in-out ${
                    expanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="font-body type-body border-t border-coverSand/60 bg-coverCanvas/70 px-5 pb-5 pt-4 text-erdton900/85 md:px-6">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
