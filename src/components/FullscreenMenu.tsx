import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface FullscreenMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  { label: "Home", href: "#home", description: "Back to start" },
  { label: "Services", href: "#services", description: "What we do" },
  { label: "Portfolio", href: "#portfolio", description: "Our work" },
  { label: "Team", href: "#team", description: "Meet us" },
  { label: "About", href: "#about", description: "Our story" },
  { label: "Contact", href: "#contact", description: "Get in touch" },
];

const FullscreenMenu = ({ isOpen, onClose }: FullscreenMenuProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [visibleItems, setVisibleItems] = useState<number[]>([]);

  useEffect(() => {
    if (isOpen) {
      // Stagger item visibility
      menuItems.forEach((_, index) => {
        setTimeout(() => {
          setVisibleItems((prev) => [...prev, index]);
        }, 200 + index * 100);
      });
    } else {
      setVisibleItems([]);
    }
  }, [isOpen]);

  const handleClick = (href: string) => {
    onClose();
    setTimeout(() => {
      const element = document.getElementById(href.replace("#", ""));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 500);
  };

  return (
    <div
      className={cn(
        "fixed inset-0 z-40 bg-foreground transition-all duration-700",
        isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      )}
    >
      {/* Background animated lines */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute h-px bg-background/5"
            style={{
              top: `${10 + i * 12}%`,
              left: 0,
              right: 0,
              transform: `scaleX(${isOpen ? 1 : 0})`,
              transformOrigin: i % 2 === 0 ? "left" : "right",
              transition: `transform 1s cubic-bezier(0.77, 0, 0.175, 1) ${i * 80}ms`,
            }}
          />
        ))}
      </div>

      {/* Floating orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className={cn(
            "absolute w-96 h-96 rounded-full bg-gradient-to-br from-stone/20 to-transparent blur-3xl transition-all duration-1000",
            isOpen ? "opacity-100 scale-100" : "opacity-0 scale-50"
          )}
          style={{ top: "10%", right: "10%", transitionDelay: "300ms" }}
        />
        <div
          className={cn(
            "absolute w-64 h-64 rounded-full bg-gradient-to-br from-background/10 to-transparent blur-3xl transition-all duration-1000",
            isOpen ? "opacity-100 scale-100" : "opacity-0 scale-50"
          )}
          style={{ bottom: "20%", left: "5%", transitionDelay: "500ms" }}
        />
      </div>

      {/* Menu content */}
      <div className="h-full flex items-center">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Navigation */}
            <nav className="space-y-2">
              {menuItems.map((item, index) => (
                <button
                  key={item.label}
                  onClick={() => handleClick(item.href)}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className={cn(
                    "group block w-full text-left transition-all duration-500",
                    visibleItems.includes(index)
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 -translate-x-8"
                  )}
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  <div className="flex items-center gap-6 py-4">
                    <span
                      className={cn(
                        "text-label text-background/30 text-xs tracking-[0.2em] transition-all duration-300",
                        hoveredIndex === index ? "text-stone" : ""
                      )}
                    >
                      0{index + 1}
                    </span>
                    <span
                      className={cn(
                        "font-serif text-4xl md:text-5xl lg:text-6xl text-background transition-all duration-500",
                        hoveredIndex === index
                          ? "translate-x-4 text-stone"
                          : hoveredIndex !== null
                          ? "opacity-30"
                          : ""
                      )}
                    >
                      {item.label}
                    </span>
                    <span
                      className={cn(
                        "text-body text-background/50 text-sm ml-auto transition-all duration-300",
                        hoveredIndex === index ? "opacity-100" : "opacity-0"
                      )}
                    >
                      {item.description}
                    </span>
                  </div>
                  <div
                    className={cn(
                      "h-px bg-background/10 transition-all duration-500",
                      hoveredIndex === index ? "bg-stone/50" : ""
                    )}
                  />
                </button>
              ))}
            </nav>

            {/* Contact info */}
            <div
              className={cn(
                "hidden lg:flex flex-col justify-end pb-16 transition-all duration-700",
                isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              )}
              style={{ transitionDelay: "600ms" }}
            >
              <div className="space-y-8">
                <div>
                  <span className="text-label text-stone text-xs tracking-[0.2em] mb-2 block">
                    Email
                  </span>
                  <a
                    href="mailto:hello@studioprangana.com"
                    className="text-body text-2xl text-background hover:text-stone transition-colors duration-300"
                  >
                    hello@studioprangana.com
                  </a>
                </div>
                <div>
                  <span className="text-label text-stone text-xs tracking-[0.2em] mb-2 block">
                    Location
                  </span>
                  <p className="text-body text-xl text-background/70">
                    Bangalore, Karnataka
                    <br />
                    India
                  </p>
                </div>
                <div>
                  <span className="text-label text-stone text-xs tracking-[0.2em] mb-3 block">
                    Follow
                  </span>
                  <div className="flex gap-6">
                    <a
                      href="https://www.instagram.com/studio_prangana/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-body text-background/70 hover:text-background transition-colors duration-300"
                    >
                      Instagram
                    </a>
                    <a
                      href="#"
                      className="text-body text-background/70 hover:text-background transition-colors duration-300"
                    >
                      LinkedIn
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom tagline */}
      <div
        className={cn(
          "absolute bottom-8 left-6 lg:left-12 transition-all duration-700",
          isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        )}
        style={{ transitionDelay: "800ms" }}
      >
        <span className="text-label text-background/30 text-xs tracking-[0.3em]">
          design matters
        </span>
      </div>
    </div>
  );
};

export default FullscreenMenu;
