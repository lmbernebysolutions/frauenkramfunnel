import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Impressum",
  description: "Impressum und Anbieterkennzeichnung für den Frauenkram Funnel.",
};

export default function ImpressumPage() {
  const { contact, tax, odrUrl } = siteConfig;

  return (
    <>
      <Header />
      <main className="px-6 py-12 md:px-10 md:py-16">
        <article className="mx-auto max-w-3xl">
          <Link
            href="/"
            className="inline-flex min-h-[48px] items-center font-body text-sm text-erdton900/70 underline-offset-4 transition-colors duration-300 hover:text-erdton900 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coverKhaki focus-visible:ring-offset-2 focus-visible:ring-offset-coverCanvas"
          >
            ← Zurück zur Startseite
          </Link>
          <h1 className="font-heading type-h2 mt-6 text-erdton900">Impressum</h1>
          <div className="font-body type-body mt-8 space-y-8 text-erdton900/85">
            <section>
              <h2 className="font-heading type-h3 text-erdton900">Angaben gemäß § 5 TMG</h2>
              <p className="mt-3 leading-relaxed">
                Inhaberin: {siteConfig.legalName}
                <br />
                {contact.street}
                <br />
                {contact.postalCode} {contact.city}
              </p>
              <p className="mt-3 leading-relaxed">{tax.note}</p>
            </section>

            <section>
              <h2 className="font-heading type-h3 text-erdton900">Kontakt</h2>
              <p className="mt-3 leading-relaxed">
                Telefon:{" "}
                <a href={`tel:${contact.phone.replace(/\s/g, "")}`} className="underline underline-offset-4">
                  {contact.phoneDisplay}
                </a>
                <br />
                E-Mail:{" "}
                <a href={`mailto:${contact.email}`} className="underline underline-offset-4">
                  {contact.email}
                </a>
              </p>
            </section>

            <section>
              <h2 className="font-heading type-h3 text-erdton900">Online-Verbraucherschlichtung</h2>
              <p className="mt-3 leading-relaxed">
                Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{" "}
                <a href={odrUrl} className="underline underline-offset-4" target="_blank" rel="noopener noreferrer">
                  {odrUrl}
                </a>
                . Wir sind nicht verpflichtet und nicht bereit, an Streitbeilegungsverfahren vor einer
                Verbraucherschlichtungsstelle teilzunehmen.
              </p>
            </section>

            <section>
              <h2 className="font-heading type-h3 text-erdton900">Markenlogos & Bildnachweis</h2>
              <p className="mt-3 leading-relaxed">
                Alle hier gezeigten Markenlogos dienen lediglich der Beschreibung und sind Eigentum der jeweiligen
                Hersteller. Bildquellen: Fotolia.
              </p>
            </section>

            <section>
              <h2 className="font-heading type-h3 text-erdton900">Verantwortlich für den Inhalt</h2>
              <p className="mt-3 leading-relaxed">
                Für den Inhalt dieser Website verantwortlich im Sinne des § 6 des Vertrages über Mediendienste ist{" "}
                {siteConfig.legalName}. Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV: {siteConfig.legalName},
                Anschrift wie oben.
              </p>
            </section>

            <section>
              <h2 className="font-heading type-h3 text-erdton900">Haftung für Inhalte</h2>
              <p className="mt-3 leading-relaxed">
                Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten nach den
                allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht
                verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu
                forschen, die auf eine rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung der
                Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche
                Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei
                Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
              </p>
            </section>

            <section>
              <h2 className="font-heading type-h3 text-erdton900">Haftung für Links</h2>
              <p className="mt-3 leading-relaxed">
                Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen Einfluss haben.
                Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der
                verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die
                verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft.
                Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar. Eine permanente inhaltliche
                Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht
                zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.
              </p>
            </section>

            <section>
              <h2 className="font-heading type-h3 text-erdton900">Urheberrecht</h2>
              <p className="mt-3 leading-relaxed">
                Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen
                Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der
                Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
                Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.
                Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter
                beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine
                Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden
                von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.
              </p>
              <p className="mt-3 text-sm text-erdton900/70">
                Quellverweis:{" "}
                <a
                  href="https://www.e-recht24.de"
                  className="underline underline-offset-4"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  e-recht24.de
                </a>
              </p>
            </section>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
