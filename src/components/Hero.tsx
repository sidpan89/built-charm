import { useEffect, useState } from "react";

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [lettersVisible, setLettersVisible] = useState<number[]>([]);

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
        setLettersVisible(prev => [...prev, index]);
      }, 100 + index * 80);
    });
  }, [isVisible]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative bg-background">
      {/* Content */}
      <div className="container mx-auto px-6 lg:px-12 py-32">
        <div className="max-w-5xl">
          {/* Main tagline */}
          <div
            className={`mb-8 transition-all duration-1000 delay-300 ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            <span className="text-label text-stone tracking-[0.3em] text-xs">design matters</span>
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
                  }}
                >
                  {letter === " " ? "\u00A0" : letter}
                </span>
              ))}
            </span>
            <span
              className={`block mt-4 text-3xl md:text-4xl lg:text-5xl font-sans font-light text-muted-foreground leading-relaxed transition-all duration-1000 delay-[1500ms] ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              {tagline}
            </span>
          </h1>

          {/* CTA Links */}
          <div
            className={`flex flex-wrap gap-8 md:gap-12 transition-all duration-1000 delay-[2000ms] ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <button
              onClick={() => scrollToSection("portfolio")}
              className="group relative text-label text-foreground text-sm tracking-[0.15em]"
            >
              <span className="relative z-10">View Portfolio</span>
              <span className="absolute bottom-0 left-0 w-full h-px bg-foreground scale-x-100 origin-left" />
              <span className="absolute bottom-0 left-0 w-full h-px bg-stone scale-x-0 origin-right transition-transform duration-500 group-hover:scale-x-100 group-hover:origin-left" />
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
        className={`absolute bottom-12 left-1/2 -translate-x-1/2 transition-all duration-1000 delay-[2500ms] ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="flex flex-col items-center gap-3 text-muted-foreground">
          <span className="text-label text-[10px] tracking-[0.2em]">Scroll</span>
          <div className="w-px h-12 bg-border relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-4 bg-foreground animate-[bounce_2s_ease-in-out_infinite]" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
