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
    // Sequence: fade in → draw wave → pop in dots
    const t1 = window.setTimeout(() => setIsVisible(true), 500);
    const t2 = window.setTimeout(() => setWaveDrawn(true), 600);
    const t3 = window.setTimeout(() => setDotsVisible(true), 1800); // After wave drawing (1.4s)
    
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
    };
  }, []);

  // Canvas dimensions
  const W = 500;
  const H = 90;
  const numDots = menuItems.length;

  // Wave geometry
  const halfWavelength = 70; // Distance between adjacent extrema (valley to peak)
  const amplitude = 14; // How far the wave goes above/below center
  const centerY = H / 2; // Vertical center of the wave
  const gap = 12; // Vertical gap between wave and dot

  const { pathD, dotPositions } = useMemo(() => {
    // Total horizontal span of dots
    const totalSpan = (numDots - 1) * halfWavelength;
    const startX = (W - totalSpan) / 2;

    // Full wavelength = 2 * halfWavelength
    const wavelength = 2 * halfWavelength;

    // Phase: We want sin to be at minimum (-1) at x = startX
    // sin(θ) = -1 when θ = -π/2
    // θ = (2π/wavelength) * x + phase
    // At x = startX: (2π/wavelength) * startX + phase = -π/2
    const phase = -Math.PI / 2 - (2 * Math.PI / wavelength) * startX;

    // Generate wave path
    const step = 2;
    const points: string[] = [];
    
    for (let x = 0; x <= W; x += step) {
      // Standard sine: positive amplitude goes UP (smaller Y in SVG)
      const sinValue = Math.sin((2 * Math.PI / wavelength) * x + phase);
      const y = centerY - amplitude * sinValue;
      points.push(x === 0 ? `M ${x} ${y.toFixed(1)}` : `L ${x} ${y.toFixed(1)}`);
    }
    
    const pathD = points.join(" ");

    // Dot positions at each extrema, alternating valley/peak
    // Index 0, 2, 4: valleys (sin = -1, y = centerY + amplitude) → dot BELOW
    // Index 1, 3, 5: peaks (sin = +1, y = centerY - amplitude) → dot ABOVE
    const dotPositions = Array.from({ length: numDots }, (_, i) => {
      const x = startX + i * halfWavelength;
      const isValley = i % 2 === 0;
      
      if (isValley) {
        // Valley: wave is at centerY + amplitude (lower on screen)
        // Dot goes further down (higher Y value)
        return {
          x,
          y: centerY + amplitude + gap,
          isValley: true,
        };
      } else {
        // Peak: wave is at centerY - amplitude (higher on screen)  
        // Dot goes further up (lower Y value)
        return {
          x,
          y: centerY - amplitude - gap,
          isValley: false,
        };
      }
    });

    return { pathD, dotPositions };
  }, [numDots, halfWavelength, amplitude, centerY, gap, W]);

  return (
    <div
      className={cn(
        "fixed bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 z-50",
        "transition-all duration-500",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
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
