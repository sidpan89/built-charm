import { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";
import heroImage from "@/assets/hero-architecture.jpg";

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [lettersVisible, setLettersVisible] = useState<number[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);

  const studioName = "Studio Prangana";
  const tagline = "is an award winning architectural and interior design studio based in Bangalore.";

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const letters = studioName.split("");
    letters.forEach((_, index) => {
      setTimeout(() => {
        setLettersVisible((prev) => [...prev, index]);
      }, 100 + index * 80);
    });
  }, [isVisible]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setMousePosition({
          x: (e.clientX - rect.left) / rect.width - 0.5,
          y: (e.clientY - rect.top) / rect.height - 0.5,
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      ref={heroRef}
      className="min-h-screen flex items-center justify-center relative bg-background overflow-hidden"
    >
      {/* Animated background image with parallax */}
      <div
        className={cn(
          "absolute inset-0 transition-all duration-1000",
          isVisible ? "opacity-20 scale-100" : "opacity-0 scale-110"
        )}
        style={{
          transform: `translate(${mousePosition.x * -20}px, ${mousePosition.y * -20}px) scale(1.1)`,
          transition: "opacity 1s, transform 0.5s ease-out",
        }}
      >
        <img
          src={heroImage}
          alt="Architecture"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Animated grid pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className={cn(
            "absolute inset-0 transition-opacity duration-1000",
            isVisible ? "opacity-100" : "opacity-0"
          )}
          style={{
            backgroundImage: `
              linear-gradient(to right, hsl(var(--foreground) / 0.03) 1px, transparent 1px),
              linear-gradient(to bottom, hsl(var(--foreground) / 0.03) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      {/* Floating orbs with mouse parallax */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className={cn(
            "absolute w-96 h-96 rounded-full bg-gradient-to-br from-stone/10 to-transparent blur-3xl transition-all duration-1000",
            isVisible ? "opacity-100" : "opacity-0"
          )}
          style={{
            top: "10%",
            left: "10%",
            transform: `translate(${mousePosition.x * 40}px, ${mousePosition.y * 40}px)`,
            transition: "opacity 1s, transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}
        />
        <div
          className={cn(
            "absolute w-64 h-64 rounded-full bg-gradient-to-br from-muted/20 to-transparent blur-3xl transition-all duration-1000",
            isVisible ? "opacity-100" : "opacity-0"
          )}
          style={{
            bottom: "20%",
            right: "15%",
            transform: `translate(${mousePosition.x * -60}px, ${mousePosition.y * -60}px)`,
            transition: "opacity 1s, transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)",
            transitionDelay: "200ms",
          }}
        />
      </div>

      {/* Animated lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className={cn(
            "absolute top-1/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent transition-all duration-1500",
            isVisible ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
          )}
          style={{ transitionDelay: "1s" }}
        />
        <div
          className={cn(
            "absolute top-3/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent transition-all duration-1500",
            isVisible ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
          )}
          style={{ transitionDelay: "1.2s" }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 lg:px-12 py-32">
        <div className="max-w-5xl">
          {/* Tagline */}
          <div
            className={cn(
              "mb-8 overflow-hidden",
              isVisible ? "opacity-100" : "opacity-0"
            )}
          >
            <span
              className={cn(
                "text-label text-stone tracking-[0.3em] text-xs inline-block transition-all duration-700",
                isVisible ? "translate-y-0" : "translate-y-full"
              )}
              style={{ transitionDelay: "300ms" }}
            >
              design matters
            </span>
          </div>

          {/* Main Heading with Letter Animation */}
          <h1 className="font-serif text-5xl md:text-7xl lg:text-[5.5rem] xl:text-[7rem] text-foreground leading-[0.95] tracking-tight mb-12">
            <span className="inline">
              {studioName.split("").map((letter, index) => (
                <span
                  key={index}
                  className="inline-block transition-all duration-700"
                  style={{
                    opacity: lettersVisible.includes(index) ? 1 : 0,
                    transform: lettersVisible.includes(index)
                      ? "translateY(0) rotateX(0)"
                      : "translateY(100%) rotateX(-90deg)",
                    transitionDelay: `${index * 30}ms`,
                    filter: lettersVisible.includes(index) ? "blur(0)" : "blur(4px)",
                  }}
                >
                  {letter === " " ? "\u00A0" : letter}
                </span>
              ))}
            </span>
            <span
              className={cn(
                "block mt-4 text-2xl md:text-3xl lg:text-4xl font-sans font-light text-muted-foreground leading-relaxed transition-all duration-1000",
                isVisible ? "opacity-100 translate-y-0 blur-0" : "opacity-0 translate-y-8 blur-sm"
              )}
              style={{ transitionDelay: "1500ms" }}
            >
              {tagline}
            </span>
          </h1>

          {/* CTA Links */}
          <div
            className={cn(
              "flex flex-wrap gap-8 md:gap-12 transition-all duration-1000",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
            style={{ transitionDelay: "2000ms" }}
          >
            <button
              onClick={() => scrollToSection("portfolio")}
              className="group relative text-label text-foreground text-sm tracking-[0.15em] overflow-hidden"
            >
              <span className="relative z-10 inline-block transition-transform duration-300 group-hover:-translate-y-full">
                View Portfolio
              </span>
              <span className="absolute top-0 left-0 z-10 inline-block translate-y-full transition-transform duration-300 group-hover:translate-y-0">
                View Portfolio
              </span>
              <span className="absolute bottom-0 left-0 w-full h-px bg-foreground" />
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="group relative text-label text-muted-foreground text-sm tracking-[0.15em] hover:text-foreground transition-colors duration-300"
            >
              <span className="relative z-10">Get in Touch</span>
              <span className="absolute bottom-0 left-0 w-0 h-px bg-foreground transition-all duration-500 group-hover:w-full" />
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        className={cn(
          "absolute bottom-12 left-1/2 -translate-x-1/2 transition-all duration-1000",
          isVisible ? "opacity-100" : "opacity-0"
        )}
        style={{ transitionDelay: "2500ms" }}
      >
        <button
          onClick={() => scrollToSection("services")}
          className="group flex flex-col items-center gap-3 text-muted-foreground hover:text-foreground transition-colors duration-300"
        >
          <span className="text-label text-[10px] tracking-[0.2em]">Scroll</span>
          <div className="w-px h-16 bg-border relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-6 bg-foreground animate-[scrollDown_2s_ease-in-out_infinite]" />
          </div>
        </button>
      </div>

      {/* Corner decorations */}
      <div
        className={cn(
          "absolute top-24 left-8 transition-all duration-1000",
          isVisible ? "opacity-100" : "opacity-0"
        )}
        style={{ transitionDelay: "1800ms" }}
      >
        <div className="w-px h-16 bg-border" />
        <div className="w-16 h-px bg-border" />
      </div>
      <div
        className={cn(
          "absolute bottom-24 right-8 transition-all duration-1000",
          isVisible ? "opacity-100" : "opacity-0"
        )}
        style={{ transitionDelay: "2000ms" }}
      >
        <div className="w-16 h-px bg-border ml-auto" />
        <div className="w-px h-16 bg-border ml-auto" />
      </div>
    </section>
  );
};

export default Hero;
