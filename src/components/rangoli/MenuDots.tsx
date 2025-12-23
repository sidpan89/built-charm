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
  waveBottomY: number;
}

const MenuDots = ({
  menuItems,
  dotPositions,
  viewBoxWidth,
  viewBoxHeight,
  dotsVisible,
  activeSection,
  onNavigate,
  waveBottomY,
}: MenuDotsProps) => {
  const [hoveredDot, setHoveredDot] = useState<number | null>(null);

  return (
    <>
      {menuItems.map((item, index) => {
        const pos = dotPositions[index];
        const staggerDelay = 0.12 * index;
        
        const isActive = activeSection === item.section;
        const isHovered = hoveredDot === index;

        // Label position: above the wave (above the peak area)
        const labelY = (waveBottomY - 28) / viewBoxHeight * 100; // well above the wave

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
            {/* Dot */}
            <button
              onClick={() => onNavigate(item.section)}
              className="relative rounded-full cursor-pointer"
              style={{
                width: "10px",
                height: "10px",
                backgroundColor: isActive ? "#4B5563" : "#6B7280",
                opacity: dotsVisible ? 1 : 0,
                transform: dotsVisible
                  ? `scale(${isHovered ? 1.2 : isActive ? 1.1 : 1})`
                  : "scale(0.3)",
                transition: `
                  opacity 350ms ease ${staggerDelay}s,
                  transform 350ms cubic-bezier(0.34, 1.56, 0.64, 1) ${dotsVisible ? staggerDelay : 0}s,
                  background-color 150ms ease
                `,
              }}
              aria-label={item.label}
            />

            {/* Label - appears ABOVE the wave on hover */}
            <span
              className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap pointer-events-none"
              style={{
                top: `-32px`,
                fontSize: "10px",
                letterSpacing: "0.15em",
                fontWeight: 500,
                color: "#4B5563",
                opacity: isHovered ? 1 : 0,
                transform: `translateX(-50%) translateY(${isHovered ? 0 : 4}px)`,
                transition: "opacity 200ms ease, transform 200ms ease",
              }}
            >
              {item.label}
            </span>
          </div>
        );
      })}
    </>
  );
};

export default MenuDots;
