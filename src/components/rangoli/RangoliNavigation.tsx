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
    // Animation sequence: fade in → wave draws → dots appear
    const t1 = window.setTimeout(() => setIsVisible(true), 500);
    const t2 = window.setTimeout(() => setWaveDrawn(true), 600);
    const t3 = window.setTimeout(() => setDotsVisible(true), 1700);
    
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
    };
  }, []);

  // Canvas
  const W = 480;
  const H = 80;
  const numDots = menuItems.length;

  // Wave parameters - dots ONLY in troughs
  // Each trough = one dot, so wavelength = spacing between dots
  const wavelength = 70; // Horizontal distance between consecutive troughs
  const amplitude = 12; // Wave height above/below center
  const centerY = 32; // Vertical center of the wave (toward top to leave room for dots below)
  const dotGap = 10; // Vertical gap between trough and dot

  const { pathD, dotPositions } = useMemo(() => {
    // Calculate layout
    const totalWidth = (numDots - 1) * wavelength;
    const startX = (W - totalWidth) / 2;

    // Phase calculation:
    // We want troughs (sin = -1) at x = startX, startX + wavelength, startX + 2*wavelength, etc.
    // sin(θ) = -1 when θ = -π/2 + 2πk
    // θ = (2π/wavelength) * x + phase
    // At x = startX: (2π/wavelength) * startX + phase = -π/2
    const phase = -Math.PI / 2 - (2 * Math.PI / wavelength) * startX;

    // Build wave path
    const step = 2;
    const points: string[] = [];
    
    for (let x = 0; x <= W; x += step) {
      // sin wave: when sin = -1, y is at maximum (trough = lowest point visually)
      // y = centerY - amplitude * sin(θ)
      // When sin = -1: y = centerY + amplitude (trough, lower on screen)
      // When sin = +1: y = centerY - amplitude (peak, higher on screen)
      const theta = (2 * Math.PI / wavelength) * x + phase;
      const y = centerY - amplitude * Math.sin(theta);
      points.push(x === 0 ? `M ${x} ${y.toFixed(1)}` : `L ${x} ${y.toFixed(1)}`);
    }
    
    const pathD = points.join(" ");

    // Dot positions - ALL in troughs, BELOW the wave
    // Trough Y = centerY + amplitude
    // Dot Y = centerY + amplitude + dotGap
    const troughY = centerY + amplitude;
    const dotY = troughY + dotGap;
    
    const dotPositions = Array.from({ length: numDots }, (_, i) => ({
      x: startX + i * wavelength,
      y: dotY,
    }));

    return { pathD, dotPositions };
  }, [numDots, wavelength, amplitude, centerY, dotGap, W]);

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
