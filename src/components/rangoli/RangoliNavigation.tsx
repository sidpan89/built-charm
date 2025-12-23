import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import WavePath from "./WavePath";
import MenuDots from "./MenuDots";

interface RangoliNavigationProps {
  onNavigate: (section: string) => void;
  activeSection: string;
}

const RangoliNavigation = ({ onNavigate, activeSection }: RangoliNavigationProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [waveDrawn, setWaveDrawn] = useState(false);
  const [dotsVisible, setDotsVisible] = useState(false);

  const menuItems = useMemo(
    () => [
      { label: "Home", section: "home" },
      { label: "Services", section: "services" },
      { label: "Portfolio", section: "portfolio" },
      { label: "Team", section: "team" },
      { label: "About", section: "about" },
      { label: "Contact", section: "contact" },
    ],
    []
  );

  useEffect(() => {
    const t1 = window.setTimeout(() => setIsVisible(true), 500);
    const t2 = window.setTimeout(() => setWaveDrawn(true), 600);
    const t3 = window.setTimeout(() => setDotsVisible(true), 1500);
    
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
    };
  }, []);

  // Canvas dimensions
  const W = 480;
  const H = 80;
  const numDots = menuItems.length;

  // Wave geometry
  const dotSpacing = 70; // horizontal distance between dots
  const amplitude = 16; // wave height (half peak-to-peak)
  const waveCenter = 30; // vertical center of the wave (toward top for dots below)
  const gapBetweenWaveAndDot = 10; // whitespace between lowest wave point and top of dot
  const dotRadius = 5; // visual radius of the dot

  const { pathD, dotPositions } = useMemo(() => {
    const totalWidth = (numDots - 1) * dotSpacing;
    const startX = (W - totalWidth) / 2;

    // Use cosine for simpler math: cos(0) = 1 (peak), cos(π) = -1 (trough)
    // We want TROUGHS at dot positions, so we use -cos which gives:
    // -cos(0) = -1 (trough), -cos(π) = 1 (peak)
    // This places a trough at x = startX when the argument is 0
    
    const wavelength = dotSpacing; // one full wave cycle per dot spacing

    // y = waveCenter + amplitude * cos(2π * (x - startX) / wavelength)
    // At x = startX: cos(0) = 1, so y = waveCenter + amplitude = PEAK (we want trough!)
    // Use negative cosine: y = waveCenter - amplitude * cos(...)
    // At x = startX: y = waveCenter - amplitude * 1 = waveCenter - amplitude = LOW = TROUGH ✓
    
    const yAt = (x: number) => {
      const arg = (2 * Math.PI * (x - startX)) / wavelength;
      return waveCenter - amplitude * Math.cos(arg);
    };

    // Generate smooth sine wave path
    const step = 1;
    const points: string[] = [];

    for (let x = 0; x <= W; x += step) {
      const y = yAt(x);
      points.push(x === 0 ? `M ${x} ${y.toFixed(2)}` : `L ${x} ${y.toFixed(2)}`);
    }

    const pathD = points.join(" ");

    // Dot positions: at each trough, BELOW the wave
    // Trough Y = waveCenter - amplitude (since cos at trough = 1, but we negate)
    // Wait, let me recalculate:
    // y = waveCenter - amplitude * cos(arg)
    // At trough: arg = 0, 2π, 4π... → cos = 1 → y = waveCenter - amplitude (SMALL Y = high on screen)
    // At peak: arg = π, 3π... → cos = -1 → y = waveCenter + amplitude (LARGE Y = low on screen)
    // That's backwards! Let me fix:
    
    // For y increasing downward (SVG), we want:
    // TROUGH (visually low, cupping from above) = LARGE Y
    // PEAK (visually high) = SMALL Y
    // So: y = waveCenter + amplitude * cos(arg) gives us peak at arg=0
    // We want trough at arg=0, so: y = waveCenter - amplitude * cos(arg)... no wait
    
    // Let's be explicit:
    // y = waveCenter + amplitude * cos(2π(x-startX)/λ)
    // At x = startX: cos(0) = 1, y = waveCenter + amplitude → LARGE Y → LOW on page = TROUGH ✓
    
    const yAtFixed = (x: number) => {
      const arg = (2 * Math.PI * (x - startX)) / wavelength;
      return waveCenter + amplitude * Math.cos(arg);
    };

    // Regenerate with fixed function
    const pointsFixed: string[] = [];
    for (let x = 0; x <= W; x += step) {
      const y = yAtFixed(x);
      pointsFixed.push(x === 0 ? `M ${x} ${y.toFixed(2)}` : `L ${x} ${y.toFixed(2)}`);
    }
    const pathDFixed = pointsFixed.join(" ");

    // Dot positions at each trough
    // At trough: x = startX + i * wavelength, y = waveCenter + amplitude
    const troughY = waveCenter + amplitude;
    
    const dotPositions = Array.from({ length: numDots }, (_, i) => ({
      x: startX + i * wavelength,
      y: troughY + gapBetweenWaveAndDot + dotRadius, // below the wave with gap
    }));

    return { pathD: pathDFixed, dotPositions };
  }, [numDots, dotSpacing, amplitude, waveCenter, gapBetweenWaveAndDot, dotRadius, W]);

  return (
    <div
      className={cn(
        "fixed bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 z-50",
        "transition-all duration-500",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      )}
      aria-label="Section navigation"
    >
      <div
        className="relative"
        style={{
          width: `min(${W}px, 94vw)`,
          height: `${H}px`,
        }}
      >
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox={`0 0 ${W} ${H}`}
          preserveAspectRatio="xMidYMid meet"
        >
          <WavePath pathD={pathD} isDrawn={waveDrawn} />
        </svg>

        <MenuDots
          menuItems={menuItems}
          dotPositions={dotPositions}
          viewBoxWidth={W}
          viewBoxHeight={H}
          dotsVisible={dotsVisible}
          activeSection={activeSection}
          onNavigate={onNavigate}
        />
      </div>
    </div>
  );
};

export default RangoliNavigation;
