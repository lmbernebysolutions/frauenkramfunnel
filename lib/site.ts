/** Kanonische Site-URL für Metadata, JSON-LD und rechtliche Verweise. */
export const siteConfig = {
  name: "Frauenkram: Haut und Wechseljahre",
  legalName: "Carsta Pröstler",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://frauenkram.carstaproestler.de",
  locale: "de_DE",
  contact: {
    email: "mail@cp-yourbalance.de",
    phone: "+49 171 6287978",
    phoneDisplay: "0171 6287978",
    street: "Heinestr. 10",
    postalCode: "97209",
    city: "Veitshöchheim",
    country: "Deutschland",
  },
  tax: {
    note: "Steuernummer: Finanzamt Lohr 231/259/60049",
  },
  odrUrl: "https://ec.europa.eu/consumers/odr/",
  shopifyPrivacyUrl: "https://www.shopify.com/legal/privacy",
  googlePrivacyUrl: "https://policies.google.com/privacy?hl=de",
  googleAnalyticsOptOutUrl: "https://tools.google.com/dlpage/gaoptout",
} as const;
