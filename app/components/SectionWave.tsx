type SectionBlendProps = {
  /** Ziel-Farbe der folgenden Sektion */
  color: string;
};

/** Weicher Übergang nach unten – reiner CSS-Gradient, keine SVG-Kante. */
export function SectionBlendBottom({ color }: SectionBlendProps) {
  return (
    <div
      className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-14 md:h-20"
      style={{ background: `linear-gradient(to bottom, transparent 0%, ${color} 100%)` }}
      aria-hidden="true"
    />
  );
}

/** Weicher Übergang von oben – reiner CSS-Gradient, keine SVG-Kante. */
export function SectionBlendTop({ color }: SectionBlendProps) {
  return (
    <div
      className="pointer-events-none absolute inset-x-0 top-0 z-10 h-14 md:h-20"
      style={{ background: `linear-gradient(to bottom, ${color} 0%, transparent 100%)` }}
      aria-hidden="true"
    />
  );
}
