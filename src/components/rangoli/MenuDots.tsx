import { useState } from "react";
import { cn } from "@/lib/utils";

interface DotPosition {
  x: number;
  y: number;
  placement: "above" | "below";
}

interface MenuItem {
  label: string;
  section: string;
}

interface MenuDotsProps {
  menuItems: MenuItem[];
  dotPositions: DotPosition[];
  viewBoxWidth: number;
  viewBoxHeight: number;
  dotsVisible: boolean;
  activeSection: string;
  onNavigate: (section: string) => void;
}

const MenuDots = ({
  menuItems,
  dotPositions,
  viewBoxWidth,
  viewBoxHeight,
  dotsVisible,
  activeSection,
  onNavigate,
}: MenuDotsProps) => {
  const [hoveredDot, setHoveredDot] = useState<number | null>(null);

  return (
    <>
      {menuItems.map((item, index) => {
        const pos = dotPositions[index];
        // Sequential left-to-right stagger delay
        const staggerDelay = index * 0.1;
        
        const isActive = activeSection === item.section;
        const isHovered = hoveredDot === index;
        const showLabel = isHovered || isActive;

        return (
          <div
            key={item.section}
            className="absolute"
            style={{
              left: `${(pos.x / viewBoxWidth) * 100}%`,
              top: `${(pos.y / viewBoxHeight) * 100}%`,
              transform: "translate(-50%, -50%)",
            }}
            onMouseEnter={() => setHoveredDot(index)}
            onMouseLeave={() => setHoveredDot(null)}
          >
            {/* Active glow */}
            {isActive && (
              <div
                className="absolute rounded-full animate-glow-pulse"
                style={{
                  width: "28px",
                  height: "28px",
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                  background: "radial-gradient(circle, hsl(var(--charcoal) / 0.2) 0%, transparent 70%)",
                }}
              />
            )}

            {/* The dot button */}
            <button
              onClick={() => onNavigate(item.section)}
              className={cn(
                "relative rounded-full cursor-pointer",
                "w-2.5 h-2.5 sm:w-3 sm:h-3",
                isActive ? "bg-charcoal" : "bg-charcoal/70 hover:bg-charcoal"
              )}
              style={{
                opacity: dotsVisible ? 1 : 0,
                transform: dotsVisible 
                  ? `scale(${isHovered ? 1.4 : isActive ? 1.2 : 1})` 
                  : "scale(0.6)",
                transition: `
                  opacity 350ms ease ${staggerDelay}s, 
                  transform 350ms cubic-bezier(0.34, 1.56, 0.64, 1) ${staggerDelay}s,
                  background-color 200ms ease
                `,
                boxShadow: isActive ? "0 0 10px 3px hsl(var(--charcoal) / 0.25)" : "none",
              }}
              aria-label={item.label}
            />

            {/* Label - position based on dot placement */}
            <span
              className={cn(
                "absolute left-1/2 -translate-x-1/2 whitespace-nowrap",
                "font-sans text-[9px] sm:text-[11px] tracking-[0.18em] uppercase",
                "transition-all duration-250 ease-out pointer-events-none font-medium text-charcoal/75",
                pos.placement === "below" ? "-top-6 sm:-top-7" : "top-5 sm:top-6",
                showLabel ? "opacity-100" : "opacity-0",
                showLabel ? "translate-y-0" : (pos.placement === "below" ? "translate-y-1" : "-translate-y-1")
              )}
            >
              {item.label}
            </span>
          </div>
        );
      })}

      <style>{`
        @keyframes glowPulse {
          0%, 100% {
            opacity: 0.5;
            transform: translate(-50%, -50%) scale(1);
          }
          50% {
            opacity: 0.8;
            transform: translate(-50%, -50%) scale(1.3);
          }
        }
        .animate-glow-pulse {
          animation: glowPulse 2.5s ease-in-out infinite;
        }
      `}</style>
    </>
  );
};

export default MenuDots;
