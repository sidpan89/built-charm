import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface DotNavigationProps {
  onNavigate: (section: string) => void;
  activeSection: string;
}

const DotNavigation = ({ onNavigate, activeSection }: DotNavigationProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredDot, setHoveredDot] = useState<number | null>(null);

  const menuItems = [
    { label: "Home", section: "home" },
    { label: "Services", section: "services" },
    { label: "Portfolio", section: "portfolio" },
    { label: "Team", section: "team" },
    { label: "About", section: "about" },
    { label: "Contact", section: "contact" },
  ];

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Calculate dot positions - dots sit in the valleys (dips) of the wave
  // Wave has 5 complete dips for 6 menu items
  const getDotPosition = (index: number) => {
    // Dots are positioned at the bottom of each wave dip
    // The wave goes: up, down, up, down, up, down
    // Dots alternate between being below (in dip) and above with small decorations
    const xOffset = index * 100; // Horizontal spacing
    return xOffset;
  };

  return (
    <div
      className={cn(
        "fixed bottom-8 left-1/2 -translate-x-1/2 z-50 transition-all duration-700",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      )}
    >
      {/* Container for wave and dots */}
      <div className="relative w-[600px] h-[80px]">
        {/* SVG Wave line */}
        <svg
          className="absolute top-0 left-0 w-full h-full pointer-events-none"
          viewBox="0 0 600 80"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Main wave path - goes through peaks and valleys */}
          <path
            d="M0,40 
               Q50,15 100,40 
               Q150,65 200,40 
               Q250,15 300,40 
               Q350,65 400,40 
               Q450,15 500,40 
               Q550,65 600,40"
            fill="none"
            stroke="hsl(var(--charcoal))"
            strokeWidth="2"
            strokeLinecap="round"
            className="opacity-40"
          />
        </svg>

        {/* Navigation dots - positioned in the valleys (dips) */}
        {menuItems.map((item, index) => {
          // Dots are at x positions: 100, 200, 300, 400, 500, 600 (at the curve transitions)
          // Alternating between top (y=15) and bottom (y=65) of wave
          const xPos = 100 + index * 83.33; // Spread across 500px (from 100 to 600)
          const isInUpperDip = index % 2 === 0; // Even indices: upper curve, odd: lower curve
          const yPos = isInUpperDip ? 20 : 55; // Position in the dip/valley

          return (
            <div
              key={item.section}
              className="absolute"
              style={{
                left: `${(xPos / 600) * 100}%`,
                top: `${yPos}px`,
                transform: "translate(-50%, -50%)",
              }}
              onMouseEnter={() => setHoveredDot(index)}
              onMouseLeave={() => setHoveredDot(null)}
            >
              {/* Main dot */}
              <button
                onClick={() => onNavigate(item.section)}
                className={cn(
                  "relative w-3 h-3 rounded-full transition-all duration-300 cursor-pointer",
                  activeSection === item.section
                    ? "bg-primary scale-150"
                    : "bg-charcoal/60 hover:bg-charcoal hover:scale-125"
                )}
                aria-label={item.label}
              >
                {/* Pulse ring for active */}
                {activeSection === item.section && (
                  <span className="absolute inset-0 rounded-full bg-primary/30 animate-ping" />
                )}
              </button>

              {/* Label on hover - appears above or below based on dot position */}
              <span
                className={cn(
                  "absolute left-1/2 -translate-x-1/2 whitespace-nowrap font-sans text-xs tracking-[0.15em] uppercase transition-all duration-300 pointer-events-none",
                  isInUpperDip ? "-top-8" : "top-6",
                  hoveredDot === index
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-90"
                )}
              >
                {item.label}
              </span>

              {/* Small decorative accent dots */}
              {index % 2 === 1 && (
                <span
                  className={cn(
                    "absolute w-1.5 h-1.5 rounded-full bg-charcoal/25 transition-all duration-300",
                    isInUpperDip ? "top-4 -left-2" : "-top-3 left-3"
                  )}
                  style={{
                    transform: hoveredDot === index ? "scale(1.5)" : "scale(1)",
                    opacity: hoveredDot === index ? 0.6 : 0.3,
                  }}
                />
              )}
              {index % 3 === 0 && (
                <span
                  className={cn(
                    "absolute w-1 h-1 rounded-full bg-charcoal/20 transition-all duration-300",
                    isInUpperDip ? "-top-2 left-4" : "top-5 -left-3"
                  )}
                  style={{
                    transform: hoveredDot === index ? "scale(2)" : "scale(1)",
                    opacity: hoveredDot === index ? 0.5 : 0.2,
                  }}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DotNavigation;
