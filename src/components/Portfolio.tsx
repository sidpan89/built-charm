import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import ScrollReveal from "./ScrollReveal";

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

const InstagramEmbed = ({ embedId, title }: { embedId: string; title: string }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Load Instagram embed script
    if (typeof window !== 'undefined' && !(window as any).instgrm) {
      const script = document.createElement('script');
      script.src = 'https://www.instagram.com/embed.js';
      script.async = true;
      script.onload = () => {
        if ((window as any).instgrm) {
          (window as any).instgrm.Embeds.process();
        }
        setLoaded(true);
      };
      document.body.appendChild(script);
    } else if ((window as any).instgrm) {
      (window as any).instgrm.Embeds.process();
      setLoaded(true);
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

const Portfolio = () => {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  return (
    <section id="portfolio" className="py-24 lg:py-32 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-[800px] h-[800px] rounded-full bg-gradient-to-br from-muted/30 to-transparent blur-3xl -bottom-96 -left-48 animate-morph" />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative">
        {/* Section Header */}
        <div className="mb-16">
          <ScrollReveal>
            <span className="text-label text-stone mb-4 block tracking-[0.2em]">
              Portfolio
            </span>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <h2 className="text-display text-4xl md:text-5xl lg:text-6xl text-foreground">
              Selected Works
            </h2>
          </ScrollReveal>
        </div>

        {/* Projects List */}
        <div className="space-y-24">
          {projects.map((project, index) => (
            <ScrollReveal
              key={project.id}
              delay={index * 150}
              direction={index % 2 === 0 ? "left" : "right"}
            >
              <div
                className="group cursor-pointer relative"
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                {/* Project Header */}
                <div className="mb-8">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-4">
                    <div>
                      <span
                        className={cn(
                          "text-label text-stone mb-2 block text-xs transition-all duration-300",
                          hoveredProject === project.id
                            ? "tracking-[0.2em]"
                            : "tracking-[0.15em]"
                        )}
                      >
                        {project.category}
                      </span>
                      <h3
                        className={cn(
                          "font-serif text-2xl lg:text-3xl xl:text-4xl text-foreground transition-all duration-300",
                          hoveredProject === project.id ? "translate-x-2" : "translate-x-0"
                        )}
                      >
                        {project.title}
                      </h3>
                    </div>
                    <span
                      className={cn(
                        "text-body text-muted-foreground text-sm transition-all duration-300 lg:text-right",
                        hoveredProject === project.id
                          ? "opacity-100 translate-x-0"
                          : "opacity-60"
                      )}
                    >
                      {project.location}
                    </span>
                  </div>
                  <p className="text-body text-muted-foreground max-w-3xl leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Instagram Embed */}
                <div className="rounded-lg overflow-hidden">
                  <InstagramEmbed embedId={project.instagramEmbedId} title={project.title} />
                </div>

                {/* View on Instagram Link */}
                <div className="mt-6">
                  <a
                    href={project.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/link inline-flex items-center gap-2 text-label text-foreground hover:text-stone transition-colors duration-300"
                  >
                    <span className="relative">
                      View on Instagram
                      <span className="absolute bottom-0 left-0 w-full h-px bg-foreground scale-x-0 group-hover/link:scale-x-100 transition-transform duration-300 origin-left" />
                    </span>
                    <svg
                      width="16"
                      height="16"
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
                </div>

                {/* Divider */}
                {index < projects.length - 1 && (
                  <div className="mt-16 h-px bg-border/50" />
                )}
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* View All Link */}
        <ScrollReveal delay={400}>
          <div className="mt-16 text-center">
            <a
              href="https://www.instagram.com/studio_prangana/"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 text-label text-foreground relative overflow-hidden"
            >
              <span className="relative">
                View All Projects on Instagram
                <span className="absolute bottom-0 left-0 w-full h-px bg-foreground scale-x-100 group-hover:scale-x-0 transition-transform duration-500 origin-right" />
                <span className="absolute bottom-0 left-0 w-full h-px bg-stone scale-x-0 group-hover:scale-x-100 transition-transform duration-500 delay-200 origin-left" />
              </span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                className="transition-transform duration-300 group-hover:translate-x-2"
              >
                <path
                  d="M1 8H15M15 8L8 1M15 8L8 15"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default Portfolio;
