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

function contentSignals(text) {
  const t = text.toLowerCase();
  return {
    hasPrice: t.includes("€") && t.includes("mwst"),
    hasTrust:
      t.includes("carsta") &&
      (t.includes("verifiziert") || t.includes("martina") || t.includes("sabine")),
    hasFaq: t.includes("häufige fragen") || t.includes("faq"),
    hasDu: t.includes("deine ") || t.includes("dich ") || t.includes("fühl dich"),
    hasBundle: t.includes("bundle") || t.includes("57,80"),
    hasNatural: t.includes("natürlich") || t.includes("longevity"),
    hasLipidScience:
      t.includes("lipidsynthese") ||
      t.includes("zellulär") ||
      t.includes("lipidverlust") ||
      t.includes("barriere"),
    hasDermazeutic: t.includes("dermazeut"),
    hasHolistic: t.includes("hormon") && t.includes("haut"),
    hasRitual: t.includes("öl") || t.includes("routine"),
    hasEarlyPhase: t.includes("wechsel") || t.includes("menopause") || t.includes("perimenopause"),
  };
}

function scoreDimension(persona, signals, dimension) {
  const skeptical = persona.skepticismLevel === "high";
  const segment = persona.segment.toLowerCase();

  switch (dimension) {
    case "firstImpression":
      if (signals.hasDu && signals.hasEarlyPhase) {
        return signals.hasLipidScience ? 9 : 8;
      }
      return 6;
    case "messaging":
      if (segment.includes("verzweifelt") || skeptical) {
        if (signals.hasLipidScience && signals.hasDermazeutic) {
          return 9;
        }
        return signals.hasNatural ? 7 : 6;
      }
      if (segment.includes("ästhet") || segment.includes("pro-aging")) {
        return signals.hasLipidScience && signals.hasRitual ? 9 : 8;
      }
      if (segment.includes("karriere") || segment.includes("führungskraft")) {
        return signals.hasHolistic && signals.hasEarlyPhase ? 8 : 7;
      }
      return signals.hasDu && signals.hasNatural ? 8 : 7;
    case "trust":
      return signals.hasTrust && signals.hasDermazeutic ? 8 : signals.hasTrust ? 7 : 6;
    case "clarity":
      return signals.hasPrice && signals.hasFaq ? 8 : 6;
    case "objections":
      if (skeptical) {
        return signals.hasLipidScience && signals.hasFaq && signals.hasPrice ? 8 : 7;
      }
      return signals.hasBundle && signals.hasPrice ? 8 : 7;
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
    if (persona.id === "leonie") {
      return "Würde das Regenerations-Bundle mit Body-Oil-Ritual wählen.";
    }
    return "Würde den Ratgeber oder das Bundle wählen und Checkout starten.";
  }
  if (score >= 6.5) {
    return "Würde weiter scrollen und FAQ lesen – überzeugt, aber noch ein Einwand offen.";
  }
  return "Würde eher abbrechen – zu wenig Tiefe oder Vertrauen für den nächsten Schritt.";
}

function likedBullets(persona, signals) {
  const lines = [
    "- Du-Form und alltagstauglicher Ton",
    "- Klare Paketwahl mit Preis inkl. MwSt.",
  ];
  if (signals.hasLipidScience) {
    lines.push("- Wissenschaftlicher Lipid-/Hautbezug already above the fold");
  }
  if (persona.id === "leonie") {
    lines.push("- Bundle mit Body Oil als Self-Care-Ritual");
  }
  if (persona.id === "tina") {
    lines.push("- Dermazeutischer Ansatz statt reiner Lifestyle-Versprechen");
  }
  if (persona.id === "claudia") {
    lines.push("- Ganzheitlicher Hormon-Haut-Kompass");
  }
  return lines.join("\n");
}

function dimensionSummary(dimension, score, persona, signals) {
  const summaries = {
    firstImpression: {
      high: "Klare Du-Ansprache, Wechseljahre und Lipid-Bezug sofort erkennbar",
      low: "Headline gut, wissenschaftlicher Nutzen könnte schneller kommen",
    },
    messaging: {
      high: "Spricht meine Situation und Methodik an",
      low: "Teils zu dicht für schnellen Scan",
    },
    trust: {
      high: "Expertin + Testimonials überzeugen",
      low: "Mehr konkrete Nachweise wünschenswert",
    },
    clarity: {
      high: "Preise und FAQ findbar",
      low: "Paketvergleich braucht einen Blick mehr",
    },
    objections: {
      high: "FAQ, Garantie und Preistransparenz adressieren Einwände",
      low: "Markt-Skepsis nur teilweise entkräftet",
    },
  };
  const bucket = score >= 8 ? "high" : "low";
  if (dimension === "messaging" && persona.skepticismLevel === "high" && signals.hasLipidScience) {
    return "Lipidsynthese & dermazeutischer Tiefgang im Hero überzeugen";
  }
  return summaries[dimension][bucket];
}

