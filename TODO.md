# TODO – Frauenkram Funnel (Next.js)

Diese Checkliste ist für die sequenzielle Abarbeitung durch einen AI-Entwicklungs-Agenten ausgelegt.  
Jede Aufgabe ist atomar und enthält die finalen Vorgaben aus `Implementation.md`.

## Phase 1: Global Setup & Tailwind/Font-Konfiguration

### 1.1 Projektbasis und Komponentenstruktur
- [x] `app/layout.tsx` als globales Root-Layout mit Fonts und globalen Klassen aufsetzen.
- [x] `app/page.tsx` als Server Component anlegen und alle Sektionen in korrekter Reihenfolge rendern.
- [x] Komponenten-Dateien anlegen: `Header.tsx`, `Hero.tsx`, `SocialProof.tsx`, `ProblemSection.tsx`, `PricingSection.tsx`, `ExpertSection.tsx`, `FaqSection.tsx`, `FinalCta.tsx`, `ConsentBanner.tsx`, `Icons.tsx`.
- [x] Komponenten-Typen fixieren: Client (`Header`, `Hero`, `PricingSection`, `FaqSection`, `FinalCta`, `ConsentBanner`), Server (`SocialProof`, `ProblemSection`, `ExpertSection`).
- [x] Zentrale Datenquellen anlegen: `lib/content.ts` (Copy), `lib/design-tokens.ts` (Farben/Typo/Spacing), `types/funnel.ts` (DTOs).

### 1.2 Design-Tokens exakt in Tailwind hinterlegen
- [x] Farbtoken im Theme definieren: `#fdfbf7` (Canvas), `#a7bc93` (Salbei), `#d8a5a4` (Rosa), `#e5d5bb` (Sand), `#beab80` (Khaki), `#2b1307` (Text primär).
- [x] Semantische Klassen konsistent mappen (`coverCanvas`, `coverSalbei`, `coverRosa`, `coverSand`, `coverKhaki`, `erdton900`).
- [x] Kontrastkriterien als UI-Akzeptanzkriterium notieren: statischer Text mindestens `4.5:1`, interaktive Komponenten mindestens `4.5:1` (strikter Workspace-Standard).
- [x] Globale Hintergrundfarbe standardmäßig auf `#fdfbf7` setzen.

### 1.3 Typografie-Matrix implementieren
- [x] In `app/layout.tsx` `Assistant` mit `weight: ['700', '800']`, `display: 'swap'`, `variable: '--font-assistant'` konfigurieren.
- [x] In `app/layout.tsx` `Tenor_Sans` mit `weight: ['400']`, `display: 'swap'`, `variable: '--font-tenor'` konfigurieren.
- [x] CSS/Utilities für Headings hinterlegen:
  - H1: `clamp(2.2rem, 5vw, 3.8rem)`, `line-height: 1.15`, `font-weight: 800`
  - H2: `clamp(1.8rem, 4vw, 2.6rem)`, `line-height: 1.2`, `font-weight: 700`
  - H3: `clamp(1.2rem, 2.5vw, 1.5rem)`, `line-height: 1.3`, `font-weight: 700`
- [x] CSS/Utilities für Body und Microcopy hinterlegen:
  - Body Desktop `16px`, Mobile `14px`, `line-height: 1.6`, `letter-spacing: 0.025em`
  - Microcopy Desktop `12px`, Mobile `11px`, `line-height: 1.4`
- [x] Sicherstellen, dass Überschriften ausschließlich `Assistant` und Fließtexte ausschließlich `Tenor Sans` nutzen.

### 1.4 Globale Layer-/Geometrie-Architektur fixieren
- [x] Z-Index-Konzept global dokumentieren und anwenden: Canvas `0`, Kreise `10`, Hexagon-Cluster `20`, Mockup/Siegel `30`, Text/CTA `40-50`.
- [x] Reusable Kreis- und Hexagon-Primitive in `Icons.tsx`/UI-Helpers implementieren.
- [x] Regeln für Einsatzbereiche trennen: Kreis-Motive nur emotionale Sektionen (1,5,7), Waben/Hexagon für strukturierte Inhalte (4,6, Pricing-Elemente).

