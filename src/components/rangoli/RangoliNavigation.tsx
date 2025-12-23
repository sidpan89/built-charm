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
    // Animation sequence: container fade -> wave draws left-to-right -> dots pop in sequentially
    const t1 = window.setTimeout(() => setIsVisible(true), 600);
    const t2 = window.setTimeout(() => setWaveDrawn(true), 700);
    const t3 = window.setTimeout(() => setDotsVisible(true), 1600); // After wave finishes (~1.2s)
    
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
    };
  }, []);

  // Geometry
  const W = 480;
  const H = 100;
  const numDots = menuItems.length;
  
  // Wave parameters - dots placed at alternating troughs and peaks
  const period = 70; // Distance between each turning point (half wavelength)
  const amplitude = 16;
  const waveY = H / 2; // Center line of wave
  const dotGap = 10; // Gap between wave line and dot

  const { pathD, dotPositions } = useMemo(() => {
    // Calculate total width needed for dots
    const totalWidth = (numDots - 1) * period;
    const startX = (W - totalWidth) / 2;
    
    // For a sine wave, we want:
    // - First dot at a trough (sine = -1)
    // - Second dot at a peak (sine = +1)
    // - Third dot at a trough, etc.
    // 
    // sin(θ) = -1 at θ = -π/2 (or 3π/2)
    // sin(θ) = +1 at θ = π/2
    // So we need: (2π * startX / fullPeriod) + phase = -π/2
    // Full period = 2 * period (since period is half-wavelength)
    
    const fullPeriod = 2 * period;
    const phase = -Math.PI / 2 - (2 * Math.PI * startX) / fullPeriod;
    
    // Build smooth sine wave path
    const step = 2;
    const pathPoints: string[] = [];
    
    for (let x = 0; x <= W; x += step) {
      const y = waveY - amplitude * Math.sin((2 * Math.PI * x) / fullPeriod + phase);
      pathPoints.push(x === 0 ? `M ${x} ${y.toFixed(1)}` : `L ${x} ${y.toFixed(1)}`);
    }
    
    const pathD = pathPoints.join(" ");
    
    // Calculate dot positions at alternating troughs and peaks
    const dotPositions = Array.from({ length: numDots }, (_, i) => {
      const x = startX + i * period;
      const isEvenIndex = i % 2 === 0;
      
      // Even indices (0, 2, 4): troughs (below wave center, dot goes further below)
      // Odd indices (1, 3, 5): peaks (above wave center, dot goes further above)
      if (isEvenIndex) {
        // Trough: wave is at waveY + amplitude, dot below it
        return {
          x,
          y: waveY + amplitude + dotGap + 5,
          placement: "below" as const,
        };
      } else {
        // Peak: wave is at waveY - amplitude, dot above it
        return {
          x,
          y: waveY - amplitude - dotGap - 5,
          placement: "above" as const,
        };
      }
    });
    
    return { pathD, dotPositions };
  }, [numDots, period, amplitude, waveY, dotGap, W]);

  return (
    <div
      className={cn(
        "fixed bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 z-50 transition-all duration-500",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      )}
      aria-label="Section navigation"
    >
      <div 
        className="relative" 
        style={{ 
          width: `min(${W}px, 92vw)`, 
          height: `${H}px` 
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
