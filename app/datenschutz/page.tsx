import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import { CONSENT_STORAGE_KEY } from "@/lib/consent";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Datenschutzerklärung",
  description: "Datenschutzerklärung für den Frauenkram Landingpage-Funnel.",
};

export default function DatenschutzPage() {
  const { contact, shopifyPrivacyUrl, googlePrivacyUrl, googleAnalyticsOptOutUrl, url } = siteConfig;

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
          <h1 className="font-heading type-h2 mt-6 text-erdton900">Datenschutzerklärung</h1>
          <p className="font-body type-body mt-4 text-erdton900/85">
            Diese Datenschutzerklärung beschreibt, wie {siteConfig.legalName} personenbezogene Daten erfasst, verwendet
            und weitergibt, wenn du die Landingpage unter{" "}
            <a href={url} className="underline underline-offset-4">
              {url}
            </a>{" "}
            (die „Website“) nutzt oder dort ein Produkt bestellst.
          </p>

          <div className="font-body type-body mt-8 space-y-8 text-erdton900/85">
            <section>
              <h2 className="font-heading type-h3 text-erdton900">1. Verantwortliche Stelle</h2>
              <p className="mt-3 leading-relaxed">
                {siteConfig.legalName}
                <br />
                {contact.street}
                <br />
                {contact.postalCode} {contact.city}, {contact.country}
                <br />
                E-Mail:{" "}
                <a href={`mailto:${contact.email}`} className="underline underline-offset-4">
                  {contact.email}
                </a>
                <br />
                Telefon:{" "}
                <a href={`tel:${contact.phone.replace(/\s/g, "")}`} className="underline underline-offset-4">
                  {contact.phoneDisplay}
                </a>
              </p>
            </section>

            <section>
              <h2 className="font-heading type-h3 text-erdton900">2. Von uns erfasste personenbezogene Daten</h2>
              <h3 className="font-heading mt-4 text-base font-bold text-erdton900">Geräteinformationen</h3>
              <p className="mt-2 leading-relaxed">
                Wenn du die Website besuchst, erfassen wir automatisch bestimmte Informationen über dein Gerät,
                darunter Informationen zum Webbrowser, der IP-Adresse, der Zeitzone und einigen Cookies, die auf deinem
                Gerät installiert sind. Wenn du auf der Website navigierst, erfassen wir außerdem Informationen zu den
                aufgerufenen Seiten, zu Referrer- und Suchbegriffen sowie darüber, wie du mit der Website interagierst.
                Wir bezeichnen diese automatisch erfassten Informationen als „Geräteinformationen“.
              </p>
              <p className="mt-3 leading-relaxed">Wir erfassen Geräteinformationen mithilfe folgender Technologien:</p>
              <ul className="mt-2 list-disc space-y-2 pl-5">
                <li>
                  <strong>Cookies</strong> sind Datendateien auf deinem Gerät. Weitere Informationen findest du unter{" "}
                  <a
                    href="https://www.allaboutcookies.org"
                    className="underline underline-offset-4"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    allaboutcookies.org
                  </a>
                  .
                </li>
                <li>
                  <strong>Protokolldateien</strong> protokollieren Aktionen auf der Website (z. B. IP-Adresse,
                  Browsertyp, Internetdienstanbieter, verweisende/Ausstiegsseiten, Datums-/Uhrzeitstempel).
                </li>
                <li>
                  <strong>Web Beacons, Tags und Pixel</strong> erfassen Informationen dazu, wie du auf der Website
                  navigierst.
                </li>
              </ul>
              <h3 className="font-heading mt-6 text-base font-bold text-erdton900">Bestellinformationen</h3>
              <p className="mt-2 leading-relaxed">
                Wenn du auf der Website ein Paket auswählst und den Checkout startest, wirst du zu unserem
                Shopify-Onlineshop weitergeleitet. Dort werden bei einem Kauf oder Kaufversuch personenbezogene Daten
                wie Name, Rechnungs- und Lieferadresse, Zahlungsinformationen, E-Mail-Adresse und Telefonnummer
                verarbeitet. Wir bezeichnen diese Angaben als „Bestellinformationen“. Die Verarbeitung im Checkout
                erfolgt durch Shopify als Auftragsverarbeiter.
              </p>
              <p className="mt-3 leading-relaxed">
                Mit „personenbezogene Daten“ in dieser Erklärung bezeichnen wir Geräteinformationen und
                Bestellinformationen, soweit sie im Zusammenhang mit dieser Website anfallen.
              </p>
            </section>

            <section>
              <h2 className="font-heading type-h3 text-erdton900">3. Hosting dieser Landingpage</h2>
              <p className="mt-3 leading-relaxed">
                Diese Landingpage wird bei Vercel Inc. gehostet. Beim Aufruf werden technisch notwendige Daten (z. B.
                IP-Adresse, Zeitpunkt des Zugriffs, Browsertyp, angeforderte URL) in Server-Logfiles verarbeitet, um den
                sicheren und stabilen Betrieb zu gewährleisten. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO
                (berechtigtes Interesse an einem sicheren Webauftritt).
              </p>
            </section>

            <section>
              <h2 className="font-heading type-h3 text-erdton900">4. Einwilligung für Analyse- und Marketing-Tools</h2>
              <p className="mt-3 leading-relaxed">
                Tracking-Technologien (Google Tag Manager, Meta Pixel) und serverseitige Conversion-Erfassung (Meta
                Conversions API über unseren First-Party-Endpunkt <code className="text-sm">/api/capi-proxy</code>)
                werden <strong>erst nach deiner ausdrücklichen Einwilligung</strong> über den Consent-Banner aktiviert.
                Die Entscheidung wird lokal unter dem Schlüssel{" "}
                <code className="text-sm">{CONSENT_STORAGE_KEY}</code> gespeichert und zusätzlich in einem signierten,
                HTTP-only-Cookie für serverseitige Prüfungen abgelegt. Du kannst deine Einwilligung jederzeit widerrufen,
                indem du die Website-Daten in deinem Browser löschst.
              </p>
              <p className="mt-3 leading-relaxed">
                Ohne Einwilligung werden keine Marketing-Skripte geladen und keine Events an Meta weitergeleitet.
              </p>
            </section>

            <section>
              <h2 className="font-heading type-h3 text-erdton900">
                5. Wie verwenden wir deine personenbezogenen Daten?
              </h2>
              <p className="mt-3 leading-relaxed">
                Wir verwenden Bestellinformationen zur Ausführung von Bestellungen über Shopify (Zahlungsabwicklung,
                Versand, Rechnungen/Bestellbestätigungen), zur Kommunikation mit dir, zur Betrugsprüfung und – sofern du
                dem optionalen Marketing-Opt-in zugestimmt hast – für Informationen zu Produkten und Angeboten.
              </p>
              <p className="mt-3 leading-relaxed">
                Geräteinformationen nutzen wir – nur bei erteilter Einwilligung – zur Risiko- und Betrugsprüfung sowie zur
                Verbesserung und Optimierung unserer Website und Marketingmaßnahmen.
              </p>
            </section>

            <section>
              <h2 className="font-heading type-h3 text-erdton900">6. Weitergabe deiner personenbezogenen Daten</h2>
              <p className="mt-3 leading-relaxed">
                Wir geben personenbezogene Daten an Dienstleister weiter, die uns bei der Nutzung wie oben beschrieben
                unterstützen, z. B.:
              </p>
              <ul className="mt-2 list-disc space-y-2 pl-5">
                <li>
                  <strong>Shopify</strong> für den Onlineshop und Checkout:{" "}
                  <a
                    href={shopifyPrivacyUrl}
                    className="underline underline-offset-4"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Shopify Datenschutz
                  </a>
                </li>
                <li>
                  <strong>Google Analytics / Google Tag Manager</strong> (nur nach Einwilligung):{" "}
                  <a
                    href={googlePrivacyUrl}
                    className="underline underline-offset-4"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Google Datenschutz
                  </a>
                  , Opt-out:{" "}
                  <a
                    href={googleAnalyticsOptOutUrl}
                    className="underline underline-offset-4"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Google Analytics deaktivieren
                  </a>
                </li>
                <li>
                  <strong>Meta Platforms</strong> (Meta Pixel und Conversions API, nur nach Einwilligung) für
                  Kampagnenmessung
                </li>
                <li>
                  <strong>Vercel</strong> für Hosting dieser Landingpage
                </li>
              </ul>
              <p className="mt-3 leading-relaxed">
                Wir können Daten weitergeben, um gesetzliche Pflichten zu erfüllen oder unsere Rechte zu schützen.
              </p>
            </section>

            <section>
              <h2 className="font-heading type-h3 text-erdton900">
                7. Meta Conversion-Tracking (Pixel & Conversions API)
              </h2>
              <p className="mt-3 leading-relaxed">
                Zur Optimierung unserer Werbemaßnahmen setzen wir – nur nach Einwilligung – Meta-Pixel und die Meta
                Conversions API ein. Dabei werden Event-Daten (z. B. Seitenaufrufe, Produktinteraktionen, Checkout-Start)
                sowie pseudonymisierte technische Daten erfasst und an Meta Platforms Ireland Ltd. übermittelt. Die
                Übermittlung erfolgt über unseren eigenen Server-Endpunkt; direkt identifizierbare Zahlungsdaten werden
                nicht über diesen Funnel erfasst. Mit dem technischen Dienstleister besteht ein Vertrag zur
                Auftragsverarbeitung gemäß Art. 28 DSGVO.
              </p>
            </section>

            <section>
              <h2 className="font-heading type-h3 text-erdton900">8. Verhaltensbasierte Werbung</h2>
              <p className="mt-3 leading-relaxed">
                Bei Einwilligung können wir personenbezogene Daten für zielgerichtete Werbung nutzen. Informationen:{" "}
                <a
                  href="https://www.networkadvertising.org/understanding-online-advertising/how-does-it-work"
                  className="underline underline-offset-4"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  NAI – How does online advertising work?
                </a>
                . Opt-out-Links u. a.:{" "}
                <a
                  href="https://www.facebook.com/settings/?tab=ads"
                  className="underline underline-offset-4"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Facebook
                </a>
                ,{" "}
                <a
                  href="https://www.google.com/settings/ads/anonymous"
                  className="underline underline-offset-4"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Google
                </a>
                ,{" "}
                <a
                  href="http://optout.aboutads.info/"
                  className="underline underline-offset-4"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Digital Advertising Alliance
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className="font-heading type-h3 text-erdton900">9. Do Not Track</h2>
              <p className="mt-3 leading-relaxed">
                Wir ändern unsere Datenerfassungs- und -nutzungsverfahren nicht automatisch, wenn dein Browser ein „Do
                Not Track“-Signal sendet. Marketing-Tracking bleibt ohne deine Einwilligung deaktiviert.
              </p>
            </section>

            <section>
              <h2 className="font-heading type-h3 text-erdton900">10. Deine Rechte</h2>
              <p className="mt-3 leading-relaxed">
                Wenn du in Europa ansässig bist, hast du das Recht auf Auskunft, Berichtigung, Aktualisierung oder
                Löschung deiner personenbezogenen Daten. Kontaktiere uns unter{" "}
                <a href={`mailto:${contact.email}`} className="underline underline-offset-4">
                  {contact.email}
                </a>
                . Wir verarbeiten Daten zur Vertragserfüllung (Bestellung) oder auf Grundlage berechtigter Interessen.
                Daten können außerhalb Europas (z. B. USA, Kanada) übertragen werden, sofern geeignete Garantien bestehen.
              </p>
            </section>

            <section>
              <h2 className="font-heading type-h3 text-erdton900">11. Aufbewahrung von Daten</h2>
              <p className="mt-3 leading-relaxed">
                Bestellinformationen werden für unsere Aufzeichnungen aufbewahrt, sofern du nicht die Löschung
                verlangst. Server-Logfiles werden nur so lange gespeichert, wie es für Betrieb und Sicherheit erforderlich
                ist.
              </p>
            </section>

            <section>
              <h2 className="font-heading type-h3 text-erdton900">12. Minderjährige</h2>
              <p className="mt-3 leading-relaxed">
                Die Website richtet sich nicht an Personen unter 18 Jahren.
              </p>
            </section>

            <section>
              <h2 className="font-heading type-h3 text-erdton900">13. Änderungen</h2>
              <p className="mt-3 leading-relaxed">
                Wir können diese Datenschutzerklärung gelegentlich anpassen, um Änderungen unserer Vorgehensweise oder
                rechtliche Anforderungen zu berücksichtigen.
              </p>
            </section>

            <section>
              <h2 className="font-heading type-h3 text-erdton900">14. Kontakt</h2>
              <p className="mt-3 leading-relaxed">
                Bei Fragen oder Beschwerden:{" "}
                <a href={`mailto:${contact.email}`} className="underline underline-offset-4">
                  {contact.email}
                </a>
                <br />
                {contact.street}, {contact.postalCode} {contact.city}, {contact.country}
              </p>
            </section>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
