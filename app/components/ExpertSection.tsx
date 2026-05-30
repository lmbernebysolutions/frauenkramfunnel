import Image from "next/image";
import { expertContent, testimonials } from "@/lib/content";
import { zIndexClass } from "@/lib/design-tokens";
import { CoverGreenCircle } from "./Icons";

export default function ExpertSection() {
  return (
    <section className="bg-coverCanvas px-6 py-16 md:px-10 md:py-20">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-start gap-12 lg:grid-cols-12">
        <div className={`relative lg:col-span-7 ${zIndexClass.canvas}`}>
          <CoverGreenCircle
            variant="canvas"
            className={`absolute -left-6 -top-8 h-56 w-[min(80vw,360px)] md:-left-10 md:h-72 md:w-[400px] ${zIndexClass.circles}`}
          />
          <div className={`relative mb-6 max-w-sm overflow-hidden rounded-3xl border border-coverSand bg-coverCanvas shadow-md ${zIndexClass.product}`}>
            <Image
              src="/images/frontales-portrait.webp"
              alt="Porträt von Carsta Pröstler"
              width={360}
              height={450}
              className="h-auto w-full object-cover"
            />
          </div>
          <h2 className={`relative font-heading type-h2 text-erdton900 ${zIndexClass.text}`}>{expertContent.headline}</h2>
          <p className={`relative font-body type-body mt-5 text-erdton900/80 ${zIndexClass.text}`}>{expertContent.story}</p>
        </div>

        <div className="relative space-y-5 lg:col-span-5">
          {testimonials.map((testimonial) => (
            <article
              key={testimonial.id}
              className="surface-brand-gradient rounded-3xl border border-coverSand bg-coverCanvas p-6 shadow-sm"
            >
              <p className="font-heading text-base font-bold text-erdton900">
                {testimonial.name} ({testimonial.age})
              </p>
              <p className="mt-2 inline-flex rounded-md bg-coverSalbei/20 px-2 py-1 font-heading text-[10px] font-bold uppercase tracking-wide text-erdton900">
                {testimonial.badgeLabel}
              </p>
              <p className="font-body mt-4 text-base leading-relaxed text-erdton900">{testimonial.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
