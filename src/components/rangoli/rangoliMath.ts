export type Point = { x: number; y: number };

export function buildSineWavePath(options: {
  width: number;
  height: number;
  midY: number;
  amplitude: number;
  period: number;
  phase: number;
  stepPx?: number;
}): string {
  const { width, midY, amplitude, period, phase, stepPx = 4 } = options;

  const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));
  const yAt = (x: number) => midY + amplitude * Math.sin((2 * Math.PI * x) / period + phase);

  const pts: Point[] = [];
  for (let x = 0; x <= width; x += stepPx) {
    pts.push({ x, y: clamp(yAt(x), 0, options.height) });
  }
  // ensure exact end point
  if (pts[pts.length - 1]?.x !== width) {
    pts.push({ x: width, y: clamp(yAt(width), 0, options.height) });
  }

  // Use straight segments for a perfectly uniform mechanical feel.
  return pts
    .map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(2)},${p.y.toFixed(2)}`)
    .join(" ");
}

export function troughXPositions(options: {
  firstTroughX: number;
  count: number;
  period: number;
}): number[] {
  const { firstTroughX, count, period } = options;
  return Array.from({ length: count }, (_, i) => firstTroughX + i * period);
}
