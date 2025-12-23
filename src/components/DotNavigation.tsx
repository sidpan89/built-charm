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

  return (
    <div
      className={cn(
        "fixed top-1/2 right-8 -translate-y-1/2 z-50 transition-all duration-700",
        isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
      )}
    >
      {/* SVG Wave line connecting dots */}
      <svg
        className="absolute top-0 left-1/2 -translate-x-1/2 h-full w-24 pointer-events-none"
        viewBox="0 0 80 300"
        preserveAspectRatio="none"
      >
        <path
          d="M40,10 Q70,35 40,60 Q10,85 40,110 Q70,135 40,160 Q10,185 40,210 Q70,235 40,260 Q10,285 40,290"
          fill="none"
          stroke="hsl(var(--charcoal))"
          strokeWidth="1.5"
          strokeLinecap="round"
          className="opacity-30"
        />
      </svg>

      {/* Navigation dots */}
      <div className="relative flex flex-col items-center gap-10">
        {menuItems.map((item, index) => (
          <div
            key={item.section}
            className="relative"
            onMouseEnter={() => setHoveredDot(index)}
            onMouseLeave={() => setHoveredDot(null)}
          >
            {/* Dot */}
            <button
              onClick={() => onNavigate(item.section)}
              className={cn(
                "relative w-4 h-4 rounded-full transition-all duration-300 cursor-pointer",
                activeSection === item.section
                  ? "bg-primary scale-125"
                  : "bg-charcoal/40 hover:bg-charcoal hover:scale-110"
              )}
              style={{
                transitionDelay: `${index * 100}ms`,
              }}
              aria-label={item.label}
            >
              {/* Pulse ring for active */}
              {activeSection === item.section && (
                <span className="absolute inset-0 rounded-full bg-primary/30 animate-ping" />
              )}
            </button>

            {/* Label on hover */}
            <span
              className={cn(
                "absolute right-8 top-1/2 -translate-y-1/2 whitespace-nowrap font-sans text-sm tracking-[0.15em] uppercase transition-all duration-300 pointer-events-none",
                hoveredDot === index
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-4"
              )}
            >
              {item.label}
            </span>

            {/* Small decorative elements around some dots */}
            {index % 2 === 0 && (
              <span
                className={cn(
                  "absolute -left-2 top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-charcoal/30 transition-all duration-300",
                  hoveredDot === index ? "scale-150 opacity-100" : "opacity-50"
                )}
              />
            )}
            {index % 3 === 0 && (
              <span
                className={cn(
                  "absolute left-6 -top-1 w-1.5 h-1.5 rounded-full bg-charcoal/20 transition-all duration-300",
                  hoveredDot === index ? "scale-150 opacity-100" : "opacity-40"
                )}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DotNavigation;
