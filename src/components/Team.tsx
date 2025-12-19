import { useRef, useEffect, useState } from "react";
import ScrollReveal from "./ScrollReveal";
import { cn } from "@/lib/utils";

import teamMithileshwar from "@/assets/team-mithileshwar.png";
import teamManaswini from "@/assets/team-manaswini.png";
import teamKrishna from "@/assets/team-krishna.png";
import teamAnusha from "@/assets/team-anusha.png";

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

const TeamCard = ({ member, index }: { member: TeamMember; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePosition({ x, y });
  };

  return (
    <ScrollReveal delay={index * 150} direction="up">
      <div
        ref={cardRef}
        className="group relative cursor-pointer perspective-1000"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setMousePosition({ x: 0, y: 0 });
        }}
        onMouseMove={handleMouseMove}
        style={{
          transform: isHovered
            ? `rotateY(${mousePosition.x * 15}deg) rotateX(${-mousePosition.y * 15}deg) translateZ(20px)`
            : "rotateY(0) rotateX(0) translateZ(0)",
          transition: "transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)",
          transformStyle: "preserve-3d",
        }}
      >
        {/* Glow effect */}
        <div
          className={cn(
            "absolute -inset-4 rounded-2xl bg-gradient-to-br from-stone/30 via-transparent to-muted/30 blur-xl transition-opacity duration-700",
            isHovered ? "opacity-100" : "opacity-0"
          )}
          style={{
            transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px)`,
          }}
        />

        {/* Card container */}
        <div className="relative overflow-hidden bg-card rounded-lg">
          {/* Image container with parallax */}
          <div className="relative aspect-[4/5] overflow-hidden">
            <img
              src={member.image}
              alt={`${member.name} - ${member.role}`}
              loading="lazy"
              className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
              style={{
                transform: isHovered
                  ? `scale(1.1) translate(${mousePosition.x * -15}px, ${mousePosition.y * -15}px)`
                  : "scale(1)",
              }}
            />

            {/* Overlay gradients */}
            <div
              className={cn(
                "absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/40 to-transparent transition-all duration-500",
                isHovered ? "opacity-100" : "opacity-60"
              )}
            />

            {/* Liquid glass effect */}
            <div
              className={cn(
                "absolute inset-0 backdrop-blur-sm bg-background/10 transition-all duration-700",
                isHovered ? "opacity-100" : "opacity-0"
              )}
              style={{
                clipPath: isHovered
                  ? "circle(150% at 50% 100%)"
                  : "circle(0% at 50% 100%)",
                transition:
                  "clip-path 0.8s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.5s ease",
              }}
            />

            {/* Content overlay */}
            <div className="absolute inset-0 flex flex-col justify-end p-6">
              <h3
                className="font-serif text-2xl text-background mb-1 transition-all duration-500"
                style={{
                  transform: isHovered ? "translateY(-8px)" : "translateY(0)",
                }}
              >
                {member.name}
              </h3>
              <p
                className="text-label text-stone text-xs mb-3 transition-all duration-500"
                style={{
                  transform: isHovered ? "translateY(-8px)" : "translateY(0)",
                  transitionDelay: "50ms",
                }}
              >
                {member.role}
              </p>

              {/* Bio - appears on hover */}
              <p
                className={cn(
                  "text-body text-sm text-background/80 leading-relaxed transition-all duration-500",
                  isHovered
                    ? "opacity-100 translate-y-0 max-h-40"
                    : "opacity-0 translate-y-4 max-h-0 overflow-hidden"
                )}
                style={{ transitionDelay: "100ms" }}
              >
                {member.bio}
              </p>
            </div>

            {/* Floating particles on hover */}
            {isHovered && (
              <>
                <div
                  className="absolute w-2 h-2 rounded-full bg-stone/50 animate-float"
                  style={{ top: "20%", left: "15%", animationDelay: "0s" }}
                />
                <div
                  className="absolute w-3 h-3 rounded-full bg-background/30 animate-float"
                  style={{ top: "40%", right: "20%", animationDelay: "1s" }}
                />
                <div
                  className="absolute w-1.5 h-1.5 rounded-full bg-stone/40 animate-float"
                  style={{ bottom: "30%", left: "25%", animationDelay: "2s" }}
                />
              </>
            )}
          </div>
        </div>

        {/* 3D shadow effect */}
        <div
          className={cn(
            "absolute -bottom-4 left-4 right-4 h-8 bg-foreground/20 blur-xl rounded-full transition-all duration-500",
            isHovered ? "opacity-60 scale-90" : "opacity-30 scale-100"
          )}
          style={{
            transform: `translateY(${isHovered ? 8 : 0}px)`,
          }}
        />
      </div>
    </ScrollReveal>
  );
};

const Team = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const members: TeamMember[] = teamMembers;

  useEffect(() => {
    const observer = new IntersectionObserver(() => undefined, { threshold: 0.1 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="team"
      ref={sectionRef}
      className="py-24 lg:py-32 bg-background relative overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute w-[600px] h-[600px] rounded-full bg-gradient-to-br from-stone/5 to-transparent blur-3xl animate-morph"
          style={{ top: "-10%", left: "-10%" }}
        />
        <div
          className="absolute w-[400px] h-[400px] rounded-full bg-gradient-to-br from-muted/20 to-transparent blur-3xl animate-float"
          style={{ bottom: "10%", right: "5%", animationDelay: "3s" }}
        />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
                            linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative">
        {/* Section Header */}
        <div className="text-center mb-16 lg:mb-24">
          <ScrollReveal>
            <span className="text-label text-stone mb-4 block tracking-[0.3em]">
              Our Team
            </span>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <h2 className="text-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-6">
              The Creative
              <br />
              <span className="text-gradient-animate">Minds Behind</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <p className="text-body text-lg text-muted-foreground max-w-2xl mx-auto">
              A passionate team of architects, designers, and visionaries dedicated
              to crafting exceptional spaces that inspire and endure.
            </p>
          </ScrollReveal>
        </div>

        {/* Team Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {members.map((member, index) => (
            <TeamCard key={`${member.name}-${index}`} member={member} index={index} />
          ))}
        </div>

        {/* Bottom decorative line */}
        <ScrollReveal delay={600}>
          <div className="mt-24 flex items-center justify-center gap-8">
            <div className="h-px w-16 bg-border" />
            <span className="text-label text-muted-foreground text-xs">
              Together We Create
            </span>
            <div className="h-px w-16 bg-border" />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default Team;
