import { createHash } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import {
  SERVER_CONSENT_COOKIE_KEY,
  verifySignedConsentCookie,
} from "@/lib/server/consent-cookie";

type JsonRecord = Record<string, unknown>;

interface CapiRequestBody {
  event?: unknown;
  data?: unknown;
  timestamp?: unknown;
}

const PII_KEYS = new Set([
  "email",
  "em",
  "phone",
  "ph",
  "first_name",
  "last_name",
  "fn",
  "ln",
  "city",
  "state",
  "zip",
  "country",
  "external_id",
  "client_ip_address",
  "client_user_agent",
]);

const SHA256_REGEX = /^[A-Fa-f0-9]{64}$/;

function toSha256(value: string): string {
  return createHash("sha256").update(value).digest("hex");
}

function normalizePiiValue(key: string, value: string): string {
  const normalizedKey = key.toLowerCase();
  const trimmed = value.trim();

  if (normalizedKey === "phone" || normalizedKey === "ph") {
    return trimmed.replace(/[^+\d]/g, "");
  }

  if (normalizedKey === "email" || normalizedKey === "em") {
    return trimmed.toLowerCase();
  }

  return trimmed.toLowerCase();
}

function hashPiiRecursively(value: unknown, parentKey = ""): unknown {
  if (Array.isArray(value)) {
    return value.map((entry) => hashPiiRecursively(entry, parentKey));
  }

  if (value && typeof value === "object") {
    const result: JsonRecord = {};

    for (const [key, nestedValue] of Object.entries(value as JsonRecord)) {
      result[key] = hashPiiRecursively(nestedValue, key);
    }

    return result;
  }

  if (typeof value === "string" && PII_KEYS.has(parentKey.toLowerCase())) {
    if (SHA256_REGEX.test(value)) {
      return value.toLowerCase();
    }

    const normalized = normalizePiiValue(parentKey, value);
    return normalized ? toSha256(normalized) : value;
  }

  return value;
}

function isValidBody(body: CapiRequestBody): body is {
  event: string;
  data: JsonRecord;
  timestamp: number;
} {
  const nowInSeconds = Math.floor(Date.now() / 1000);

  return (
    typeof body.event === "string" &&
    body.event.trim().length > 0 &&
    typeof body.timestamp === "number" &&
    Number.isFinite(body.timestamp) &&
    Number.isInteger(body.timestamp) &&
    body.timestamp >= 1_500_000_000 &&
    body.timestamp <= nowInSeconds + 300 &&
    !!body.data &&
    typeof body.data === "object" &&
    !Array.isArray(body.data)
  );
}

function isSameOriginRequest(request: NextRequest): boolean {
  const fetchSite = request.headers.get("sec-fetch-site");
  const fetchMode = request.headers.get("sec-fetch-mode");
  const origin = request.headers.get("origin");
  const referer = request.headers.get("referer");
  const requestOrigin = request.nextUrl.origin;

  if (fetchSite !== "same-origin") {
    return false;
  }

  if (fetchMode !== "cors") {
    return false;
  }

  if (!origin || !referer) {
    return false;
  }

  if (origin !== requestOrigin) {
    return false;
  }

  return referer.startsWith(`${requestOrigin}/`);
}

function getDepth(value: unknown): number {
  if (!value || typeof value !== "object") {
    return 0;
  }

  if (Array.isArray(value)) {
    return 1 + Math.max(0, ...value.map((item) => getDepth(item)));
  }

  const objectValues = Object.values(value as JsonRecord);
  return 1 + Math.max(0, ...objectValues.map((item) => getDepth(item)));
}

export async function POST(request: NextRequest) {
  if (!isSameOriginRequest(request)) {
    return NextResponse.json({ error: "Forbidden origin" }, { status: 403 });
  }

  const userAgent = request.headers.get("user-agent");
  if (!userAgent) {
    return NextResponse.json({ error: "Missing user agent" }, { status: 400 });
  }

  const signedConsentCookie = request.cookies.get(SERVER_CONSENT_COOKIE_KEY)?.value;
  if (verifySignedConsentCookie(signedConsentCookie, userAgent) !== "granted") {
    return NextResponse.json({ error: "Consent not granted" }, { status: 403 });
  }

  let parsed: CapiRequestBody;

  try {
    parsed = (await request.json()) as CapiRequestBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (!isValidBody(parsed)) {
    return NextResponse.json(
      { error: "Invalid payload. Expected event:string, data:object, timestamp:number." },
      { status: 400 },
    );
  }

  const serializedSize = Buffer.byteLength(JSON.stringify(parsed), "utf8");
  if (serializedSize > 64 * 1024) {
    return NextResponse.json({ error: "Payload too large" }, { status: 413 });
  }

  if (getDepth(parsed.data) > 6) {
    return NextResponse.json({ error: "Payload nesting too deep" }, { status: 400 });
  }

  const hashedData = hashPiiRecursively(parsed.data) as JsonRecord;
  const eventName = parsed.event.trim();
  const forwardResult = await forwardToMetaCapi(eventName, parsed.timestamp, hashedData);

  return NextResponse.json({
    accepted: true,
    forwarded: forwardResult.forwarded,
    event: eventName,
    timestamp: parsed.timestamp,
    data: hashedData,
    ...(forwardResult.error ? { forwardError: forwardResult.error } : {}),
  });
}

async function forwardToMetaCapi(
  eventName: string,
  eventTime: number,
  customData: JsonRecord,
): Promise<{ forwarded: boolean; error?: string }> {
  const accessToken = process.env.META_CAPI_ACCESS_TOKEN?.trim();
  const pixelId = process.env.META_PIXEL_ID?.trim() ?? process.env.NEXT_PUBLIC_META_PIXEL_ID?.trim();
  const apiVersion = process.env.META_CAPI_API_VERSION?.trim() || "v21.0";

  if (!accessToken || !pixelId) {
    return { forwarded: false };
  }

  try {
    const endpoint = `https://graph.facebook.com/${apiVersion}/${pixelId}/events`;
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        data: [
          {
            event_name: eventName,
            event_time: eventTime,
            action_source: "website",
            custom_data: customData,
          },
        ],
        access_token: accessToken,
      }),
      cache: "no-store",
    });

    if (!response.ok) {
      const body = await response.text();
      return { forwarded: false, error: `Meta CAPI HTTP ${response.status}: ${body.slice(0, 200)}` };
    }

    return { forwarded: true };
  } catch (error) {
    return {
      forwarded: false,
      error: error instanceof Error ? error.message : "Meta CAPI request failed",
    };
  }
}
