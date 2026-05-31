# Website Review: Frauenkram Funnel

**Datum:** 2026-05-31 | **Tool:** Playwright (@playwright/test)  
**Base URL:** http://localhost:3000  
**Projekte:** mobile-chrome (375px), desktop-chrome

---

## Ergebnis

Automatisierte Smoke- und Compliance-Checks sind in `tests/reviews/website-review.spec.ts` definiert.  
Ausführung: `npm run review:website`

Screenshots: `clients/frauenkram/reviews/screenshot-home-*.png`  
HTML-Report: `clients/frauenkram/reviews/playwright-report/`

---

## Abgedeckte Prüfpunkte

- SEO: Title, FAQ JSON-LD
- Semantik: eine H1, landmark regions
- Consent: Banner, Datenschutz-Link, Ablehnen
- PAngV: Preis + inkl. MwSt.
- DSGVO: Marketing-Checkbox unchecked
- Checkout: disabled → enabled nach Auswahl
- Legal: Impressum/Datenschutz ohne Platzhalter
- A11y: FAQ Touch-Target ≥ 48px, Akkordeon funktional

---

*Generiert von `npm run review:website`*
