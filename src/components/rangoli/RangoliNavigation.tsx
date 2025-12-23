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
    // Sequence: fade in container -> draw wave from center -> show dots sequentially
    const t1 = window.setTimeout(() => {
      setIsVisible(true);
    }, 800);
    
    const t2 = window.setTimeout(() => {
      setWaveDrawn(true);
    }, 900);
    
    const t3 = window.setTimeout(() => {
      setDotsVisible(true);
    }, 1400); // After wave drawing completes (~1s)
    
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
    };
  }, []);

  // Dimensions
  const W = 420;
  const H = 80;
  const centerX = W / 2;
  
  // Wave parameters
  const numDots = menuItems.length;
  const dotSpacing = 60;
  const totalDotsWidth = (numDots - 1) * dotSpacing;
  const startX = (W - totalDotsWidth) / 2;
  
  const amplitude = 12;
  const waveY = 32;
  const dotY = waveY + amplitude + 8;

  const { leftPathD, rightPathD, dotPositions, accentDots } = useMemo(() => {
    const period = dotSpacing;
    const phase = -Math.PI / 2 - (2 * Math.PI * startX) / period;
    
    const step = 2;
    const allPoints: { x: number; y: number }[] = [];
    
    // Generate all wave points
    for (let x = 0; x <= W; x += step) {
      const y = waveY + amplitude * Math.sin((2 * Math.PI * x) / period + phase);
      allPoints.push({ x, y });
    }
    
    // Split at center and reverse left half so both draw FROM center OUTWARD
    const centerIndex = Math.floor(allPoints.length / 2);
    const leftPoints = allPoints.slice(0, centerIndex + 1).reverse(); // center to left
    const rightPoints = allPoints.slice(centerIndex); // center to right
    
    // Build SVG path strings
    const leftPathD = leftPoints
      .map((p, i) => (i === 0 ? `M ${p.x.toFixed(1)} ${p.y.toFixed(1)}` : `L ${p.x.toFixed(1)} ${p.y.toFixed(1)}`))
      .join(" ");
    
    const rightPathD = rightPoints
      .map((p, i) => (i === 0 ? `M ${p.x.toFixed(1)} ${p.y.toFixed(1)}` : `L ${p.x.toFixed(1)} ${p.y.toFixed(1)}`))
      .join(" ");
    
    // Dot positions at each trough
    const dotPositions = Array.from({ length: numDots }, (_, i) => ({
      x: startX + i * dotSpacing,
      y: dotY,
    }));
    
    // Accent dots scattered around
    const accentDots: { x: number; y: number; size: number }[] = [];
    
    dotPositions.forEach((pos, i) => {
      const offsets = [
        { dx: -18, dy: -22, size: 3 },
        { dx: 22, dy: -20, size: 2 },
        { dx: -25, dy: 3, size: 2 },
        { dx: 28, dy: 6, size: 3 },
      ];
      
      offsets.forEach((offset, j) => {
        if ((i + j) % 2 === 0) {
          accentDots.push({
            x: pos.x + offset.dx + (i % 3) * 2,
            y: pos.y + offset.dy - 12,
            size: offset.size,
          });
        }
      });
    });
    
    // Accent dots at wave peaks (between main dots)
    for (let i = 0; i < numDots - 1; i++) {
      const midX = startX + i * dotSpacing + dotSpacing / 2;
      accentDots.push({
        x: midX + (i % 2 === 0 ? 4 : -4),
        y: waveY - amplitude - 6,
        size: 2 + (i % 2),
      });
    }
    
    return { leftPathD, rightPathD, dotPositions, accentDots };
  }, [numDots, startX, dotSpacing, amplitude, waveY, dotY, W]);

  return (
    <div
      className={cn(
        "fixed bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 z-50 transition-all duration-500",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      )}
      aria-label="Section navigation"
    >
      <div className="relative" style={{ width: `min(${W}px, 90vw)`, height: `${H}px` }}>
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
          viewBox={`0 0 ${W} ${H}`}
          preserveAspectRatio="xMidYMid meet"
        >
          <WavePath
            leftPathD={leftPathD}
            rightPathD={rightPathD}
            isDrawn={waveDrawn}
          />
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
