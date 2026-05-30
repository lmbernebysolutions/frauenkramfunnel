import "server-only";
import { createHmac, randomUUID, timingSafeEqual } from "node:crypto";

export const SERVER_CONSENT_COOKIE_KEY = "frauenkram_consent_sig";

const SECRET_ENV_KEY = "CONSENT_COOKIE_SECRET";
const COOKIE_TTL_SECONDS = 60 * 60 * 24 * 365;

function getSecret(): string | null {
  const secret = process.env[SECRET_ENV_KEY];
  if (secret && secret.length >= 32) {
    return secret;
  }

  if (process.env.NODE_ENV !== "production") {
    return "dev-only-consent-cookie-secret-for-local-preview-12345";
  }

  return null;
}

function hashUserAgent(userAgent: string): string {
  return createHmac("sha256", "ua-hash").update(userAgent).digest("hex");
}

interface ConsentCookiePayload {
  status: "granted" | "denied";
  uaHash: string;
  issuedAt: number;
  nonce: string;
}

function encodePayload(payload: ConsentCookiePayload): string {
  return Buffer.from(JSON.stringify(payload), "utf8").toString("base64url");
}

function decodePayload(value: string): ConsentCookiePayload | null {
  try {
    const decoded = Buffer.from(value, "base64url").toString("utf8");
    const parsed = JSON.parse(decoded) as ConsentCookiePayload;

    if (
      (parsed.status !== "granted" && parsed.status !== "denied") ||
      typeof parsed.uaHash !== "string" ||
      typeof parsed.issuedAt !== "number" ||
      typeof parsed.nonce !== "string"
    ) {
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
}

function signPayload(encodedPayload: string, secret: string): string {
  return createHmac("sha256", secret).update(encodedPayload).digest("hex");
}

export function createSignedConsentCookie(
  status: "granted" | "denied",
  userAgent: string,
): string | null {
  const secret = getSecret();
  if (!secret) {
    return null;
  }

  const payload: ConsentCookiePayload = {
    status,
    uaHash: hashUserAgent(userAgent),
    issuedAt: Math.floor(Date.now() / 1000),
    nonce: randomUUID(),
  };

  const encodedPayload = encodePayload(payload);
  const signature = signPayload(encodedPayload, secret);
  return `${encodedPayload}.${signature}`;
}

export function verifySignedConsentCookie(
  value: string | undefined,
  userAgent: string,
): "granted" | "denied" | null {
  if (!value) {
    return null;
  }

  const secret = getSecret();
  if (!secret) {
    return null;
  }

  const [encodedPayload, signature] = value.split(".");
  if (!encodedPayload || !signature) {
    return null;
  }

  const payload = decodePayload(encodedPayload);
  if (!payload) {
    return null;
  }

  const nowInSeconds = Math.floor(Date.now() / 1000);
  if (payload.issuedAt > nowInSeconds || nowInSeconds - payload.issuedAt > COOKIE_TTL_SECONDS) {
    return null;
  }

  if (payload.uaHash !== hashUserAgent(userAgent)) {
    return null;
  }

  const expectedSignature = signPayload(encodedPayload, secret);
  const providedBuffer = Buffer.from(signature, "utf8");
  const expectedBuffer = Buffer.from(expectedSignature, "utf8");

  if (providedBuffer.length !== expectedBuffer.length) {
    return null;
  }

  if (!timingSafeEqual(providedBuffer, expectedBuffer)) {
    return null;
  }

  return payload.status;
}
