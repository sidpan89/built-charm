import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface FullscreenMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (section: string) => void;
}

const menuItems = [
  { label: "Home", section: "home" },
  { label: "Services", section: "services" },
  { label: "Portfolio", section: "portfolio" },
  { label: "Team", section: "team" },
  { label: "About", section: "about" },
  { label: "Contact", section: "contact" },
];

const FullscreenMenu = ({ isOpen, onClose, onNavigate }: FullscreenMenuProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [visibleItems, setVisibleItems] = useState<number[]>([]);

  useEffect(() => {
    if (isOpen) {
      setVisibleItems([]);
      menuItems.forEach((_, index) => {
        setTimeout(() => {
          setVisibleItems((prev) => [...prev, index]);
        }, 150 + index * 80);
      });
    } else {
      setVisibleItems([]);
    }
  }, [isOpen]);

  const handleClick = (section: string) => {
    onNavigate(section);
    onClose();
  };

  return (
    <div
      className={cn(
        "fixed inset-0 z-40 bg-foreground transition-opacity duration-500",
        isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      )}
    >
      {/* Menu content - centered */}
      <div className="h-full flex items-center justify-center">
        <nav className="flex flex-col items-center gap-1">
          {menuItems.map((item, index) => (
            <button
              key={item.label}
              onClick={() => handleClick(item.section)}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={cn(
                "group relative py-2 px-4 transition-all duration-400",
                visibleItems.includes(index)
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              )}
              style={{ transitionDelay: `${index * 40}ms` }}
            >
              <span
                className={cn(
                  "font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-background font-light tracking-[0.02em] transition-all duration-300",
                  hoveredIndex === index
                    ? "opacity-100"
                    : hoveredIndex !== null
                    ? "opacity-30"
                    : "opacity-80"
                )}
              >
                {item.label}
              </span>
              
              {/* Underline on hover */}
              <span
                className={cn(
                  "absolute bottom-1 left-1/2 -translate-x-1/2 h-px bg-background/50 transition-all duration-300",
                  hoveredIndex === index ? "w-full" : "w-0"
                )}
              />
            </button>
          ))}
        </nav>
      </div>

      {/* Contact info - bottom */}
      <div
        className={cn(
          "absolute bottom-8 left-0 right-0 px-6 lg:px-12 transition-all duration-500",
          isOpen ? "opacity-100" : "opacity-0"
        )}
        style={{ transitionDelay: "400ms" }}
      >
        <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <span className="font-sans text-xs text-background/40 tracking-[0.2em] uppercase">
            design matters
          </span>
          <div className="flex gap-6">
            <a
              href="mailto:hello@studioprangana.com"
              className="font-sans text-xs text-background/60 hover:text-background transition-colors duration-300 tracking-wide"
            >
              hello@studioprangana.com
            </a>
            <a
              href="https://www.instagram.com/studio_prangana/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-xs text-background/60 hover:text-background transition-colors duration-300 tracking-wide"
            >
              Instagram
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullscreenMenu;