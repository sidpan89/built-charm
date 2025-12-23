import { useState } from "react";
import { cn } from "@/lib/utils";

interface DotPosition {
  x: number;
  y: number;
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
        const staggerDelay = 0.08 * index;
        
        const isActive = activeSection === item.section;
        const isHovered = hoveredDot === index;

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
            {/* Active glow ring */}
            {isActive && (
              <div
                className="absolute rounded-full"
                style={{
                  width: "24px",
                  height: "24px",
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                  background: "radial-gradient(circle, hsl(var(--charcoal) / 0.2) 0%, transparent 70%)",
                  animation: "glowPulse 2s ease-in-out infinite",
                }}
              />
            )}

            {/* Dot */}
            <button
              onClick={() => onNavigate(item.section)}
              className={cn(
                "relative rounded-full cursor-pointer transition-colors duration-150",
                "w-2 h-2 sm:w-2.5 sm:h-2.5",
                isActive ? "bg-charcoal" : "bg-charcoal/65 hover:bg-charcoal"
              )}
              style={{
                opacity: dotsVisible ? 1 : 0,
                transform: dotsVisible
                  ? `scale(${isHovered ? 1.4 : isActive ? 1.15 : 1})`
                  : "scale(0.5)",
                transition: `
                  opacity 300ms ease ${staggerDelay}s,
                  transform 300ms cubic-bezier(0.34, 1.56, 0.64, 1) ${staggerDelay}s
                `,
              }}
              aria-label={item.label}
            />

            {/* Label - appears below the dot on hover */}
            <span
              className={cn(
                "absolute left-1/2 -translate-x-1/2 whitespace-nowrap",
                "font-sans text-[9px] sm:text-[10px] tracking-[0.18em] uppercase",
                "pointer-events-none font-medium text-charcoal/70",
                "transition-all duration-200 ease-out",
                "top-4 sm:top-5",
                isHovered ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1"
              )}
            >
              {item.label}
            </span>
          </div>
        );
      })}

      <style>{`
        @keyframes glowPulse {
          0%, 100% { opacity: 0.5; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 0.85; transform: translate(-50%, -50%) scale(1.2); }
        }
      `}</style>
    </>
  );
};

export default MenuDots;
