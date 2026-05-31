import type { Metadata } from "next";
import AnalyticsGate from "@/app/components/AnalyticsGate";
import ExpertSection from "@/app/components/ExpertSection";
import FaqSection from "@/app/components/FaqSection";
import Footer from "@/app/components/Footer";
import FinalCta from "@/app/components/FinalCta";
import Header from "@/app/components/Header";
import Hero from "@/app/components/Hero";
import PricingSection from "@/app/components/PricingSection";
import ProblemSection from "@/app/components/ProblemSection";
import { SectionWaveDivider } from "@/app/components/SectionDivider";
import SocialProof from "@/app/components/SocialProof";
import { faqItems } from "@/lib/content";
import { colors } from "@/lib/design-tokens";
import { siteConfig } from "@/lib/site";

const pageDescription =
  "Der ganzheitliche dermazeutische Ratgeber für ein gesundes Hautbild und hormonelle Balance in den Wechseljahren.";

export const metadata: Metadata = {
  title: "Frauenkram: Haut und Wechseljahre – Carsta Pröstler",
  description: pageDescription,
  alternates: { canonical: "/" },
  openGraph: {
    title: "Frauenkram: Haut und Wechseljahre",
    description: pageDescription,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    type: "website",
    images: [
      {
        url: "/images/buchcover-ohne-text.webp",
        width: 315,
        height: 420,
        alt: "Buchcover Frauenkram: Haut und Wechseljahre",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Frauenkram: Haut und Wechseljahre",
    description: pageDescription,
    images: ["/images/buchcover-ohne-text.webp"],
  },
};

export default function Page() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <Header />
      <main>
        <AnalyticsGate />
        <Hero />
        <SectionWaveDivider colorTop={colors.coverSalbei} colorBottom={colors.coverCanvas} />
        <SocialProof />
        <ProblemSection />
        <PricingSection />
        <ExpertSection />
        <FaqSection />
        <SectionWaveDivider colorTop={colors.coverCanvas} colorBottom={colors.coverSalbei} />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
