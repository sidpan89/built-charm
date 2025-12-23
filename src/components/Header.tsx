import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import logoIcon from "@/assets/logo-icon.png";

interface HeaderProps {
  className?: string;
}

const Header = ({ className }: HeaderProps) => {
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
        isScrolled
          ? "bg-background/90 backdrop-blur-md py-4"
          : "bg-transparent py-6",
        className
      )}
    >
      <div className="container mx-auto px-6 lg:px-12 flex items-center justify-start">
        {/* Logo */}
        <a
          href="/"
          className={cn(
            "relative z-[60] group transition-all duration-700 flex items-center gap-3",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
          )}
        >
          <img
            src={logoIcon}
            alt="Studio Prangana Logo"
            className="w-10 h-10 object-contain"
          />
          <span className="font-serif text-xl tracking-[0.1em] text-foreground">
            Studio Prangana
          </span>
        </a>
      </div>
    </header>
  );
};

export default Header;
