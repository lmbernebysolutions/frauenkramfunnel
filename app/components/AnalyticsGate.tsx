"use client";

import MetaPixel from "@/app/components/MetaPixel";

/** Lädt Meta Pixel nur nach Consent `granted` (ePrivacy). */
export default function AnalyticsGate() {
  return <MetaPixel />;
}
