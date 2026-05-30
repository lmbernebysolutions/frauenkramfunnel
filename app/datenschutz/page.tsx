import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";

export const metadata: Metadata = {
  title: "Datenschutzerklärung – Frauenkram",
  description: "Datenschutzerklärung für den Frauenkram Funnel.",
};

export default function DatenschutzPage() {
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
          <h1 className="font-heading type-h2 mt-6 text-erdton900">Datenschutzerklärung</h1>
          <div className="font-body type-body mt-8 space-y-6 text-erdton900/85">
            <section>
              <h2 className="font-heading type-h3 text-erdton900">1. Verantwortliche Stelle</h2>
              <p className="mt-3 leading-relaxed">
                Verantwortlich für die Datenverarbeitung auf dieser Website ist Carsta Pröstler, [Anschrift]. Kontakt:
                [E-Mail-Adresse].
              </p>
            </section>
            <section>
              <h2 className="font-heading type-h3 text-erdton900">2. Hosting und Server-Logfiles</h2>
              <p className="mt-3 leading-relaxed">
                Beim Aufruf dieser Website werden technisch notwendige Daten (z. B. IP-Adresse, Zeitpunkt des Zugriffs,
                Browsertyp) in Server-Logfiles verarbeitet, um den sicheren Betrieb der Seite zu gewährleisten.
              </p>
            </section>
            <section>
              <h2 className="font-heading type-h3 text-erdton900">3. Einwilligung für Analyse- und Marketing-Tools</h2>
              <p className="mt-3 leading-relaxed">
                Tracking-Technologien (z. B. Google Tag Manager, Meta Pixel) werden erst nach Ihrer ausdrücklichen
                Einwilligung über den Consent-Banner aktiviert. Die Entscheidung wird lokal gespeichert
                (`frauenkram_analytics_consent`). Sie können Ihre Einwilligung jederzeit widerrufen, indem Sie die
                gespeicherten Website-Daten in Ihrem Browser löschen.
              </p>
            </section>
            <section>
              <h2 className="font-heading type-h3 text-erdton900">4. Checkout und Bestellabwicklung</h2>
              <p className="mt-3 leading-relaxed">
                Für die Bestellabwicklung werden Sie an den externen Checkout-Anbieter (Shopify) weitergeleitet. Dort
                gelten die Datenschutzbestimmungen des jeweiligen Anbieters.
              </p>
            </section>
            <section>
              <h2 className="font-heading type-h3 text-erdton900">5. Ihre Rechte</h2>
              <p className="mt-3 leading-relaxed">
                Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Widerspruch
                und Datenübertragbarkeit im Rahmen der gesetzlichen Vorgaben. Wenden Sie sich hierfür an die oben
                genannte verantwortliche Stelle.
              </p>
            </section>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
