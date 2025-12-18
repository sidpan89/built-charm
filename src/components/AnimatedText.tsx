import { useEffect, useState } from "react";

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
  staggerDelay?: number;
  once?: boolean;
}

const AnimatedText = ({
  text,
  className = "",
  delay = 0,
  staggerDelay = 50,
  once = true,
}: AnimatedTextProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);
    return () => clearTimeout(timer);
  }, [delay]);

  const words = text.split(" ");

  return (
    <span className={className}>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block mr-[0.25em] overflow-hidden">
          {word.split("").map((char, charIndex) => {
            const totalIndex = words
              .slice(0, wordIndex)
              .reduce((acc, w) => acc + w.length, 0) + charIndex;
            
            return (
              <span
                key={charIndex}
                className="inline-block"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? "translateY(0)" : "translateY(100%)",
                  transition: `opacity 0.6s cubic-bezier(0.25, 0.1, 0.25, 1) ${totalIndex * staggerDelay}ms, 
                               transform 0.6s cubic-bezier(0.25, 0.1, 0.25, 1) ${totalIndex * staggerDelay}ms`,
                }}
              >
                {char}
              </span>
            );
          })}
        </span>
      ))}
    </span>
  );
};

export default AnimatedText;
