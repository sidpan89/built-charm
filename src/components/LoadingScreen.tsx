import { useEffect, useState } from "react";

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsExiting(true);
            setTimeout(onComplete, 800);
          }, 300);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [onComplete]);

  const letters = "STUDIO PRANGANA".split("");

  return (
    <div
      className={`fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center transition-all duration-800 ${
        isExiting ? "opacity-0 scale-105" : "opacity-100 scale-100"
      }`}
    >
      {/* Animated Logo */}
      <div className="relative mb-12">
        <div className="flex items-center overflow-hidden">
          {letters.map((letter, index) => (
            <span
              key={index}
              className="font-serif text-4xl md:text-6xl tracking-wider"
              style={{
                opacity: progress > index * 8 ? 1 : 0,
                transform: `translateY(${progress > index * 8 ? 0 : 40}px)`,
                transition: `all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) ${index * 0.05}s`,
                color: letter === " " ? "transparent" : "hsl(var(--foreground))",
              }}
            >
              {letter}
            </span>
          ))}
        </div>
        
        {/* Decorative line */}
        <div
          className="absolute -bottom-4 left-0 h-px bg-foreground"
          style={{
            width: `${progress}%`,
            transition: "width 0.3s ease-out",
          }}
        />
      </div>

      {/* Progress indicator */}
      <div className="flex items-center gap-4 text-muted-foreground">
        <span className="text-label text-xs">Loading</span>
        <span className="font-serif text-lg tabular-nums">{progress}%</span>
      </div>

      {/* Floating orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute w-64 h-64 rounded-full bg-gradient-to-br from-stone/10 to-transparent blur-3xl animate-morph"
          style={{
            top: "20%",
            left: "10%",
            animationDelay: "0s",
          }}
        />
        <div
          className="absolute w-96 h-96 rounded-full bg-gradient-to-br from-muted/20 to-transparent blur-3xl animate-morph"
          style={{
            bottom: "10%",
            right: "5%",
            animationDelay: "2s",
          }}
        />
      </div>
    </div>
  );
};

export default LoadingScreen;
