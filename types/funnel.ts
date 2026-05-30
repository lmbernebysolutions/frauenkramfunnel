export interface SocialProofItem {
  id: string;
  label: string;
}

export interface ProblemCard {
  id: string;
  title: string;
  body: string;
}

export interface PricingOption {
  id: "guide" | "bundle";
  name: string;
  description: string;
  priceLabel: string;
  vatLabel: string;
  shippingLabel: string;
  isBestseller: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  age: number;
  body: string;
  badgeLabel: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}
