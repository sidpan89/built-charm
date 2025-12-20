import { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";

import teamMithileshwar from "@/assets/team-mithileshwar-ram-krishna.png";
import teamManaswini from "@/assets/team-manaswini-na.png";
import teamKrishna from "@/assets/team-krishna-telkar.png";
import teamAnusha from "@/assets/team-anusha-kl.png";

interface TeamProps {
  onBack?: () => void;
}

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "Mithileshwar Ram Krishna",
    role: "Co‑Founder · Partner · Principal Architect",
    bio: "Leading visionary architect with expertise in contemporary design and sustainable building practices.",
    image: teamMithileshwar,
  },
  {
    name: "Manaswini N A",
    role: "Co‑Founder · Principal Architect",
    bio: "Creative force behind innovative architectural solutions that blend tradition with modernity.",
    image: teamManaswini,
  },
  {
    name: "Krishna Telkar",
    role: "Co‑Founder · Principal Architect",
    bio: "Expert in structural design and project management, ensuring excellence in every build.",
    image: teamKrishna,
  },
  {
    name: "Anusha K L",
    role: "Junior Architect",
    bio: "Passionate emerging architect contributing fresh perspectives and innovative design ideas.",
    image: teamAnusha,
  },
];

const Team = ({ onBack }: TeamProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      id="team"
      ref={sectionRef}
      className="min-h-screen py-24 lg:py-32 bg-secondary"
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
        <div className="mb-16 lg:mb-24 text-center">
          <span
            className={cn(
              "text-label text-charcoal/50 text-xs tracking-[0.3em] mb-4 block transition-all duration-700",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
          >
            Our Team
          </span>
          <h2
            className={cn(
              "font-serif text-4xl md:text-5xl lg:text-6xl text-charcoal mb-6 transition-all duration-700 delay-100",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
          >
            The Creative Minds
          </h2>
          <p
            className={cn(
              "text-body text-lg text-charcoal/60 max-w-2xl mx-auto transition-all duration-700 delay-200",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
          >
            A passionate team of architects, designers, and visionaries dedicated
            to crafting exceptional spaces.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {teamMembers.map((member, index) => (
            <article
              key={member.name}
              className={cn(
                "group cursor-pointer transition-all duration-700",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              )}
              style={{ transitionDelay: `${300 + index * 100}ms` }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Image Container */}
              <div className="relative aspect-[4/5] overflow-hidden mb-6">
                <img
                  src={member.image}
                  alt={`${member.name} - ${member.role}`}
                  loading="lazy"
                  className={cn(
                    "w-full h-full object-cover transition-all duration-700",
                    hoveredIndex === index ? "scale-105" : "scale-100"
                  )}
                />
                <div
                  className={cn(
                    "absolute inset-0 bg-charcoal/30 transition-opacity duration-500",
                    hoveredIndex === index ? "opacity-100" : "opacity-0"
                  )}
                />
                
                {/* Bio Overlay */}
                <div
                  className={cn(
                    "absolute inset-0 flex items-end p-6 transition-all duration-500",
                    hoveredIndex === index ? "opacity-100" : "opacity-0"
                  )}
                >
                  <p className="text-body text-sm text-background/90 leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              </div>

              {/* Info */}
              <h3
                className={cn(
                  "font-serif text-xl text-charcoal mb-1 transition-all duration-300",
                  hoveredIndex === index ? "translate-x-2" : ""
                )}
              >
                {member.name}
              </h3>
              <p className="text-label text-charcoal/50 text-xs tracking-[0.1em]">
                {member.role}
              </p>
            </article>
          ))}
        </div>

        {/* Bottom Tag */}
        <div
          className={cn(
            "mt-24 flex items-center justify-center gap-8 transition-all duration-700",
            isVisible ? "opacity-100" : "opacity-0"
          )}
          style={{ transitionDelay: "800ms" }}
        >
          <div className="h-px w-12 bg-charcoal/20" />
          <span className="text-label text-charcoal/40 text-xs tracking-[0.2em]">
            Together We Create
          </span>
          <div className="h-px w-12 bg-charcoal/20" />
        </div>
      </div>
    </section>
  );
};

export default Team;