---

## Phase 2: Core Logik & State-Management (ePrivacy-Consent & Form-Validierung)

### 2.1 Consent-State und DSGVO/ePrivacy-Gate
- [x] `ConsentBanner` als clientseitiges Gateway mit expliziten Aktionen `granted` und `denied` bauen.
- [x] Storage-Key konsolidieren und rückwärtskompatibel lesen: `frauenkram_analytics_consent` als Primär-Key; vorhandene Werte aus `consent_status` migrieren.
- [x] Vor Consent `granted` strikt verhindern: keine Pixel-Skripte, kein GTM, keine CAPI-Dispatches.
- [x] Consent-Entscheidung dauerhaft in `localStorage` speichern und beim Re-Visit korrekt hydratisieren.
- [x] Consent-UI keyboard- und screenreader-tauglich implementieren (Escape/Tab-Reihenfolge/ARIA).

### 2.2 Tracking-Dispatcher und Sicherheitslogik
- [x] `dispatchCapiEvent(eventName, payload)` Utility implementieren.
- [x] Vor jedem Dispatch `localStorage.getItem('frauenkram_analytics_consent') === 'granted'` prüfen.
- [x] Ohne Consent sofortiger Abbruch (`return`) ohne Netzwerkrequest.
- [x] Bei Consent POST auf `/api/capi-proxy` mit `event`, `data`, `timestamp`.
- [x] PII-Hashing (SHA-256) serverseitig im Proxy erzwingen; kein Raw-PII an Third Parties senden.

### 2.3 Formular- und Angebotslogik (inkl. Kopplungsverbot)
- [x] Paketauswahl-State in `PricingSection` als klarer Single-Select-Status modellieren.
- [x] Checkout-CTA nur bei gültiger Paketauswahl aktivieren.
- [x] Double-Opt-In-Checkbox für Marketing (falls im Checkout-Formular vorhanden) standardmäßig `checked={false}` rendern.
- [x] Validierung sicherstellen: Kauf muss auch ohne Marketing-Einwilligung vollständig möglich sein (DSGVO-Kopplungsverbot).
- [x] Preisanzeige-Validator implementieren: jeder Preis in unmittelbarer Nähe mit `inkl. MwSt.` kennzeichnen.
- [x] Versandangaben-Validator implementieren: Bundle explizit `GRATIS VERSAND`; kostenpflichtige Lieferung mit exaktem Betrag anzeigen.

---

## Phase 3: Sektionsweise Komponenten-Entwicklung (Sektion 1 bis 7)

### 3.1 Sektion 1 – Hero
- [x] Einspaltiges, zentriertes Layout für Desktop/Mobile umsetzen.
- [x] Hintergrund-Kreise exakt setzen:
  - Salbei links oben: `#a7bc93`, `w-[50vw] h-[50vw] max-w-[550px]`, `translate-x-[-25%] translate-y-[-25%]`, `opacity-[0.08]`
  - Rosa rechts oben: `#d8a5a4`, `w-[65vw] h-[65vw] max-w-[700px]`, `translate-x-[30%] translate-y-[-20%]`, `opacity-[0.11]`
- [x] `overflow-hidden` auf Sektionsebene setzen.
- [x] Hexagon-Cluster Desktop vollständig rendern; Mobile `<768px` Hexagon 2/3 ausblenden, Hexagon 1 (`#e5d5bb`) auf `50%` skalieren.
- [x] Pre-Headline exakt setzen: `FÜR FRAUEN IN DEN WECHSELJAHREN, DIE SICH IN IHREM KÖRPER WIEDER ZUHAUSE FÜHLEN WOLLEN.`
- [x] H1 exakt setzen: `Jetzt können Sie sich in Ihrer Haut wieder rundum wohlfühlen – selbst wenn die Hormone gerade alles auf den Kopf stellen.`
- [x] Unterüberschrift exakt setzen: `Erfahren Sie von dermazeutischer Kosmetikerin und Hormoncoach Carsta Pröstler die natürlichen Longevity Balance Routinen, um Haut und Körper in der Menopause optimal zu unterstützen.`
- [x] Confidence Cue exakt setzen: `⭐️ 4.9/5 | Ratgeber (Paperback & Kindle) + Exklusives Bundle`.
- [x] CTA-Label exakt setzen: `→ Jetzt Buch sichern & Hautbild verbessern`.
- [x] CTA-Microcopy exakt setzen: `✓ 14 Tage Zufriedenheitsgarantie | ✓ Einmalige Zahlung – kein Abo`.
- [x] Experten-Badge am Mockup integrieren: `Longevity Balance Methode – Hormonell & dermazeutisch fundiert`.
- [x] CTA-States implementieren: Hover `bg-[#c28f8e]` + `shadow-lg`, Focus `ring-2 ring-[#fdfbf7]` + `ring-offset-2 ring-stone-900`, Active `scale-[0.97] shadow-none`.