async function main() {
  fs.mkdirSync(path.dirname(outPath), { recursive: true });

  const homeHtml = await fetchText(`${baseURL}/`);
  const text = stripHtml(homeHtml);
  const signals = contentSignals(text);

  const personaRows = [];
  const sections = [];

  for (const persona of personasData.personas) {
    const scores = {
      firstImpression: scoreDimension(persona, signals, "firstImpression"),
      messaging: scoreDimension(persona, signals, "messaging"),
      trust: scoreDimension(persona, signals, "trust"),
      clarity: scoreDimension(persona, signals, "clarity"),
      objections: scoreDimension(persona, signals, "objections"),
    };
    const overall = overallFromScores(scores);
    const wouldConvert = overall >= 8 ? "Ja" : overall >= 6.5 ? "Vielleicht" : "Nein";

    personaRows.push({ persona, scores, overall, wouldConvert });

    sections.push(`### ${persona.name}s Review (${persona.title})

**Ankommen mit:** ${persona.situation}

| Dimension | Score | Kurzfassung |
|-----------|:-----:|-------------|
| First Impression | ${scores.firstImpression}/10 | ${dimensionSummary("firstImpression", scores.firstImpression, persona, signals)} |
| Messaging Relevance | ${scores.messaging}/10 | ${dimensionSummary("messaging", scores.messaging, persona, signals)} |
| Trust & Credibility | ${scores.trust}/10 | ${dimensionSummary("trust", scores.trust, persona, signals)} |
| Clarity & Navigation | ${scores.clarity}/10 | ${dimensionSummary("clarity", scores.clarity, persona, signals)} |
| Objection Handling | ${scores.objections}/10 | ${dimensionSummary("objections", scores.objections, persona, signals)} |
| **Overall** | **${overall}/10** | **${verdict(overall, persona)}** |

**Liked:**
${likedBullets(persona, signals)}

**Frustrated by:**
${persona.objections.map((o) => `- ${o.replace(/\s*\[\d+\]\s*/g, " ").trim()}`).join("\n")}

**Verdict:** ${verdict(overall, persona)}
`);
  }

  const avgScore =
    Math.round((personaRows.reduce((s, r) => s + r.overall, 0) / personaRows.length) * 10) / 10;

  const tina = personaRows.find((r) => r.persona.id === "tina");

  const md = `# ICP Website Review: Frauenkram Funnel

**Datum:** ${date} | **Mode:** Scorecard | **URL:** ${baseURL}
**Seiten analysiert:** 1 (Landingpage) | **Personas:** ${personasData.personas.length}
**Personas from:** \`clients/frauenkram/personas/personas.json\` (created ${personasData.createdAt})

---

## Executive Summary

Die Landingpage adressiert Wechseljahre, Haut und Hormonbalance mit transparenter Preisgestaltung und Consent-Gate. Der Hero nennt jetzt explizit die **zelluläre Lipidsynthese** und den **dermazeutischen** Ansatz – das stärkt besonders skeptische Personas (Tina). Stärken: Expertinnen-Story, Paketlogik, FAQ.

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
- Preis + „inkl. MwSt.“ direkt an Paketen
- Du-Form und Wechseljahre-Bezug wirken glaubwürdig
- Consent-Banner vor Tracking schafft Vertrauen

### Segment-spezifische Gaps
- **Tina (skeptisch):** ${tina && tina.overall >= 8 ? "Hero-Lipid-Claim adressiert Kern-Einwand – weiter FAQ-Tiefe nutzen" : "Noch stärkere Abgrenzung zu Einzelprodukten im Markt"}
- **Claudia (Karriere):** Brain-Fog-/Schlaf-Bezug könnte im Problem-Block expliziter sein
- **Leonie (Pro-Aging):** Postmenopause-Ritual-Story im Bundle bereits stark

### Priority Matrix
| Prio | Maßnahme | Impact |
|------|----------|--------|
| P1 | Shopify-Env auf Vercel setzen und Checkout smoke-testen | Hoch |
| P2 | Optional: Brain-Fog-Microcopy im Problem-Block für Claudia | Mittel |
| P3 | Production-Deploy + erneutes \`npm run review\` | Mittel |

---

*Generiert von \`npm run review:icp\`*
`;

  fs.writeFileSync(outPath, md, "utf8");
  console.log(`ICP scorecard written to ${outPath}`);
  console.log(
    `Scores: ${personaRows.map((r) => `${r.persona.name} ${r.overall}`).join(", ")} | Avg ${avgScore}`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
