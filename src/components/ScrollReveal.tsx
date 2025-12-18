import { useEffect, useRef, useState, ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "scale" | "blur";
  duration?: number;
  threshold?: number;
}

const ScrollReveal = ({
  children,
  className = "",
  delay = 0,
  direction = "up",
  duration = 800,
  threshold = 0.2,
}: ScrollRevealProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  const getInitialTransform = () => {
    switch (direction) {
      case "up":
        return "translateY(60px)";
      case "down":
        return "translateY(-60px)";
      case "left":
        return "translateX(60px)";
      case "right":
        return "translateX(-60px)";
      case "scale":
        return "scale(0.9)";
      case "blur":
        return "translateY(30px)";
      default:
        return "translateY(60px)";
    }
  };

  const getInitialFilter = () => {
    return direction === "blur" ? "blur(10px)" : "blur(0)";
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "none" : getInitialTransform(),
        filter: isVisible ? "blur(0)" : getInitialFilter(),
        transition: `opacity ${duration}ms cubic-bezier(0.25, 0.1, 0.25, 1) ${delay}ms, 
                     transform ${duration}ms cubic-bezier(0.25, 0.1, 0.25, 1) ${delay}ms,
                     filter ${duration}ms cubic-bezier(0.25, 0.1, 0.25, 1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
};

export default ScrollReveal;
