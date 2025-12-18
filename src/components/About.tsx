import { useEffect, useRef, useState } from "react";
import ScrollReveal from "./ScrollReveal";

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
      className="py-24 lg:py-32 bg-foreground text-background relative overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute w-[600px] h-[600px] rounded-full bg-gradient-to-br from-stone/20 to-transparent blur-3xl animate-morph"
          style={{ top: "-20%", right: "-10%" }}
        />
        <div 
          className="absolute w-[400px] h-[400px] rounded-full bg-gradient-to-br from-background/5 to-transparent blur-3xl animate-float"
          style={{ bottom: "10%", left: "5%", animationDelay: "2s" }}
        />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left Column */}
          <div>
            <ScrollReveal>
              <span className="text-label text-stone mb-4 block tracking-[0.2em]">
                About Us
              </span>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <h2 className="text-display text-4xl md:text-5xl lg:text-6xl mb-8">
                We believe that
                <br />
                <span className="text-gradient-animate">design matters</span>
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <p className="text-body text-lg leading-relaxed opacity-70 mb-8">
                At Arch+Studio, we are an award-winning architectural and interior
                design studio dedicated to creating spaces that inspire and
                transform. Our approach combines innovative design thinking with
                meticulous attention to detail.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={300}>
              <p className="text-body text-lg leading-relaxed opacity-70">
                Whether it's a residential project, commercial development, or
                heritage conservation, we bring the same passion and expertise to
                every project. Light, space, and materials are our tools; timeless
                design is our goal.
              </p>
            </ScrollReveal>
          </div>

          {/* Right Column - Stats */}
          <div className="grid grid-cols-2 gap-8 lg:gap-12 content-center">
            {stats.map((stat, index) => (
              <ScrollReveal
                key={stat.label}
                delay={100 + index * 100}
                direction="scale"
              >
                <div className="group">
                  <div className="text-display text-5xl lg:text-6xl text-background mb-2 transition-all duration-500 group-hover:translate-x-2">
                    <AnimatedCounter
                      value={stat.value}
                      suffix={stat.suffix}
                      isVisible={isVisible}
                    />
                  </div>
                  <div className="text-label text-stone text-xs flex items-center gap-2">
                    <span className="w-4 h-px bg-stone transition-all duration-500 group-hover:w-8" />
                    {stat.label}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* Philosophy */}
        <ScrollReveal delay={500}>
          <div className="mt-24 pt-24 border-t border-background/20 relative">
            {/* Decorative quote marks */}
            <div className="absolute -top-6 left-0 text-8xl text-stone/20 font-serif leading-none select-none">
              "
            </div>
            <div className="max-w-3xl pl-8">
              <blockquote className="text-display text-3xl md:text-4xl italic leading-relaxed">
                The most important material with which we design, is light.
              </blockquote>
              <cite className="text-label text-stone mt-6 block not-italic flex items-center gap-4">
                <span className="w-12 h-px bg-stone" />
                Founding Philosophy
              </cite>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default About;
