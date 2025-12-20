import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

import serviceResidential from "@/assets/service-residential.jpg";
import serviceCommercial from "@/assets/service-commercial.jpg";
import serviceInterior from "@/assets/service-interior.jpg";
import serviceHeritage from "@/assets/service-heritage.jpg";

interface Slide {
  id: string;
  category: string;
  title: string;
  description: string;
  image: string;
  link: string;
}

const slides: Slide[] = [
  {
    id: "residential",
    category: "Residential",
    title: "Architectural Design",
    description: "The most important material with which we design, is light.",
    image: serviceResidential,
    link: "#portfolio",
  },
  {
    id: "commercial",
    category: "Commercial",
    title: "Commercial Architecture",
    description: "Design is about a way of living, be it at home, in the workplace, relaxing, or entertaining.",
    image: serviceCommercial,
    link: "#portfolio",
  },
  {
    id: "interior",
    category: "Residential & Commercial",
    title: "Interior Design",
    description: "We aspire to create an interior experience that is both memorable, and timeless.",
    image: serviceInterior,
    link: "#portfolio",
  },
  {
    id: "heritage",
    category: "Heritage",
    title: "Conservation & Heritage",
    description: "Conservation Architects to transform your heritage property.",
    image: serviceHeritage,
    link: "#portfolio",
  },
];

const HorizontalSlider = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
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
      ref={containerRef}
      className="relative bg-background overflow-hidden"
    >
      {/* Main Slider */}
      <div className="relative h-screen">
        {/* Slides */}
        <div
          className="flex h-full transition-transform duration-700 ease-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              id={slide.id}
              className="flex-shrink-0 w-full h-full relative"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className={cn(
                    "w-full h-full object-cover transition-all duration-1000",
                    hoveredIndex === index ? "scale-105" : "scale-100"
                  )}
                />
                <div className="absolute inset-0 bg-foreground/30" />
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
                    <span className="text-label text-background/80 text-xs tracking-[0.2em] mb-4 block">
                      {slide.category}
                    </span>
                    <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-background mb-4">
                      {slide.title}
                    </h2>
                    <p className="text-body text-background/80 text-lg mb-8 max-w-lg">
                      {slide.description}
                    </p>
                    <a
                      href={slide.link}
                      className="group inline-flex items-center gap-2 text-label text-background text-sm tracking-[0.15em]"
                    >
                      <span>Read More</span>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      >
                        <path
                          d="M1 8H15M15 8L8 1M15 8L8 15"
                          stroke="currentColor"
                          strokeWidth="1"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <div className="absolute bottom-32 right-6 lg:right-12 flex gap-2 z-10">
          <button
            onClick={prevSlide}
            className={cn(
              "w-12 h-12 flex items-center justify-center border border-background/40 text-background/80 transition-all duration-300",
              "hover:bg-background/10 hover:border-background"
            )}
            aria-label="Previous slide"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={nextSlide}
            className={cn(
              "w-12 h-12 flex items-center justify-center border border-background/40 text-background/80 transition-all duration-300",
              "hover:bg-background/10 hover:border-background"
            )}
            aria-label="Next slide"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-12 left-6 lg:left-12 flex gap-4 z-10">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className="group flex items-center gap-2"
              aria-label={`Go to slide ${index + 1}`}
            >
              <span
                className={cn(
                  "text-label text-xs transition-all duration-300",
                  currentIndex === index
                    ? "text-background"
                    : "text-background/50 group-hover:text-background/80"
                )}
              >
                0{index + 1}
              </span>
              <span
                className={cn(
                  "h-px transition-all duration-500",
                  currentIndex === index
                    ? "w-12 bg-background"
                    : "w-4 bg-background/30 group-hover:w-8 group-hover:bg-background/60"
                )}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HorizontalSlider;
