import { useState } from "react";
import { cn } from "@/lib/utils";

import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";
import project4 from "@/assets/project-4.jpg";

const projects = [
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

const filters = ["All", "Residential", "Commercial", "Interior"];

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredProjects =
    activeFilter === "All"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <section id="portfolio" className="py-24 lg:py-32">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="mb-16">
          <span className="text-label text-stone mb-4 block">Portfolio</span>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <h2 className="text-display text-4xl md:text-5xl lg:text-6xl text-foreground">
              Selected Works
            </h2>
            <div className="flex gap-6">
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={cn(
                    "text-label transition-colors duration-300",
                    activeFilter === filter
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className="group cursor-pointer"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative overflow-hidden mb-6 aspect-square">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors duration-500" />
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <span className="text-label text-background bg-foreground px-6 py-3">
                    View Project
                  </span>
                </div>
              </div>
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-label text-stone mb-1 block text-xs">
                    {project.category}
                  </span>
                  <h3 className="font-serif text-xl lg:text-2xl text-foreground">
                    {project.title}
                  </h3>
                </div>
                <span className="text-body text-muted-foreground text-sm">
                  {project.location}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* View All Link */}
        <div className="mt-16 text-center">
          <a
            href="#"
            className="inline-flex items-center gap-3 text-label text-foreground border-b border-foreground pb-1 hover:text-stone hover:border-stone transition-colors duration-300"
          >
            View All Projects
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
          </a>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
