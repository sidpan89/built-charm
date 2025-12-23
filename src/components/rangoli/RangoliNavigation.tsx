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
  const [isDrawn, setIsDrawn] = useState(false);

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
    const t = window.setTimeout(() => {
      setIsVisible(true);
      window.setTimeout(() => setIsDrawn(true), 100);
    }, 800);
    return () => window.clearTimeout(t);
  }, []);

  // Dimensions
  const W = 420;
  const H = 80;
  
  // Wave parameters - dots at troughs, wave cups them from above
  const numDots = menuItems.length;
  const dotSpacing = 60; // horizontal distance between dots
  const totalDotsWidth = (numDots - 1) * dotSpacing;
  const startX = (W - totalDotsWidth) / 2; // center the dots
  
  const amplitude = 12; // wave height (half peak-to-trough)
  const waveY = 32; // vertical center of the wave
  const dotY = waveY + amplitude + 8; // dots sit below the wave troughs with gap

  const { pathD, dotPositions } = useMemo(() => {
    // Generate smooth sine wave path
    // Period = dotSpacing so each dot aligns with a trough
    const period = dotSpacing;
    
    // Phase shift so troughs occur at dot positions
    // sin(x) has troughs at x = -π/2, 3π/2, etc.
    // We want troughs at startX + n * period
    // So: (2π * startX / period) + phase = -π/2
    // phase = -π/2 - (2π * startX / period)
    const phase = -Math.PI / 2 - (2 * Math.PI * startX) / period;
    
    // Build the wave path with fine steps for smoothness
    const points: string[] = [];
    const step = 2;
    
    for (let x = 0; x <= W; x += step) {
      const y = waveY + amplitude * Math.sin((2 * Math.PI * x) / period + phase);
      if (x === 0) {
        points.push(`M ${x} ${y}`);
      } else {
        points.push(`L ${x} ${y}`);
      }
    }
    
    const pathD = points.join(" ");
    
    // Dot positions - at each trough location, below the wave
    const dotPositions = Array.from({ length: numDots }, (_, i) => ({
      x: startX + i * dotSpacing,
      y: dotY,
    }));
    
    return { pathD, dotPositions };
  }, [numDots, startX, dotSpacing, amplitude, waveY, dotY]);

  return (
    <div
      className={cn(
        "fixed bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 z-50 transition-all duration-700",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      )}
      aria-label="Section navigation"
    >
      <div className="relative" style={{ width: `min(${W}px, 90vw)`, height: `${H}px` }}>
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox={`0 0 ${W} ${H}`}
          preserveAspectRatio="xMidYMid meet"
        >
          <WavePath pathD={pathD} isDrawn={isDrawn} />
        </svg>

        <MenuDots
          menuItems={menuItems}
          dotPositions={dotPositions}
          viewBoxWidth={W}
          viewBoxHeight={H}
          isDrawn={isDrawn}
          activeSection={activeSection}
          onNavigate={onNavigate}
        />
      </div>
    </div>
  );
};

export default RangoliNavigation;
