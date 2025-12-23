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

  // Dot positions matching the reference - dots are in the valleys/dips, not touching the line
  // Pattern: dot above valley, dot below valley, alternating
  const dotPositions = [
    { x: 80, y: 18, labelPos: "top" },    // Above first dip
    { x: 160, y: 62, labelPos: "bottom" }, // Below second dip
    { x: 240, y: 18, labelPos: "top" },    // Above third dip
    { x: 320, y: 62, labelPos: "bottom" }, // Below fourth dip
    { x: 400, y: 18, labelPos: "top" },    // Above fifth dip
    { x: 480, y: 62, labelPos: "bottom" }, // Below sixth dip
  ];

  // Decorative accent dots (small dots scattered around like in the reference)
  const accentDots = [
    { x: 55, y: 35, size: 4 },
    { x: 120, y: 28, size: 3 },
    { x: 135, y: 48, size: 5 },
    { x: 200, y: 55, size: 3 },
    { x: 280, y: 32, size: 4 },
    { x: 295, y: 52, size: 3 },
    { x: 360, y: 28, size: 5 },
    { x: 375, y: 48, size: 3 },
    { x: 440, y: 55, size: 4 },
    { x: 505, y: 35, size: 3 },
  ];

  return (
    <div
      className={cn(
        "fixed bottom-12 left-1/2 -translate-x-1/2 z-50 transition-all duration-700",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      )}
    >
      {/* Container for wave and dots */}
      <div className="relative w-[560px] h-[100px]">
        {/* SVG Wave line - hand-drawn organic style */}
        <svg
          className="absolute top-0 left-0 w-full h-full pointer-events-none"
          viewBox="0 0 560 100"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Animated wave path - organic hand-drawn style matching reference */}
          <path
            d="M0,50 
               C20,50 40,30 80,30 
               C120,30 120,70 160,70 
               C200,70 200,30 240,30 
               C280,30 280,70 320,70 
               C360,70 360,30 400,30 
               C440,30 440,70 480,70 
               C520,70 540,50 560,50"
            fill="none"
            stroke="hsl(var(--charcoal))"
            strokeWidth="2.5"
            strokeLinecap="round"
            className="opacity-50"
            style={{
              animation: "waveFlow 8s ease-in-out infinite",
            }}
          />
        </svg>

        {/* Decorative accent dots - scattered around like rangoli */}
        {accentDots.map((dot, index) => (
          <div
            key={`accent-${index}`}
            className="absolute rounded-full bg-charcoal/30"
            style={{
              left: `${(dot.x / 560) * 100}%`,
              top: `${dot.y}px`,
              width: `${dot.size}px`,
              height: `${dot.size}px`,
              transform: "translate(-50%, -50%)",
              animation: `dotPulse ${2 + index * 0.3}s ease-in-out infinite`,
              animationDelay: `${index * 0.2}s`,
            }}
          />
        ))}

        {/* Main navigation dots - positioned in the valleys */}
        {menuItems.map((item, index) => {
          const pos = dotPositions[index];
          const isTop = pos.labelPos === "top";

          return (
            <div
              key={item.section}
              className="absolute"
              style={{
                left: `${(pos.x / 560) * 100}%`,
                top: `${pos.y}px`,
                transform: "translate(-50%, -50%)",
              }}
              onMouseEnter={() => setHoveredDot(index)}
              onMouseLeave={() => setHoveredDot(null)}
            >
              {/* Main navigation dot */}
              <button
                onClick={() => onNavigate(item.section)}
                className={cn(
                  "relative rounded-full transition-all duration-300 cursor-pointer",
                  activeSection === item.section
                    ? "bg-primary w-4 h-4"
                    : "bg-charcoal/70 w-3 h-3 hover:bg-charcoal hover:w-4 hover:h-4"
                )}
                style={{
                  animation: activeSection === item.section 
                    ? "activeDotGlow 2s ease-in-out infinite" 
                    : "dotFloat 3s ease-in-out infinite",
                  animationDelay: `${index * 0.15}s`,
                }}
                aria-label={item.label}
              >
                {/* Pulse ring for active */}
                {activeSection === item.section && (
                  <span className="absolute inset-[-4px] rounded-full border border-primary/40 animate-ping" />
                )}
              </button>

              {/* Label on hover */}
              <span
                className={cn(
                  "absolute left-1/2 -translate-x-1/2 whitespace-nowrap font-sans text-xs tracking-[0.2em] uppercase transition-all duration-300 pointer-events-none font-medium",
                  isTop ? "-top-7" : "top-7",
                  hoveredDot === index
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-90"
                )}
              >
                {item.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Rangoli-style animations */}
      <style>{`
        @keyframes waveFlow {
          0%, 100% {
            transform: translateX(0);
            opacity: 0.5;
          }
          50% {
            transform: translateX(2px);
            opacity: 0.6;
          }
        }
        
        @keyframes dotFloat {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-2px);
          }
        }
        
        @keyframes dotPulse {
          0%, 100% {
            opacity: 0.3;
            transform: translate(-50%, -50%) scale(1);
          }
          50% {
            opacity: 0.5;
            transform: translate(-50%, -50%) scale(1.2);
          }
        }
        
        @keyframes activeDotGlow {
          0%, 100% {
            box-shadow: 0 0 0 0 hsl(var(--primary) / 0.4);
          }
          50% {
            box-shadow: 0 0 8px 2px hsl(var(--primary) / 0.3);
          }
        }
      `}</style>
    </div>
  );
};

export default DotNavigation;
