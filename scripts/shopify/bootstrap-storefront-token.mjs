#!/usr/bin/env node
/**
 * Einmalig ausführen (lokal mit .env.local):
 *   npm run shopify:bootstrap
 *
 * Erzeugt SHOPIFY_STOREFRONT_ACCESS_TOKEN via Client-Credentials + Admin GraphQL.
 * Gibt KEINE Secrets in Git aus – nur Konsolen-Hinweise für Vercel.
 */
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const envLocalPath = path.join(root, ".env.local");

function loadEnvLocal() {
  if (!fs.existsSync(envLocalPath)) {
    return;
  }
  const lines = fs.readFileSync(envLocalPath, "utf8").split("\n");
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) {
      continue;
    }
    const eq = trimmed.indexOf("=");
    if (eq === -1) {
      continue;
    }
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    if (!process.env[key]) {
      process.env[key] = value;
    }
  }
}

loadEnvLocal();

const domain = process.env.SHOPIFY_STORE_DOMAIN || process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const clientId = process.env.SHOPIFY_CLIENT_ID;
const clientSecret = process.env.SHOPIFY_CLIENT_SECRET;

if (!domain || !clientId || !clientSecret) {
  console.error(
    "Fehlt: SHOPIFY_STORE_DOMAIN (oder NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN), SHOPIFY_CLIENT_ID, SHOPIFY_CLIENT_SECRET in .env.local",
  );
  process.exit(1);
}

const shop = domain.replace(/^https?:\/\//, "").replace(/\/$/, "");
const apiVersion = process.env.SHOPIFY_STOREFRONT_API_VERSION || "2024-10";

const oauthBody = new URLSearchParams({
  grant_type: "client_credentials",
  client_id: clientId,
  client_secret: clientSecret,
});

const oauthRes = await fetch(`https://${shop}/admin/oauth/access_token`, {
  method: "POST",
  headers: { "Content-Type": "application/x-www-form-urlencoded" },
  body: oauthBody,
});

const oauthJson = await oauthRes.json();
if (!oauthRes.ok || !oauthJson.access_token) {
  console.error("OAuth fehlgeschlagen:", oauthJson);
  process.exit(1);
}

const adminToken = oauthJson.access_token;

const tokenRes = await fetch(`https://${shop}/admin/api/${apiVersion}/graphql.json`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "X-Shopify-Access-Token": adminToken,
  },
  body: JSON.stringify({
    query: `
      mutation {
        storefrontAccessTokenCreate(input: { title: "Frauenkram Funnel Bootstrap" }) {
          storefrontAccessToken { accessToken }
          userErrors { message }
        }
      }
    `,
  }),
});

const tokenJson = await tokenRes.json();
const storefrontToken =
  tokenJson.data?.storefrontAccessTokenCreate?.storefrontAccessToken?.accessToken;
const userErrors = tokenJson.data?.storefrontAccessTokenCreate?.userErrors ?? [];

if (!storefrontToken) {
  console.error("Storefront-Token konnte nicht erstellt werden:", tokenJson);
  process.exit(1);
}

if (userErrors.length) {
  console.warn("Hinweise:", userErrors);
}

const guideGid =
  process.env.SHOPIFY_VARIANT_ID_GUIDE || process.env.NEXT_PUBLIC_VARIANT_GUIDE;
const bundleGid =
  process.env.SHOPIFY_VARIANT_ID_BUNDLE || process.env.NEXT_PUBLIC_VARIANT_BUNDLE;

let cartSmoke = "";
if (bundleGid) {
  const cartRes = await fetch(`https://${shop}/api/${apiVersion}/graphql.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": storefrontToken,
    },
    body: JSON.stringify({
      query: `
        mutation {
          cartCreate(input: { lines: [{ merchandiseId: "${bundleGid}", quantity: 1 }] }) {
            cart { checkoutUrl }
            userErrors { message }
          }
        }
      `,
    }),
  });
  const cartJson = await cartRes.json();
  cartSmoke = cartJson.data?.cartCreate?.cart?.checkoutUrl ?? "(cartCreate fehlgeschlagen)";
}

console.log("\n✓ Shopify Bootstrap erfolgreich\n");
console.log("In Vercel / .env.local setzen (NICHT committen):\n");
console.log(`SHOPIFY_STORE_DOMAIN=${shop}`);
console.log(`SHOPIFY_STOREFRONT_ACCESS_TOKEN=${storefrontToken}`);
if (guideGid) {
  console.log(`SHOPIFY_VARIANT_ID_GUIDE=${guideGid}`);
}
if (bundleGid) {
  console.log(`SHOPIFY_VARIANT_ID_BUNDLE=${bundleGid}`);
}
console.log("\nOptional bereits als NEXT_PUBLIC_* gesetzt – Server-Env oben reicht für Checkout.");
if (cartSmoke) {
  console.log(`\nSmoke-Test checkoutUrl: ${cartSmoke}`);
}
console.log("");
