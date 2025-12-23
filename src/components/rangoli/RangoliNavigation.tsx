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
  // Spacing between dots equals the wavelength (each dot = one trough)
  const dotSpacing = 68;
  const amplitude = 14;
  const waveCenter = 28; // vertical center (kept high to leave room for dots below)
  const gapBelowWave = 8; // whitespace between bottom of line and top of dot
  const dotRadius = 5; // approx radius in px (since the dot is ~10px)

  const { pathD, dotPositions } = useMemo(() => {
    const totalWidth = (numDots - 1) * dotSpacing;
    const startX = (W - totalWidth) / 2;

    // Wavelength = dotSpacing (so each dot aligns with a trough)
    const wavelength = dotSpacing;

    // Phase: make a trough (sin = -1) land exactly at x = startX
    const phase = -Math.PI / 2 - (2 * Math.PI / wavelength) * startX;

    const yAt = (x: number) => {
      const theta = (2 * Math.PI / wavelength) * x + phase;
      return waveCenter - amplitude * Math.sin(theta);
    };

    // Generate smooth sine wave
    const step = 1.5;
    const points: string[] = [];

    for (let x = 0; x <= W; x += step) {
      const y = yAt(x);
      points.push(x === 0 ? `M ${x} ${y.toFixed(2)}` : `L ${x} ${y.toFixed(2)}`);
    }

    const pathD = points.join(" ");

    // Dot centers: at each trough X, placed BELOW the curve by (gap + radius)
    // This guarantees the TOP of the dot stays `gapBelowWave` away from the line.
    const troughXs = Array.from({ length: numDots }, (_, i) => startX + i * wavelength);
    const dotPositions = troughXs.map((x) => {
      const yLine = yAt(x); // this is the trough's lowest y for that x
      return {
        x,
        y: yLine + gapBelowWave + dotRadius,
      };
    });

    return { pathD, dotPositions };
  }, [numDots, dotSpacing, amplitude, waveCenter, gapBelowWave, dotRadius, W]);

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
