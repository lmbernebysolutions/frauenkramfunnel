import {
  buildSmoothWavePath,
  waveDividerDefaults,
  waveDividerViewBox,
} from "@/lib/wave-divider-path";

/** Feste Wellenhöhe – CLS-sicher, ohne Sektions-Padding. */
export const sectionWaveHeightClass = "h-12 md:h-16";

type SectionWaveDividerProps = {
  /** Hintergrundfarbe der Sektion darüber */
  colorTop: string;
  /** Hintergrundfarbe der Sektion darunter */
  colorBottom: string;
};

/**
 * Zwei-Farben-Wellen-Divider als Block zwischen Sektionen.
 * Volle SVG-Deckfläche (kein transparentes Compositing), 1px Überlappung gegen Hairline-Gaps.
 *
 * @see https://github.com/readme-SVG/readme-SVG-wave-divider-generator
 */
export function SectionWaveDivider({ colorTop, colorBottom }: SectionWaveDividerProps) {
  const { width, height } = waveDividerViewBox;
  const { amplitude, frequency } = waveDividerDefaults;
  const bleed = 1;

  const pathD = buildSmoothWavePath(
    width,
    height,
    amplitude,
    frequency,
    0,
    60,
    true,
    0.5,
    false,
  );

  return (
    <div className="relative -my-px leading-[0]" aria-hidden="true">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox={`0 0 ${width} ${height + bleed}`}
        preserveAspectRatio="none"
        className={`block w-full ${sectionWaveHeightClass}`}
        shapeRendering="geometricPrecision"
      >
        <rect width={width} height={height + bleed} fill={colorTop} />
        <path d={pathD} fill={colorBottom} stroke={colorBottom} strokeWidth={2} strokeLinejoin="round" />
      </svg>
    </div>
  );
}
