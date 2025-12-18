import { useEffect, useRef, ReactNode } from "react";

interface ParallaxContainerProps {
  children: ReactNode;
  className?: string;
  speed?: number;
}

const ParallaxContainer = ({
  children,
  className = "",
  speed = 0.5,
}: ParallaxContainerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const rect = container.getBoundingClientRect();
      const scrolled = window.scrollY;
      const elementTop = rect.top + scrolled;
      const offset = (scrolled - elementTop) * speed;

      container.style.transform = `translateY(${offset}px)`;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [speed]);

  return (
    <div ref={containerRef} className={className} style={{ willChange: "transform" }}>
      {children}
    </div>
  );
};

export default ParallaxContainer;
