import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import WavePath from "./WavePath";
import AccentDots from "./AccentDots";
import MenuDots from "./MenuDots";

interface RangoliNavigationProps {
  onNavigate: (section: string) => void;
  activeSection: string;
}

const RangoliNavigation = ({ onNavigate, activeSection }: RangoliNavigationProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDrawn, setIsDrawn] = useState(false);
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
    const t1 = window.setTimeout(() => {
      setIsVisible(true);
      // Start wave drawing
      window.setTimeout(() => setIsDrawn(true), 100);
      // Show dots after wave is mostly drawn
      window.setTimeout(() => setDotsVisible(true), 700);
    }, 800);
    return () => window.clearTimeout(t1);
  }, []);

  // Dimensions
  const W = 420;
  const H = 80;
  
  // Wave parameters
  const numDots = menuItems.length;
  const dotSpacing = 60;
  const totalDotsWidth = (numDots - 1) * dotSpacing;
  const startX = (W - totalDotsWidth) / 2;
  
  const amplitude = 12;
  const waveY = 32;
  const dotY = waveY + amplitude + 8;

  const { pathD, dotPositions, accentDots, pathLength } = useMemo(() => {
    const period = dotSpacing;
    const phase = -Math.PI / 2 - (2 * Math.PI * startX) / period;
    
    // Build smooth wave path
    const points: { x: number; y: number }[] = [];
    const step = 2;
    
    for (let x = 0; x <= W; x += step) {
      const y = waveY + amplitude * Math.sin((2 * Math.PI * x) / period + phase);
      points.push({ x, y });
    }
    
    // Calculate approximate path length
    let pathLength = 0;
    for (let i = 1; i < points.length; i++) {
      const dx = points[i].x - points[i - 1].x;
      const dy = points[i].y - points[i - 1].y;
      pathLength += Math.sqrt(dx * dx + dy * dy);
    }
    
    const pathD = points
      .map((p, i) => (i === 0 ? `M ${p.x} ${p.y}` : `L ${p.x} ${p.y}`))
      .join(" ");
    
    // Dot positions
    const dotPositions = Array.from({ length: numDots }, (_, i) => ({
      x: startX + i * dotSpacing,
      y: dotY,
    }));
    
    // Generate accent dots scattered around the wave
    const accentDots: { x: number; y: number; size: number }[] = [];
    
    // Add accent dots near each menu dot position
    dotPositions.forEach((pos, i) => {
      // Varied positions around each main dot
      const offsets = [
        { dx: -18, dy: -20, size: 3 },
        { dx: 22, dy: -18, size: 2 },
        { dx: -25, dy: 5, size: 2 },
        { dx: 28, dy: 8, size: 3 },
      ];
      
      // Only add some offsets based on index for variety
      offsets.forEach((offset, j) => {
        if ((i + j) % 2 === 0) {
          accentDots.push({
            x: pos.x + offset.dx + (i % 3) * 3,
            y: pos.y + offset.dy - 15,
            size: offset.size,
          });
        }
      });
    });
    
    // Add a few extra accent dots along the wave peaks
    for (let i = 0; i < numDots - 1; i++) {
      const midX = startX + i * dotSpacing + dotSpacing / 2;
      accentDots.push({
        x: midX + (i % 2 === 0 ? 5 : -5),
        y: waveY - amplitude - 8 + (i % 3) * 2,
        size: 2 + (i % 2),
      });
    }
    
    return { pathD, dotPositions, accentDots, pathLength };
  }, [numDots, startX, dotSpacing, amplitude, waveY, dotY, W]);

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
          <WavePath pathD={pathD} isDrawn={isDrawn} pathLength={pathLength} />
        </svg>

        <AccentDots
          dots={accentDots}
          viewBoxWidth={W}
          viewBoxHeight={H}
          isDrawn={dotsVisible}
        />

        <MenuDots
          menuItems={menuItems}
          dotPositions={dotPositions}
          viewBoxWidth={W}
          viewBoxHeight={H}
          isDrawn={dotsVisible}
          activeSection={activeSection}
          onNavigate={onNavigate}
        />
      </div>
    </div>
  );
};

export default RangoliNavigation;
