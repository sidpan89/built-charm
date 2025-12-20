import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface HeaderProps {
  className?: string;
  onMenuToggle: (isOpen: boolean) => void;
  isMenuOpen: boolean;
}

const Header = ({ className, onMenuToggle, isMenuOpen }: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled && !isMenuOpen
          ? "bg-background/90 backdrop-blur-md py-4"
          : "bg-transparent py-6",
        className
      )}
    >
      <div className="container mx-auto px-6 lg:px-12 flex items-center justify-between">
        {/* Logo */}
        <a
          href="/"
          className={cn(
            "relative z-[60] group transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4",
            isMenuOpen ? "text-background" : "text-foreground"
          )}
        >
          <span className="font-serif text-xl tracking-[0.1em]">
            Studio Prangana
          </span>
        </a>

        {/* Menu Button */}
        <button
          onClick={() => onMenuToggle(!isMenuOpen)}
          className={cn(
            "relative z-[60] flex items-center gap-3 transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4",
            isMenuOpen ? "text-background" : "text-foreground"
          )}
          aria-label="Toggle menu"
        >
          <span className="text-label text-xs tracking-[0.2em] hidden md:block">
            {isMenuOpen ? "Close" : "Menu"}
          </span>
          
          {/* Animated menu icon */}
          <div className="relative w-8 h-6 flex flex-col justify-center items-end gap-1.5">
            <span
              className={cn(
                "block h-px bg-current transition-all duration-500 origin-right",
                isMenuOpen ? "w-8 rotate-45 translate-y-[3px]" : "w-8"
              )}
            />
            <span
              className={cn(
                "block h-px bg-current transition-all duration-500",
                isMenuOpen ? "w-0 opacity-0" : "w-5"
              )}
            />
            <span
              className={cn(
                "block h-px bg-current transition-all duration-500 origin-right",
                isMenuOpen ? "w-8 -rotate-45 -translate-y-[3px]" : "w-8"
              )}
            />
          </div>
        </button>
      </div>
    </header>
  );
};

export default Header;
