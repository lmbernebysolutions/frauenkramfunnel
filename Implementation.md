Technische & Gestalterische Spezifikation: Next.js High-Converting Funnel „Frauenkram“

Projekt: One-Product-Funnel für das Buch „Frauenkram: Haut und Wechseljahre“ (Autorin: Carsta Pröstler)

Systemarchitektur: Next.js (App Router), Tailwind CSS, TypeScript, Shopify Storefront API

Fokus: Mobile Performance (PageSpeed-Score > 90), Barrierefreiheit (WCAG 2.2 Level AA), DACH-Compliance (DSGVO, ePrivacy, PAngV, UWG)

TEIL 1: GLOBALE BRANDING-DNA & SYSTEM-TOKENS

Dieses Kapitel dokumentiert die exakten gestalterischen Grenzwerte (Design Tokens) der Markenidentität. Jede Abweichung in der Code-Implementierung gefährdet die visuelle Balance und die conversion-psychologische Hebelwirkung des Funnels.

1.1 Farb-DNA & Design-Tokens (Farbwerte nach Cover-Vorgaben)

Das Farbsystem basiert strikt auf der chromatischen Struktur des physischen Buchcovers. Kontraststärken müssen nach den Vorgaben der Barrierefreiheit (WCAG 2.2 SC 1.4.3) eine visuelle Trennung von mindestens 4,5:1 für statischen Text und 3:1 für interaktive Komponenten garantieren.

Token-ID

Hex-Wert

Tailwind-Klassen-Äquivalent

Psychologisch-Funktionales Mapping

color-bg-canvas

#fdfbf7

