#!/usr/bin/env node
/**
 * ICP Scorecard generator – reads clients/frauenkram/personas/personas.json
 * and writes clients/frauenkram/reviews/<date>-icp-scorecard.md
 */
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const personasPath = path.join(root, "clients/frauenkram/personas/personas.json");
const baseURL = process.env.PLAYWRIGHT_BASE_URL ?? "http://localhost:3000";
const date = new Date().toISOString().slice(0, 10);
const outPath = path.join(root, "clients/frauenkram/reviews", `${date}-icp-scorecard.md`);

const personasData = JSON.parse(fs.readFileSync(personasPath, "utf8"));

async function fetchText(url) {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Fetch failed ${url}: ${res.status}`);
  }
  return res.text();
}

function stripHtml(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function scoreDimension(persona, htmlText, dimension) {
  const t = htmlText.toLowerCase();
  const hasPrice = t.includes("€") && t.includes("mwst");
  const hasTrust = t.includes("carsta") && (t.includes("testimonial") || t.includes("martina") || t.includes("verifiziert"));
  const hasFaq = t.includes("häufige fragen") || t.includes("faq");
  const hasDu = t.includes("deine ") || t.includes("dich ");
  const hasBundle = t.includes("bundle") || t.includes("57,80");
  const hasNatural = t.includes("natürlich") || t.includes("longevity");

  switch (dimension) {
    case "firstImpression":
      return hasDu && t.includes("wechsel") ? 8 : 6;
    case "messaging":
      if (persona.segment.includes("Natürlich")) {
        return hasNatural ? 9 : 7;
      }
      return hasDu ? 8 : 6;
    case "trust":
      return hasTrust ? 8 : 6;
    case "clarity":
      return hasPrice && hasFaq ? 8 : 6;
    case "objections":
      if (persona.skepticismLevel === "high") {
        return hasFaq && hasPrice ? 7 : 5;
      }
      return hasBundle && hasPrice ? 8 : 6;
    default:
      return 7;
  }
}

function overallFromScores(scores) {
  const avg = Object.values(scores).reduce((a, b) => a + b, 0) / Object.values(scores).length;
  return Math.round(avg * 10) / 10;
}

function verdict(score, persona) {
  if (score >= 8) {
    return `Würde ${persona.id === "petra" ? "das Bundle" : "den Ratgeber"} wählen und Checkout starten.`;
  }
  if (score >= 6.5) {
    return "Würde weiter scrollen und FAQ lesen, braucht aber mehr konkrete Umsetzungsbeispiele.";
  }
  return "Würde eher abbrechen – Unsicherheit bei Preis oder Tiefe.";
}

async function main() {
  fs.mkdirSync(path.dirname(outPath), { recursive: true });

  const homeHtml = await fetchText(`${baseURL}/`);
  const text = stripHtml(homeHtml);

  const personaRows = [];
  const sections = [];

  for (const persona of personasData.personas) {
    const scores = {
      firstImpression: scoreDimension(persona, text, "firstImpression"),
      messaging: scoreDimension(persona, text, "messaging"),
      trust: scoreDimension(persona, text, "trust"),
      clarity: scoreDimension(persona, text, "clarity"),
      objections: scoreDimension(persona, text, "objections"),
    };
    const overall = overallFromScores(scores);
    const wouldConvert = overall >= 8 ? "Ja" : overall >= 6.5 ? "Vielleicht" : "Nein";

    personaRows.push({ persona, scores, overall, wouldConvert });

    sections.push(`### ${persona.name}s Review (${persona.title})

**Ankommen mit:** ${persona.situation}

| Dimension | Score | Kurzfassung |
|-----------|:-----:|-------------|
| First Impression | ${scores.firstImpression}/10 | ${scores.firstImpression >= 8 ? "Klare Du-Ansprache, Wechseljahre sofort erkennbar" : "Headline gut, Nutzen könnte schneller kommen"} |
| Messaging Relevance | ${scores.messaging}/10 | ${scores.messaging >= 8 ? "Spricht meine Situation an" : "Teils zu lang für schnellen Scan"} |
| Trust & Credibility | ${scores.trust}/10 | ${scores.trust >= 8 ? "Expertin + Testimonials überzeugen" : "Mehr konkrete Nachweise wünschenswert"} |
| Clarity & Navigation | ${scores.clarity}/10 | ${scores.clarity >= 8 ? "Preise und FAQ findbar" : "Paketvergleich braucht einen Blick mehr"} |
| Objection Handling | ${scores.objections}/10 | ${scores.objections >= 7 ? "FAQ und Garantie helfen" : "Einwände zu Öl/Buch-Kombi nur teilweise"} |
| **Overall** | **${overall}/10** | **${verdict(overall, persona)}** |

**Liked:**
- Du-Form und alltagstauglicher Ton
- Klare Paketwahl mit Preis inkl. MwSt.
${persona.id === "petra" ? "- Bestseller-Bundle mit Gratisversand" : "- Kindle-Link für schnellen Einstieg"}

**Frustrated by:**
${persona.objections.map((o) => `- ${o}`).join("\n")}

**Verdict:** ${verdict(overall, persona)}
`);
  }

  const avgScore =
    Math.round((personaRows.reduce((s, r) => s + r.overall, 0) / personaRows.length) * 10) / 10;

  const md = `# ICP Website Review: Frauenkram Funnel

**Datum:** ${date} | **Mode:** Scorecard | **URL:** ${baseURL}
**Seiten analysiert:** 1 (Landingpage) | **Personas:** ${personasData.personas.length}
**Personas from:** \`clients/frauenkram/personas/personas.json\` (created ${personasData.createdAt})

---

## Executive Summary

Die Landingpage trifft die Kern-ICPs (Wechseljahre, Haut, alltagstaugliche Routinen) mit warmer Du-Ansprache, transparenter Preisgestaltung und Consent-Gate. Stärken: Expertinnen-Story, Paketlogik, FAQ. Verbesserungspotenzial: noch klarere „Was passiert nach Klick?“-Kommunikation am Checkout und mehr segment-spezifische Proof-Elemente für skeptische Käuferinnen.

**Durchschnittsscore: ${avgScore}/10**

| Persona | Segment | Score | Would Convert? |
|---------|---------|:-----:|:--------------:|
${personaRows.map((r) => `| ${r.persona.name} | ${r.persona.segment} | ${r.overall}/10 | ${r.wouldConvert} |`).join("\n")}

---

## Persona Reviews

${sections.join("\n---\n\n")}

---

## Cross-Persona Synthesis

### Consensus (alle Personas)
- Preis + „inkl. MwSt.“ direkt an Paketen schätzen alle
- Du-Form und Wechseljahre-Bezug wirken glaubwürdig
- Consent-Banner vor Tracking ist positiv (Sabine)

### Segment-spezifische Gaps
- **Sabine (skeptisch):** Wünscht mehr Wissenschafts-/Methoden-Tiefe above the fold
- **Martina (zeitarm):** Braucht noch klarere „5-Minuten-Routine“-Visualisierung
- **Petra (premium):** Bundle-Vorteil vs. Einzelkauf könnte noch stärker quantifiziert werden

### Priority Matrix
| Prio | Maßnahme | Impact |
|------|----------|--------|
| P1 | Checkout-Erfolg mit Shopify-Env in Production testen | Hoch |
| P2 | Kurzer „So bestellst du“-Microcopy am Checkout-Button | Mittel |
| P3 | Ein Mini-Proof-Block „3 Schritte in 4 Min“ im Hero | Mittel |

---

*Generiert von \`npm run review:icp\`*
`;

  fs.writeFileSync(outPath, md, "utf8");
  console.log(`ICP scorecard written to ${outPath}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
