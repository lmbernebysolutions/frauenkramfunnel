import Image from "next/image";
import { socialProofItems } from "@/lib/content";

export default function SocialProof() {
  return (
    <section className="-mt-px bg-coverCanvas px-6 pb-14 pt-8 md:px-10 md:pb-16 md:pt-10">
      <div className="mx-auto max-w-5xl">
        <div className="surface-brand-gradient rounded-3xl border border-coverSand p-6 md:p-10">
          <p className="font-heading text-center text-sm font-bold uppercase tracking-[0.15em] text-erdton900 md:text-base">
            Tausenden Frauen aus der Seele gesprochen. Bekannt aus:
          </p>
          <ul className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
            {socialProofItems.map((item, index) => (
              <li
                key={item.id}
                className="group relative overflow-hidden rounded-2xl border border-coverKhaki/50 bg-coverCanvas p-5 text-center shadow-sm transition-shadow duration-300 hover:shadow-md md:text-left"
              >
                <span
                  className="font-heading absolute right-3 top-3 text-base font-bold leading-none text-coverSand/80 select-none md:text-lg"
                  aria-hidden="true"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="relative font-heading text-sm font-bold leading-snug tracking-wide text-erdton900 md:text-base">
                  {item.label}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
