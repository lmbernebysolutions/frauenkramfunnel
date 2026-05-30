import { NextRequest, NextResponse } from "next/server";
import {
  createSignedConsentCookie,
  SERVER_CONSENT_COOKIE_KEY,
} from "@/lib/server/consent-cookie";

interface ConsentBody {
  status?: unknown;
}

function isValidStatus(value: unknown): value is "granted" | "denied" {
  return value === "granted" || value === "denied";
}

function isSameOriginRequest(request: NextRequest): boolean {
  const origin = request.headers.get("origin");
  const referer = request.headers.get("referer");
  const fetchSite = request.headers.get("sec-fetch-site");
  const fetchMode = request.headers.get("sec-fetch-mode");
  const requestOrigin = request.nextUrl.origin;

  if (!origin || !referer) {
    return false;
  }

  if (fetchSite !== "same-origin") {
    return false;
  }

  if (fetchMode !== "cors") {
    return false;
  }

  if (origin !== requestOrigin) {
    return false;
  }

  return referer.startsWith(`${requestOrigin}/`);
}

export async function POST(request: NextRequest) {
  if (!isSameOriginRequest(request)) {
    return NextResponse.json({ error: "Forbidden origin" }, { status: 403 });
  }

  let parsed: ConsentBody;

  try {
    parsed = (await request.json()) as ConsentBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (!isValidStatus(parsed.status)) {
    return NextResponse.json({ error: "Invalid consent status" }, { status: 400 });
  }

  const userAgent = request.headers.get("user-agent");
  if (!userAgent) {
    return NextResponse.json({ error: "Missing user agent" }, { status: 400 });
  }

  const signedCookie = createSignedConsentCookie(parsed.status, userAgent);
  if (!signedCookie) {
    return NextResponse.json({ error: "Consent cookie secret missing or invalid." }, { status: 500 });
  }

  const response = NextResponse.json({ persisted: true });
  response.cookies.set({
    name: SERVER_CONSENT_COOKIE_KEY,
    value: signedCookie,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
  });

  return response;
}
