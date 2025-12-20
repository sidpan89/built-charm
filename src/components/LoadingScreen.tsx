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
            setTimeout(onComplete, 600);
          }, 200);
          return 100;
        }
        return prev + 3;
      });
    }, 25);

    return () => clearInterval(interval);
  }, [onComplete]);

  const letters = "Studio Prangana".split("");

  return (
    <div
      className={`fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center transition-all duration-600 ${
        isExiting ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Animated Logo */}
      <div className="relative mb-12">
        <div className="flex items-center overflow-hidden">
          {letters.map((letter, index) => (
            <span
              key={index}
              className="font-serif text-3xl md:text-5xl tracking-wider"
              style={{
                opacity: progress > index * 6 ? 1 : 0,
                transform: `translateY(${progress > index * 6 ? 0 : 30}px)`,
                transition: `all 0.5s cubic-bezier(0.4, 0, 0.2, 1) ${index * 40}ms`,
                color: letter === " " ? "transparent" : "hsl(var(--foreground))",
              }}
            >
              {letter === " " ? "\u00A0" : letter}
            </span>
          ))}
        </div>
        
        {/* Progress line */}
        <div
          className="absolute -bottom-4 left-0 h-px bg-foreground"
          style={{
            width: `${progress}%`,
            transition: "width 0.2s ease-out",
          }}
        />
      </div>

      {/* Progress text */}
      <div className="flex items-center gap-4 text-muted-foreground">
        <span className="text-label text-xs tracking-[0.2em]">Loading</span>
        <span className="font-serif text-lg tabular-nums w-12">{progress}%</span>
      </div>
    </div>
  );
};

export default LoadingScreen;
