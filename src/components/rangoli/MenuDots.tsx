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
  isDrawn: boolean;
  activeSection: string;
  onNavigate: (section: string) => void;
}

const MenuDots = ({
  menuItems,
  dotPositions,
  viewBoxWidth,
  viewBoxHeight,
  isDrawn,
  activeSection,
  onNavigate,
}: MenuDotsProps) => {
  const [hoveredDot, setHoveredDot] = useState<number | null>(null);

  // Calculate order: center dots first, then outward
  // For 6 items: indices 2,3 first, then 1,4, then 0,5
  const getSequentialDelay = (index: number, total: number) => {
    const center = (total - 1) / 2;
    const distanceFromCenter = Math.abs(index - center);
    return distanceFromCenter * 0.15; // 150ms between each "ring"
  };

  return (
    <>
      {menuItems.map((item, index) => {
        const pos = dotPositions[index];
        const sequentialDelay = getSequentialDelay(index, menuItems.length);
        
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
            {/* Glow ring for active dot */}
            {isActive && (
              <div
                className="absolute rounded-full animate-active-glow"
                style={{
                  width: "24px",
                  height: "24px",
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                  background: "radial-gradient(circle, hsl(var(--charcoal) / 0.25) 0%, transparent 70%)",
                }}
              />
            )}

            <button
              onClick={() => onNavigate(item.section)}
              className={cn(
                "relative rounded-full cursor-pointer dot-fade-in",
                "w-2 h-2 sm:w-2.5 sm:h-2.5",
                isActive
                  ? "bg-charcoal"
                  : isHovered
                  ? "bg-charcoal"
                  : "bg-charcoal/80 hover:bg-charcoal"
              )}
              style={{
                opacity: isDrawn ? 1 : 0,
                transform: isDrawn 
                  ? `scale(${isActive || isHovered ? 1.3 : 1})` 
                  : "scale(0.5)",
                transition: `opacity 400ms ease ${sequentialDelay}s, transform 400ms ease ${sequentialDelay}s`,
                boxShadow: isActive
                  ? "0 0 12px 4px hsl(var(--charcoal) / 0.3)"
                  : "none",
              }}
              aria-label={item.label}
            />

            {/* Label appears on hover */}
            <span
              className={cn(
                "absolute left-1/2 -translate-x-1/2 whitespace-nowrap",
                "font-sans text-[10px] sm:text-xs tracking-[0.15em] sm:tracking-[0.2em] uppercase",
                "transition-all duration-300 ease-out pointer-events-none font-medium text-charcoal/80",
                "top-5 sm:top-6",
                isHovered ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1"
              )}
            >
              {item.label}
            </span>
          </div>
        );
      })}

      <style>{`
        @keyframes activeGlow {
          0%, 100% {
            opacity: 0.5;
            transform: translate(-50%, -50%) scale(1);
          }
          50% {
            opacity: 0.8;
            transform: translate(-50%, -50%) scale(1.4);
          }
        }
        .animate-active-glow {
          animation: activeGlow 2.5s ease-in-out infinite;
        }
      `}</style>
    </>
  );
};

export default MenuDots;
