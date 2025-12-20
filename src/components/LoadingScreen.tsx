import { useEffect, useState } from "react";

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [phase, setPhase] = useState<"letters" | "expand" | "exit">("letters");
  const [visibleLetters, setVisibleLetters] = useState<number[]>([]);

  const studioName = "Studio Prangana";
  const letters = studioName.split("");

  useEffect(() => {
    // Animate letters appearing one by one
    letters.forEach((_, index) => {
      setTimeout(() => {
        setVisibleLetters((prev) => [...prev, index]);
      }, 150 + index * 100);
    });

    // After all letters appear, start expand phase
    setTimeout(() => {
      setPhase("expand");
    }, 150 + letters.length * 100 + 500);

    // Exit after expand
    setTimeout(() => {
      setPhase("exit");
      setTimeout(onComplete, 800);
    }, 150 + letters.length * 100 + 1200);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[100] bg-foreground flex items-center justify-center transition-all duration-800 ${
        phase === "exit" ? "opacity-0 scale-110" : "opacity-100 scale-100"
      }`}
    >
      {/* Animated background lines */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute h-px bg-background/10"
            style={{
              top: `${20 + i * 15}%`,
              left: 0,
              right: 0,
              transform: `scaleX(${phase === "letters" ? 0 : 1})`,
              transformOrigin: i % 2 === 0 ? "left" : "right",
              transition: `transform 1.5s cubic-bezier(0.77, 0, 0.175, 1) ${i * 100}ms`,
            }}
          />
        ))}
      </div>

      {/* Logo */}
      <div className="relative">
        <h1 className="font-serif text-4xl md:text-6xl lg:text-8xl text-background tracking-[0.1em] overflow-hidden">
          {letters.map((letter, index) => (
            <span
              key={index}
              className="inline-block"
              style={{
                opacity: visibleLetters.includes(index) ? 1 : 0,
                transform: visibleLetters.includes(index)
                  ? "translateY(0) rotateX(0)"
                  : "translateY(100%) rotateX(-90deg)",
                transition: `all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)`,
                transitionDelay: `${index * 50}ms`,
              }}
            >
              {letter === " " ? "\u00A0" : letter}
            </span>
          ))}
        </h1>

        {/* Underline reveal */}
        <div
          className="absolute -bottom-4 left-0 h-px bg-background"
          style={{
            width: phase === "letters" ? "0%" : "100%",
            transition: "width 1s cubic-bezier(0.77, 0, 0.175, 1) 0.5s",
          }}
        />

        {/* Expanding circle effect */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-background/5"
          style={{
            width: phase === "expand" || phase === "exit" ? "300vw" : "0",
            height: phase === "expand" || phase === "exit" ? "300vw" : "0",
            transition: "all 1.2s cubic-bezier(0.77, 0, 0.175, 1)",
          }}
        />
      </div>

      {/* Corner decorations */}
      <div className="absolute top-8 left-8">
        <div
          className="w-12 h-px bg-background/30"
          style={{
            transform: `scaleX(${visibleLetters.length > 3 ? 1 : 0})`,
            transformOrigin: "left",
            transition: "transform 0.8s cubic-bezier(0.77, 0, 0.175, 1)",
          }}
        />
        <div
          className="w-px h-12 bg-background/30"
          style={{
            transform: `scaleY(${visibleLetters.length > 3 ? 1 : 0})`,
            transformOrigin: "top",
            transition: "transform 0.8s cubic-bezier(0.77, 0, 0.175, 1) 0.2s",
          }}
        />
      </div>
      <div className="absolute bottom-8 right-8">
        <div
          className="w-12 h-px bg-background/30 ml-auto"
          style={{
            transform: `scaleX(${visibleLetters.length > 10 ? 1 : 0})`,
            transformOrigin: "right",
            transition: "transform 0.8s cubic-bezier(0.77, 0, 0.175, 1)",
          }}
        />
        <div
          className="w-px h-12 bg-background/30 ml-auto"
          style={{
            transform: `scaleY(${visibleLetters.length > 10 ? 1 : 0})`,
            transformOrigin: "bottom",
            transition: "transform 0.8s cubic-bezier(0.77, 0, 0.175, 1) 0.2s",
          }}
        />
      </div>
    </div>
  );
};

export default LoadingScreen;
