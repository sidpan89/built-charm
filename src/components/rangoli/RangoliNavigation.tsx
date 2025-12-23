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
    const t3 = window.setTimeout(() => setDotsVisible(true), 1600);
    
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
    };
  }, []);

  // Canvas dimensions
  const W = 460;
  const H = 70;
  const numDots = menuItems.length;

  // Wave geometry - dots ONLY at troughs (valleys)
  // One wavelength = one full oscillation, but we want dots at EVERY trough
  // So spacing between dots = wavelength (one complete wave cycle per dot)
  const dotSpacing = 68;
  const amplitude = 14;
  const waveCenter = 28; // Vertical center toward top, leaving room for dots below
  const gapBelowWave = 8; // Gap between lowest wave point and top of dot

  const { pathD, dotPositions } = useMemo(() => {
    const totalWidth = (numDots - 1) * dotSpacing;
    const startX = (W - totalWidth) / 2;

    // Wavelength = dotSpacing (so each dot aligns with a trough)
    const wavelength = dotSpacing;
    
    // Phase: sin reaches minimum (-1) at θ = -π/2
    // θ = (2π/λ) * x + φ
    // At x = startX: (2π/λ) * startX + φ = -π/2
    const phase = -Math.PI / 2 - (2 * Math.PI / wavelength) * startX;

    // Generate smooth sine wave
    const step = 1.5;
    const points: string[] = [];
    
    for (let x = 0; x <= W; x += step) {
      const theta = (2 * Math.PI / wavelength) * x + phase;
      // y = center - amplitude * sin(θ)
      // When sin = -1 (trough): y = center + amplitude (lowest point, higher Y)
      // When sin = +1 (peak): y = center - amplitude (highest point, lower Y)
      const y = waveCenter - amplitude * Math.sin(theta);
      points.push(x === 0 ? `M ${x} ${y.toFixed(2)}` : `L ${x} ${y.toFixed(2)}`);
    }
    
    const pathD = points.join(" ");

    // All dots positioned at troughs (where wave dips lowest)
    // Trough Y = waveCenter + amplitude
    // Dot Y = trough + gap
    const troughY = waveCenter + amplitude;
    const dotY = troughY + gapBelowWave;

    const dotPositions = Array.from({ length: numDots }, (_, i) => ({
      x: startX + i * dotSpacing,
      y: dotY,
    }));

    return { pathD, dotPositions };
  }, [numDots, dotSpacing, amplitude, waveCenter, gapBelowWave, W]);

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
