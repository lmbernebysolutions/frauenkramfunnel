# Frauenkram – Client Assets

## ICP Personas

`personas/personas.json` – drei synthetische ICPs für Scorecard- und Focus-Group-Reviews.

## Reviews ausführen

Server muss erreichbar sein (z. B. `npm run dev` oder `npm run build && npm run start`).

```bash
# Playwright Website-Review (nutzt laufenden Server auf :3000 wenn vorhanden)
PLAYWRIGHT_SKIP_WEBSERVER=1 npm run review:website

# Oder: Build + Start automatisch durch Playwright
npm run review:website

# ICP Scorecard (Markdown)
PLAYWRIGHT_BASE_URL=http://localhost:3000 npm run review:icp

# Beides
npm run review
```

## Shopify Go-Live

1. `.env.local` aus `.env.example` (Domain + Variant-GIDs sind vorgegeben).
2. `SHOPIFY_CLIENT_ID` / `SHOPIFY_CLIENT_SECRET` aus dem Dev Dashboard eintragen.
3. `npm run shopify:bootstrap` → `SHOPIFY_STOREFRONT_ACCESS_TOKEN` in Vercel setzen.
4. Alternativ (nur Dev): `POST /api/shopify/bootstrap` mit `Authorization: Bearer $SHOPIFY_BOOTSTRAP_SECRET`.

Reports landen in `reviews/`:

- `YYYY-MM-DD-website-review.md`
- `YYYY-MM-DD-icp-scorecard.md`
- Screenshots `screenshot-home-*.png`
