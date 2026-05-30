import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";

export const metadata: Metadata = {
  title: "Impressum – Frauenkram",
  description: "Impressum und Anbieterkennzeichnung für Frauenkram.",
};

export default function ImpressumPage() {
  return (
    <>
      <Header />
      <main className="px-6 py-12 md:px-10 md:py-16">
        <article className="mx-auto max-w-3xl">
          <Link
            href="/"
            className="inline-flex min-h-[48px] items-center font-body text-sm text-erdton900/70 underline-offset-4 transition-colors duration-300 hover:text-erdton900 hover:underline"
          >
            ← Zurück zur Startseite
          </Link>
          <h1 className="font-heading type-h2 mt-6 text-erdton900">Impressum</h1>
          <div className="font-body type-body mt-8 space-y-6 text-erdton900/85">
            <section>
              <h2 className="font-heading type-h3 text-erdton900">Angaben gemäß § 5 TMG</h2>
              <p className="mt-3 leading-relaxed">
                Carsta Pröstler
                <br />
                [Straße und Hausnummer]
                <br />
                [PLZ Ort]
              </p>
            </section>
            <section>
              <h2 className="font-heading type-h3 text-erdton900">Kontakt</h2>
              <p className="mt-3 leading-relaxed">
                Telefon: [Telefonnummer]
                <br />
                E-Mail: [E-Mail-Adresse]
              </p>
            </section>
            <section>
              <h2 className="font-heading type-h3 text-erdton900">Umsatzsteuer-ID</h2>
              <p className="mt-3 leading-relaxed">
                Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz: [USt-IdNr.]
              </p>
            </section>
            <section>
              <h2 className="font-heading type-h3 text-erdton900">Verantwortlich für den Inhalt</h2>
              <p className="mt-3 leading-relaxed">
                Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV: Carsta Pröstler, Anschrift wie oben.
              </p>
            </section>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
