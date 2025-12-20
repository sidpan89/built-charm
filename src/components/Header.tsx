import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface HeaderProps {
  className?: string;
}

const navItems = [
  { label: "Residential", href: "#residential" },
  { label: "Commercial", href: "#commercial" },
  { label: "Interior Design", href: "#interior" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const Header = ({ className }: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id.replace("#", ""));
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled
          ? "bg-background/95 backdrop-blur-sm py-4 border-b border-border/50"
          : "bg-transparent py-6",
        className
      )}
    >
      <div className="container mx-auto px-6 lg:px-12 flex items-center justify-between">
        {/* Logo */}
        <a
          href="/"
          className={`relative z-10 group transition-all duration-700 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <span className="font-serif text-xl tracking-[0.1em] text-foreground">
            Studio Prangana
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav
          className={`hidden lg:flex items-center gap-10 transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => scrollToSection(item.href)}
              className="group relative text-label text-xs tracking-[0.15em] text-muted-foreground hover:text-foreground transition-colors duration-300"
            >
              <span>{item.label}</span>
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-foreground transition-all duration-300 group-hover:w-full" />
            </button>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className={`lg:hidden relative z-50 p-2 transition-all duration-700 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
          aria-label="Toggle menu"
        >
          <div className="relative w-6 h-5 flex flex-col justify-between">
            <span
              className={cn(
                "block h-px bg-foreground transition-all duration-300 origin-center",
                isMobileMenuOpen ? "rotate-45 translate-y-2" : ""
              )}
            />
            <span
              className={cn(
                "block h-px bg-foreground transition-all duration-300",
                isMobileMenuOpen ? "opacity-0" : "w-4"
              )}
            />
            <span
              className={cn(
                "block h-px bg-foreground transition-all duration-300 origin-center",
                isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
              )}
            />
          </div>
        </button>

        {/* Mobile Menu */}
        <div
          className={cn(
            "fixed inset-0 bg-background z-40 flex flex-col items-center justify-center transition-all duration-500 lg:hidden",
            isMobileMenuOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          )}
        >
          <nav className="flex flex-col items-center gap-8">
            {navItems.map((item, index) => (
              <button
                key={item.label}
                onClick={() => scrollToSection(item.href)}
                className={cn(
                  "font-serif text-3xl text-foreground hover:text-stone transition-all duration-300",
                  isMobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                )}
                style={{
                  transitionDelay: isMobileMenuOpen ? `${index * 100}ms` : "0ms",
                }}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
