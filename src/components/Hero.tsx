import { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";

interface HeroProps {
  onExplore?: () => void;
}

const Hero = ({ onExplore }: HeroProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [lettersVisible, setLettersVisible] = useState<number[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [time, setTime] = useState(0);
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

  // Animation loop for leaf shadows
  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => prev + 0.02);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  // Generate leaf shadow positions with more organic shapes
  const leafShadows = Array.from({ length: 18 }, (_, i) => {
    const baseX = -5 + (i % 6) * 18;
    const baseY = -15 + Math.floor(i / 6) * 40;
    const swayX = Math.sin(time * 0.8 + i * 0.7) * 20;
    const swayY = Math.cos(time * 0.5 + i * 0.4) * 12;
    const rotation = 20 + Math.sin(time * 0.3 + i * 1.2) * 25;
    
    return {
      x: baseX + swayX + mousePosition.x * 25,
      y: baseY + swayY + mousePosition.y * 18,
      rotation,
      scale: 0.6 + Math.sin(time * 0.25 + i * 0.9) * 0.3,
      opacity: 0.03 + Math.sin(time * 0.35 + i * 0.6) * 0.015,
    };
  });

  // House breathing animation
  const houseBreathe = Math.sin(time * 0.3) * 2;
  const houseMouseX = mousePosition.x * 8;
  const houseMouseY = mousePosition.y * 5;

  return (
    <section
      id="home"
      ref={heroRef}
      className="h-screen flex items-center justify-center relative bg-cream overflow-hidden"
    >
      {/* Large architectural house silhouette */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg
          className="absolute"
          style={{
            right: "-5%",
            bottom: "-10%",
            width: "70%",
            height: "90%",
            opacity: 0.04 + Math.sin(time * 0.2) * 0.01,
            transform: `translate(${houseMouseX}px, ${houseMouseY + houseBreathe}px)`,
            transition: "transform 0.5s ease-out",
          }}
          viewBox="0 0 500 400"
          fill="none"
        >
          {/* Main house body */}
          <path
            d="M50 400 L50 180 L250 50 L450 180 L450 400 Z"
            stroke="hsl(var(--charcoal))"
            strokeWidth="1.5"
            fill="none"
          />
          {/* Roof peak detail */}
          <path
            d="M250 50 L250 20 M240 50 L260 50"
            stroke="hsl(var(--charcoal))"
            strokeWidth="1"
          />
          {/* Left window with arch */}
          <path
            d="M100 250 L100 180 Q100 150 140 150 Q180 150 180 180 L180 250 Z"
            stroke="hsl(var(--charcoal))"
            strokeWidth="1"
            fill="none"
          />
          {/* Window dividers */}
          <line x1="140" y1="150" x2="140" y2="250" stroke="hsl(var(--charcoal))" strokeWidth="0.5" />
          <line x1="100" y1="200" x2="180" y2="200" stroke="hsl(var(--charcoal))" strokeWidth="0.5" />
          
          {/* Right window with arch */}
          <path
            d="M320 250 L320 180 Q320 150 360 150 Q400 150 400 180 L400 250 Z"
            stroke="hsl(var(--charcoal))"
            strokeWidth="1"
            fill="none"
          />
          <line x1="360" y1="150" x2="360" y2="250" stroke="hsl(var(--charcoal))" strokeWidth="0.5" />
          <line x1="320" y1="200" x2="400" y2="200" stroke="hsl(var(--charcoal))" strokeWidth="0.5" />
          
          {/* Center door with large arch */}
          <path
            d="M200 400 L200 220 Q200 160 250 160 Q300 160 300 220 L300 400"
            stroke="hsl(var(--charcoal))"
            strokeWidth="1.5"
            fill="none"
          />
          {/* Door panels */}
          <line x1="250" y1="160" x2="250" y2="400" stroke="hsl(var(--charcoal))" strokeWidth="0.5" />
          <circle cx="235" cy="300" r="4" stroke="hsl(var(--charcoal))" strokeWidth="0.5" fill="none" />
          <circle cx="265" cy="300" r="4" stroke="hsl(var(--charcoal))" strokeWidth="0.5" fill="none" />
          
          {/* Decorative arch above door */}
          <path
            d="M180 170 Q250 100 320 170"
            stroke="hsl(var(--charcoal))"
            strokeWidth="0.5"
            fill="none"
          />
          
          {/* Foundation line */}
          <line x1="30" y1="400" x2="470" y2="400" stroke="hsl(var(--charcoal))" strokeWidth="2" />
          
          {/* Small upper windows */}
          <rect x="120" y="100" width="30" height="40" stroke="hsl(var(--charcoal))" strokeWidth="0.5" fill="none" />
          <rect x="350" y="100" width="30" height="40" stroke="hsl(var(--charcoal))" strokeWidth="0.5" fill="none" />
          
          {/* Chimney */}
          <rect x="380" y="60" width="30" height="60" stroke="hsl(var(--charcoal))" strokeWidth="1" fill="none" />
        </svg>

        {/* Secondary house layer - smaller, offset */}
        <svg
          className="absolute"
          style={{
            right: "15%",
            bottom: "5%",
            width: "35%",
            height: "50%",
            opacity: 0.025 + Math.sin(time * 0.25 + 1) * 0.008,
            transform: `translate(${houseMouseX * 0.5}px, ${(houseMouseY + houseBreathe) * 0.5}px)`,
          }}
          viewBox="0 0 300 250"
          fill="none"
        >
          <path
            d="M30 250 L30 120 L150 30 L270 120 L270 250 Z"
            stroke="hsl(var(--charcoal))"
            strokeWidth="1"
            fill="none"
          />
          <path
            d="M100 250 L100 150 Q100 120 130 120 Q160 120 160 150 L160 250"
            stroke="hsl(var(--charcoal))"
            strokeWidth="0.8"
            fill="none"
          />
          <path
            d="M180 180 L180 130 Q180 110 210 110 Q240 110 240 130 L240 180 Z"
            stroke="hsl(var(--charcoal))"
            strokeWidth="0.8"
            fill="none"
          />
        </svg>
      </div>

      {/* Animated tree silhouettes on the sides */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Left tree */}
        <svg
          className="absolute"
          style={{
            left: "-5%",
            bottom: "0%",
            width: "30%",
            height: "80%",
            opacity: 0.05,
            transform: `translate(${mousePosition.x * 15}px, 0) rotate(${Math.sin(time * 0.4) * 1}deg)`,
            transformOrigin: "bottom center",
          }}
          viewBox="0 0 200 350"
          fill="none"
        >
          {/* Trunk */}
          <path
            d="M90 350 L90 200 Q85 150 100 100 Q115 150 110 200 L110 350"
            stroke="hsl(var(--charcoal))"
            strokeWidth="2"
            fill="none"
          />
          {/* Branches */}
          <path
            d="M95 180 Q50 140 30 160"
            stroke="hsl(var(--charcoal))"
            strokeWidth="1"
            fill="none"
            style={{
              transform: `rotate(${Math.sin(time * 0.5) * 3}deg)`,
              transformOrigin: "95px 180px",
            }}
          />
          <path
            d="M105 160 Q150 120 170 140"
            stroke="hsl(var(--charcoal))"
            strokeWidth="1"
            fill="none"
          />
          <path
            d="M98 140 Q60 100 40 110"
            stroke="hsl(var(--charcoal))"
            strokeWidth="0.8"
            fill="none"
          />
          <path
            d="M102 120 Q140 80 160 90"
            stroke="hsl(var(--charcoal))"
            strokeWidth="0.8"
            fill="none"
          />
        </svg>

        {/* Right tree */}
        <svg
          className="absolute"
          style={{
            right: "-8%",
            bottom: "0%",
            width: "35%",
            height: "90%",
            opacity: 0.04,
            transform: `translate(${mousePosition.x * -10}px, 0) rotate(${Math.sin(time * 0.35 + 1) * 1.5}deg)`,
            transformOrigin: "bottom center",
          }}
          viewBox="0 0 250 400"
          fill="none"
        >
          <path
            d="M120 400 L120 220 Q110 150 125 80 Q140 150 130 220 L130 400"
            stroke="hsl(var(--charcoal))"
            strokeWidth="2"
            fill="none"
          />
          <path d="M122 200 Q70 160 50 180" stroke="hsl(var(--charcoal))" strokeWidth="1" fill="none" />
          <path d="M128 180 Q180 140 200 160" stroke="hsl(var(--charcoal))" strokeWidth="1" fill="none" />
          <path d="M124 150 Q80 110 60 125" stroke="hsl(var(--charcoal))" strokeWidth="0.8" fill="none" />
          <path d="M126 130 Q170 90 190 105" stroke="hsl(var(--charcoal))" strokeWidth="0.8" fill="none" />
          <path d="M125 100 Q90 60 70 75" stroke="hsl(var(--charcoal))" strokeWidth="0.6" fill="none" />
        </svg>
      </div>

      {/* Animated leaf shadows overlay */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {leafShadows.map((leaf, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              left: `${leaf.x}%`,
              top: `${leaf.y}%`,
              width: "300px",
              height: "400px",
              background: `radial-gradient(ellipse 35% 55% at 50% 50%, hsl(var(--charcoal)) 0%, transparent 65%)`,
              opacity: leaf.opacity,
              transform: `rotate(${leaf.rotation}deg) scale(${leaf.scale})`,
              transition: "opacity 0.8s ease-out",
            }}
          />
        ))}
        
        {/* Individual animated leaves */}
        {[...Array(20)].map((_, i) => {
          const leafX = 5 + (i % 5) * 20 + Math.sin(time * 0.6 + i * 0.9) * 15;
          const leafY = -5 + Math.floor(i / 5) * 25 + Math.cos(time * 0.4 + i * 0.6) * 10;
          const leafRotation = 30 + i * 18 + Math.sin(time * 0.5 + i * 0.7) * 20;
          
          return (
            <svg
              key={`leaf-${i}`}
              className="absolute"
              style={{
                left: `${leafX}%`,
                top: `${leafY}%`,
                width: "50px",
                height: "70px",
                opacity: 0.035 + Math.sin(time * 0.5 + i) * 0.015,
                transform: `rotate(${leafRotation}deg) scale(${0.8 + Math.sin(time * 0.3 + i) * 0.3})`,
              }}
              viewBox="0 0 30 40"
              fill="hsl(var(--charcoal))"
            >
              <ellipse cx="15" cy="20" rx="10" ry="16" />
            </svg>
          );
        })}
        
        {/* Dancing branch shadows */}
        {[...Array(6)].map((_, i) => {
          const branchX = 8 + i * 15 + Math.sin(time * 0.45 + i * 0.8) * 12;
          const branchY = -10 + (i % 2) * 20 + Math.cos(time * 0.3 + i * 0.5) * 8;
          
          return (
            <div
              key={`branch-${i}`}
              className="absolute"
              style={{
                left: `${branchX}%`,
                top: `${branchY}%`,
                width: "200px",
                height: "300px",
                background: `linear-gradient(${50 + i * 25}deg, hsl(var(--charcoal) / 0.04) 0%, transparent 50%)`,
                transform: `rotate(${40 + i * 30 + Math.sin(time * 0.4 + i) * 10}deg)`,
                borderRadius: "40% 60% 50% 50%",
              }}
            />
          );
        })}
      </div>

      {/* Subtle texture overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Animated grid pattern - very subtle */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className={cn(
            "absolute inset-0 transition-opacity duration-1000",
            isVisible ? "opacity-100" : "opacity-0"
          )}
          style={{
            backgroundImage: `
              linear-gradient(to right, hsl(var(--charcoal) / 0.03) 1px, transparent 1px),
              linear-gradient(to bottom, hsl(var(--charcoal) / 0.03) 1px, transparent 1px)
            `,
            backgroundSize: "100px 100px",
          }}
        />
      </div>

      {/* Floating light spots with mouse parallax */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className={cn(
            "absolute w-[600px] h-[600px] rounded-full bg-gradient-to-br from-stone/10 to-transparent blur-3xl transition-all duration-1000",
            isVisible ? "opacity-100" : "opacity-0"
          )}
          style={{
            top: "5%",
            left: "5%",
            transform: `translate(${mousePosition.x * 30}px, ${mousePosition.y * 30}px)`,
            transition: "opacity 1s, transform 1.2s cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}
        />
        <div
          className={cn(
            "absolute w-[400px] h-[400px] rounded-full bg-gradient-to-br from-charcoal/5 to-transparent blur-3xl transition-all duration-1000",
            isVisible ? "opacity-100" : "opacity-0"
          )}
          style={{
            bottom: "10%",
            right: "10%",
            transform: `translate(${mousePosition.x * -40}px, ${mousePosition.y * -40}px)`,
            transition: "opacity 1s, transform 1.2s cubic-bezier(0.34, 1.56, 0.64, 1)",
            transitionDelay: "200ms",
          }}
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
                "text-label text-charcoal/60 tracking-[0.3em] text-xs inline-block transition-all duration-700",
                isVisible ? "translate-y-0" : "translate-y-full"
              )}
              style={{ transitionDelay: "300ms" }}
            >
              design matters
            </span>
          </div>

          {/* Main Heading with Letter Animation */}
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-charcoal leading-[0.95] tracking-tight mb-12">
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
                "block mt-4 text-lg md:text-xl lg:text-2xl font-sans font-light text-charcoal/60 leading-relaxed transition-all duration-1000",
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
              onClick={onExplore}
              className="group relative text-label text-charcoal text-sm tracking-[0.15em] overflow-hidden"
            >
              <span className="relative z-10 inline-block transition-transform duration-300 group-hover:-translate-y-full">
                Explore Our Work
              </span>
              <span className="absolute top-0 left-0 z-10 inline-block translate-y-full transition-transform duration-300 group-hover:translate-y-0">
                Explore Our Work
              </span>
              <span className="absolute bottom-0 left-0 w-full h-px bg-charcoal" />
            </button>
          </div>
        </div>
      </div>

      {/* Corner decorations */}
      <div
        className={cn(
          "absolute top-24 left-8 transition-all duration-1000",
          isVisible ? "opacity-100" : "opacity-0"
        )}
        style={{ transitionDelay: "1800ms" }}
      >
        <div className="w-px h-16 bg-charcoal/30" />
        <div className="w-16 h-px bg-charcoal/30" />
      </div>
      <div
        className={cn(
          "absolute bottom-24 right-8 transition-all duration-1000",
          isVisible ? "opacity-100" : "opacity-0"
        )}
        style={{ transitionDelay: "2000ms" }}
      >
        <div className="w-16 h-px bg-charcoal/30 ml-auto" />
        <div className="w-px h-16 bg-charcoal/30 ml-auto" />
      </div>
    </section>
  );
};

export default Hero;
