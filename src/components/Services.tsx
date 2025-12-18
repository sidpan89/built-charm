import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

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

  const checkScrollPosition = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 400;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
      setTimeout(checkScrollPosition, 300);
    }
  };

  return (
    <section id="services" className="py-24 lg:py-32 bg-secondary/30">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="mb-16">
          <span className="text-label text-stone mb-4 block">Our Services</span>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <h2 className="text-display text-4xl md:text-5xl lg:text-6xl text-foreground max-w-2xl">
              What We Do
            </h2>
            <div className="flex gap-2">
              <button
                onClick={() => scroll("left")}
                disabled={!canScrollLeft}
                className={cn(
                  "w-12 h-12 flex items-center justify-center border border-border transition-all duration-300",
                  canScrollLeft
                    ? "hover:bg-foreground hover:text-background"
                    : "opacity-30 cursor-not-allowed"
                )}
                aria-label="Scroll left"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={() => scroll("right")}
                disabled={!canScrollRight}
                className={cn(
                  "w-12 h-12 flex items-center justify-center border border-border transition-all duration-300",
                  canScrollRight
                    ? "hover:bg-foreground hover:text-background"
                    : "opacity-30 cursor-not-allowed"
                )}
                aria-label="Scroll right"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Services Carousel */}
        <div
          ref={scrollRef}
          onScroll={checkScrollPosition}
          className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4"
        >
          {services.map((service, index) => (
            <div
              key={service.id}
              className="flex-shrink-0 w-[85vw] md:w-[45vw] lg:w-[380px] snap-start group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative overflow-hidden mb-6 aspect-[4/5]">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors duration-300" />
              </div>
              <span className="text-label text-stone mb-2 block">
                {service.category}
              </span>
              <h3 className="font-serif text-2xl text-foreground mb-3">
                {service.title}
              </h3>
              <p className="text-body text-muted-foreground text-sm leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
