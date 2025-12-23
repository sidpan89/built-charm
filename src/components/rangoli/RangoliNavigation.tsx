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
    const t3 = window.setTimeout(() => setDotsVisible(true), 1900);
    
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
    };
  }, []);

  // Canvas dimensions
  const W = 520;
  const H = 70;
  const numDots = menuItems.length;

  // Wave geometry - dots inside every trough (consecutive)
  const dotSpacing = 70; // horizontal distance between dots = one full wavelength
  const amplitude = 18; // wave amplitude
  const dotRadius = 4;
  const gap = 5; // gap between dot bottom and trough line

  const { pathD, dotPositions, troughY } = useMemo(() => {
    const totalWidth = (numDots - 1) * dotSpacing;
    const startX = (W - totalWidth) / 2;
    
    // Each dot sits in its own trough - wavelength equals dot spacing
    // This means every trough has a dot (consecutive)
    const wavelength = dotSpacing;
    
    // Wave geometry:
    // - Trough (bottom, high Y) at x = startX + n*wavelength where dots are
    // - Peak (top, low Y) at x = startX + wavelength/2 + n*wavelength (between dots)
    
    const peakY = 10; // top of wave curve
    const troughY = peakY + 2 * amplitude; // bottom of wave curve
    const centerY = (peakY + troughY) / 2;
    
    const yAt = (x: number) => {
      const theta = (2 * Math.PI * (x - startX)) / wavelength;
      // cos(0) = 1 → trough at dot positions
      return centerY + amplitude * Math.cos(theta);
    };

    // Generate smooth sine wave path
    const points: string[] = [];
    for (let x = 0; x <= W; x++) {
      const y = yAt(x);
      points.push(x === 0 ? `M ${x} ${y.toFixed(2)}` : `L ${x} ${y.toFixed(2)}`);
    }
    const pathD = points.join(" ");

    // Dots positioned ABOVE the trough line, floating inside the cup
    // Dot bottom edge should be 'gap' pixels above the trough
    // Dot center Y = troughY - gap - dotRadius
    const dotCenterY = troughY - gap - dotRadius;

    const dotPositions = Array.from({ length: numDots }, (_, i) => ({
      x: startX + i * wavelength,
      y: dotCenterY,
    }));

    return { pathD, dotPositions, troughY };
  }, [numDots, dotSpacing, amplitude, dotRadius, gap, W]);

  return (
    <div
      className={cn(
        "fixed bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 z-50",
        "transition-all duration-500",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      )}
      style={{ 
        background: "#F9F9F7", 
        borderRadius: "12px", 
        padding: "10px 24px",
        boxShadow: "0 2px 20px rgba(0,0,0,0.04)"
      }}
      aria-label="Section navigation"
    >
      <div
        className="relative"
        style={{
          width: `min(${W}px, 92vw)`,
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
          troughY={troughY}
          dotRadius={dotRadius}
        />
      </div>
    </div>
  );
};

export default RangoliNavigation;