### 3.2 Sektion 2 – Social Proof
- [x] 120-Grad-Schnittkante als absolut positioniertes SVG (`bottom-0 left-0 w-full h-[48px]`, `preserveAspectRatio="none"`) zwischen Sektion 1 und 2 bauen.
- [x] Sektion mit `bg-white` als horizontales Vertrauensband rendern.
- [x] Titel exakt setzen: `Tausenden Frauen aus der Seele gesprochen. Bekannt aus:`
- [x] Statische Logo-Reihe einbauen:
  - `EXPERTINNEN-TALKS IN BOUTIQUEN`
  - `VORTRÄGE IN REHA-ZENTREN`
  - `BEAUTY-EVENTS IN WOHLFÜHL-LOCATIONS`
- [x] Logos standardmäßig `opacity-40`, bei Hover `opacity-70`, Transition `duration-300`.

### 3.3 Sektion 3 – Problem & Agitation
- [x] Grid exakt umsetzen: `grid-cols-1 md:grid-cols-3`, `gap-8`, `max-w-4xl`, mobile `gap-6`.
- [x] Kartenstil exakt umsetzen: `rounded-3xl bg-white border border-stone-200/60`, mobile `p-8`.
- [x] Headline exakt setzen: `Was unterscheidet Frauen, die entspannt und strahlend durch die Wechseljahre gehen, von denen, die täglich mit ihrer Haut und ihrem Körper kämpfen?`
- [x] Kachel 1 anlegen: Label `Lipidverlust der Barriere`; Copy exakt setzen: `Plötzlich ist alles anders. Die Haut wird trocken, verliert an Spannkraft oder neigt unerwartet zu Unreinheiten. Gleichzeitig rauben Hitzewallungen den Schlaf und die Energie.`
- [x] Kachel 2 anlegen: Label `Kosmetische Irritations-Spirale`; Copy exakt setzen: `Teure Kosmetika, die jahrelang funktionierten, versagen von heute auf morgen. Das ständige Ausprobieren neuer „Wundermittel" verbrennt nicht nur Geld, sondern auch Nerven. Es fühlt sich an, als würde man die Kontrolle über den eigenen Körper verlieren.`
- [x] Kachel 3 anlegen: Label `Hormonelle Spät-Dysbalance`; Copy exakt setzen: `Die hormonellen Achterbahnen rauben Ihnen Ihre gewohnte Vitalität. Es entsteht eine tiefe Frustration über den plötzlichen Kontrollverlust, die sich schleichend auf Ihren gesamten Alltag auswirkt.`
- [x] Ausschluss-Hinweis exakt setzen mit Styling `italic`, `text-amber-900`, `bg-amber-50/60`, `border border-amber-200/80`; Text: `Wichtiger Hinweis: Dieses Buch ist nicht für Frauen, die nach schnellen chemischen Pflastern suchen. Es ist für Frauen, die die wahren Ursachen verstehen und ihren Körper natürlich unterstützen wollen.`

