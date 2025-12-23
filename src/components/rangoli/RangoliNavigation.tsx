import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { buildSineWavePath } from "./rangoliMath";
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
      window.setTimeout(() => setIsDrawn(true), 140);
    }, 900);
    return () => window.clearTimeout(t);
  }, []);

  const W = 480;
  const H = 110;

  // Uniform wave sized to fit exactly 6 consecutive dips (no empty dips)
  const period = 80;
  const firstDotX = 40;
  const midY = 55;
  const amplitude = 22;
  // Make troughs (lowest points) happen exactly at x = firstDotX + n * period
  const phase = -Math.PI / 2 - (2 * Math.PI * firstDotX) / period;

  const { pathD, dotPositions, accentDots } = useMemo(() => {
    const pathD = buildSineWavePath({
      width: W,
      height: H,
      midY,
      amplitude,
      period,
      phase,
      stepPx: 3,
    });

    const yAt = (x: number) => midY + amplitude * Math.sin((2 * Math.PI * x) / period + phase);

    // Place dots on every consecutive trough (no skipped dips)
    const xs = Array.from({ length: menuItems.length }, (_, i) => firstDotX + i * period);
    const dotGap = 14;

    const dotPositions = xs.map((x, i) => {
      const yLine = yAt(x);
      return {
        x,
        yLine,
        yDot: yLine - dotGap,
        labelPos: i % 2 === 0 ? ("top" as const) : ("bottom" as const),
      };
    });

    const accentDots = dotPositions.flatMap((p, i) => {
      const jitter = (n: number) => (i % 2 === 0 ? n : -n);
      return [
        { x: p.x - 22, y: p.yLine + jitter(6), size: 3 },
        { x: p.x + 18, y: p.yLine - jitter(9), size: 4 },
        { x: p.x + 30, y: p.yDot + jitter(4), size: 2 },
      ];
    });

    return { pathD, dotPositions, accentDots };
  }, [menuItems.length, phase]);

  return (
    <div
      className={cn(
        "fixed bottom-5 sm:bottom-8 left-1/2 -translate-x-1/2 z-50 transition-all duration-700",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      )}
      aria-label="Section navigation"
    >
      <div className="relative w-[min(480px,92vw)] aspect-[480/110]">
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox={`0 0 ${W} ${H}`}
          preserveAspectRatio="xMidYMid meet"
        >
          <WavePath pathD={pathD} isDrawn={isDrawn} />
        </svg>

        <AccentDots
          dots={accentDots}
          viewBoxWidth={W}
          viewBoxHeight={H}
          isDrawn={isDrawn}
        />

        <MenuDots
          menuItems={menuItems}
          dotPositions={dotPositions}
          viewBoxWidth={W}
          viewBoxHeight={H}
          isDrawn={isDrawn}
          activeSection={activeSection}
          onNavigate={onNavigate}
        />

        {/* Rangoli micro-animations */}
        <style>{`
          @keyframes rangoliDotBounce {
            0%, 100% { 
              transform: translateY(0); 
            }
            25% { 
              transform: translateY(-3px); 
            }
            75% { 
              transform: translateY(2px); 
            }
          }
          @keyframes rangoliDotPulse {
            0%, 100% { 
              opacity: 0.7;
              transform: scale(1);
            }
            50% { 
              opacity: 1;
              transform: scale(1.15);
            }
          }
          @keyframes rangoliSparkle {
            0%, 100% { opacity: 0.25; transform: translate(-50%, -50%) scale(1); }
            50% { opacity: 0.55; transform: translate(-50%, -50%) scale(1.35); }
          }
          @keyframes rangoliWaveBreath {
            0%, 100% { opacity: 0.48; }
            50% { opacity: 0.62; }
          }
        `}</style>
      </div>
    </div>
  );
};

export default RangoliNavigation;
