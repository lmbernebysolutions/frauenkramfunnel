import type { FaqItem, PricingOption, ProblemCard, SocialProofItem, Testimonial } from "@/types/funnel";

export const heroContent = {
  preHeadline:
    "FÜR FRAUEN IN DEN WECHSELJAHREN, DIE SICH IN IHREM KÖRPER WIEDER ZUHAUSE FÜHLEN WOLLEN.",
  headline: "Fühlen Sie sich wieder wohl in Ihrer Haut.",
  subHeadline:
    "Erfahren Sie von dermazeutischer Kosmetikerin und Hormoncoach Carsta Pröstler die natürlichen Longevity Balance Routinen, um Haut und Körper in der Menopause optimal zu unterstützen.",
  confidenceCue: "⭐️ 4.9/5 | Ratgeber (Paperback & Kindle) + Exklusives Bundle",
  ctaLabel: "→ Jetzt Buch sichern & Hautbild verbessern",
  microcopy: "✓ 14 Tage Zufriedenheitsgarantie | ✓ Einmalige Zahlung – kein Abo",
  expertBadge: "Longevity Balance Methode – Hormonell & dermazeutisch fundiert",
} as const;

export const socialProofItems: SocialProofItem[] = [
  { id: "boutique-talks", label: "EXPERTINNEN-TALKS IN BOUTIQUEN" },
  { id: "reha-centers", label: "VORTRÄGE IN REHA-ZENTREN" },
  { id: "beauty-events", label: "BEAUTY-EVENTS IN WOHLFÜHL-LOCATIONS" },
];

export const problemCards: ProblemCard[] = [
  {
    id: "lipidverlust",
    title: "Lipidverlust der Barriere",
    body: "Plötzlich ist alles anders. Die Haut wird trocken, verliert an Spannkraft oder neigt unerwartet zu Unreinheiten. Gleichzeitig rauben Hitzewallungen den Schlaf und die Energie.",
  },
  {
    id: "irritations-spirale",
    title: "Kosmetische Irritations-Spirale",
    body: "Teure Kosmetika, die jahrelang funktionierten, versagen von heute auf morgen. Das ständige Ausprobieren neuer „Wundermittel\" verbrennt nicht nur Geld, sondern auch Nerven. Es fühlt sich an, als würde man die Kontrolle über den eigenen Körper verlieren.",
  },
  {
    id: "spaet-dysbalance",
    title: "Hormonelle Spät-Dysbalance",
    body: "Die hormonellen Achterbahnen rauben Ihnen Ihre gewohnte Vitalität. Es entsteht eine tiefe Frustration über den plötzlichen Kontrollverlust, die sich schleichend auf Ihren gesamten Alltag auswirkt.",
  },
];

export const pricingTimeline = [
  "Verstehen Sie das Zusammenspiel von Haut und Hormonen.",
  "Wenden Sie Carstas alltagstaugliche Longevity Balance Methode an.",
  "Erleben Sie neue Balance und ein strahlendes Hautbild.",
] as const;

export const pricingOptions: PricingOption[] = [
  {
    id: "guide",
    name: "Der Praxis-Ratgeber",
    description:
      "„Frauenkram: Haut und Wechseljahre\" — vollgepackt mit Fachwissen und Routinen. Das theoretische Fachfundament für den Wandel.",
    priceLabel: "Paperback: €25,90 / Kindle: €10,99",
    vatLabel: "inkl. MwSt.",
    shippingLabel: "Versandkosten: €4,90 (DACH).",
    isBestseller: false,
  },
  {
    id: "bundle",
    name: "Das Regenerations-Bundle",
    description:
      "„Frauenkram\" (Taschenbuch) + Lovely Body Oil. Unterstützen Sie Ihre Haut zusätzlich von außen mit diesem nährenden, exklusiven Körperöl.",
    priceLabel: "Preis: €49,90",
    vatLabel: "inkl. MwSt.",
    shippingLabel: "✅ Bonus: GRATIS VERSAND",
    isBestseller: true,
  },
];

export const expertContent = {
  headline: "Ihre Begleiterin durch den hormonellen Wandel",
  story:
    "Carsta Pröstler ist nicht nur Unternehmerin, dermazeutische Kosmetikerin und Gesundheitscoach. Als Mutter von 5 Kindern in einer Patchworkfamilie weiß sie genau: Gesundheitliche Routinen müssen absolut alltagstauglich sein. Sie hat die Theorien nicht nur studiert, sondern wendet sie täglich bei sich und ihren Klientinnen an.",
} as const;

export const testimonials: Testimonial[] = [
  {
    id: "martina",
    name: "Martina",
    age: 52,
    body: "Ich dachte, mein Alltag als berufstätige Mutter lässt keinen Raum für Pflege. Aber Carstas Routinen wirken bereits nach dem zweiten Kapitel – die Umsetzung dauert keine 4 Minuten morgens und ließ sich ohne zusätzlichen Aufwand perfekt in meinen stressigen Tag integrieren. Meine Haut spannt endlich nicht mehr!",
    badgeLabel: "VERIFIZIERTE LESERIN",
  },
  {
    id: "sabine",
    name: "Sabine",
    age: 49,
    body: "Ich war skeptisch, ob ich neben Job und Familie noch eine Routine durchhalte. Die klaren Schritte im Buch haben mir geholfen, Struktur in meinen Morgen zu bringen. Meine Haut wirkt ausgeglichener und ich fühle mich endlich wieder sicher in meinem Körper.",
    badgeLabel: "VERIFIZIERTE LESERIN",
  },
];

export const faqItems: FaqItem[] = [
  {
    id: "faq-1",
    question: "Frühe Wechseljahre: Ist dieses Buch passend?",
    answer:
      "Ja, meine Liebe! Genau jetzt ist der perfekte Moment. Mit der Longevity Balance Methode bereiten wir deine Haut und deine Zellen sanft vor, anstatt später nur Symptome zu bekämpfen. Je früher du verstehst, wie dein Körper sich verändert, desto strahlender und unbeschwerter gehst du durch diese Phase.",
  },
  {
    id: "faq-2",
    question: "Wie nutze ich das Lovely Body Oil?",
    answer:
      "Ganz unkompliziert und alltagserprobt: Trage das Öl direkt nach dem Duschen auf die noch leicht feuchte Haut auf. Es zieht in Sekunden ein, versiegelt die Feuchtigkeit wie ein Schutzschild und hinterlässt nichts als ein samtiges Gefühl – perfekt für den dichten Alltag.",
  },
  {
    id: "faq-3",
    question: "Wann kommen Buch oder Bundle an?",
    answer:
      "Unser Standardversand innerhalb der DACH-Region (Deutschland, Österreich, Schweiz) benötigt in der Regel 2-3 Werktage. Jedes Paket verlässt CO2-neutral und liebevoll verpackt unser Lager.",
  },
];
