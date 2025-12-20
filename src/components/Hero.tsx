import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface HeroProps {
  onExplore?: () => void;
}

const Hero = ({ onExplore }: HeroProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [lettersVisible, setLettersVisible] = useState<number[]>([]);
  const [taglineVisible, setTaglineVisible] = useState(false);

  const studioName = "Studio Prangana";
  const tagline = "is an award winning architectural and interior design studio based in Bangalore.";

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const letters = studioName.split("");
    letters.forEach((_, index) => {
      setTimeout(() => {
        setLettersVisible((prev) => [...prev, index]);
      }, 100 + index * 50);
    });

    // Show tagline after letters
    setTimeout(() => {
      setTaglineVisible(true);
    }, 100 + letters.length * 50 + 300);
  }, [isVisible]);

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative bg-background"
    >
      {/* Clean minimal background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Subtle gradient */}
        <div 
          className={cn(
            "absolute inset-0 transition-opacity duration-1000",
            isVisible ? "opacity-100" : "opacity-0"
          )}
          style={{
            background: "radial-gradient(ellipse at center, hsl(var(--background)) 0%, hsl(var(--muted) / 0.3) 100%)",
          }}
        />
      </div>

      {/* Content - Centered */}
      <div className="relative z-10 container mx-auto px-6 lg:px-12 flex flex-col items-center text-center">
        {/* Tagline above */}
        <div
          className={cn(
            "mb-8 overflow-hidden",
            isVisible ? "opacity-100" : "opacity-0"
          )}
        >
          <span
            className={cn(
              "text-xs font-sans text-muted-foreground tracking-[0.3em] uppercase inline-block transition-all duration-700",
              isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            )}
            style={{ transitionDelay: "200ms" }}
          >
            design matters
          </span>
        </div>

        {/* Main Heading with Letter Animation */}
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-foreground leading-[1] tracking-[0.02em] font-light">
          {studioName.split("").map((letter, index) => (
            <span
              key={index}
              className="inline-block transition-all duration-500"
              style={{
                opacity: lettersVisible.includes(index) ? 1 : 0,
                transform: lettersVisible.includes(index)
                  ? "translateY(0)"
                  : "translateY(30px)",
                transitionDelay: `${index * 25}ms`,
              }}
            >
              {letter === " " ? "\u00A0" : letter}
            </span>
          ))}
        </h1>

        {/* Tagline description */}
        <p
          className={cn(
            "mt-8 max-w-xl text-base md:text-lg font-sans font-normal text-muted-foreground leading-relaxed transition-all duration-1000",
            taglineVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}
        >
          {tagline}
        </p>

        {/* CTA Links */}
        <div
          className={cn(
            "mt-12 transition-all duration-1000",
            taglineVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}
          style={{ transitionDelay: "200ms" }}
        >
          <button
            onClick={onExplore}
            className="group relative font-sans text-sm tracking-[0.15em] uppercase text-foreground overflow-hidden py-2"
          >
            <span className="relative z-10 inline-block transition-transform duration-300 group-hover:-translate-y-full">
              Explore Our Work
            </span>
            <span className="absolute top-0 left-0 z-10 inline-block translate-y-full transition-transform duration-300 group-hover:translate-y-0">
              Explore Our Work
            </span>
            <span className="absolute bottom-0 left-0 w-full h-px bg-foreground/30 group-hover:bg-foreground transition-colors duration-300" />
          </button>
        </div>
      </div>

      {/* Minimal corner accents */}
      <div
        className={cn(
          "absolute top-8 left-8 transition-all duration-1000",
          taglineVisible ? "opacity-100" : "opacity-0"
        )}
        style={{ transitionDelay: "400ms" }}
      >
        <div className="w-8 h-px bg-foreground/15" />
        <div className="w-px h-8 bg-foreground/15" />
      </div>
      <div
        className={cn(
          "absolute bottom-8 right-8 transition-all duration-1000",
          taglineVisible ? "opacity-100" : "opacity-0"
        )}
        style={{ transitionDelay: "500ms" }}
      >
        <div className="w-8 h-px bg-foreground/15 ml-auto" />
        <div className="w-px h-8 bg-foreground/15 ml-auto" />
      </div>
    </section>
  );
};

export default Hero;