import type { Metadata } from "next";
import AnalyticsGate from "@/app/components/AnalyticsGate";
import ConsentBanner from "@/app/components/ConsentBanner";
import ExpertSection from "@/app/components/ExpertSection";
import FaqSection from "@/app/components/FaqSection";
import Footer from "@/app/components/Footer";
import FinalCta from "@/app/components/FinalCta";
import Header from "@/app/components/Header";
import Hero from "@/app/components/Hero";
import PricingSection from "@/app/components/PricingSection";
import ProblemSection from "@/app/components/ProblemSection";
import SocialProof from "@/app/components/SocialProof";
import { faqItems } from "@/lib/content";

export const metadata: Metadata = {
  title: "Frauenkram: Haut und Wechseljahre – Carsta Pröstler",
  description:
    "Der ganzheitliche dermazeutische Ratgeber für ein gesundes Hautbild und hormonelle Balance in den Wechseljahren.",
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
        <SocialProof />
        <ProblemSection />
        <PricingSection />
        <ExpertSection />
        <FaqSection />
        <FinalCta />
      </main>
      <Footer />
      <ConsentBanner />
    </>
  );
}
