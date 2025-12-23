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

  // Wave geometry
  // - Dots alternate between bottom troughs (cup opens upward) and top troughs (cup opens downward)
  // - One dot per extremum => no trough/peak is left blank
  const dotSpacing = 70; // spacing between consecutive extrema (half-wavelength)
  const amplitude = 18;
  const dotRadius = 4;
  const gap = 6; // 5-10px clearance between wave and dot

  const { pathD, dotPositions, troughY, peakY } = useMemo(() => {
    const totalWidth = (numDots - 1) * dotSpacing;
    const startX = (W - totalWidth) / 2;

    // Full wavelength is 2 * dotSpacing so extrema occur every dotSpacing
    const wavelength = dotSpacing * 2;

    const peakY = 10;
    const troughY = peakY + 2 * amplitude;
    const centerY = (peakY + troughY) / 2;

    const yAt = (x: number) => {
      const theta = (2 * Math.PI * (x - startX)) / wavelength;
      // theta=0 => trough (bottom); theta=π => peak (top)
      return centerY + amplitude * Math.cos(theta);
    };

    // Generate smooth sine wave path
    const points: string[] = [];
    for (let x = 0; x <= W; x++) {
      const y = yAt(x);
      points.push(x === 0 ? `M ${x} ${y.toFixed(2)}` : `L ${x} ${y.toFixed(2)}`);
    }
    const pathD = points.join(" ");

    // Dot placement:
    // - Even index dots sit INSIDE bottom troughs (float above the trough line)
    // - Odd index dots sit INSIDE top troughs/peaks (float below the peak line)
    const dotPositions = Array.from({ length: numDots }, (_, i) => {
      const x = startX + i * dotSpacing;
      const isBottomCup = i % 2 === 0;
      const y = isBottomCup
        ? troughY - gap - dotRadius // above bottom trough
        : peakY + gap + dotRadius; // below top peak

      return { x, y };
    });

    return { pathD, dotPositions, troughY, peakY };
  }, [numDots, dotSpacing, amplitude, dotRadius, gap, W]);


  return (
    <div
      className={cn(
        "fixed bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 z-50",
        "bg-cream shadow-subtle rounded-xl",
        "px-6 py-2.5",
        "transition-all duration-500",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      )}
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
          peakY={peakY}
          dotRadius={dotRadius}
        />
      </div>
    </div>
  );
};

export default RangoliNavigation;
