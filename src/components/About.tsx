import { useEffect, useRef, useState } from "react";

const stats = [
  { value: "15+", label: "Years Experience" },
  { value: "200+", label: "Projects Completed" },
  { value: "50+", label: "Design Awards" },
  { value: "98%", label: "Client Satisfaction" },
];

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
              className={`text-label text-stone mb-4 block transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              About Us
            </span>
            <h2
              className={`text-display text-4xl md:text-5xl lg:text-6xl mb-8 transition-all duration-700 delay-100 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              We believe that
              <br />
              <span className="text-stone">design matters</span>
            </h2>
            <p
              className={`text-body text-lg leading-relaxed opacity-80 mb-8 transition-all duration-700 delay-200 ${
                isVisible ? "opacity-80 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              At Arch+Studio, we are an award-winning architectural and interior
              design studio dedicated to creating spaces that inspire and
              transform. Our approach combines innovative design thinking with
              meticulous attention to detail.
            </p>
            <p
              className={`text-body text-lg leading-relaxed opacity-80 transition-all duration-700 delay-300 ${
                isVisible ? "opacity-80 translate-y-0" : "opacity-0 translate-y-4"
              }`}
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
                className={`transition-all duration-700 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
                style={{ transitionDelay: `${(index + 4) * 100}ms` }}
              >
                <div className="text-display text-5xl lg:text-6xl text-background mb-2">
                  {stat.value}
                </div>
                <div className="text-label text-stone text-xs">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Philosophy */}
        <div
          className={`mt-24 pt-24 border-t border-background/20 transition-all duration-700 delay-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div className="max-w-3xl">
            <blockquote className="text-display text-3xl md:text-4xl italic leading-relaxed">
              "The most important material with which we design, is light."
            </blockquote>
            <cite className="text-label text-stone mt-6 block not-italic">
              — Founding Philosophy
            </cite>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