### 3.4 Sektion 4 – Solution & Offer (Mechanism + Preismatrix)
- [x] Desktop-Layout `grid-cols-1 md:grid-cols-2 gap-8 items-center max-w-4xl`.
- [x] Mobile Reihenfolge erzwingen: Bundle-Card oben, Single-Card darunter mit `-mt-6`, Layering Bundle `z-20`, Single `z-10`.
- [x] Bundle-Card optisch dominant machen: `scale-105`.
- [x] Bestseller-Badge als 120-Grad-Waben-Inlay an Oberkante rendern.
- [x] Hexagon-Vektor im Hintergrund der Bundle-Card in `#beab80` rendern.
- [x] Qualitätssiegel-Kreis auf Bundle-Card setzen: `100% Naturrein – Kaltgepresst`.
- [x] Headline exakt setzen: `Die Lösung: Hormonelle Balance von innen und außen.`
- [x] 3-Schritt-Timeline exakt einbauen:
  - `Verstehen Sie das Zusammenspiel von Haut und Hormonen.`
  - `Wenden Sie Carstas alltagstaugliche Longevity Balance Methode an.`
  - `Erleben Sie neue Balance und ein strahlendes Hautbild.`
- [x] Option 1 exakt abbilden: `Der Praxis-Ratgeber | „Frauenkram: Haut und Wechseljahre" — vollgepackt mit Fachwissen und Routinen. Das theoretische Fachfundament für den Wandel.` plus Preiszeile `Paperback: €25,90 / Kindle: €10,99` mit `inkl. MwSt.` direkt am Preis.
- [x] Option 2 exakt abbilden: `Das Regenerations-Bundle | „Frauenkram" (Taschenbuch) + Lovely Body Oil. Unterstützen Sie Ihre Haut zusätzlich von außen mit diesem nährenden, exklusiven Körperöl.` plus Preiszeile `Preis: €49,90` mit Badge `BESTSELLER`, Hinweis `✅ Bonus: GRATIS VERSAND` und `inkl. MwSt.` direkt am Preis.
- [x] Card-Selection-State implementieren: aktive Karte `border-amber-700` + `shadow-lg`.

### 3.5 Sektion 5 – Expert Intro & Testimonials
- [x] Split-Grid umsetzen: `grid-cols-1 lg:grid-cols-12 gap-12 items-center`, Story links `lg:col-span-7`, Proof rechts `lg:col-span-5`.
- [x] Linke Story-Spalte mit Porträt + Altrosa-Kreisoverlay `#d8a5a4` bei `opacity-10`.
- [x] Rechte Proof-Spalte als Hexagon-Block mit Hintergrund `#e5d5bb`.
- [x] Mobile Asymmetrie rendern: rechter Block mit `-translate-y-8` nach oben überlagern.
- [x] Headline exakt setzen: `Ihre Begleiterin durch den hormonellen Wandel`.
- [x] Autorinnen-Copy exakt setzen: `Carsta Pröstler ist nicht nur Unternehmerin, dermazeutische Kosmetikerin und Gesundheitscoach. Als Mutter von 5 Kindern in einer Patchworkfamilie weiß sie genau: Gesundheitliche Routinen müssen absolut alltagstauglich sein. Sie hat die Theorien nicht nur studiert, sondern wendet sie täglich bei sich und ihren Klientinnen an.`
- [x] Testimonial 1 exakt setzen und personengebunden labeln: `Martina (52)`; Text: `Ich dachte, mein Alltag als berufstätige Mutter lässt keinen Raum für Pflege. Aber Carstas Routinen wirken bereits nach dem zweiten Kapitel – die Umsetzung dauert keine 4 Minuten morgens und ließ sich ohne zusätzlichen Aufwand perfekt in meinen stressigen Tag integrieren. Meine Haut spannt endlich nicht mehr!`
- [x] Testimonial 2 als gleichrangigen Proof-Block integrieren und labeln: `Sabine (49)` (gleiches Layout-/Typo-System wie Martina).
- [x] Verifizierungs-Badge unter jedem Testimonialnamen rendern: Hintergrund `#a7bc93` bei `opacity-10`, weiße Aufschrift `VERIFIZIERTE LESERIN`, Assistant Bold `9px`, Versalien.

