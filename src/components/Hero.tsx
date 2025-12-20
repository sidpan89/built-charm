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

  // Animated architectural arches
  const archElements = Array.from({ length: 4 }, (_, i) => {
    const baseX = 60 + i * 12;
    const baseY = 20 + i * 15;
    const breathe = Math.sin(time * 0.4 + i * 0.8) * 3;
    
    return {
      x: baseX + mousePosition.x * 10,
      y: baseY + breathe + mousePosition.y * 8,
      scale: 0.8 + i * 0.15 + Math.sin(time * 0.3 + i) * 0.05,
      opacity: 0.04 - i * 0.008,
      rotation: -5 + Math.sin(time * 0.2 + i) * 2,
    };
  });

  return (
    <section
      id="home"
      ref={heroRef}
      className="h-screen flex items-center justify-center relative bg-cream overflow-hidden"
    >
      {/* Animated architectural arches - subtle geometric patterns */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {archElements.map((arch, i) => (
          <svg
            key={`arch-${i}`}
            className="absolute"
            style={{
              right: `${arch.x - 30}%`,
              top: `${arch.y}%`,
              width: "400px",
              height: "500px",
              opacity: arch.opacity,
              transform: `scale(${arch.scale}) rotate(${arch.rotation}deg)`,
              transition: "transform 0.3s ease-out",
            }}
            viewBox="0 0 200 250"
            fill="none"
          >
            {/* Main arch */}
            <path
              d="M20 250 L20 100 Q20 20 100 20 Q180 20 180 100 L180 250"
              stroke="hsl(var(--charcoal))"
              strokeWidth="1.5"
              fill="none"
              opacity="0.6"
            />
            {/* Inner arch */}
            <path
              d="M40 250 L40 110 Q40 45 100 45 Q160 45 160 110 L160 250"
              stroke="hsl(var(--charcoal))"
              strokeWidth="1"
              fill="none"
              opacity="0.4"
            />
            {/* Keystone detail */}
            <circle cx="100" cy="20" r="4" fill="hsl(var(--charcoal))" opacity="0.3" />
          </svg>
        ))}
        
        {/* Animated window frame patterns */}
        <svg
          className="absolute"
          style={{
            right: "5%",
            bottom: "10%",
            width: "300px",
            height: "400px",
            opacity: 0.03 + Math.sin(time * 0.3) * 0.01,
            transform: `translate(${mousePosition.x * -15}px, ${mousePosition.y * -10}px) rotate(${Math.sin(time * 0.15) * 2}deg)`,
          }}
          viewBox="0 0 150 200"
          fill="none"
        >
          <rect x="10" y="10" width="130" height="180" stroke="hsl(var(--charcoal))" strokeWidth="2" fill="none" />
          <line x1="75" y1="10" x2="75" y2="190" stroke="hsl(var(--charcoal))" strokeWidth="1" />
          <line x1="10" y1="100" x2="140" y2="100" stroke="hsl(var(--charcoal))" strokeWidth="1" />
          <rect x="25" y="25" width="45" height="65" stroke="hsl(var(--charcoal))" strokeWidth="0.5" fill="none" />
          <rect x="80" y="25" width="45" height="65" stroke="hsl(var(--charcoal))" strokeWidth="0.5" fill="none" />
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
              width: "350px",
              height: "450px",
              background: `radial-gradient(ellipse 35% 55% at 50% 50%, hsl(var(--charcoal)) 0%, transparent 65%)`,
              opacity: leaf.opacity,
              transform: `rotate(${leaf.rotation}deg) scale(${leaf.scale})`,
              transition: "opacity 0.8s ease-out",
            }}
          />
        ))}
        
        {/* Realistic branch shadows */}
        {[...Array(8)].map((_, i) => {
          const branchX = 10 + i * 12 + Math.sin(time * 0.5 + i * 0.7) * 10;
          const branchY = -8 + (i % 3) * 18 + Math.cos(time * 0.35 + i * 0.5) * 6;
          const branchRotation = 45 + i * 20 + Math.sin(time * 0.4 + i * 0.8) * 8;
          
          return (
            <div
              key={`branch-${i}`}
              className="absolute"
              style={{
                left: `${branchX}%`,
                top: `${branchY}%`,
                width: "180px",
                height: "280px",
                background: `linear-gradient(${branchRotation}deg, hsl(var(--charcoal) / 0.05) 0%, transparent 55%)`,
                transform: `rotate(${branchRotation}deg) scaleX(${0.8 + Math.sin(time * 0.3 + i) * 0.2})`,
                borderRadius: "40% 60% 50% 50%",
              }}
            />
          );
        })}
        
        {/* Individual leaf shapes */}
        {[...Array(12)].map((_, i) => {
          const leafX = 5 + (i % 4) * 25 + Math.sin(time * 0.6 + i * 0.9) * 12;
          const leafY = 5 + Math.floor(i / 4) * 30 + Math.cos(time * 0.4 + i * 0.6) * 8;
          
          return (
            <svg
              key={`leaf-${i}`}
              className="absolute"
              style={{
                left: `${leafX}%`,
                top: `${leafY}%`,
                width: "60px",
                height: "80px",
                opacity: 0.04 + Math.sin(time * 0.5 + i) * 0.02,
                transform: `rotate(${30 + i * 25 + Math.sin(time * 0.5 + i * 0.7) * 15}deg) scale(${1 + Math.sin(time * 0.3 + i) * 0.2})`,
              }}
              viewBox="0 0 30 40"
              fill="hsl(var(--charcoal))"
            >
              <ellipse cx="15" cy="20" rx="12" ry="18" />
            </svg>
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
