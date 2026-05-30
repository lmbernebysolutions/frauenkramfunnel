"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { CONSENT_CHANGE_EVENT, readStoredConsent } from "@/lib/consent";

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;
const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;

export default function AnalyticsGate() {
  const [isGranted, setIsGranted] = useState(false);

  useEffect(() => {
    const syncConsent = () => {
      setIsGranted(readStoredConsent() === "granted");
    };

    syncConsent();
    window.addEventListener(CONSENT_CHANGE_EVENT, syncConsent);
    window.addEventListener("storage", syncConsent);

    return () => {
      window.removeEventListener(CONSENT_CHANGE_EVENT, syncConsent);
      window.removeEventListener("storage", syncConsent);
    };
  }, []);

  useEffect(() => {
    if (isGranted) {
      return;
    }

    const globalWindow = window as Window & {
      fbq?: (...args: unknown[]) => void;
      gtag?: (...args: unknown[]) => void;
    };

    if (typeof globalWindow.fbq === "function") {
      globalWindow.fbq("consent", "revoke");
    }

    if (typeof globalWindow.gtag === "function") {
      globalWindow.gtag("consent", "update", {
        ad_storage: "denied",
        analytics_storage: "denied",
        ad_user_data: "denied",
        ad_personalization: "denied",
      });
    }
  }, [isGranted]);

  if (!isGranted) {
    return null;
  }

  return (
    <>
      {GTM_ID ? (
        <Script
          id="gtm-loader"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`,
          }}
        />
      ) : null}
      {META_PIXEL_ID ? (
        <>
          <Script
            id="meta-pixel-loader"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html:
                "!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window, document,'script','https://connect.facebook.net/en_US/fbevents.js');",
            }}
          />
          <Script
            id="meta-pixel-init"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `window.fbq('init', '${META_PIXEL_ID}'); window.fbq('track', 'PageView');`,
            }}
          />
        </>
      ) : null}
    </>
  );
}
