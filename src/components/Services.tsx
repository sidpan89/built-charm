import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import ScrollReveal from "./ScrollReveal";

import serviceResidential from "@/assets/service-residential.jpg";
import serviceCommercial from "@/assets/service-commercial.jpg";
import serviceInterior from "@/assets/service-interior.jpg";
import serviceHeritage from "@/assets/service-heritage.jpg";

const services = [
  {
    id: 1,
    category: "Residential",
    title: "Architectural Design",
    description:
      "The most important material with which we design, is light. We create homes that breathe, inspire, and transform everyday living into an extraordinary experience.",
    image: serviceResidential,
  },
  {
    id: 2,
    category: "Commercial",
    title: "Commercial Architecture",
    description:
      "Design is about a way of living, be it at home, in the workplace, relaxing, or entertaining. It is our duty as designers to enhance and encourage social interaction through good design.",
    image: serviceCommercial,
  },
  {
    id: 3,
    category: "Residential & Commercial",
    title: "Interior Design",
    description:
      "We aspire to create an interior experience that is both memorable, and timeless. As architects and designers it is important to focus on the experience of the space we find ourselves.",
    image: serviceInterior,
  },
  {
    id: 4,
    category: "Heritage",
    title: "Conservation & Heritage",
    description:
      "Conservation Architects to transform your heritage property. We honor the past while crafting spaces for modern living, preserving character while enhancing functionality.",
    image: serviceHeritage,
  },
];

const Services = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const checkScrollPosition = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 420;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
      setTimeout(checkScrollPosition, 300);
    }
  };

  return (
    <section id="services" className="py-24 lg:py-32 bg-secondary/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-[600px] h-[600px] rounded-full bg-gradient-to-br from-stone/5 to-transparent blur-3xl -top-48 -right-48 animate-float" />
        <div className="absolute w-[400px] h-[400px] rounded-full bg-gradient-to-br from-muted/10 to-transparent blur-3xl bottom-0 left-1/4 animate-float" style={{ animationDelay: "3s" }} />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative">
        {/* Section Header */}
        <div className="mb-16">
          <ScrollReveal>
            <span className="text-label text-stone mb-4 block tracking-[0.2em]">Our Services</span>
          </ScrollReveal>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <ScrollReveal delay={100}>
              <h2 className="text-display text-4xl md:text-5xl lg:text-6xl text-foreground max-w-2xl">
                What We Do
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={200} direction="right">
              <div className="flex gap-2">
                <button
                  onClick={() => scroll("left")}
                  disabled={!canScrollLeft}
                  className={cn(
                    "w-12 h-12 flex items-center justify-center border border-border transition-all duration-500 group relative overflow-hidden",
                    canScrollLeft
                      ? "hover:border-foreground"
                      : "opacity-30 cursor-not-allowed"
                  )}
                  aria-label="Scroll left"
                >
                  <ChevronLeft size={20} className="relative z-10 transition-transform duration-300 group-hover:-translate-x-0.5" />
                  <span className="absolute inset-0 bg-foreground scale-x-0 origin-right transition-transform duration-500 group-hover:scale-x-100" />
                  <ChevronLeft size={20} className="absolute text-background opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </button>
                <button
                  onClick={() => scroll("right")}
                  disabled={!canScrollRight}
                  className={cn(
                    "w-12 h-12 flex items-center justify-center border border-border transition-all duration-500 group relative overflow-hidden",
                    canScrollRight
                      ? "hover:border-foreground"
                      : "opacity-30 cursor-not-allowed"
                  )}
                  aria-label="Scroll right"
                >
                  <ChevronRight size={20} className="relative z-10 transition-transform duration-300 group-hover:translate-x-0.5" />
                  <span className="absolute inset-0 bg-foreground scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100" />
                  <ChevronRight size={20} className="absolute text-background opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </button>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* Services Carousel */}
        <div
          ref={scrollRef}
          onScroll={checkScrollPosition}
          className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4 -mx-6 px-6"
        >
          {services.map((service, index) => (
            <ScrollReveal
              key={service.id}
              delay={index * 100}
              direction="up"
              className="flex-shrink-0 w-[85vw] md:w-[45vw] lg:w-[380px] snap-start"
            >
              <div
                className="group cursor-pointer"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className="relative overflow-hidden mb-6 aspect-[4/5]">
                  {/* Image */}
                  <img
                    src={service.image}
                    alt={service.title}
                    className={cn(
                      "w-full h-full object-cover transition-all duration-700",
                      hoveredIndex === index ? "scale-110" : "scale-100"
                    )}
                  />
                  
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Glass card on hover */}
                  <div className={cn(
                    "absolute bottom-0 left-0 right-0 p-6 glass transition-all duration-500",
                    hoveredIndex === index ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
                  )}>
                    <span className="text-label text-stone text-xs">Explore →</span>
                  </div>

                  {/* Corner accents */}
                  <div className="absolute top-4 left-4 w-8 h-8">
                    <div className={cn(
                      "absolute top-0 left-0 w-full h-px bg-background transition-all duration-500",
                      hoveredIndex === index ? "scale-x-100" : "scale-x-0"
                    )} style={{ transformOrigin: "left" }} />
                    <div className={cn(
                      "absolute top-0 left-0 h-full w-px bg-background transition-all duration-500 delay-100",
                      hoveredIndex === index ? "scale-y-100" : "scale-y-0"
                    )} style={{ transformOrigin: "top" }} />
                  </div>
                  <div className="absolute bottom-4 right-4 w-8 h-8">
                    <div className={cn(
                      "absolute bottom-0 right-0 w-full h-px bg-background transition-all duration-500",
                      hoveredIndex === index ? "scale-x-100" : "scale-x-0"
                    )} style={{ transformOrigin: "right" }} />
                    <div className={cn(
                      "absolute bottom-0 right-0 h-full w-px bg-background transition-all duration-500 delay-100",
                      hoveredIndex === index ? "scale-y-100" : "scale-y-0"
                    )} style={{ transformOrigin: "bottom" }} />
                  </div>
                </div>
                
                <span className={cn(
                  "text-label text-stone mb-2 block transition-all duration-300",
                  hoveredIndex === index ? "tracking-[0.2em]" : "tracking-[0.15em]"
                )}>
                  {service.category}
                </span>
                <h3 className="font-serif text-2xl text-foreground mb-3 transition-all duration-300 group-hover:translate-x-2">
                  {service.title}
                </h3>
                <p className={cn(
                  "text-body text-muted-foreground text-sm leading-relaxed transition-all duration-500",
                  hoveredIndex === index ? "opacity-100" : "opacity-70"
                )}>
                  {service.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
