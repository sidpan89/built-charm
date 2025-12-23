import { useState } from "react";

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
  troughY: number;
  peakY: number;
  dotRadius: number;
}

const MenuDots = ({
  menuItems,
  dotPositions,
  viewBoxWidth,
  viewBoxHeight,
  dotsVisible,
  activeSection,
  onNavigate,
  troughY,
  peakY,
  dotRadius,
}: MenuDotsProps) => {
  const [hoveredDot, setHoveredDot] = useState<number | null>(null);

  return (
    <>
      {menuItems.map((item, index) => {
        const pos = dotPositions[index];
        const staggerDelay = 0.1 * index;
        
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
            {/* Active glow effect */}
            {isActive && dotsVisible && (
              <div
                className="absolute rounded-full pointer-events-none"
                style={{
                  width: `${dotRadius * 4}px`,
                  height: `${dotRadius * 4}px`,
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                  background: "radial-gradient(circle, hsl(var(--charcoal) / 0.22) 0%, transparent 70%)",
                  animation: "glowPulse 2s ease-in-out infinite",
                }}
              />
            )}

            {/* Dot - darker than line, solid circle */}
            <button
              onClick={() => onNavigate(item.section)}
              className="relative rounded-full cursor-pointer"
              style={{
                width: `${dotRadius * 2}px`,
                height: `${dotRadius * 2}px`,
                backgroundColor: isActive ? "hsl(var(--foreground))" : "hsl(var(--charcoal))",
                boxShadow: isActive ? "0 0 10px hsl(var(--charcoal) / 0.35)" : "none",
                opacity: dotsVisible ? 1 : 0,
                transform: dotsVisible
                  ? `scale(${isHovered ? 1.25 : isActive ? 1.15 : 1})`
                  : "scale(0.2)",
                transition: `
                  opacity 400ms ease ${staggerDelay}s,
                  transform 300ms cubic-bezier(0.34, 1.56, 0.64, 1) ${dotsVisible ? staggerDelay : 0}s,
                  background-color 150ms ease,
                  box-shadow 300ms ease
                `,
              }}
              aria-label={item.label}
            />

            {/* Label - appears away from the wave depending on dot position */}
            <span
              className="absolute left-1/2 whitespace-nowrap pointer-events-none"
              style={{
                top: pos.y < (troughY + peakY) / 2 ? "14px" : "-28px",
                fontSize: "9px",
                letterSpacing: "0.18em",
                fontWeight: 500,
                color: "hsl(var(--charcoal))",
                opacity: isHovered ? 1 : 0,
                transform: `translateX(-50%) translateY(${isHovered ? 0 : 5}px)`,
                transition: "opacity 200ms ease, transform 200ms ease",
                fontFamily: "var(--font-sans)",
              }}
            >
              {item.label}
            </span>
          </div>
        );
      })}
      <style>{`
        @keyframes glowPulse {
          0%, 100% { opacity: 0.6; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 1; transform: translate(-50%, -50%) scale(1.2); }
        }
      `}</style>
    </>
  );
};

export default MenuDots;
