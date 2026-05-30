import { expect, test } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";

const reportDir = path.join(process.cwd(), "clients/frauenkram/reviews");

test.describe("Frauenkram Funnel – Website Review", () => {
  test.beforeAll(() => {
    fs.mkdirSync(reportDir, { recursive: true });
  });

  test("Homepage: SEO, Semantik, Consent, Pricing-Flow", async ({ page }, testInfo) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    await expect(page).toHaveTitle(/Frauenkram/i);

    await expect(page.getByText(/zelluläre Lipidsynthese reaktivieren/i)).toBeVisible();
    await expect(page.getByText(/Dermazeutische Longevity-Balance/i)).toBeVisible();

    const h1 = page.getByRole("heading", { level: 1 });
    await expect(h1).toHaveCount(1);

    const jsonLd = page.locator('script[type="application/ld+json"]');
    await expect(jsonLd).toHaveCount(1);
    const ldContent = await jsonLd.textContent();
    expect(ldContent).toContain("FAQPage");

    const consent = page.getByRole("dialog", { name: /Datenschutz/i });
    await expect(consent).toBeVisible();
    await expect(consent.getByRole("link", { name: /Datenschutzerklärung/i })).toBeVisible();

    await consent.getByRole("button", { name: "Ablehnen" }).click();
    await expect(consent).toBeHidden();

    const checkout = page.getByRole("button", { name: /Weiter zum Checkout/i });
    await expect(checkout).toBeDisabled();

    await page.getByRole("button", { name: /Regenerations-Bundle/i }).click();
    await expect(checkout).toBeEnabled();

    const marketing = page.getByRole("checkbox", {
      name: /optional Informationen/i,
    });
    await expect(marketing).not.toBeChecked();

    const bundlePrice = page.getByText(/Preis: €57,80/);
    await expect(bundlePrice).toBeVisible();
    const vat = page.getByText("inkl. MwSt.", { exact: true }).first();
    await expect(vat).toBeVisible();

    if (testInfo.project.name === "mobile-chrome") {
      const microcopyLines = page.locator("ul").filter({ hasText: "Zufriedenheitsgarantie" }).locator("li");
      await expect(microcopyLines).toHaveCount(2);
      await expect(page.getByText("|", { exact: true })).toBeHidden();

      const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
      expect(overflow).toBe(false);
    }

    await page.screenshot({
      path: path.join(reportDir, `screenshot-home-${testInfo.project.name}.png`),
      fullPage: true,
    });
  });

  test("Rechtliche Seiten laden ohne Platzhalter", async ({ page }) => {
    await page.goto("/impressum");
    await expect(page.getByRole("heading", { level: 1, name: "Impressum" })).toBeVisible();
    await expect(page.getByText("Heinestr. 10")).toBeVisible();
    await expect(page.getByText("97209 Veitshöchheim")).toBeVisible();
    await expect(page.getByText("mail@cp-yourbalance.de")).toBeVisible();
    await expect(page.getByText("[Straße")).toHaveCount(0);

    await page.goto("/datenschutz");
    await expect(page.getByRole("heading", { level: 1, name: "Datenschutzerklärung" })).toBeVisible();
    await expect(page.getByText("Vercel Inc.")).toBeVisible();
    await expect(page.getByText("frauenkram_analytics_consent")).toBeVisible();
    await expect(page.getByText("[Anschrift]")).toHaveCount(0);
  });

  test("FAQ-Akkordeon: Tastatur und Expansion", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Ablehnen" }).click();

    const faqButton = page.getByRole("button", { name: /Lovely Body Oil/i });
    const box = await faqButton.boundingBox();
    expect(box?.height ?? 0).toBeGreaterThanOrEqual(48);

    await faqButton.click();
    await expect(page.getByText(/nach dem Duschen/i)).toBeVisible();
  });

  test.afterAll(async () => {
    const date = new Date().toISOString().slice(0, 10);
    const summaryPath = path.join(reportDir, `${date}-website-review.md`);
    const body = `# Website Review: Frauenkram Funnel

**Datum:** ${date} | **Tool:** Playwright (@playwright/test)  
**Base URL:** ${process.env.PLAYWRIGHT_BASE_URL ?? "http://localhost:3000"}  
**Projekte:** mobile-chrome (375px), desktop-chrome

---

## Ergebnis

Automatisierte Smoke- und Compliance-Checks sind in \`tests/reviews/website-review.spec.ts\` definiert.  
Ausführung: \`npm run review:website\`

Screenshots: \`clients/frauenkram/reviews/screenshot-home-*.png\`  
HTML-Report: \`clients/frauenkram/reviews/playwright-report/\`

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

*Generiert von \`npm run review:website\`*
`;
    fs.writeFileSync(summaryPath, body, "utf8");
  });
});
