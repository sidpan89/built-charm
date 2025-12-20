import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";

interface PortfolioProps {
  onBack?: () => void;
}

type Project = {
  id: number;
  title: string;
  description: string;
  category: string;
  location: string;
  instagramUrl: string;
  instagramEmbedId: string;
};

const projects: Project[] = [
  {
    id: 1,
    title: "Chitradurga Louvered Fins",
    description: "A climate-smart, operable fin mechanism designed for a private residence in Chitradurga, Karnataka — balancing privacy, shade and breeze with a sculptural facade.",
    category: "Residential",
    location: "Chitradurga, Karnataka",
    instagramUrl: "https://www.instagram.com/reel/CsqcXA7JAiz/",
    instagramEmbedId: "CsqcXA7JAiz",
  },
  {
    id: 2,
    title: "Curved Terrace Garden",
    description: "Crafting stunning terrace spaces with flowing curves and dynamic shadows. Fabrication transforms rooftops into gardens and party decks — where art and function meet.",
    category: "Landscape",
    location: "Bangalore",
    instagramUrl: "https://www.instagram.com/reel/DMe3JZVSQcu/",
    instagramEmbedId: "DMe3JZVSQcu",
  },
  {
    id: 3,
    title: "Kala Residence",
    description: "Raw textures. Honest materials. At Kala Residence, the play of brick and concrete finds quiet balance.",
    category: "Residential",
    location: "Bangalore",
    instagramUrl: "https://www.instagram.com/studio_prangana/reel/DP6akrHgqUS/",
    instagramEmbedId: "DP6akrHgqUS",
  },
];

const InstagramEmbed = ({ embedId }: { embedId: string }) => {
  useEffect(() => {
    if (typeof window !== 'undefined' && !(window as any).instgrm) {
      const script = document.createElement('script');
      script.src = 'https://www.instagram.com/embed.js';
      script.async = true;
      script.onload = () => {
        if ((window as any).instgrm) {
          (window as any).instgrm.Embeds.process();
        }
      };
      document.body.appendChild(script);
    } else if ((window as any).instgrm) {
      (window as any).instgrm.Embeds.process();
    }
  }, [embedId]);

  return (
    <div className="w-full flex justify-center">
      <blockquote
        className="instagram-media"
        data-instgrm-captioned
        data-instgrm-permalink={`https://www.instagram.com/reel/${embedId}/`}
        data-instgrm-version="14"
        style={{
          background: '#FFF',
          border: 0,
          borderRadius: '3px',
          boxShadow: '0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15)',
          margin: '1px',
          maxWidth: '540px',
          minWidth: '326px',
          padding: 0,
          width: '99.375%',
        }}
      >
        <div style={{ padding: '16px' }}>
          <a
            href={`https://www.instagram.com/reel/${embedId}/`}
            style={{
              background: '#FFFFFF',
              lineHeight: 0,
              padding: '0 0',
              textAlign: 'center',
              textDecoration: 'none',
              width: '100%',
            }}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                <svg className="w-5 h-5 text-muted-foreground" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z"/>
                </svg>
              </div>
              <span className="text-sm text-foreground font-medium">View on Instagram</span>
            </div>
          </a>
        </div>
      </blockquote>
    </div>
  );
};

const Portfolio = ({ onBack }: PortfolioProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      id="portfolio"
      ref={sectionRef}
      className="min-h-screen py-24 lg:py-32 bg-cream"
    >
      <div className="container mx-auto px-6 lg:px-12">
        {/* Back button */}
        {onBack && (
          <button
            onClick={onBack}
            className={cn(
              "flex items-center gap-2 text-label text-charcoal/60 text-xs tracking-[0.15em] hover:text-charcoal transition-all duration-500 mb-12",
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
            )}
          >
            <ArrowLeft size={16} />
            <span>Back to Home</span>
          </button>
        )}

        {/* Section Header */}
        <div className="mb-16 lg:mb-24">
          <span
            className={cn(
              "text-label text-charcoal/50 text-xs tracking-[0.3em] mb-4 block transition-all duration-700",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
          >
            Portfolio
          </span>
          <h2
            className={cn(
              "font-serif text-4xl md:text-5xl lg:text-6xl text-charcoal transition-all duration-700 delay-100",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
          >
            Selected Works
          </h2>
        </div>

        {/* Projects List */}
        <div className="space-y-24 lg:space-y-32">
          {projects.map((project, index) => (
            <article
              key={project.id}
              className={cn(
                "group transition-all duration-700",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              )}
              style={{ transitionDelay: `${200 + index * 150}ms` }}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              {/* Project Header */}
              <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 mb-8">
                <div>
                  <span
                    className={cn(
                      "text-label text-charcoal/50 text-xs tracking-[0.2em] mb-2 block transition-all duration-300",
                      hoveredProject === project.id ? "tracking-[0.25em]" : ""
                    )}
                  >
                    {project.category}
                  </span>
                  <h3
                    className={cn(
                      "font-serif text-2xl lg:text-3xl xl:text-4xl text-charcoal transition-all duration-300",
                      hoveredProject === project.id ? "translate-x-2" : ""
                    )}
                  >
                    {project.title}
                  </h3>
                </div>
                <div className="flex flex-col justify-end">
                  <p className="text-body text-charcoal/60 leading-relaxed">
                    {project.description}
                  </p>
                  <span className="text-label text-charcoal/40 text-xs tracking-[0.15em] mt-4">
                    {project.location}
                  </span>
                </div>
              </div>

              {/* Instagram Embed */}
              <div className="rounded-sm overflow-hidden">
                <InstagramEmbed embedId={project.instagramEmbedId} />
              </div>

              {/* View Link */}
              <div className="mt-6 flex justify-between items-center">
                <a
                  href={project.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/link inline-flex items-center gap-2 text-label text-charcoal text-xs tracking-[0.15em]"
                >
                  <span className="relative">
                    View on Instagram
                    <span className="absolute bottom-0 left-0 w-full h-px bg-charcoal scale-x-0 group-hover/link:scale-x-100 transition-transform duration-300 origin-left" />
                  </span>
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="transition-transform duration-300 group-hover/link:translate-x-1"
                  >
                    <path
                      d="M7 17L17 7M17 7H7M17 7V17"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
                <span className="text-label text-charcoal/30 text-xs">
                  0{index + 1}
                </span>
              </div>

              {/* Divider */}
              {index < projects.length - 1 && (
                <div className="mt-16 lg:mt-24 h-px bg-charcoal/10" />
              )}
            </article>
          ))}
        </div>

        {/* View All Link */}
        <div
          className={cn(
            "mt-24 text-center transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}
          style={{ transitionDelay: "800ms" }}
        >
          <a
            href="https://www.instagram.com/studio_prangana/"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 text-label text-charcoal text-sm tracking-[0.15em]"
          >
            <span className="relative">
              View All Projects
              <span className="absolute bottom-0 left-0 w-full h-px bg-charcoal" />
              <span className="absolute bottom-0 left-0 w-full h-px bg-stone scale-x-0 origin-right transition-transform duration-500 group-hover:scale-x-100 group-hover:origin-left" />
            </span>
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
    </section>
  );
};

export default Portfolio;