### 3.6 Sektion 6 – FAQ (AEO-freundliches Akkordeon)
- [x] FAQ-Stack `max-w-3xl mx-auto` aufbauen.
- [x] Geschlossene Bars mit Sand-Trennlinien `#e5d5bb` separieren.
- [x] Linke Kanten im 120-Grad-Schnitt rendern.
- [x] Chevron in filigranes Hexagon einbetten (`flex-shrink-0`, `w-12`, zentriert).
- [x] FAQ 1 exakt rendern:
  - Frage: `Ich spüre erst die allerersten Anzeichen der Wechseljahre – ist das Buch jetzt schon das Richtige für mich?`
  - Antwort: `Ja, meine Liebe! Genau jetzt ist der perfekte Moment. Mit der Longevity Balance Methode bereiten wir deine Haut und deine Zellen sanft vor, anstatt später nur Symptome zu bekämpfen. Je früher du verstehst, wie dein Körper sich verändert, desto strahlender und unbeschwerter gehst du durch diese Phase.`
- [x] FAQ 2 exakt rendern:
  - Frage: `Wie genau wende ich das Lovely Body Oil in Kombination mit den Buchtipps an?`
  - Antwort: `Ganz unkompliziert und alltagserprobt: Trage das Öl direkt nach dem Duschen auf die noch leicht feuchte Haut auf. Es zieht in Sekunden ein, versiegelt die Feuchtigkeit wie ein Schutzschild und hinterlässt nichts als ein samtiges Gefühl – perfekt für den dichten Alltag.`
- [x] FAQ 3 exakt rendern:
  - Frage: `Wie schnell ist das Buch / Bundle bei mir?`
  - Antwort: `Unser Standardversand innerhalb der DACH-Region (Deutschland, Österreich, Schweiz) benötigt in der Regel 2-3 Werktage. Jedes Paket verlässt CO2-neutral und liebevoll verpackt unser Lager.`
- [x] Expansion rein über CSS Grid-Interpolation implementieren: `grid-rows-[0fr]` -> `grid-rows-[1fr]`, `overflow-hidden`, `transition-all duration-300 ease-in-out`.
- [x] Geöffneter Zustand: Hintergrund `#a7bc93` bei `opacity-10`.
- [x] Hover Header: `#a7bc93` bei `6%` Opacity; Icon-Kontur auf `#beab80`; Icon-Rotation `45deg`.

### 3.7 Sektion 7 – Final CTA
- [x] Vollflächigen Block mit `bg-stone-950` (Erdton-Anthrazit) umsetzen.
- [x] Padding exakt setzen: Desktop `py-24 px-12`, Mobile `py-16 px-6`.
- [x] Radial-Gradient setzen: `bg-[radial-gradient(circle_at_center,rgba(216,165,164,0.12)_0%,transparent_70%)]`.
- [x] Headline exakt setzen: `Befreien Sie Ihre Haut und Ihren Alltag.`
- [x] Microcopy 1 exakt setzen: `Wählen Sie jetzt Ihr Paket. Entscheiden Sie sich für das Regenerations-Bundle und wir schenken Ihnen die Versandkosten.`
- [x] CTA exakt setzen: `→ Jetzt Regenerations-Bundle sichern`.
- [x] Microcopy 2 exakt setzen: `Einmalige Investition in Ihre Hautgesundheit. Kein Abonnement, keine automatischen Folgelieferungen. 14 Tage vollständige Zufriedenheitsgarantie.`

### 3.8 SEO/AEO: Metadata + JSON-LD FAQ Schema
- [x] `metadata.title` exakt setzen: `Frauenkram: Haut und Wechseljahre – Carsta Pröstler`.
- [x] `metadata.description` exakt setzen: `Der ganzheitliche dermazeutische Ratgeber für ein gesundes Hautbild und hormonelle Balance in den Wechseljahren.`
- [x] JSON-LD Typ `FAQPage` in `app/page.tsx` rendern.
- [x] Für `mainEntity` exakt die 3 FAQ-Fragen und vollständigen Antworten aus Sektion 6 verwenden.
- [x] `application/ld+json` Script serverseitig ausgeben und auf valide JSON-Syntax testen.

---

## Phase 4: Shopify Storefront API Anbindung & Analytics-Gateways

