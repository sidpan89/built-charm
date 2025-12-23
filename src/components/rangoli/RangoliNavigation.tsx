import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { buildSineWavePath, troughXPositions } from "./rangoliMath";

interface RangoliNavigationProps {
  onNavigate: (section: string) => void;
  activeSection: string;
}

const RangoliNavigation = ({ onNavigate, activeSection }: RangoliNavigationProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDrawn, setIsDrawn] = useState(false);
  const [hoveredDot, setHoveredDot] = useState<number | null>(null);

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

  const W = 560;
  const H = 100;

  // Uniform wave tuned to place troughs exactly at dot centers.
  // Dots at x: 80,160,240,320,400,480 (as per your reference geometry)
  const period = 80;
  const firstDotX = 80;
  const midY = 50;
  const amplitude = 18;
  const phase = Math.PI / 2; // makes x multiples of period troughs (lowest)

  const { pathD, dotPositions } = useMemo(() => {
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

    const xs = troughXPositions({ firstTroughX: firstDotX, count: menuItems.length, period });
    const dotGap = 14; // larger gap so dots hover within the dip without touching the line

    const dotPositions = xs.map((x, i) => {
      const yLine = yAt(x);
      return {
        x,
        yLine,
        // Place dot ABOVE the trough line (lower y in SVG) so it hovers within the dip
        yDot: yLine - dotGap,
        labelPos: i % 2 === 0 ? ("top" as const) : ("bottom" as const),
      };
    });

    return { pathD, dotPositions };
  }, [menuItems.length]);

  const accentDots = useMemo(
    () =>
      dotPositions.flatMap((p, i) => {
        const jitter = (n: number) => (i % 2 === 0 ? n : -n);
        return [
          { x: p.x - 22, y: p.yLine + jitter(6), size: 3 },
          { x: p.x + 18, y: p.yLine - jitter(9), size: 4 },
          { x: p.x + 30, y: p.yDot + jitter(4), size: 2 },
        ];
      }),
    [dotPositions]
  );

  return (
    <div
      className={cn(
        "fixed bottom-5 sm:bottom-8 left-1/2 -translate-x-1/2 z-50 transition-all duration-700",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      )}
      aria-label="Section navigation"
    >
      {/* Responsive container: scales down naturally with viewport */}
      <div className="relative w-[min(560px,92vw)] aspect-[560/110]">
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox={`0 0 ${W} 110`}
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Wave line (uniform) */}
          <path
            d={pathD}
            fill="none"
            stroke="hsl(var(--charcoal))"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            pathLength={1}
            className={cn("transition-opacity duration-700", isDrawn ? "opacity-50" : "opacity-0")}
            style={{
              strokeDasharray: 1,
              strokeDashoffset: isDrawn ? 0 : 1,
              transition:
                "stroke-dashoffset 1400ms cubic-bezier(0.65, 0, 0.35, 1), opacity 500ms ease",
              animation: isDrawn ? "rangoliWaveBreath 3.6s ease-in-out infinite" : "none",
            }}
          />
        </svg>

        {/* Accent dots (rangoli feel) */}
        {accentDots.map((dot, idx) => (
          <div
            key={`accent-${idx}`}
            className="absolute rounded-full bg-charcoal/30 hidden sm:block"
            style={{
              left: `${(dot.x / W) * 100}%`,
              top: `${(dot.y / 110) * 100}%`,
              width: `${dot.size}px`,
              height: `${dot.size}px`,
              transform: "translate(-50%, -50%)",
              opacity: isDrawn ? 0.35 : 0,
              transition: `opacity 400ms ease ${1.1 + idx * 0.04}s`,
              animation: isDrawn ? `rangoliSparkle ${2.4 + (idx % 6) * 0.25}s ease-in-out infinite` : "none",
              animationDelay: `${1.6 + (idx % 8) * 0.12}s`,
            }}
          />
        ))}

        {/* Main navigation dots */}
        {menuItems.map((item, index) => {
          const pos = dotPositions[index];
          const isTop = pos.labelPos === "top";
          const dotDelay = 0.9 + index * 0.12;

          return (
            <div
              key={item.section}
              className="absolute"
              style={{
                left: `${(pos.x / W) * 100}%`,
                top: `${(pos.yDot / 110) * 100}%`,
                transform: "translate(-50%, -50%)",
                opacity: isDrawn ? 1 : 0,
                transition: `opacity 420ms ease ${dotDelay}s, transform 420ms ease ${dotDelay}s`,
              }}
              onMouseEnter={() => setHoveredDot(index)}
              onMouseLeave={() => setHoveredDot(null)}
            >
              <button
                onClick={() => onNavigate(item.section)}
                className="relative rounded-full bg-charcoal/70 w-2.5 h-2.5 sm:w-3 sm:h-3 transition-all duration-300 cursor-pointer hover:bg-charcoal hover:scale-125"
                style={{
                  animation: isDrawn ? "rangoliDotFloat 3.1s ease-in-out infinite" : "none",
                  animationDelay: `${1.8 + index * 0.1}s`,
                }}
                aria-label={item.label}
              />

              <span
                className={cn(
                  "absolute left-1/2 -translate-x-1/2 whitespace-nowrap font-sans text-[10px] sm:text-xs tracking-[0.15em] sm:tracking-[0.2em] uppercase transition-all duration-300 pointer-events-none font-medium",
                  isTop ? "-top-5 sm:-top-7" : "top-5 sm:top-7",
                  hoveredDot === index ? "opacity-100 scale-100" : "opacity-0 scale-90"
                )}
              >
                {item.label}
              </span>
            </div>
          );
        })}

        {/* Rangoli micro-animations */}
        <style>{`
          @keyframes rangoliDotFloat {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-2px); }
          }
          @keyframes rangoliSparkle {
            0%, 100% { opacity: 0.25; transform: translate(-50%, -50%) scale(1); }
            50% { opacity: 0.55; transform: translate(-50%, -50%) scale(1.35); }
          }
          @keyframes rangoliActiveGlow {
            0%, 100% { box-shadow: 0 0 0 0 hsl(var(--primary) / 0.38); }
            50% { box-shadow: 0 0 10px 3px hsl(var(--primary) / 0.26); }
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
