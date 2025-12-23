import { useState } from "react";
import { cn } from "@/lib/utils";

interface DotPosition {
  x: number;
  yLine: number;
  yDot: number;
  labelPos: "top" | "bottom";
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
        const isTop = pos.labelPos === "top";
        const dotDelay = 0.9 + index * 0.12;
        const isActive = activeSection === item.section;

        return (
          <div
            key={item.section}
            className="absolute"
            style={{
              left: `${(pos.x / viewBoxWidth) * 100}%`,
              top: `${(pos.yDot / viewBoxHeight) * 100}%`,
              transform: "translate(-50%, -50%)",
              opacity: isDrawn ? 1 : 0,
              transition: `opacity 420ms ease ${dotDelay}s, transform 420ms ease ${dotDelay}s`,
            }}
            onMouseEnter={() => setHoveredDot(index)}
            onMouseLeave={() => setHoveredDot(null)}
          >
            <button
              onClick={() => onNavigate(item.section)}
              className={cn(
                "relative rounded-full transition-all duration-300 cursor-pointer",
                "w-2.5 h-2.5 sm:w-3 sm:h-3",
                isActive
                  ? "bg-charcoal scale-110"
                  : "bg-charcoal/60 hover:bg-charcoal hover:scale-125"
              )}
              style={{
                animation: isDrawn
                  ? `rangoliDotBounce 2.4s ease-in-out infinite, rangoliDotPulse 3s ease-in-out infinite`
                  : "none",
                animationDelay: `${1.8 + index * 0.15}s, ${2 + index * 0.2}s`,
                boxShadow: isActive ? "0 0 10px 3px hsl(var(--charcoal) / 0.4)" : "none",
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
    </>
  );
};

export default MenuDots;
