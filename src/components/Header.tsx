import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import MagneticButton from "./MagneticButton";

interface HeaderProps {
  className?: string;
}

const navItems = [
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const Header = ({ className }: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Track active section
      const sections = navItems.map((item) => item.href.slice(1));
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 200) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-out",
        isScrolled
          ? "glass py-4"
          : "bg-transparent py-6",
        className
      )}
    >
      <div className="container mx-auto px-6 lg:px-12 flex items-center justify-between">
        {/* Logo */}
        <MagneticButton strength={0.15}>
          <a href="/" className="relative z-10 group">
            <span className="font-serif text-2xl tracking-wider text-foreground inline-flex items-center">
              {"ARCH".split("").map((letter, i) => (
                <span
                  key={i}
                  className="inline-block transition-transform duration-300 group-hover:-translate-y-1"
                  style={{ transitionDelay: `${i * 30}ms` }}
                >
                  {letter}
                </span>
              ))}
              <span className="text-stone mx-0.5 transition-all duration-300 group-hover:scale-125 group-hover:rotate-180">+</span>
              {"STUDIO".split("").map((letter, i) => (
                <span
                  key={i}
                  className="inline-block transition-transform duration-300 group-hover:-translate-y-1"
                  style={{ transitionDelay: `${(i + 5) * 30}ms` }}
                >
                  {letter}
                </span>
              ))}
            </span>
          </a>
        </MagneticButton>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-10">
          {navItems.map((item, index) => (
            <MagneticButton key={item.label} strength={0.2}>
              <a
                href={item.href}
                className={cn(
                  "text-label relative overflow-hidden group py-2",
                  activeSection === item.href.slice(1)
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <span className="relative z-10">{item.label}</span>
                <span
                  className={cn(
                    "absolute bottom-0 left-0 h-px bg-foreground transition-all duration-500",
                    activeSection === item.href.slice(1)
                      ? "w-full"
                      : "w-0 group-hover:w-full"
                  )}
                />
              </a>
            </MagneticButton>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden relative z-10 text-foreground p-2 transition-transform duration-300 hover:scale-110"
          aria-label="Toggle menu"
        >
          <div className="relative w-6 h-6">
            <span
              className={cn(
                "absolute left-0 h-0.5 w-6 bg-foreground transition-all duration-300",
                isMobileMenuOpen ? "top-3 rotate-45" : "top-1"
              )}
            />
            <span
              className={cn(
                "absolute left-0 top-3 h-0.5 bg-foreground transition-all duration-300",
                isMobileMenuOpen ? "w-0 opacity-0" : "w-4 opacity-100"
              )}
            />
            <span
              className={cn(
                "absolute left-0 h-0.5 w-6 bg-foreground transition-all duration-300",
                isMobileMenuOpen ? "top-3 -rotate-45" : "top-5"
              )}
            />
          </div>
        </button>

        {/* Mobile Menu */}
        <div
          className={cn(
            "fixed inset-0 bg-background flex flex-col items-center justify-center gap-8 transition-all duration-700 md:hidden",
            isMobileMenuOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          )}
        >
          {/* Background decoration */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute w-96 h-96 rounded-full bg-gradient-to-br from-muted to-transparent blur-3xl animate-morph top-1/4 -left-20" />
            <div className="absolute w-64 h-64 rounded-full bg-gradient-to-br from-stone/20 to-transparent blur-3xl animate-morph bottom-1/4 right-0" style={{ animationDelay: "3s" }} />
          </div>

          {navItems.map((item, index) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={cn(
                "font-serif text-4xl md:text-5xl text-foreground relative overflow-hidden group",
                isMobileMenuOpen ? "animate-blur-in" : ""
              )}
              style={{ animationDelay: `${index * 100 + 200}ms` }}
            >
              <span className="relative z-10 transition-all duration-300 group-hover:text-stone">
                {item.label}
              </span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-stone transition-all duration-500 group-hover:w-full" />
            </a>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;
