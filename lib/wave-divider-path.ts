/**
 * Smooth cubic-bezier wave path generation.
 * Ported from readme-SVG/readme-SVG-wave-divider-generator (api/wavegen.py).
 * @see https://github.com/readme-SVG/readme-SVG-wave-divider-generator
 */
export function buildSmoothWavePath(
  width: number,
  height: number,
  amplitude: number,
  frequency: number,
  phase = 0,
  points = 60,
  fillBottom = true,
  yOffset = 0.5,
  inverted = false,
): string {
  const midY = height * yOffset;
  const step = width / points;
  const coords: [number, number][] = [];

  for (let i = 0; i <= points; i++) {
    const x = i * step;
    const direction = inverted ? -1 : 1;
    const y =
      midY + direction * amplitude * Math.sin(2 * Math.PI * frequency * (i / points) + phase);
    coords.push([x, y]);
  }

  let path = `M ${coords[0][0].toFixed(2)} ${coords[0][1].toFixed(2)} `;

  for (let i = 1; i < coords.length; i++) {
    const [x0, y0] = coords[i - 1];
    const [x1, y1] = coords[i];
    const cx = (x0 + x1) / 2;
    path += `C ${cx.toFixed(2)} ${y0.toFixed(2)} ${cx.toFixed(2)} ${y1.toFixed(2)} ${x1.toFixed(2)} ${y1.toFixed(2)} `;
  }

  if (fillBottom) {
    path += `L ${width} ${height + 1} L 0 ${height + 1} Z`;
  } else {
    path += `L ${width} -1 L 0 -1 Z`;
  }

  return path;
}

export const waveDividerViewBox = { width: 1200, height: 80 } as const;

export const waveDividerDefaults = {
  amplitude: 20,
  frequency: 1,
} as const;
