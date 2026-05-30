export const colors = {
  coverCanvas: "#fdfbf7",
  coverSalbei: "#a7bc93",
  coverSalbeiDark: "#7a9468",
  coverRosa: "#d8a5a4",
  coverSand: "#e5d5bb",
  coverKhaki: "#beab80",
  erdton900: "#2b1307",
} as const;

export const typography = {
  h1: "clamp(2.2rem, 5vw, 3.8rem)",
  h2: "clamp(1.8rem, 4vw, 2.6rem)",
  h3: "clamp(1.2rem, 2.5vw, 1.5rem)",
  bodyDesktop: "1rem",
  bodyMobile: "0.875rem",
  microDesktop: "0.75rem",
  microMobile: "0.6875rem",
} as const;

export const zIndex = {
  canvas: 0,
  circles: 10,
  hexagons: 20,
  product: 30,
  text: 40,
  cta: 50,
} as const;

export const zIndexClass = {
  canvas: "z-0",
  circles: "z-10",
  hexagons: "z-20",
  product: "z-30",
  text: "z-40",
  cta: "z-50",
} as const;

export const geometryUsageRules = {
  emotionalSections: [1, 5, 7],
  structuredSections: [4, 6],
  notes: {
    circles:
      "Kreis-Motive werden ausschließlich in emotionalen Sektionen 1, 5 und 7 eingesetzt.",
    hexagons:
      "Hexagon-/Waben-Elemente werden in strukturierten Sektionen 4 und 6 sowie im Hero-Layering eingesetzt.",
  },
} as const;

export const accessibilityCriteria = {
  staticTextContrastMin: 4.5,
  interactiveContrastMin: 4.5,
  notes: {
    staticText: "Statischer Text muss mindestens 4.5:1 Kontrast erreichen.",
    interactive: "Interaktive Komponenten müssen mindestens 4.5:1 Kontrast erreichen.",
  },
} as const;
