import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import { CONSENT_STORAGE_KEY } from "@/lib/consent";
import { SERVER_CONSENT_COOKIE_KEY } from "@/lib/server/consent-cookie";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Datenschutzerklärung",
  description: "Datenschutzerklärung für den Frauenkram Landingpage-Funnel.",
};

const backLinkClassName =
  "inline-flex min-h-[56px] items-center font-body text-sm text-erdton900/70 underline-offset-4 transition-colors duration-300 hover:text-erdton900 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coverKhaki focus-visible:ring-offset-2 focus-visible:ring-offset-coverCanvas";

export default function DatenschutzPage() {
  const { contact, shopifyPrivacyUrl, googlePrivacyUrl, googleAnalyticsOptOutUrl, url } = siteConfig;

  return (
    <>
      <Header />
      <main className="px-6 py-12 md:px-10 md:py-16">
        <article className="mx-auto max-w-3xl">
          <Link href="/" className={backLinkClassName}>
            ← Zurück zur Startseite
          </Link>

          <h1 className="font-heading type-h2 mt-6 text-erdton900">Datenschutzerklärung</h1>

          <p className="font-body type-body mt-4 leading-relaxed text-erdton900/85">
            Diese Datenschutzerklärung beschreibt, wie {siteConfig.legalName} personenbezogene Daten erfasst, verwendet
            und weitergibt, wenn du die Landingpage unter{" "}
            <a href={url} className="underline underline-offset-4">
              {url}
            </a>{" "}
            (das „Telemedium“ bzw. die „Website“) nutzt oder dort ein Produkt bestellst.
          </p>

          <div className="font-body type-body mt-8 space-y-8 text-erdton900/85">
            <section>
              <h2 className="font-heading type-h3 text-erdton900">1. Verantwortliche Stelle</h2>
              <p className="mt-3 leading-relaxed">
                Verantwortlich im Sinne der Datenschutz-Grundverordnung (DSGVO) ist:
                <br />
                <br />
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
                Wenn du die Website besuchst, werden automatisch technische Informationen über dein Gerät und deinen
                Zugriff verarbeitet, darunter Webbrowser, IP-Adresse, Zeitzone, aufgerufene Seiten, Referrer sowie – sofern
                du einwilligst – Cookies und vergleichbare Technologien. Wir bezeichnen diese automatisch erfassten
                Informationen als „Geräteinformationen“.
              </p>
              <p className="mt-3 leading-relaxed">Technologien im Einzelnen:</p>
              <ul className="mt-2 list-disc space-y-2 pl-5">
                <li>
                  <strong>Cookies</strong> sind kleine Datendateien auf deinem Endgerät. Nähere Informationen:{" "}
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
                  <strong>Protokolldateien (Logfiles)</strong> erfassen Aktionen auf der Website (z. B. IP-Adresse,
                  Browsertyp, Internetdienstanbieter, verweisende und ausgestiegene Seiten, Datum und Uhrzeit des
                  Zugriffs).
                </li>
                <li>
                  <strong>Web Beacons, Tags und Pixel</strong> können – nur nach Einwilligung – Informationen darüber
                  erfassen, wie du mit der Website interagierst.
                </li>
              </ul>

              <h3 className="font-heading mt-6 text-base font-bold text-erdton900">Bestellinformationen</h3>
              <p className="mt-2 leading-relaxed">
                Wählst du ein Paket und startest den Checkout, wirst du in unseren Shopify-Onlineshop weitergeleitet. Dort
                werden bei einem Kauf oder Kaufversuch personenbezogene Daten wie Name, Rechnungs- und Lieferadresse,
                Zahlungsinformationen, E-Mail-Adresse und Telefonnummer verarbeitet. Wir bezeichnen diese Angaben als
                „Bestellinformationen“. Die Verarbeitung im Checkout erfolgt durch{" "}
                <strong>Shopify International Limited</strong> als Auftragsverarbeiter gemäß Art. 28 DSGVO. Weitere
                Informationen:{" "}
                <a
                  href={shopifyPrivacyUrl}
                  className="underline underline-offset-4"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Shopify Datenschutzerklärung
                </a>
                .
              </p>
              <p className="mt-3 leading-relaxed">
                Mit „personenbezogene Daten“ in dieser Erklärung bezeichnen wir Geräteinformationen und
                Bestellinformationen, soweit sie im Zusammenhang mit dieser Website anfallen.
              </p>
            </section>

            <section>
              <h2 className="font-heading type-h3 text-erdton900">3. Hosting</h2>
              <p className="mt-3 leading-relaxed">
                Diese Landingpage wird bei <strong>Vercel Inc.</strong>, 440 N Barranca Ave #4133, Covina, CA 91723,
                USA, gehostet. Beim Aufruf werden technisch notwendige Daten (insbesondere IP-Adresse, Zeitpunkt des
                Zugriffs, Browsertyp, angeforderte URL) in Server-Logfiles verarbeitet, um den sicheren, stabilen und
                fehlerfreien Betrieb zu gewährleisten. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes
                Interesse an einem sicheren Webauftritt). Sofern Daten in Drittländer übermittelt werden, erfolgt dies auf
                Grundlage geeigneter Garantien im Sinne von Art. 44 ff. DSGVO (z. B. Standardvertragsklauseln).
              </p>
            </section>

            <section>
              <h2 className="font-heading type-h3 text-erdton900">4. Analyse- und Marketing-Tools</h2>
              <p className="mt-3 leading-relaxed">
                Tracking- und Marketing-Technologien (Google Tag Manager, Meta Pixel) sowie die serverseitige
                Weiterleitung von Conversion-Events an Meta (Conversions API über unseren First-Party-Endpunkt{" "}
                <code className="text-sm">/api/capi-proxy</code>) werden <strong>ausschließlich nach deiner ausdrücklichen
                Einwilligung</strong> aktiviert. Bis dahin bleiben alle entsprechenden Skripte und Server-Weiterleitungen
                vollständig gesperrt (Consent-Gating).
              </p>
              <p className="mt-3 leading-relaxed">
                <strong>Technische Umsetzung des Consent-Banners:</strong>
              </p>
              <ul className="mt-2 list-disc space-y-2 pl-5">
                <li>
                  Deine Entscheidung („Akzeptieren“ / „Ablehnen“) wird im Browser unter dem Schlüssel{" "}
                  <code className="text-sm">{CONSENT_STORAGE_KEY}</code> in <code className="text-sm">localStorage</code>{" "}
                  gespeichert.
                </li>
                <li>
                  Parallel setzt unser Endpunkt <code className="text-sm">/api/consent</code> ein signiertes,{" "}
                  <strong>HttpOnly</strong>-Cookie (<code className="text-sm">{SERVER_CONSENT_COOKIE_KEY}</code>), damit
                  serverseitige Prüfungen (z. B. für <code className="text-sm">/api/capi-proxy</code>) manipulationssicher
                  erfolgen. Die Signierung nutzt <code className="text-sm">CONSENT_COOKIE_SECRET</code> (nur serverseitig).
                </li>
                <li>
                  Ohne Einwilligung (<code className="text-sm">granted</code>) werden keine Marketing-Skripte geladen und
                  keine Events an Meta weitergeleitet.
                </li>
                <li>
                  Du kannst deine Einwilligung jederzeit widerrufen, indem du die Website-Daten in deinem Browser löschst
                  und die Seite erneut aufrufst.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="font-heading type-h3 text-erdton900">
                5. Zwecke und Rechtsgrundlagen der Verarbeitung
              </h2>
              <p className="mt-3 leading-relaxed">
                Wir verarbeiten Bestellinformationen zur Vertragserfüllung und Abwicklung deiner Bestellung über Shopify
                (Zahlung, Versand, Bestellbestätigung, Betrugsprävention) – Rechtsgrundlage Art. 6 Abs. 1 lit. b DSGVO.
              </p>
              <p className="mt-3 leading-relaxed">
                Geräteinformationen im Rahmen des Hostings verarbeiten wir zur Bereitstellung der Website – Art. 6 Abs. 1
                lit. f DSGVO. Analyse- und Marketingdaten verarbeiten wir nur bei Einwilligung – Art. 6 Abs. 1 lit. a DSGVO.
                Das optionale Marketing-Opt-in im Checkout ist freiwillig und keine Kaufbedingung.
              </p>
            </section>

            <section>
              <h2 className="font-heading type-h3 text-erdton900">6. Weitergabe an Dienstleister</h2>
              <ul className="mt-3 list-disc space-y-2 pl-5 leading-relaxed">
                <li>
                  <strong>Shopify</strong> – Onlineshop und Checkout (
                  <a href={shopifyPrivacyUrl} className="underline underline-offset-4" target="_blank" rel="noopener noreferrer">
                    Datenschutz
                  </a>
                  )
                </li>
                <li>
                  <strong>Vercel Inc.</strong> – Hosting dieser Landingpage
                </li>
                <li>
                  <strong>Google</strong> (Tag Manager / Analytics, nur nach Einwilligung) –{" "}
                  <a href={googlePrivacyUrl} className="underline underline-offset-4" target="_blank" rel="noopener noreferrer">
                    Google Datenschutz
                  </a>
                  , Opt-out:{" "}
                  <a
                    href={googleAnalyticsOptOutUrl}
                    className="underline underline-offset-4"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Browser-Add-on zur Deaktivierung von Google Analytics
                  </a>
                </li>
                <li>
                  <strong>Meta Platforms</strong> (Pixel und Conversions API, nur nach Einwilligung)
                </li>
              </ul>
              <p className="mt-3 leading-relaxed">
                Eine Weitergabe kann ferner erfolgen, wenn wir gesetzlich dazu verpflichtet sind oder unsere Rechte
                durchsetzen müssen.
              </p>
            </section>

            <section>
              <h2 className="font-heading type-h3 text-erdton900">7. Speicherdauer</h2>
              <p className="mt-3 leading-relaxed">
                Personenbezogene Daten werden nur so lange gespeichert, wie es für die genannten Zwecke erforderlich ist
                oder gesetzliche Aufbewahrungsfristen bestehen. Server-Logfiles beim Hosting werden in der Regel nur für
                einen begrenzten Zeitraum vorgehalten. Bestellinformationen bei Shopify richten sich nach den dortigen
                Aufbewahrungsregeln und handels- sowie steuerrechtlichen Pflichten.
              </p>
            </section>

            <section>
              <h2 className="font-heading type-h3 text-erdton900">8. Deine Rechte als betroffene Person</h2>
              <p className="mt-3 leading-relaxed">
                Du hast gegenüber uns folgende Rechte hinsichtlich der dich betreffenden personenbezogenen Daten:
              </p>
              <ul className="mt-3 list-disc space-y-3 pl-5 leading-relaxed">
                <li>
                  <strong>Art. 15 DSGVO – Auskunft:</strong> Du kannst Auskunft über die von uns verarbeiteten
                  personenbezogenen Daten verlangen.
                </li>
                <li>
                  <strong>Art. 16 DSGVO – Berichtigung:</strong> Du kannst die Berichtigung unrichtiger oder die
                  Vervollständigung unvollständiger Daten verlangen.
                </li>
                <li>
                  <strong>Art. 17 DSGVO – Löschung:</strong> Du kannst die Löschung deiner personenbezogenen Daten
                  verlangen, soweit keine gesetzlichen Aufbewahrungspflichten entgegenstehen.
                </li>
                <li>
                  <strong>Art. 18 DSGVO – Einschränkung der Verarbeitung:</strong> Du kannst unter bestimmten
                  Voraussetzungen die Einschränkung der Verarbeitung verlangen.
                </li>
                <li>
                  <strong>Art. 20 DSGVO – Datenübertragbarkeit:</strong> Du hast das Recht, Daten, die du uns
                  bereitgestellt hast, in einem strukturierten, gängigen und maschinenlesbaren Format zu erhalten oder –
                  soweit technisch machbar – die Übermittlung an einen anderen Verantwortlichen zu verlangen.
                </li>
                <li>
                  <strong>Art. 21 DSGVO – Widerspruch:</strong> Du kannst der Verarbeitung personenbezogener Daten, die
                  auf Art. 6 Abs. 1 lit. f DSGVO beruht, aus Gründen, die sich aus deiner besonderen Situation ergeben,
                  jederzeit widersprechen. Bei Direktwerbung hast du ein uneingeschränktes Widerspruchsrecht.
                </li>
                <li>
                  <strong>Art. 7 Abs. 3 DSGVO – Widerruf der Einwilligung:</strong> Eine erteilte Einwilligung (z. B. für
                  Analyse-Tools) kannst du jederzeit mit Wirkung für die Zukunft widerrufen, ohne dass die Rechtmäßigkeit
                  der bis zum Widerruf erfolgten Verarbeitung berührt wird.
                </li>
              </ul>
              <p className="mt-4 leading-relaxed">
                Zur Ausübung deiner Rechte genügt eine Nachricht an{" "}
                <a href={`mailto:${contact.email}`} className="underline underline-offset-4">
                  {contact.email}
                </a>
                .
              </p>
              <p className="mt-3 leading-relaxed">
                <strong>Art. 77 DSGVO – Beschwerderecht:</strong> Du hast das Recht, dich bei einer Datenschutz-Aufsichtsbehörde
                zu beschweren, insbesondere in dem Mitgliedstaat deines gewöhnlichen Aufenthaltsorts, deines Arbeitsplatzes
                oder des Orts des mutmaßlichen Verstoßes.
              </p>
            </section>

            <section>
              <h2 className="font-heading type-h3 text-erdton900">9. Do Not Track</h2>
              <p className="mt-3 leading-relaxed">
                Wir passen unsere Verfahren nicht automatisch an, wenn dein Browser ein „Do Not Track“-Signal sendet.
                Marketing-Tracking bleibt ohne deine Einwilligung deaktiviert.
              </p>
            </section>

            <section>
              <h2 className="font-heading type-h3 text-erdton900">10. Minderjährige</h2>
              <p className="mt-3 leading-relaxed">
                Die Website richtet sich nicht an Personen unter 18 Jahren.
              </p>
            </section>

            <section>
              <h2 className="font-heading type-h3 text-erdton900">11. Änderungen dieser Datenschutzerklärung</h2>
              <p className="mt-3 leading-relaxed">
                Wir behalten uns vor, diese Datenschutzerklärung anzupassen, wenn sich unsere Verarbeitungstätigkeiten oder
                die rechtlichen Anforderungen ändern. Die jeweils aktuelle Fassung ist auf dieser Seite abrufbar.
              </p>
            </section>

            <section>
              <h2 className="font-heading type-h3 text-erdton900">12. Kontakt</h2>
              <p className="mt-3 leading-relaxed">
                Bei Fragen zum Datenschutz erreichst du uns unter{" "}
                <a href={`mailto:${contact.email}`} className="underline underline-offset-4">
                  {contact.email}
                </a>
                , {contact.street}, {contact.postalCode} {contact.city}, {contact.country}.
              </p>
            </section>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
