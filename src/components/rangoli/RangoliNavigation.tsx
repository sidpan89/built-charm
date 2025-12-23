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
  const W = 480;
  const H = 90;
  const numDots = menuItems.length;

  // Wave geometry - TROUGHS at dot positions, PEAKS between dots
  const dotSpacing = 70;
  const amplitude = 18;
  const waveTop = 20; // Y position of the wave peaks (top of wave, small Y = high on screen)
  const gap = 5; // strict 5px gap between wave bottom and dot top
  const dotRadius = 5;

  const { pathD, dotPositions } = useMemo(() => {
    const totalWidth = (numDots - 1) * dotSpacing;
    const startX = (W - totalWidth) / 2;
    const wavelength = dotSpacing;

    // Wave equation: peaks at top (low Y), troughs at bottom (high Y)
    // We want TROUGHS at dot positions (x = startX + n*wavelength)
    // Using: y = waveTop + amplitude * (1 - cos(θ))
    // At θ = 0: y = waveTop + amplitude*(1-1) = waveTop (PEAK - top)
    // At θ = π: y = waveTop + amplitude*(1-(-1)) = waveTop + 2*amplitude (TROUGH - bottom)
    // 
    // To put trough at x = startX, we need θ = π at that point
    // θ = 2π(x - startX)/wavelength + π
    // At x = startX: θ = π → trough ✓
    // At x = startX + wavelength/2: θ = 2π → peak
    // At x = startX + wavelength: θ = 3π → trough ✓

    const yAt = (x: number) => {
      const theta = (2 * Math.PI * (x - startX)) / wavelength + Math.PI;
      return waveTop + amplitude * (1 - Math.cos(theta));
    };

    // Generate smooth wave path
    const step = 1;
    const points: string[] = [];
    for (let x = 0; x <= W; x += step) {
      const y = yAt(x);
      points.push(x === 0 ? `M ${x} ${y.toFixed(2)}` : `L ${x} ${y.toFixed(2)}`);
    }
    const pathD = points.join(" ");

    // Verify: at x = startX, y should be at trough (waveTop + 2*amplitude)
    const troughY = waveTop + 2 * amplitude; // This is the bottom of the wave

    // Dots positioned BELOW the trough with 5px gap
    // Dot center Y = troughY + gap + dotRadius
    const dotCenterY = troughY + gap + dotRadius;

    const dotPositions = Array.from({ length: numDots }, (_, i) => ({
      x: startX + i * wavelength,
      y: dotCenterY,
    }));

    return { pathD, dotPositions };
  }, [numDots, dotSpacing, amplitude, waveTop, gap, dotRadius, W]);

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
