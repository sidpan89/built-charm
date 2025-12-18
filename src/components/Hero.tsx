import { useEffect, useState, useRef } from "react";
import heroImage from "@/assets/hero-architecture.jpg";
import MagneticButton from "./MagneticButton";
import AnimatedText from "./AnimatedText";

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

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

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden perspective-2000"
    >
      {/* 3D Parallax Background Image */}
      <div
        className="absolute inset-0 transition-transform duration-1000 ease-out preserve-3d"
        style={{
          transform: `
            scale(1.15) 
            translate3d(${mousePosition.x * -30}px, ${mousePosition.y * -30}px, -50px)
            rotateX(${mousePosition.y * 5}deg)
            rotateY(${mousePosition.x * -5}deg)
            translateY(${scrollY * 0.3}px)
          `,
        }}
      >
        <img
          src={heroImage}
          alt="Modern architectural design"
          className={`w-full h-full object-cover transition-all duration-1500 ${
            isVisible ? "scale-100 opacity-100" : "scale-125 opacity-0"
          }`}
        />
        <div className="absolute inset-0 bg-background/40" />
      </div>

      {/* Animated gradient overlay with 3D depth */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-background/20 via-transparent to-background/70"
        style={{
          transform: `translateZ(10px)`,
        }}
      />

      {/* Floating liquid glass orbs with 3D movement */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none preserve-3d">
        <div
          className="absolute w-96 h-96 rounded-full liquid-glass blur-sm blob-morph"
          style={{
            top: "10%",
            left: "5%",
            transform: `
              translate3d(${mousePosition.x * 60}px, ${mousePosition.y * 60}px, 100px)
              rotateX(${mousePosition.y * 20}deg)
              rotateY(${mousePosition.x * 20}deg)
            `,
            transition: "transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}
        />
        <div
          className="absolute w-[500px] h-[500px] rounded-full bg-gradient-to-br from-stone/10 to-muted/20 blur-3xl animate-wave"
          style={{
            bottom: "15%",
            right: "5%",
            transform: `
              translate3d(${mousePosition.x * -80}px, ${mousePosition.y * -80}px, 50px)
            `,
            transition: "transform 1s cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}
        />
        <div
          className="absolute w-72 h-72 rounded-full bg-gradient-to-br from-accent/20 to-transparent blur-2xl glow-pulse"
          style={{
            top: "35%",
            right: "20%",
            transform: `
              translate3d(${mousePosition.x * 40}px, ${mousePosition.y * 40}px, 150px)
            `,
            transition: "transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}
        />
        
        {/* Additional floating particles */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-stone/30 animate-float"
            style={{
              top: `${20 + i * 15}%`,
              left: `${10 + i * 15}%`,
              animationDelay: `${i * 0.5}s`,
              transform: `translate3d(${mousePosition.x * (20 + i * 10)}px, ${mousePosition.y * (20 + i * 10)}px, ${50 + i * 20}px)`,
              transition: "transform 0.5s ease-out",
            }}
          />
        ))}
      </div>

      {/* Content with 3D depth */}
      <div 
        className="relative z-10 container mx-auto px-6 lg:px-12 py-32 preserve-3d"
        style={{
          transform: `
            translateZ(50px)
            rotateX(${mousePosition.y * -2}deg)
            rotateY(${mousePosition.x * 2}deg)
          `,
          transition: "transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
        }}
      >
        <div className="max-w-4xl mx-auto text-center">
          {/* Tagline */}
          <div
            className={`mb-8 transition-all duration-1000 delay-500 ${
              isVisible ? "opacity-100 translate-y-0 blur-0" : "opacity-0 translate-y-4 blur-sm"
            }`}
          >
            <span className="text-label text-stone tracking-[0.4em] text-shimmer">design matters</span>
          </div>

          {/* Main Heading with Letter Animation */}
          <h1 className="text-display text-5xl md:text-7xl lg:text-8xl text-foreground mb-8 overflow-hidden">
            {isVisible && (
              <>
                <span className="block overflow-hidden">
                  <AnimatedText
                    text="Architecture"
                    delay={700}
                    staggerDelay={50}
                  />
                </span>
                <span className="block overflow-hidden">
                  <span
                    className="inline-block text-stone transition-all duration-1000 delay-1000"
                    style={{
                      opacity: isVisible ? 1 : 0,
                      transform: isVisible ? "rotate(0deg) scale(1) translateZ(30px)" : "rotate(-180deg) scale(0) translateZ(0)",
                    }}
                  >
                    &
                  </span>{" "}
                  <AnimatedText
                    text="Interior Design"
                    delay={1200}
                    staggerDelay={50}
                  />
                </span>
              </>
            )}
          </h1>

          {/* Description with blur animation */}
          <p
            className={`text-body text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 transition-all duration-1000 delay-[1800ms] ${
              isVisible
                ? "opacity-100 translate-y-0 blur-0"
                : "opacity-0 translate-y-8 blur-md"
            }`}
          >
            An innovative architectural and interior design studio creating
            spaces that inspire, elevate, and transform lives.
          </p>

          {/* CTA Buttons with magnetic effect */}
          <div
            className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-1000 delay-[2000ms] ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <MagneticButton>
              <a
                href="#portfolio"
                className="group relative inline-flex items-center justify-center px-8 py-4 text-label bg-foreground text-background overflow-hidden shadow-3d"
              >
                <span className="relative z-10 transition-transform duration-300 group-hover:-translate-y-full">
                  View Portfolio
                </span>
                <span className="absolute z-10 transition-transform duration-300 translate-y-full group-hover:translate-y-0">
                  View Portfolio
                </span>
                <span className="absolute inset-0 bg-stone scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100" />
              </a>
            </MagneticButton>
            <MagneticButton>
              <a
                href="#contact"
                className="group relative inline-flex items-center justify-center px-8 py-4 text-label border border-foreground text-foreground overflow-hidden glass-3d"
              >
                <span className="relative z-10">Get in Touch</span>
                <span className="absolute inset-0 bg-foreground scale-y-0 origin-bottom transition-transform duration-500 group-hover:scale-y-100" />
                <span className="absolute inset-0 flex items-center justify-center text-background opacity-0 transition-opacity duration-300 delay-200 group-hover:opacity-100">
                  Get in Touch
                </span>
              </a>
            </MagneticButton>
          </div>
        </div>
      </div>

      {/* Scroll Indicator with 3D effect */}
      <div
        className={`absolute bottom-12 left-1/2 -translate-x-1/2 transition-all duration-1000 delay-[2500ms] preserve-3d ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        style={{
          transform: `translateX(-50%) translateZ(30px) rotateX(${mousePosition.y * -5}deg)`,
        }}
      >
        <div className="flex flex-col items-center gap-2 text-muted-foreground group cursor-pointer">
          <span className="text-label text-xs transition-all duration-300 group-hover:tracking-[0.3em]">
            Scroll
          </span>
          <div className="w-px h-16 bg-border relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-8 bg-foreground animate-[bounce_2s_ease-in-out_infinite]" />
          </div>
        </div>
      </div>

      {/* Corner decorations with 3D depth */}
      <div
        className={`absolute top-24 left-8 transition-all duration-1000 delay-[2200ms] preserve-3d ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        style={{
          transform: `translateZ(20px)`,
        }}
      >
        <div
          className={`w-px h-24 bg-border transition-all duration-1000 delay-[2200ms] ${
            isVisible ? "scale-y-100" : "scale-y-0"
          }`}
          style={{ transformOrigin: "top" }}
        />
        <div
          className={`absolute top-0 left-0 w-24 h-px bg-border transition-all duration-1000 delay-[2400ms] ${
            isVisible ? "scale-x-100" : "scale-x-0"
          }`}
          style={{ transformOrigin: "left" }}
        />
      </div>
      <div
        className={`absolute bottom-24 right-8 transition-all duration-1000 delay-[2200ms] preserve-3d ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        style={{
          transform: `translateZ(20px)`,
        }}
      >
        <div
          className={`w-px h-24 bg-border transition-all duration-1000 delay-[2200ms] ${
            isVisible ? "scale-y-100" : "scale-y-0"
          }`}
          style={{ transformOrigin: "bottom" }}
        />
        <div
          className={`absolute bottom-0 right-0 w-24 h-px bg-border transition-all duration-1000 delay-[2400ms] ${
            isVisible ? "scale-x-100" : "scale-x-0"
          }`}
          style={{ transformOrigin: "right" }}
        />
      </div>
    </section>
  );
};

export default Hero;
