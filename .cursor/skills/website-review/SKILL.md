---
name: website-review
description: Use this skill when the user asks to review, audit, or critique a website with evidence (for example marketing sites, landing pages, product pages, docs portals, or launch pages), and when the user expects Playwright-based browser validation plus a structured markdown report with severity and recommendations.
---

# website-review (Frauenkram Funnel)

Playwright-basierte Reviews sind im Repo implementiert.

## Ausführen

```bash
# Mit laufendem Dev-Server (z. B. npm run dev auf :3000)
PLAYWRIGHT_SKIP_WEBSERVER=1 npm run review:website

# Oder: Playwright startet build + next start selbst
npm run review:website
```

## Output

- Tests: `tests/reviews/website-review.spec.ts`
- Report: `clients/frauenkram/reviews/YYYY-MM-DD-website-review.md`
- Screenshots: `clients/frauenkram/reviews/screenshot-home-*.png`
- HTML: `clients/frauenkram/reviews/playwright-report/`

## Abgedeckte Checks

SEO (Title, FAQ JSON-LD), Semantik (H1), Consent-Banner, PAngV-Preise, Checkout-Flow, Legal Pages ohne Platzhalter, FAQ-Akkordeon, Mobile Overflow.
