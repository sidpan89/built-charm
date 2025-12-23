import { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";
import heroHouse from "@/assets/hero-house.jpg";
import studioLogo from "@/assets/studio-logo-red.png";

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

  // Generate leaf shadow positions
  const leafShadows = Array.from({ length: 15 }, (_, i) => {
    const baseX = -10 + (i % 5) * 22;
    const baseY = -15 + Math.floor(i / 5) * 35;
    const swayX = Math.sin(time * 0.7 + i * 0.8) * 18;
    const swayY = Math.cos(time * 0.5 + i * 0.5) * 10;
    const rotation = 15 + Math.sin(time * 0.4 + i * 1.1) * 20;
    
    return {
      x: baseX + swayX + mousePosition.x * 20,
      y: baseY + swayY + mousePosition.y * 15,
      rotation,
      scale: 0.7 + Math.sin(time * 0.3 + i * 0.8) * 0.25,
      opacity: 0.06 + Math.sin(time * 0.4 + i * 0.5) * 0.025,
    };
  });

  // Generate light rays that filter through leaves
  const lightRays = Array.from({ length: 8 }, (_, i) => {
    const baseAngle = -30 + i * 15;
    const swayAngle = Math.sin(time * 0.3 + i * 0.5) * 5;
    const opacity = 0.04 + Math.sin(time * 0.25 + i * 0.7) * 0.02;
    const width = 60 + Math.sin(time * 0.2 + i * 0.4) * 20;
    
    return {
      angle: baseAngle + swayAngle,
      opacity,
      width,
      left: -5 + i * 14 + Math.sin(time * 0.15 + i * 0.6) * 3,
    };
  });

  return (
    <section
      id="home"
      ref={heroRef}
      className="h-screen flex items-center justify-center relative bg-cream overflow-hidden"
    >
      {/* Real architectural house background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className={cn(
            "absolute inset-0 transition-all duration-1000",
            isVisible ? "opacity-100" : "opacity-0"
          )}
          style={{
            transform: `translate(${mousePosition.x * 15}px, ${mousePosition.y * 10}px) scale(1.1)`,
            transition: "opacity 1s, transform 1.5s ease-out",
          }}
        >
          <img
            src={heroHouse}
            alt="Modern architectural house"
            className="w-full h-full object-cover"
            style={{
              opacity: 0.15,
              filter: "grayscale(30%)",
            }}
          />
          {/* Gradient overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-cream via-cream/90 to-cream/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-cream via-transparent to-cream/50" />
        </div>
      </div>

      {/* Light rays filtering through leaves */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {lightRays.map((ray, i) => (
          <div
            key={`ray-${i}`}
            className="absolute"
            style={{
              left: `${ray.left}%`,
              top: "-20%",
              width: `${ray.width}px`,
              height: "140%",
              background: `linear-gradient(180deg, 
                hsl(45 30% 85% / ${ray.opacity * 1.5}) 0%, 
                hsl(45 25% 90% / ${ray.opacity}) 30%,
                hsl(45 20% 95% / ${ray.opacity * 0.5}) 70%,
                transparent 100%)`,
              transform: `rotate(${ray.angle}deg)`,
              transformOrigin: "top center",
              filter: "blur(15px)",
            }}
          />
        ))}
      </div>

      {/* Animated leaf shadows overlay - creates dappled light effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {leafShadows.map((leaf, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              left: `${leaf.x}%`,
              top: `${leaf.y}%`,
              width: "280px",
              height: "380px",
              background: `radial-gradient(ellipse 40% 60% at 50% 50%, hsl(var(--charcoal)) 0%, transparent 60%)`,
              opacity: leaf.opacity,
              transform: `rotate(${leaf.rotation}deg) scale(${leaf.scale})`,
              transition: "opacity 0.6s ease-out",
            }}
          />
        ))}
        
        {/* Individual leaf shapes for more realism */}
        {[...Array(25)].map((_, i) => {
          const leafX = (i % 5) * 22 + Math.sin(time * 0.55 + i * 0.75) * 12;
          const leafY = -8 + Math.floor(i / 5) * 22 + Math.cos(time * 0.4 + i * 0.55) * 8;
          const leafRotation = 20 + i * 15 + Math.sin(time * 0.45 + i * 0.65) * 18;
          
          return (
            <svg
              key={`leaf-${i}`}
              className="absolute"
              style={{
                left: `${leafX}%`,
                top: `${leafY}%`,
                width: "45px",
                height: "60px",
                opacity: 0.055 + Math.sin(time * 0.5 + i * 0.8) * 0.025,
                transform: `rotate(${leafRotation}deg) scale(${0.75 + Math.sin(time * 0.35 + i * 0.7) * 0.25})`,
              }}
              viewBox="0 0 30 40"
              fill="hsl(var(--charcoal))"
            >
              <ellipse cx="15" cy="20" rx="9" ry="15" />
            </svg>
          );
        })}
        
        {/* Branch shadows */}
        {[...Array(5)].map((_, i) => {
          const branchX = 5 + i * 20 + Math.sin(time * 0.4 + i * 0.9) * 10;
          const branchY = -12 + (i % 2) * 25 + Math.cos(time * 0.35 + i * 0.6) * 6;
          
          return (
            <div
              key={`branch-${i}`}
              className="absolute"
              style={{
                left: `${branchX}%`,
                top: `${branchY}%`,
                width: "180px",
                height: "280px",
                background: `linear-gradient(${45 + i * 30}deg, hsl(var(--charcoal) / 0.06) 0%, transparent 55%)`,
                transform: `rotate(${35 + i * 28 + Math.sin(time * 0.35 + i * 0.7) * 8}deg)`,
                borderRadius: "45% 55% 50% 50%",
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

      {/* Content removed - clean hero */}
      <div className="relative z-10 container mx-auto px-6 lg:px-12 h-full flex flex-col items-center justify-center">
        {/* Empty hero - navigation handles menu */}
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
