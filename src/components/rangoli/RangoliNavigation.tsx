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
      { label: "HOME", section: "home" },
      { label: "SERVICES", section: "services" },
      { label: "PORTFOLIO", section: "portfolio" },
      { label: "TEAM", section: "team" },
      { label: "ABOUT", section: "about" },
      { label: "CONTACT", section: "contact" },
    ],
    []
  );

  useEffect(() => {
    const t1 = window.setTimeout(() => setIsVisible(true), 500);
    const t2 = window.setTimeout(() => setWaveDrawn(true), 600);
    const t3 = window.setTimeout(() => setDotsVisible(true), 1800);
    
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

  // Wave geometry parameters
  const dotSpacing = 70; // horizontal distance between dots
  const amplitude = 14; // wave amplitude (half the peak-to-trough distance)
  const dotRadius = 5;
  const gap = 7; // 5-10px gap between wave bottom and dot top

  const { pathD, dotPositions, waveBottomY } = useMemo(() => {
    const totalWidth = (numDots - 1) * dotSpacing;
    const startX = (W - totalWidth) / 2;
    const wavelength = dotSpacing;
    
    // Wave parameters:
    // - The wave oscillates between peakY (top) and troughY (bottom)
    // - We want TROUGHS (bottom of wave) aligned with dot X positions
    // - Dots sit BELOW the troughs with a gap
    
    const peakY = 15; // top of wave (peaks)
    const troughY = peakY + 2 * amplitude; // bottom of wave (troughs)
    
    // Wave equation: y = centerY + amplitude * cos(theta)
    // At theta = 0: y = centerY + amplitude (trough - we invert since Y increases downward)
    // At theta = π: y = centerY - amplitude (peak)
    // 
    // To place TROUGH at x = startX + n*wavelength:
    // cos(theta) = 1 when theta = 0, 2π, 4π...
    // So theta = 2π * (x - startX) / wavelength
    // This puts trough at x = startX, startX + wavelength, etc.
    
    const centerY = (peakY + troughY) / 2;
    
    const yAt = (x: number) => {
      const theta = (2 * Math.PI * (x - startX)) / wavelength;
      // cos(0) = 1 → trough (high Y), cos(π) = -1 → peak (low Y)
      return centerY + amplitude * Math.cos(theta);
    };

    // Generate smooth wave path
    const step = 1;
    const points: string[] = [];
    for (let x = 0; x <= W; x += step) {
      const y = yAt(x);
      points.push(x === 0 ? `M ${x} ${y.toFixed(2)}` : `L ${x} ${y.toFixed(2)}`);
    }
    const pathD = points.join(" ");

    // Dot positions: X at trough positions, Y below trough with gap
    // Dot top edge = troughY + gap
    // Dot center Y = troughY + gap + dotRadius
    const dotCenterY = troughY + gap + dotRadius;

    const dotPositions = Array.from({ length: numDots }, (_, i) => ({
      x: startX + i * wavelength,
      y: dotCenterY,
    }));

    return { pathD, dotPositions, waveBottomY: troughY };
  }, [numDots, dotSpacing, amplitude, dotRadius, gap, W]);

  return (
    <div
      className={cn(
        "fixed bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 z-50",
        "transition-all duration-500",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      )}
      style={{ background: "#F9F9F7", borderRadius: "8px", padding: "8px 16px" }}
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
          waveBottomY={waveBottomY}
        />
      </div>
    </div>
  );
};

export default RangoliNavigation;
