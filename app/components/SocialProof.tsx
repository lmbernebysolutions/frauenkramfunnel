import Image from "next/image";
import { socialProofItems } from "@/lib/content";

export default function SocialProof() {
  return (
    <section className="relative bg-coverCanvas text-erdton900">
      <div className="relative h-[48px] w-full">
        <svg
          className="absolute bottom-0 left-0 h-[48px] w-full"
          viewBox="0 0 100 48"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <polygon points="0,0 100,0 100,48 0,36" fill="#fdfbf7" />
        </svg>
      </div>

      <div className="px-6 pb-14 pt-4 md:px-10 md:pb-16">
        <div className="mx-auto max-w-5xl">
          <div className="surface-brand-gradient rounded-3xl border border-coverSand p-6 md:p-10">
            <div className="flex flex-col items-center gap-8 md:flex-row md:items-start md:gap-10">
              <div className="flex shrink-0 flex-col items-center md:items-start">
                <div className="rounded-2xl border border-coverSand/80 bg-coverCanvas px-5 py-4 shadow-sm">
                  <Image
                    src="/images/balance-institut-logo.webp"
                    alt="Balance Institut – Carsta Pröstler, Expertin für Haut und Wechseljahre"
                    width={220}
                    height={155}
                    className="h-auto w-[180px] md:w-[220px]"
                  />
                </div>
              </div>

              <div className="flex-1 text-center md:text-left">
                <p className="font-heading text-xs font-bold uppercase tracking-[0.2em] text-coverKhaki">
                  Vertrauen &amp; Erfahrung
                </p>
                <h2 className="font-heading type-h3 mt-3 text-erdton900 md:max-w-xl">
                  Tausenden Frauen aus der Seele gesprochen.
                </h2>
                <p className="font-body mt-3 text-sm leading-relaxed text-erdton900/80 md:text-base">
                  Als Expertin für Haut und Wechseljahre teilt Carsta Pröstler ihr Wissen dort, wo Frauen
                  wirklich ankommen:
                </p>
              </div>
            </div>

            <div className="mt-8 border-t border-coverSand/80 pt-8">
              <p className="font-heading text-center text-sm font-bold uppercase tracking-[0.18em] text-erdton900 md:text-left">
                Bekannt aus
              </p>
              <ul className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-3">
                {socialProofItems.map((item, index) => (
                  <li
                    key={item.id}
                    className="group relative overflow-hidden rounded-2xl border border-coverKhaki/50 bg-coverCanvas p-5 shadow-sm transition-shadow duration-300 hover:shadow-md"
                  >
                    <span
                      className="font-heading absolute -right-1 -top-3 text-5xl font-bold leading-none text-coverSand select-none"
                      aria-hidden="true"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="relative inline-flex rounded-full bg-coverSalbei/15 px-3 py-1 font-heading text-[10px] font-bold uppercase tracking-widest text-erdton900">
                      Format {index + 1}
                    </span>
                    <p className="relative mt-3 font-heading text-sm font-bold leading-snug tracking-wide text-erdton900 md:text-base">
                      {item.label}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
