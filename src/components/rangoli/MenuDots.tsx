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

  return (
    <>
      {menuItems.map((item, index) => {
        const pos = dotPositions[index];
        const dotDelay = 0.3 + index * 0.08;
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
              opacity: isDrawn ? 1 : 0,
              transition: `opacity 400ms ease ${dotDelay}s`,
            }}
            onMouseEnter={() => setHoveredDot(index)}
            onMouseLeave={() => setHoveredDot(null)}
          >
            <button
              onClick={() => onNavigate(item.section)}
              className={cn(
                "relative rounded-full transition-all duration-300 ease-out cursor-pointer",
                "w-2 h-2 sm:w-2.5 sm:h-2.5",
                isActive || isHovered
                  ? "bg-charcoal scale-125"
                  : "bg-charcoal/80 hover:bg-charcoal"
              )}
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
    </>
  );
};

export default MenuDots;
