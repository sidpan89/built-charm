import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import ScrollReveal from "./ScrollReveal";
import { useStudioPranganaZip } from "@/hooks/useStudioPranganaZip";

import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";
import project4 from "@/assets/project-4.jpg";

type Project = {
  id: number;
  title: string;
  category: string;
  location: string;
  image: string;
};

const fallbackProjects: Project[] = [
  {
    id: 1,
    title: "The Marble Kitchen",
    category: "Residential",
    location: "London",
    image: project1,
  },
  {
    id: 2,
    title: "Glass House",
    category: "Residential",
    location: "Surrey",
    image: project2,
  },
  {
    id: 3,
    title: "Minimal Retreat",
    category: "Interior",
    location: "Chelsea",
    image: project3,
  },
  {
    id: 4,
    title: "The Modern Office",
    category: "Commercial",
    location: "City of London",
    image: project4,
  },
];

const Portfolio = () => {
  const { status, projects: zipProjects, error } = useStudioPranganaZip();
  const projects: Project[] = zipProjects.length > 0 ? zipProjects : fallbackProjects;

  const filters = useMemo(() => {
    const unique = Array.from(new Set(projects.map((p) => p.category).filter(Boolean)));
    return ["All", ...unique];
  }, [projects]);

  const [activeFilter, setActiveFilter] = useState("All");
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  const filteredProjects =
    activeFilter === "All"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

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
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <ScrollReveal delay={100}>
              <h2 className="text-display text-4xl md:text-5xl lg:text-6xl text-foreground">
                Selected Works
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={200} direction="right">
              <div className="flex flex-wrap gap-6">
                {filters.map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={cn(
                      "text-label relative group py-2 transition-colors duration-300",
                      activeFilter === filter
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <span className="relative z-10">{filter}</span>
                    <span
                      className={cn(
                        "absolute bottom-0 left-0 h-px bg-foreground transition-all duration-500",
                        activeFilter === filter ? "w-full" : "w-0 group-hover:w-full"
                      )}
                    />
                  </button>
                ))}
              </div>
            </ScrollReveal>
          </div>

          {status !== "ready" && (
            <div className="mt-6">
              <span className="text-body text-sm text-muted-foreground">
                Loading projects from studio_pragana.zip…
              </span>
            </div>
          )}

          {error && (
            <div className="mt-3">
              <span className="text-body text-sm text-muted-foreground">{error}</span>
            </div>
          )}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {filteredProjects.map((project, index) => (
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
                <div className="relative overflow-hidden mb-6 aspect-square">
                  {/* Image with parallax-like effect */}
                  <img
                    src={project.image}
                    alt={`${project.title} - ${project.category} project`}
                    loading="lazy"
                    className={cn(
                      "w-full h-full object-cover transition-all duration-700",
                      hoveredProject === project.id ? "scale-110" : "scale-100"
                    )}
                  />

                  {/* Overlay gradients */}
                  <div
                    className={cn(
                      "absolute inset-0 bg-gradient-to-t from-foreground/60 via-foreground/20 to-transparent transition-opacity duration-500",
                      hoveredProject === project.id ? "opacity-100" : "opacity-0"
                    )}
                  />

                  {/* Animated corner frames */}
                  <div className="absolute inset-4 pointer-events-none">
                    <div className={cn("absolute top-0 left-0 w-12 h-12 transition-all duration-500")}>
                      <div
                        className={cn(
                          "absolute top-0 left-0 w-full h-px bg-background transition-all duration-500",
                          hoveredProject === project.id ? "scale-x-100" : "scale-x-0"
                        )}
                        style={{ transformOrigin: "left" }}
                      />
                      <div
                        className={cn(
                          "absolute top-0 left-0 h-full w-px bg-background transition-all duration-500 delay-75",
                          hoveredProject === project.id ? "scale-y-100" : "scale-y-0"
                        )}
                        style={{ transformOrigin: "top" }}
                      />
                    </div>
                    <div className="absolute top-0 right-0 w-12 h-12">
                      <div
                        className={cn(
                          "absolute top-0 right-0 w-full h-px bg-background transition-all duration-500",
                          hoveredProject === project.id ? "scale-x-100" : "scale-x-0"
                        )}
                        style={{ transformOrigin: "right" }}
                      />
                      <div
                        className={cn(
                          "absolute top-0 right-0 h-full w-px bg-background transition-all duration-500 delay-75",
                          hoveredProject === project.id ? "scale-y-100" : "scale-y-0"
                        )}
                        style={{ transformOrigin: "top" }}
                      />
                    </div>
                    <div className="absolute bottom-0 left-0 w-12 h-12">
                      <div
                        className={cn(
                          "absolute bottom-0 left-0 w-full h-px bg-background transition-all duration-500",
                          hoveredProject === project.id ? "scale-x-100" : "scale-x-0"
                        )}
                        style={{ transformOrigin: "left" }}
                      />
                      <div
                        className={cn(
                          "absolute bottom-0 left-0 h-full w-px bg-background transition-all duration-500 delay-75",
                          hoveredProject === project.id ? "scale-y-100" : "scale-y-0"
                        )}
                        style={{ transformOrigin: "bottom" }}
                      />
                    </div>
                    <div className="absolute bottom-0 right-0 w-12 h-12">
                      <div
                        className={cn(
                          "absolute bottom-0 right-0 w-full h-px bg-background transition-all duration-500",
                          hoveredProject === project.id ? "scale-x-100" : "scale-x-0"
                        )}
                        style={{ transformOrigin: "right" }}
                      />
                      <div
                        className={cn(
                          "absolute bottom-0 right-0 h-full w-px bg-background transition-all duration-500 delay-75",
                          hoveredProject === project.id ? "scale-y-100" : "scale-y-0"
                        )}
                        style={{ transformOrigin: "bottom" }}
                      />
                    </div>
                  </div>

                  {/* Hover content */}
                  <div
                    className={cn(
                      "absolute inset-0 flex items-center justify-center transition-all duration-500",
                      hoveredProject === project.id ? "opacity-100" : "opacity-0"
                    )}
                  >
                    <div
                      className={cn(
                        "glass px-8 py-4 transition-all duration-500",
                        hoveredProject === project.id ? "scale-100" : "scale-90"
                      )}
                    >
                      <span className="text-label text-foreground flex items-center gap-2">
                        View Project
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
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-start justify-between">
                  <div>
                    <span
                      className={cn(
                        "text-label text-stone mb-1 block text-xs transition-all duration-300",
                        hoveredProject === project.id
                          ? "tracking-[0.2em]"
                          : "tracking-[0.15em]"
                      )}
                    >
                      {project.category}
                    </span>
                    <h3
                      className={cn(
                        "font-serif text-xl lg:text-2xl text-foreground transition-all duration-300",
                        hoveredProject === project.id ? "translate-x-2" : "translate-x-0"
                      )}
                    >
                      {project.title}
                    </h3>
                  </div>
                  <span
                    className={cn(
                      "text-body text-muted-foreground text-sm transition-all duration-300",
                      hoveredProject === project.id
                        ? "opacity-100 translate-x-0"
                        : "opacity-60"
                    )}
                  >
                    {project.location}
                  </span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* View All Link */}
        <ScrollReveal delay={400}>
          <div className="mt-16 text-center">
            <a
              href="#"
              className="group inline-flex items-center gap-3 text-label text-foreground relative overflow-hidden"
            >
              <span className="relative">
                View All Projects
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
