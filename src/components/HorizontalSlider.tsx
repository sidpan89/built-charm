import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

import serviceResidential from "@/assets/service-residential.jpg";
import serviceCommercial from "@/assets/service-commercial.jpg";
import serviceInterior from "@/assets/service-interior.jpg";
import serviceHeritage from "@/assets/service-heritage.jpg";

interface HorizontalSliderProps {
  onBack?: () => void;
}

interface Slide {
  id: string;
  category: string;
  title: string;
  description: string;
  image: string;
}

const slides: Slide[] = [
  {
    id: "residential",
    category: "Residential",
    title: "Architectural Design",
    description: "The most important material with which we design, is light.",
    image: serviceResidential,
  },
  {
    id: "commercial",
    category: "Commercial",
    title: "Commercial Architecture",
    description: "Design is about a way of living, be it at home, in the workplace, relaxing, or entertaining.",
    image: serviceCommercial,
  },
  {
    id: "interior",
    category: "Residential & Commercial",
    title: "Interior Design",
    description: "We aspire to create an interior experience that is both memorable, and timeless.",
    image: serviceInterior,
  },
  {
    id: "heritage",
    category: "Heritage",
    title: "Conservation & Heritage",
    description: "Conservation Architects to transform your heritage property.",
    image: serviceHeritage,
  },
];

