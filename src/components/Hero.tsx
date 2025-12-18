import { useEffect, useRef, useState } from "react";
import heroImage from "@/assets/hero-architecture.jpg";

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const tagline = "design matters";
  const description =
    "An award-winning architectural and interior design studio creating spaces that inspire, elevate, and transform.";

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Modern architectural design"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-background/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 lg:px-12 py-32">
        <div className="max-w-4xl mx-auto text-center">
          {/* Tagline */}
          <div
            className={`mb-6 transition-all duration-1000 delay-300 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            <span className="text-label text-stone">{tagline}</span>
          </div>

          {/* Main Heading with Letter Animation */}
          <h1
            className={`text-display text-5xl md:text-7xl lg:text-8xl text-foreground mb-8 transition-all duration-1000 delay-500 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            Architecture
            <br />
            <span className="text-stone">&</span> Interior Design
          </h1>

          {/* Description */}
          <p
            className={`text-body text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 transition-all duration-1000 delay-700 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            {description}
          </p>

          {/* CTA Buttons */}
          <div
            className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-1000 delay-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            <a
              href="#portfolio"
              className="inline-flex items-center justify-center px-8 py-4 text-label bg-foreground text-background hover:bg-foreground/90 transition-colors duration-300"
            >
              View Portfolio
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center px-8 py-4 text-label border border-foreground text-foreground hover:bg-foreground hover:text-background transition-colors duration-300"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        className={`absolute bottom-12 left-1/2 -translate-x-1/2 transition-all duration-1000 delay-1200 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="flex flex-col items-center gap-2 text-muted-foreground">
          <span className="text-label text-xs">Scroll</span>
          <div className="w-px h-12 bg-border relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1/2 bg-foreground animate-[bounce_2s_ease-in-out_infinite]" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