bg-[#fdfbf7]

Elfenbein-Canvas-Hintergrund: Bildet den kognitiven Atemraum der gesamten Page. Reduziert den mobilen Blendeffekt und verhindert Lese-Müdigkeit (Reading Fatigue).

color-brand-salbei

#a7bc93

bg-coverSalbei / text-coverSalbei

Mattes Salbeigrün: Steht für dermatologische Natürlichkeit, organische Frische und pflanzliche Wirkkraft. Wird in emotionalen Zonen (Overlays) und als beruhigendes Signal bei aufgeklappten FAQ-Accordion-Flächen eingesetzt.

color-brand-rosa

#d8a5a4

bg-coverRosa / text-coverRosa

Altrosa: Steht für emotionale Weichheit, Intimität und weibliche Gesundheit. Dient als primäre Farbe für umschließende Kreis-Vektoren und als Signalfarbe für den primären, kontraststarken CTA-Button.

color-brand-sand

#e5d5bb

bg-coverSand

Sand/Beige: Repräsentiert dermatologische Struktur und Stabilität. Bildet den Hintergrundton für Wabenkacheln und Standard-Produkt-Cards.

color-brand-khaki

#beab80

bg-coverKhaki

Senf-Khaki: Dient als wissenschaftliche Konturfarbe für Hexagon-Vektoren und zur optischen Hervorhebung des Bestseller-Badges.

color-text-primary

#2b1307

text-stone-900 / text-erdton-900

Erdton-Anthrazit: Tiefes, hochkontrastierendes Dunkelbraun für alle Textabschnitte. Ersetzt kaltes Schwarz vollständig und gewährleistet ein ermüdungsfreies Lesen sowie Barrierefreiheit auf hellen Farbflächen.

1.2 Typografie-Matrix (Kuration & responsive Skalierung)

Das typografische System nutzt zwei komplementäre Schriftfamilien zur klaren strukturellen Gliederung und optimalen Steuerung der Selective Attention (selektiven Aufmerksamkeit).

Headings (Überschriften): Assistant (Bold / Heavy, Weight: 700 / 800)

Rolle: Blockhafte, fette Linienführung. Erzeugt maximale kognitive Einschlagpunkte, steht für unmissverständliche Autorität, Entschlossenheit und absolute Klarheit.

Responsive Skalierung (CSS Clamp): * H1 (Hero Heading): font-size: clamp(2.2rem, 5vw, 3.8rem); line-height: 1.15; font-weight: 800;

H2 (Section Heading): font-size: clamp(1.8rem, 4vw, 2.6rem); line-height: 1.2; font-weight: 700;

H3 (Card/FAQ Heading): font-size: clamp(1.2rem, 2.5vw, 1.5rem); line-height: 1.3; font-weight: 700;

Body-Text (Fließtexte & Microcopy): Tenor Sans (Regular, Weight: 400)

Rolle: Weite, geometrisch filigrane, serifenlose Schriftart. Transportiert Ruhe, feminine Hochwertigkeit, organische Eleganz und emotionale Nahbarkeit. Erlaubt ermüdungsfreies Erfassen längerer Textabschnitte.

Skalierung: * Standard Body: font-size: 1rem (16px) auf Desktop / 0.875rem (14px) auf Mobile; line-height: 1.6; letter-spacing: 0.025em;

Microcopy / Labels: font-size: 0.75rem (12px) auf Desktop / 0.6875rem (11px) auf Mobile; line-height: 1.4;

1.3 Die visuelle Dualitäts-Architektur (Geometrisches Leitmotiv)

Die Gestaltungslogik übersetzt das geometrische Spannungsfeld des physischen Buchcovers systematisch in funktionale Web-Komponenten:

+-------------------------------------------------------------------+
|                            Z-INDEX 0                              |
|                       Background Canvas: #fdfbf7                  |
|                                                                   |
|       +------------------+             +------------------+       |
|       |    Z-INDEX 10    |             |    Z-INDEX 10    |       |
|       |  Salbeigrüner    |             |    Altrosa       |       |
|       |  Kreis-Vektor    |             |    Kreis-Vektor  |       |
|       +------------------+             +------------------+       |
|                                                                   |
|                     +-----------------------+                     |
|                     |       Z-INDEX 20      |                     |
|                     |     Hexagon-Cluster   |                     |
|                     |      (Waben-Vektor)   |                     |
|                     +-----------------------+                     |
|                                                                   |
|                     +-----------------------+                     |
|                     |       Z-INDEX 30      |                     |
|                     |    Produkt-Mockup     |                     |
|                     |   & Experten-Siegel   |                     |
|                     +-----------------------+                     |
|                                                                   |
|       +---------------------------------------------------+       |
|       |                    Z-INDEX 40-50                  |       |
|       |       Textschicht (Assistant / Tenor) & CTAs      |       |
|       +---------------------------------------------------+       |
+-------------------------------------------------------------------+


Weichheit & Emotion (Kreis-Elemente):
Kreisförmige, weich angeschnittene Ebenen und weich auslaufende CSS-Gradients (in #d8a5a4 Altrosa und dem salbeigrünen #a7bc93) werden ausschließlich in Sektionen eingesetzt, die das Gefühl, das Abholen und die Empathie adressieren (Sektion 1 Hero, Sektion 5 Carstas Lebensrealität, Sektion 7 Finale Transformation). Sie triggern den Aesthetic-Usability-Effect: Ein harmonisches, weiches Erscheinungsbild baut die initiale Skepsis ab und lässt das System intuitiv und vertrauenswürdig wirken.

Struktur & Wissenschaft (Waben- & Hexagon-Elemente):
Das Wabenmuster-Cluster wird als strukturelles Ordnungsprinzip für harten Content genutzt. Sobald es um die Longevity Balance Methode, Wirkungsweisen, Inhaltsstoffe oder die Preismatrix geht, bricht die weiche Struktur auf und wird in präzise, hexagonal gekoppelte Kachel-Systeme oder mathematisch exakte Grid-Cards überführt. Dies signalisiert dem Gehirn: Hier greift eine exakte, verlässliche Methode.

1.4 Compliance & Datensicherheit (DACH-Grenzwerte)

🚨 ePrivacy- & DSGVO-Sperre (Conversions API):
Die Injektion von Third-Party-Skripten (Meta Pixel, Google Tag Manager) oder das clientseitige Triggern serverseitiger Attributions-Pings (Meta Conversions API) vor Erteilung einer aktiven, dokumentierten Einwilligung im Consent-Banner ist im DACH-Raum rechtswidrig.

Sicherheitsvorgabe: Der Next.js Code muss clientseitig alle Tracking-Pixel isolieren. Erst bei expliziter Zustimmungs-Injektion (localStorage.setItem('consent_status', 'granted')) dürfen die Marketing-APIs initialisiert werden.

🚨 Das wettbewerbsrechtliche Kopplungsverbot (§ 7 Abs. 4 DSGVO):
Die Einwilligung in künftige Marketing-Nachrichten (E-Mail-Newsletter, Coaching-Workshops) darf nicht zur Bedingung für den Kauf des Buches oder des Bundles gemacht werden (Kopplungsverbot).

Sicherheitsvorgabe: Die Double-Opt-In-Checkbox im Bestellformular muss standardmäßig leer (nicht vor-angekreuzt, checked={false}) gerendert werden. Ein Absenden der Buchbestellung muss auch ohne Aktivierung dieses Kontrollkästchens zu 100 % barrierefrei ausführbar sein.

🚨 Preisklarheit nach PAngV:
Sämtliche Preisanzeigen auf der Landingpage müssen die Mehrwertsteuer enthalten und dies in unmittelbarer räumlicher Nähe zum Preis visualisieren (inkl. MwSt.). Versandkostenfreie Angebote müssen unmissverständlich als solche gekennzeichnet sein, während kostenpflichtige Lieferungen den exakten Frachtbetrag bereits in der Paketauswahl offenlegen müssen.

TEIL 2: SEKTION-FÜR-SEKTION DESIGN- & INHALTS-SPEZIFIKATION

Dieses Kapitel deklariert die exakten geometrischen Layout-Choreografien, CSS-Proportionen und den lückenlos ausformulierten Text-Content für alle 7 Sektionen von oben nach unten.

Sektion 1: Der Hero-Bereich (First Screen Block)

Visueller Aufbau & Layout:

Desktop: Ein zentriertes, einspaltiges Layout zur Fokussierung des mobilen und Desktop-Traffics. Das Text-Gefüge thront im Zentrum. Darunter liegt das physisch dreidimensionale Buch-Mockup (z-index: 30), unterlegt mit dem hexagonalen SVG-Wabencluster im rechten unteren Quadranten (z-index: 20).

Mobile (< 768px): Symmetrischer, einspaltiger Stack. Das Hexagon-Cluster wird dekonstruiert (Hexagon 2 und 3 werden vollständig über hidden md:block ausgeblendet). Nur das Basis-Hexagon 1 (#e5d5bb) bleibt mit einer reduzierten Skalierung von 50 % direkt hinter dem Buch-Mockup aktiv, um die mobile Signal-to-Noise-Ratio zu schützen.

Background: overflow: hidden auf Sektionsebene. Angeschnittene Kreise über absolute Positionierung: Salbeigrün-Kreis (#a7bc93, Oben Links, w-[50vw] h-[50vw] max-w-[550px], translate-x-[-25%] translate-y-[-25%], opacity-[0.08]), Altrosa-Kreis (#d8a5a4, Oben Rechts, w-[65vw] h-[65vw] max-w-[700px], translate-x-[30%] translate-y-[-20%], opacity-[0.11]).

Text- & Storytelling-Injektion:

Pre-Headline (Stufe 1 — Assistant Bold, 11px, Versalien, tracking-widest, text-amber-800): „FÜR FRAUEN IN DEN WECHSELJAHREN, DIE SICH IN IHREM KÖRPER WIEDER ZUHAUSE FÜHLEN WOLLEN.“

Hauptüberschrift (H1 — Assistant Bold, Erdton-Anthrazit): „Jetzt können Sie sich in Ihrer Haut wieder rundum wohlfühlen – selbst wenn die Hormone gerade alles auf den Kopf stellen.“

Unterüberschrift (Stufe 3 — Tenor Sans Regular, text-stone-600): „Erfahren Sie von dermazeutischer Kosmetikerin und Hormoncoach Carsta Pröstler die natürlichen Longevity Balance Routinen, um Haut und Körper in der Menopause optimal zu unterstützen.“

Confidence Cue (Tenor Sans Regular, text-stone-500, über dem CTA-Button): „⭐️ 4.9/5 | Ratgeber (Paperback & Kindle) + Exklusives Bundle“

CTA-Button (Assistant Bold, text-erdton-900, bg-coverRosa): „→ Jetzt Buch sichern & Hautbild verbessern“

Microcopy (Tenor Sans Regular, text-stone-500, unter dem CTA-Button): „✓ 14 Tage Zufriedenheitsgarantie | ✓ Einmalige Zahlung – kein Abo“

Experten-Badge (Am Buch-Mockup): Kreis-Stempel mit dem Text „Longevity Balance Methode – Hormonell & dermazeutisch fundiert“.

Interaktions-Zustände (CTA-Button):

hover: Sanfte Farbsättigung zu einem tieferen Ziegel-Rosaton (bg-[#c28f8e]), Erhöhung des CSS-Box-Shadows von shadow-md auf shadow-lg.

focus-visible: Dualer Ring-Outline: innerer Ring ring-2 ring-[#fdfbf7], äußerer Ring ring-offset-2 ring-stone-900.

active: Skalierung auf scale-[0.97], Schattenreduktion auf shadow-none.

Sektion 2: Social Proof (Vertrauens-Einstieg)

+-----------------------------------------------------------------------------------+
|  120-Grad-Schnittkante (SVG Sektions-Trenner mit preserveAspectRatio="none")      |
|  \                                                                               /|
|   \_____________________________________________________________________________/ |
|                                                                                   |
|            Tausenden Frauen aus der Seele gesprochen. Bekannt aus:                |
|       [BOUTIQUE TALKS]     [REHA-ZENTREN DACH]     [BEAUTY-EVENTS]                |
+-----------------------------------------------------------------------------------+


Visueller Aufbau & Layout:

Die Sektions-Grenze zwischen Hero und Sektion 2 wird als harte, geometrische Hexagon-Schnittkante (120 Grad) ausgeführt. Realisierung über ein absolut positioniertes SVG-Schnittschablonen-Element (position: absolute; bottom-0; left-0; w-full; h-[48px]), das sich flexibel dehnt, ohne den Schnittwinkel zu verzerren.

Sektion 2 selbst bildet ein flaches, horizontales Band. Hintergrund: bg-white.

Die Logos der Fachpräsenzen stehen als rein statische, unaufdringliche Reihe. Keine farbigen Badges, sondern reines, gedämpftes Graustufen-Design (opacity-40 im Tailwind-Layout, das bei hover sanft auf opacity-70 aufblendet).

Text- & Storytelling-Injektion:

Erzähl-Copy (Assistant Bold, text-stone-400, zentriert, Versalien): „Tausenden Frauen aus der Seele gesprochen. Bekannt aus:“

Logo-Leiste (Spezifische Fach-Formate): [EXPERTINNEN-TALKS IN BOUTIQUEN], [VORTRÄGE IN REHA-ZENTREN], [BEAUTY-EVENTS IN WOHLFÜHL-LOCATIONS].

Interaktions-Zustände:

Die Logos reagieren auf hover: mit einer sanften Erhöhung der Deckkraft (opacity-40 zu opacity-70) über eine CSS-Transition von duration-300.

Sektion 3: Problem & Agitation (PAS: Schritte 1 & 2)

Visueller Aufbau & Layout:

Desktop: Ein dreispaltiges Grid-Layout (grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto).

Mobile: Streng einspaltige, vertikale Stapelung der Cards (grid-cols-1). Abstände fest auf gap-6 (24px) und Card-Padding auf p-8 (32px), um älteren Augen maximalen Atemraum zu geben.

Cards: Symmetrische, abgerundete Kacheln (rounded-3xl bg-white border border-stone-200/60).

Text- & Storytelling-Injektion:

Question-Loop-Headline (Assistant Bold, text-stone-900, max-w-2xl, mx-auto): „Was unterscheidet Frauen, die entspannt und strahlend durch die Wechseljahre gehen, von denen, die täglich mit ihrer Haut und ihrem Körper kämpfen?“

Kachel 1 (Symptom-Kachel Trockenheit):

Label (Stufe 3 — Assistant Bold, text-stone-900): „Lipidverlust der Barriere“

Copy (Tenor Sans Regular, text-stone-600, text-xs md:text-sm): „Plötzlich ist alles anders. Die Haut wird trocken, verliert an Spannkraft oder neigt unerwartet zu Unreinheiten. Gleichzeitig rauben Hitzewallungen den Schlaf und die Energie.“

Kachel 2 (Symptom-Kachel Frustration):

Label (Stufe 3 — Assistant Bold, text-stone-900): „Kosmetische Irritations-Spirale“

Copy (Tenor Sans Regular, text-stone-600, text-xs md:text-sm): „Teure Kosmetika, die jahrelang funktionierten, versagen von heute auf morgen. Das ständige Ausprobieren neuer „Wundermittel" verbrennt nicht nur Geld, sondern auch Nerven. Es fühlt sich an, als würde man die Kontrolle über den eigenen Körper verlieren.“

Kachel 3 (Symptom-Kachel Hilflosigkeit):

Label (Stufe 3 — Assistant Bold, text-stone-900): „Hormonelle Spät-Dysbalance“

Copy (Tenor Sans Regular, text-stone-600, text-xs md:text-sm): „Die hormonellen Achterbahnen rauben Ihnen Ihre gewohnte Vitalität. Es entsteht eine tiefe Frustration über den plötzlichen Kontrollverlust, die sich schleichend auf Ihren gesamten Alltag auswirkt.“

Ausschlusskriterium (Tenor Sans Regular, italic, text-amber-900, bg-amber-50/60, border border-amber-200/80): „Wichtiger Hinweis: Dieses Buch ist nicht für Frauen, die nach schnellen chemischen Pflastern suchen. Es ist für Frauen, die die wahren Ursachen verstehen und ihren Körper natürlich unterstützen wollen.“

Sektion 4: Solution & Offer (Mechanism Block & Preismatrix)

Visueller Aufbau & Layout:

Desktop: Ein zweispaltiges Grid-Layout (grid grid-cols-1 md:grid-cols-2 gap-8 items-center max-w-4xl mx-auto).

Mobile: Vertikaler Stack. Die Bundle-Card wird prioritär oben platziert. Um die dreidimensionale Überlagerung zu wahren, erhält die direkt darunter folgende Single-Card einen negativen oberen Margin-Wert von -mt-6 (-24px). Die Bundle-Card liegt fest auf z-20, die Single-Card auf z-10.

Bundle-Card: Asymmetrisch vergrößert (scale-105), mit einem markanten, im 120-Grad-Winkel verlaufenden Waben-Inlay als Bestseller-Badge an der Oberkante. Im Hintergrund liegt ein SVG-Hexagon-Vektor in Khaki (#beab80). Ein kreisrundes, dezent beiges Qualitätssiegel („100% Naturrein – Kaltgepresst“) überlagert die Card.

Text- & Storytelling-Injektion:

Headline (Assistant Bold, text-stone-900): „Die Lösung: Hormonelle Balance von innen und außen.“

3-Schritt-Timeline (Text-Inhalte):

Verstehen Sie das Zusammenspiel von Haut und Hormonen.

Wenden Sie Carstas alltagstaugliche Longevity Balance Methode an.

Erleben Sie neue Balance und ein strahlendes Hautbild.

Preise & Pakete (Ausformulierte Copy):

Option 1: Der Praxis-Ratgeber | „Frauenkram: Haut und Wechseljahre" — vollgepackt mit Fachwissen und Routinen. Das theoretische Fachfundament für den Wandel. Paperback: €25,90 / Kindle: €10,99.

Option 2 (Bestseller-Badge: BESTSELLER): Das Regenerations-Bundle | „Frauenkram" (Taschenbuch) + Lovely Body Oil. Unterstützen Sie Ihre Haut zusätzlich von außen mit diesem nährenden, exklusiven Körperöl. Preis: €49,90 | ✅ Bonus: GRATIS VERSAND für dieses Bundle!

Interaktions-Zustände (Card Selection):

Die ausgewählte Paketkarte erhält eine aktive Konturierung in border-amber-700 sowie einen CSS-Box-Shadow von shadow-lg zur direkten Visualisierung des Systemstatus.

Sektion 5: Expert Intro & Testimonials (Trust & Proof Block)

Visueller Aufbau & Layout:

Asymmetrisches Split-Story-Grid (grid grid-cols-1 lg:grid-cols-12 gap-12 items-center).

Linke Spalte (Carstas Story): Nimmt 7 Spalten ein (lg:col-span-7). Enthält ihr Porträt-Bild, unterlegt mit einem weichen Kreis-Overlay in Altrosa (#d8a5a4, opacity-10) für maximale emotionale Nahbarkeit.

Rechte Spalte (Martinas Alltags-Proof): Nimmt 5 Spalten ein (lg:col-span-5). Der Hexagon-Fakten-Block ist in einem festen Sandton-Beige (#e5d5bb) gerendert. Auf Mobile wird dieser Block über ein negatives Translating (-translate-y-8) asymmetrisch nach oben über den Kreis von Carstas Bild gezogen, um den optischen Fluss für den Daumen flüssig zu halten.

Text- & Storytelling-Injektion:

Headline (Assistant Bold, text-stone-900): „Ihre Begleiterin durch den hormonellen Wandel“

Autorinnen-Copy (Tenor Sans Regular, text-stone-600): „Carsta Pröstler ist nicht nur Unternehmerin, dermazeutische Kosmetikerin und Gesundheitscoach. Als Mutter von 5 Kindern in einer Patchworkfamilie weiß sie genau: Gesundheitliche Routinen müssen absolut alltagstauglich sein. Sie hat die Theorien nicht nur studiert, sondern wendet sie täglich bei sich und ihren Klientinnen an.“

Martinas Testimonial (Fließtext mit gezielten typografischen Bold-Phrasen): „Ich dachte, mein Alltag als berufstätige Mutter lässt keinen Raum für Pflege. Aber Carstas Routinen wirken bereits nach dem zweiten Kapitel – die Umsetzung dauert keine 4 Minuten morgens und ließ sich ohne zusätzlichen Aufwand perfekt in meinen stressigen Tag integrieren. Meine Haut spannt endlich nicht mehr!“

Verifizierungs-Prädat (Common Region Badge): Ein vollflächiger Container directly unter Martinas Namen in Salbeigrün (#a7bc93, opacity-10) mit der weißen Aufschrift „VERIFIZIERTE LESERIN“ in Assistant Bold (9px, Versalien).

Sektion 6: FAQ (AEO-Friendly Accordion Structure)

Visueller Aufbau & Layout:

Einspaltiger, kompakter Stack (max-w-3xl mx-auto). Die geschlossenen Akkordeon-Bars werden durch Trennlinien in Sand (#e5d5bb) separiert.

Die linken Begrenzungskanten der Bars werden im 120-Grad-Winkel angeschnitten. Das Chevron-Icon zum Öffnen wird in ein filigranes Hexagon-Symbol eingebettet (flex-shrink-0 w-12, zentriert).

Beim Öffnen der FAQ färbt sich der Hintergrund der aufklappenden Fläche sanft in einem matten Salbeigrün (#a7bc93, opacity-10).

Text- & Storytelling-Injektion (Carstas original ausformulierte Antworten):

Frage 1 (Assistant Bold): „Ich spüre erst die allerersten Anzeichen der Wechseljahre – ist das Buch jetzt schon das Richtige für mich?“

Antwort (Tenor Sans Regular): „Ja, meine Liebe! Genau jetzt ist der perfekte Moment. Mit der Longevity Balance Methode bereiten wir deine Haut und deine Zellen sanft vor, anstatt später nur Symptome zu bekämpfen. Je früher du verstehst, wie dein Körper sich verändert, desto strahlender und unbeschwerter gehst du durch diese Phase.“

Frage 2 (Assistant Bold): „Wie genau wende ich das Lovely Body Oil in Kombination mit den Buchtipps an?“

Antwort (Tenor Sans Regular): „Ganz unkompliziert und alltagserprobt: Trage das Öl direkt nach dem Duschen auf die noch leicht feuchte Haut auf. Es zieht in Sekunden ein, versiegelt die Feuchtigkeit wie ein Schutzschild und hinterlässt nichts als ein samtiges Gefühl – perfekt für den dichten Alltag.“

Frage 3 (Assistant Bold): „Wie schnell ist das Buch / Bundle bei mir?“

Antwort (Tenor Sans Regular): „Unser Standardversand innerhalb der DACH-Region (Deutschland, Österreich, Schweiz) benötigt in der Regel 2-3 Werktage. Jedes Paket verlässt CO2-neutral und liebevoll verpackt unser Lager.“

Interaktions-Zustände (Hover & Active):

Hover (Akkordeon-Header): Hintergrund glimmt weich im salbeigrünen #a7bc93 (mit lediglich 6% Opacity) auf. Das Hexagon-Icon wechselt die Konturfarbe von Grau auf Senf-Khaki (#beab80) und rotiert um 45 Grad nach unten.

Sektion 7: Final CTA (Vollflächiges Farb-Banner / Variante B)

Visueller Aufbau & Layout:

Ein monumentaler, vollflächiger Block (bg-stone-950 / Erdton-Anthrazit).

Padding: Desktop py-24 px-12, Mobile py-16 px-6 zur schnellen Daumenzonen-Befreiung.

Background: Radialer Gradient aus der Mitte heraus (bg-[radial-gradient(circle_at_center,rgba(216,165,164,0.12)_0%,transparent_70%)]), der Altrosa und Salbeigrün weich verblendet und einen fokussierenden Aura-Effekt direkt hinter dem zentrierten Button erzeugt.

Text- & Storytelling-Injektion:

Headline (Assistant Bold, reinweiß): „Befreien Sie Ihre Haut und Ihren Alltag.“

Microcopy 1 (Tenor Sans Regular, text-stone-300): „Wählen Sie jetzt Ihr Paket. Entscheiden Sie sich für das Regenerations-Bundle und wir schenken Ihnen die Versandkosten.“

CTA-Button (Assistant Bold, text-stone-950, bg-coverRosa): „→ Jetzt Regenerations-Bundle sichern“

Microcopy 2 (Tenor Sans Regular, text-stone-500, direkt unter dem Button): „Einmalige Investition in Ihre Hautgesundheit. Kein Abonnement, keine automatischen Folgelieferungen. 14 Tage vollständige Zufriedenheitsgarantie.“

TEIL 3: SENIOR NEXT.JS IMPLEMENTIERUNGSPLAN (TECH-STACK WORKFLOW)

Dieses Kapitel liefert das exakte technische Drehbuch zur Code-Erstellung im Next.js App Router (React 19, TypeScript, Tailwind CSS v3).

3.1 Komponenten-Architektur & Dateistruktur

Um maximale Modularität und Code-Splitting-Effizienz für die Ladezeit zu garantieren, wird die Landingpage in folgende Komponenten-Struktur unterteilt:

/app
  ├── layout.tsx                # Globales Root-Layout (next/font-Konfiguration, Metadata API)
  ├── page.tsx                  # Server Component (Einstiegspunkt, lädt JSON-LD und Daten)
  ├── components/
        ├── Header.tsx          # Client Component (Sticky Header & Navigation)
        ├── Hero.tsx            # Client Component (Zentriertes First Screen Layout, static Mockup)
        ├── SocialProof.tsx     # Server Component (Statische monochrome Logo-Leiste)
        ├── ProblemSection.tsx  # Server Component (Symptom-Kacheln mit Gestalt-Similarity)
        ├── PricingSection.tsx  # Client Component (Side-by-Side Cards, Shopify API Hook)
        ├── ExpertSection.tsx   # Server Component (Split-Story, Testimonials)
        ├── FaqSection.tsx      # Client Component (Akkordeons mit CSS-Grid Interpolation)
        ├── FinalCta.tsx        # Client Component (Full-Width Banner)
        ├── ConsentBanner.tsx   # Client Component (ePrivacy/DSGVO blocking Gateway)
        └── Icons.tsx           # Static Vector Registry (Optimiert für LCP/INP)


3.2 Performance- & CLS-Schutzwall (Core Web Vitals Optimierung)

Lade-Optimierung der Webfonts (next/font):
Um den gefürchteten Layout-Shift (CLS) durch verzögertes Laden der Schriften vollständig auszuschließen, müssen die Google Fonts direkt über das Next.js-Schriftartenmodul in app/layout.tsx konfiguriert werden:

import { Assistant, Tenor_Sans } from 'next/font/google';

const assistant = Assistant({
  subsets: ['latin'],
  weight: ['700', '800'],
  variable: '--font-assistant',
  display: 'swap', // Erlaubt kontrolliertes Fallback-Rendering
});

const tenorSans = Tenor_Sans({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-tenor',
  display: 'swap',
});


CSS-Grid-Interpolation bei Akkordeons (CLS-Eliminierung):
FAQ-Akkordeons dürfen die Höhe nicht per JavaScript berechnen, da dies zu spürbarem Ruckeln (INP-Verschlechterung) und Layout-Verschiebungen führt. Die Expansion muss zwingend über CSS Grid-Row-Interpolation im Tailwind-System gekapselt werden:

<div className={`grid transition-all duration-300 ease-in-out ${expanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
  <div className="overflow-hidden">
    <p className="p-5 bg-white text-xs text-stone-600 leading-relaxed font-body">
      {item.a}
    </p>
  </div>
</div>


Bilder-Performance (next/image & LCP-Preloading):
Das Produktbild (Buch-Mockup) im Hero-Bereich bildet das Largest Contentful Paint (LCP) Element.

Vorgabe: Das Bild muss das Attribut priority erhalten, um das Preloading zu erzwingen. Es muss im modernen WebP- oder AVIF-Format vorliegen und exakte, feste Größendefinitionen (width, height) aufweisen, um visuelle Verschiebungen beim Rendern zu verhindern.

3.3 Shopify Storefront API & Analytics-Schnittstelle

1. Direct-to-Checkout GraphQL Mutation Blueprint:

Bei Auswahl eines Pakets in Sektion 4 und Klick auf den CTA wird die Shopify Storefront API direkt über eine GraphQL-Mutation getriggert, um den Warenkorb zu erstellen und die Checkout-URL zu generieren:

mutation createCartWithLineItems($variantId: ID!, $quantity: Int!) {
  cartCreate(input: {
    lines: [
      {
        merchandiseId: $variantId,
        quantity: $quantity
      }
    ]
  }) {
    cart {
      id
      checkoutUrl
    }
    userErrors {
      field
      message
    }
  }
}


2. Consent-Gated Meta CAPI & Pixel Dispatcher:

Bevor ein Tracking-Skript gefeuert oder eine Server-to-Server-Attribution (Meta CAPI) ausgeführt wird, prüft das System den clientseitigen Consent-State. Ist dieser granted, wird der gehashte Payload übertragen; andernfalls wird jegliche Datenübermittlung blockiert.

export function dispatchCapiEvent(eventName: string, payload: any) {
  const userConsent = localStorage.getItem('frauenkram_analytics_consent');
  if (userConsent !== 'granted') {
    // ePrivacy-Sperre greift: Abbruch zur Vermeidung von Rechtsverstößen
    return;
  }

  // Server-Side Forwarding (SHA-256 Verschlüsselung für PII)
  fetch('/api/capi-proxy', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      event: eventName,
      data: payload,
      timestamp: Math.floor(Date.now() / 1000)
    })
  });
}


3.4 AEO/SEO-Injektion (Metadata & structured Data)

Die strukturierten FAQ-Daten müssen direkt in der Page-Komponente (app/page.tsx) über den Next.js App Router als LD+JSON gerendert werden:

export const metadata = {
  title: 'Frauenkram: Haut und Wechseljahre – Carsta Pröstler',
  description: 'Der ganzheitliche dermazeutische Ratgeber für ein gesundes Hautbild und hormonelle Balance in den Wechseljahren.',
};

export default function Page() {
  return (
    <>
      <FrauenkramFunnelSystem />
    </>
  );
}