### 4.1 Shopify Storefront API Integration
- [ ] `.env` Variablen anlegen: Shop-Domain, Storefront-Access-Token, Variant-IDs für Paperback/Kindle/Bundle.
- [ ] GraphQL Mutation `cartCreate` wie spezifiziert implementieren (`merchandiseId`, `quantity`, Rückgabe `id`, `checkoutUrl`, `userErrors`).
- [ ] API-Client (z. B. `lib/shopify.ts`) mit robustem Fehlerhandling aufbauen.
- [ ] Beim CTA in Sektion 4 selektierte Variante an Mutation übergeben.
- [ ] Erfolgsfall: auf `checkoutUrl` redirecten.
- [ ] Fehlerfall: `userErrors` nutzerverständlich und barrierefrei ausgeben.
- [ ] Preisdarstellung in UI synchron zu Shopify-Daten halten (keine abweichenden Anzeige-/Checkoutpreise).

### 4.2 Consent-Gated Analytics Pipeline
- [ ] Analytics-Dispatcher nur nach Consent `granted` aktivieren.
- [ ] Keine Third-Party-Script-Injektion vor Consent (Meta Pixel, GTM).
- [ ] `api/capi-proxy` Endpoint implementieren (POST only, Input-Validierung, Fehlermonitoring).
- [ ] Event-Payload strukturieren (z. B. `event_name`, `event_id`, `timestamp`, gehashte User-Daten).
- [ ] SHA-256 Hashing für PII (z. B. E-Mail) serverseitig und deterministisch implementieren.
- [ ] Timeout/Retry-Strategie im Proxy hinzufügen, ohne Events ohne Consent zu senden.

---

## Phase 5: Barrierefreiheits-Audit & Performance-Optimierung

### 5.1 WCAG 2.2 AA Umsetzungsprüfung
- [ ] Alle interaktiven Elemente mit sichtbarem `focus-visible` ausstatten.
- [ ] Minimale Touch-Target-Größe `56px` für primäre mobile CTAs und Akkordeon-Trigger sicherstellen.
- [ ] Semantische Struktur prüfen: genau ein H1, logisch aufsteigende Heading-Hierarchie.
- [ ] Buttons/Links/Accordion-Header mit korrekten ARIA-Attributen (`aria-expanded`, `aria-controls`, Labels) versehen.
- [ ] Tastaturbedienung end-to-end testen (Consent, FAQ, Paketauswahl, CTA).
- [ ] Kontrastprüfung für alle finalen Farb-/Textkombinationen durchführen und dokumentieren.

### 5.2 Core Web Vitals und Rendering-Stabilität
- [ ] Hero-Buchbild mit `next/image`, festen `width`/`height`, modernem `WebP`/`AVIF`, `priority` für LCP implementieren.
- [ ] Verifizieren, dass FAQ ohne JS-Höhenmessung arbeitet (nur Grid-Interpolation), um CLS/INP-Probleme zu vermeiden.
- [ ] Unnötiges Client-JS minimieren (Server Components bevorzugen, nur interaktive Teile clientseitig).
- [ ] SVG- und Icon-Assets optimieren (keine unnötigen Pfade/Attribute).
- [ ] Lighthouse Mobile Zielwerte absichern: `PageSpeed > 90` und keine kritischen CWV-Warnungen.

### 5.3 DACH-Compliance und Release-Gate
- [ ] DSGVO/ePrivacy-Freigabecheck: vor Consent keinerlei Tracking-Verarbeitung.
- [ ] Kopplungsverbot-Check: Kauf darf nicht von Marketing-Einwilligung abhängen.
- [ ] PAngV-Check: jeder Preis mit `inkl. MwSt.`, Versandkosten klar und unmittelbar zugeordnet.
- [ ] UWG-Risiko-Check für Claims (keine irreführenden Heil-/Wirkversprechen außerhalb der Spezifikation).
- [ ] Finalen QA-Run dokumentieren: Geräte-Breakpoints, Screenreader-Smoketest, Checkout-Flow, Consent-Flow, FAQ-JSON-LD-Validation.
