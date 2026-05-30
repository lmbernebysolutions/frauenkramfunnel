import { problemCards } from "@/lib/content";

export default function ProblemSection() {
  return (
    <section className="bg-coverCanvas px-6 py-16 md:px-10 md:py-20">
      <div className="mx-auto max-w-4xl">
        <h2 className="font-heading type-h2 mx-auto max-w-2xl text-center text-erdton900">
          Warum Haut und Balance jetzt kippen
        </h2>
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
          {problemCards.map((card) => (
            <article key={card.id} className="rounded-3xl border border-coverSand bg-coverCanvas p-8">
              <h3 className="font-heading type-h3 text-erdton900">{card.title}</h3>
              <p className="font-body mt-3 text-xs leading-relaxed text-erdton900/80 md:text-sm">{card.body}</p>
            </article>
          ))}
        </div>
        <p className="font-body mt-8 rounded-2xl border border-coverSand bg-coverRosa/10 p-4 text-sm italic text-erdton900">
          Wichtiger Hinweis: Dieses Buch ist nicht für dich, wenn du nach schnellen chemischen Pflastern suchst.
          Es ist für dich, wenn du die wahren Ursachen verstehen und deinen Körper natürlich unterstützen willst.
        </p>
      </div>
    </section>
  );
}
