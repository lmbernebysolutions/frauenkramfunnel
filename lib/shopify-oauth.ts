import "server-only";

interface ClientCredentialsResponse {
  access_token?: string;
  scope?: string;
  expires_in?: number;
  error?: string;
  error_description?: string;
}

interface StorefrontTokenCreateResponse {
  data?: {
    storefrontAccessTokenCreate?: {
      storefrontAccessToken?: { accessToken: string } | null;
      userErrors?: { message: string }[];
    };
  };
  errors?: { message: string }[];
}

function getOAuthCredentials(): { clientId: string; clientSecret: string } | null {
  const clientId = process.env.SHOPIFY_CLIENT_ID?.trim();
  const clientSecret = process.env.SHOPIFY_CLIENT_SECRET?.trim();

  if (!clientId || !clientSecret) {
    return null;
  }

  return { clientId, clientSecret };
}

/** Client-Credentials-Grant (Shopify Dev Dashboard 2024+). */
export async function fetchShopifyAdminAccessToken(): Promise<string> {
  const domain = process.env.SHOPIFY_STORE_DOMAIN?.trim() || process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN?.trim();
  const credentials = getOAuthCredentials();

  if (!domain || !credentials) {
    throw new Error("SHOPIFY_OAUTH_NOT_CONFIGURED");
  }

  const shop = domain.replace(/^https?:\/\//, "").replace(/\/$/, "");
  const body = new URLSearchParams({
    grant_type: "client_credentials",
    client_id: credentials.clientId,
    client_secret: credentials.clientSecret,
  });

  const response = await fetch(`https://${shop}/admin/oauth/access_token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
    cache: "no-store",
  });

  const json = (await response.json()) as ClientCredentialsResponse;

  if (!response.ok || !json.access_token) {
    throw new Error(json.error_description ?? json.error ?? `OAUTH_HTTP_${response.status}`);
  }

  return json.access_token;
}

/** Legt einen Storefront-Access-Token für cartCreate an (einmalig, dann in Vercel hinterlegen). */
export async function createStorefrontAccessToken(title = "Frauenkram Funnel"): Promise<string> {
  const domain = process.env.SHOPIFY_STORE_DOMAIN?.trim() || process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN?.trim();
  if (!domain) {
    throw new Error("SHOPIFY_DOMAIN_MISSING");
  }

  const adminToken = await fetchShopifyAdminAccessToken();
  const shop = domain.replace(/^https?:\/\//, "").replace(/\/$/, "");
  const apiVersion = process.env.SHOPIFY_STOREFRONT_API_VERSION?.trim() || "2024-10";

  const response = await fetch(`https://${shop}/admin/api/${apiVersion}/graphql.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Access-Token": adminToken,
    },
    body: JSON.stringify({
      query: `
        mutation storefrontAccessTokenCreate($input: StorefrontAccessTokenInput!) {
          storefrontAccessTokenCreate(input: $input) {
            storefrontAccessToken { accessToken }
            userErrors { message }
          }
        }
      `,
      variables: { input: { title } },
    }),
    cache: "no-store",
  });

  const json = (await response.json()) as StorefrontTokenCreateResponse;

  if (json.errors?.length) {
    throw new Error(json.errors.map((entry) => entry.message).join("; "));
  }

  const userErrors = json.data?.storefrontAccessTokenCreate?.userErrors ?? [];
  if (userErrors.length > 0) {
    throw new Error(userErrors.map((entry) => entry.message).join("; "));
  }

  const token = json.data?.storefrontAccessTokenCreate?.storefrontAccessToken?.accessToken;
  if (!token) {
    throw new Error("STOREFRONT_TOKEN_EMPTY");
  }

  return token;
}
