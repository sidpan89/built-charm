import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const stats = [
  { value: "15", suffix: "+", label: "Years Experience" },
  { value: "200", suffix: "+", label: "Projects Completed" },
  { value: "50", suffix: "+", label: "Design Awards" },
  { value: "98", suffix: "%", label: "Client Satisfaction" },
];

const AnimatedCounter = ({ 
  value, 
  suffix, 
  isVisible 
}: { 
  value: string; 
  suffix: string; 
  isVisible: boolean;
}) => {
  const [count, setCount] = useState(0);
  const numValue = parseInt(value);

  useEffect(() => {
    if (!isVisible) return;

    let start = 0;
    const duration = 2000;
    const increment = numValue / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= numValue) {
        setCount(numValue);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isVisible, numValue]);

  return (
    <span className="tabular-nums">
      {count}{suffix}
    </span>
  );
};

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-24 lg:py-32 bg-foreground text-background"
    >
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left Column */}
          <div>
            <span
              className={cn(
                "text-label text-stone text-xs tracking-[0.3em] mb-4 block transition-all duration-700",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              )}
            >
              About
            </span>
            <h2
              className={cn(
                "font-serif text-4xl md:text-5xl lg:text-6xl mb-8 transition-all duration-700 delay-100",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              )}
            >
              We believe that design matters
            </h2>
            <p
              className={cn(
                "text-body text-lg leading-relaxed opacity-70 mb-8 transition-all duration-700 delay-200",
                isVisible ? "opacity-70 translate-y-0" : "opacity-0 translate-y-4"
              )}
            >
              At Studio Prangana, we are an emerging architectural and interior
              design studio dedicated to creating spaces that inspire and
              transform. Our approach combines innovative design thinking with
              meticulous attention to detail and sustainable practices.
            </p>
            <p
              className={cn(
                "text-body text-lg leading-relaxed opacity-70 transition-all duration-700 delay-300",
                isVisible ? "opacity-70 translate-y-0" : "opacity-0 translate-y-4"
              )}
            >
              Whether it's a residential project, commercial development, or
              heritage conservation, we bring the same passion and expertise to
              every project. Light, space, and materials are our tools; timeless
              design is our goal.
            </p>
          </div>

          {/* Right Column - Stats */}
          <div className="grid grid-cols-2 gap-8 lg:gap-12 content-center">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className={cn(
                  "group transition-all duration-700",
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                )}
                style={{ transitionDelay: `${400 + index * 100}ms` }}
              >
                <div className="font-serif text-5xl lg:text-6xl mb-2 transition-all duration-300 group-hover:translate-x-2">
                  <AnimatedCounter
                    value={stat.value}
                    suffix={stat.suffix}
                    isVisible={isVisible}
                  />
                </div>
                <div className="text-label text-stone text-xs tracking-[0.1em] flex items-center gap-2">
                  <span className="w-4 h-px bg-stone transition-all duration-300 group-hover:w-8" />
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Philosophy Quote */}
        <div
          className={cn(
            "mt-24 pt-24 border-t border-background/20 transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}
          style={{ transitionDelay: "800ms" }}
        >
          <div className="max-w-3xl">
            <span className="text-6xl text-stone/30 font-serif leading-none mb-4 block">"</span>
            <blockquote className="font-serif text-3xl md:text-4xl italic leading-relaxed -mt-8">
              The most important material with which we design, is light.
            </blockquote>
            <cite className="text-label text-stone text-xs tracking-[0.15em] mt-6 block not-italic flex items-center gap-4">
              <span className="w-12 h-px bg-stone" />
              Founding Philosophy
            </cite>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