const HorizontalSlider = ({ onBack }: HorizontalSliderProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: (e.clientX - rect.left) / rect.width - 0.5,
          y: (e.clientY - rect.top) / rect.height - 0.5,
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const goToSlide = (index: number) => {
    if (index >= 0 && index < slides.length) {
      setCurrentIndex(index);
    }
  };

  const nextSlide = () => {
    goToSlide((currentIndex + 1) % slides.length);
  };

  const prevSlide = () => {
    goToSlide((currentIndex - 1 + slides.length) % slides.length);
  };

  return (
    <section
      id="services"
      ref={containerRef}
      className="relative bg-cream overflow-hidden"
    >
      {/* Back button */}
      {onBack && (
        <button
          onClick={onBack}
          className={cn(
            "absolute top-24 left-6 lg:left-12 z-20 flex items-center gap-2 text-label text-background/80 text-xs tracking-[0.15em] hover:text-background transition-all duration-500",
            isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
          )}
        >
          <ArrowLeft size={16} />
          <span>Back</span>
        </button>
      )}

      {/* Main Slider */}
      <div className="relative h-screen">
        {/* Slides */}
        <div
          className="flex h-full transition-transform duration-1000 ease-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className="flex-shrink-0 w-full h-full relative"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Background Image with parallax */}
              <div className="absolute inset-0 overflow-hidden">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className={cn(
                    "w-full h-full object-cover transition-all duration-1000",
                    hoveredIndex === index ? "scale-110" : "scale-100"
                  )}
                  style={{
                    transform: currentIndex === index
                      ? `translate(${mousePosition.x * -20}px, ${mousePosition.y * -20}px) scale(${hoveredIndex === index ? 1.1 : 1.05})`
                      : "scale(1)",
                    transition: "transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)",
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/40 to-charcoal/20" />
              </div>

              {/* Animated lines */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute h-px bg-background/10"
                    style={{
                      top: `${25 + i * 25}%`,
                      left: 0,
                      right: 0,
                      transform: `scaleX(${isVisible && currentIndex === index ? 1 : 0})`,
                      transformOrigin: i % 2 === 0 ? "left" : "right",
                      transition: `transform 1.5s cubic-bezier(0.77, 0, 0.175, 1) ${i * 200}ms`,
                    }}
                  />
                ))}
              </div>

              {/* Content */}
              <div className="relative h-full flex items-end">
                <div className="container mx-auto px-6 lg:px-12 pb-32">
                  <div
                    className={cn(
                      "max-w-2xl transition-all duration-700",
                      isVisible && currentIndex === index
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-8"
                    )}
                    style={{ transitionDelay: "300ms" }}
                  >
                    <span
                      className={cn(
                        "text-label text-background/60 text-xs tracking-[0.2em] mb-4 block overflow-hidden"
                      )}
                    >
                      <span
                        className={cn(
                          "inline-block transition-transform duration-700",
                          isVisible && currentIndex === index ? "translate-y-0" : "translate-y-full"
                        )}
                        style={{ transitionDelay: "400ms" }}
                      >
                        {slide.category}
                      </span>
                    </span>
                    <h2 className="overflow-hidden mb-4">
                      <span
                        className={cn(
                          "font-serif text-4xl md:text-5xl lg:text-6xl text-background inline-block transition-all duration-700",
                          isVisible && currentIndex === index ? "translate-y-0 blur-0" : "translate-y-full blur-sm"
                        )}
                        style={{ transitionDelay: "500ms" }}
                      >
                        {slide.title}
                      </span>
                    </h2>
                    <p
                      className={cn(
                        "text-body text-background/70 text-lg mb-8 max-w-lg transition-all duration-700",
                        isVisible && currentIndex === index ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                      )}
                      style={{ transitionDelay: "600ms" }}
                    >
                      {slide.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <div
          className={cn(
            "absolute bottom-32 right-6 lg:right-12 flex gap-2 z-10 transition-all duration-700",
            isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
          )}
          style={{ transitionDelay: "800ms" }}
        >
          <button
            onClick={prevSlide}
            className="group w-14 h-14 flex items-center justify-center border border-background/30 text-background/70 transition-all duration-500 hover:bg-background/10 hover:border-background hover:text-background overflow-hidden relative"
            aria-label="Previous slide"
          >
            <ChevronLeft size={20} className="relative z-10 transition-transform duration-300 group-hover:-translate-x-0.5" />
            <div className="absolute inset-0 bg-background/10 scale-x-0 origin-right transition-transform duration-500 group-hover:scale-x-100" />
          </button>
          <button
            onClick={nextSlide}
            className="group w-14 h-14 flex items-center justify-center border border-background/30 text-background/70 transition-all duration-500 hover:bg-background/10 hover:border-background hover:text-background overflow-hidden relative"
            aria-label="Next slide"
          >
            <ChevronRight size={20} className="relative z-10 transition-transform duration-300 group-hover:translate-x-0.5" />
            <div className="absolute inset-0 bg-background/10 scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100" />
          </button>
        </div>

        {/* Slide Indicators */}
        <div
          className={cn(
            "absolute bottom-12 left-6 lg:left-12 flex gap-6 z-10 transition-all duration-700",
            isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
          )}
          style={{ transitionDelay: "800ms" }}
        >
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className="group flex items-center gap-3"
              aria-label={`Go to slide ${index + 1}`}
            >
              <span
                className={cn(
                  "text-label text-xs transition-all duration-500",
                  currentIndex === index
                    ? "text-background"
                    : "text-background/40 group-hover:text-background/70"
                )}
              >
                0{index + 1}
              </span>
              <span
                className={cn(
                  "h-px transition-all duration-700 ease-out",
                  currentIndex === index
                    ? "w-16 bg-background"
                    : "w-6 bg-background/30 group-hover:w-10 group-hover:bg-background/50"
                )}
              />
            </button>
          ))}
        </div>

        {/* Current slide number */}
        <div
          className={cn(
            "absolute top-1/2 -translate-y-1/2 right-6 lg:right-12 transition-all duration-700",
            isVisible ? "opacity-100" : "opacity-0"
          )}
          style={{ transitionDelay: "1000ms" }}
        >
          <div className="flex flex-col items-center">
            <span className="font-serif text-6xl lg:text-8xl text-background/10">
              0{currentIndex + 1}
            </span>
            <div className="w-px h-16 bg-background/20" />
            <span className="text-label text-background/40 text-xs">
              0{slides.length}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HorizontalSlider;
