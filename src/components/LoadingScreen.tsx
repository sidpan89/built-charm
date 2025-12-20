import { useEffect, useState } from "react";

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [phase, setPhase] = useState<"letters" | "hold" | "exit">("letters");
  const [visibleLetters, setVisibleLetters] = useState<number[]>([]);

  const studioName = "Studio Prangana";
  const letters = studioName.split("");

  useEffect(() => {
    // Animate letters appearing one by one with elegant timing
    letters.forEach((_, index) => {
      setTimeout(() => {
        setVisibleLetters((prev) => [...prev, index]);
      }, 200 + index * 60);
    });

    // Hold phase after all letters appear
    setTimeout(() => {
      setPhase("hold");
    }, 200 + letters.length * 60 + 400);

    // Exit after hold
    setTimeout(() => {
      setPhase("exit");
      setTimeout(onComplete, 600);
    }, 200 + letters.length * 60 + 1000);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[100] bg-background flex items-center justify-center transition-opacity duration-700 ease-out ${
        phase === "exit" ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Centered logo with elegant letter animation */}
      <div className="relative flex flex-col items-center">
        <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-foreground tracking-[0.15em] font-light">
          {letters.map((letter, index) => (
            <span
              key={index}
              className="inline-block"
              style={{
                opacity: visibleLetters.includes(index) ? 1 : 0,
                transform: visibleLetters.includes(index)
                  ? "translateY(0)"
                  : "translateY(20px)",
                transition: `opacity 0.5s ease-out, transform 0.5s ease-out`,
                transitionDelay: `${index * 20}ms`,
              }}
            >
              {letter === " " ? "\u00A0" : letter}
            </span>
          ))}
        </h1>

        {/* Subtle underline */}
        <div
          className="mt-6 h-px bg-foreground/20"
          style={{
            width: phase !== "letters" ? "60px" : "0px",
            transition: "width 0.8s cubic-bezier(0.25, 0.1, 0.25, 1) 0.3s",
          }}
        />
      </div>
    </div>
  );
};

export default LoadingScreen;