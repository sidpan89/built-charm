import ScrollReveal from "./ScrollReveal";
import MagneticButton from "./MagneticButton";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-16 lg:py-24 bg-foreground text-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-[400px] h-[400px] rounded-full bg-gradient-to-br from-background/5 to-transparent blur-3xl -top-48 right-1/4 animate-float" />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Logo & Tagline */}
          <ScrollReveal className="lg:col-span-2">
            <MagneticButton strength={0.1}>
              <a href="/" className="font-serif text-2xl tracking-wider mb-4 inline-block group">
                {"ARCH".split("").map((letter, i) => (
                  <span
                    key={i}
                    className="inline-block transition-transform duration-300 group-hover:-translate-y-1"
                    style={{ transitionDelay: `${i * 30}ms` }}
                  >
                    {letter}
                  </span>
                ))}
                <span className="text-stone mx-0.5 transition-all duration-300 group-hover:rotate-180 inline-block">+</span>
                {"STUDIO".split("").map((letter, i) => (
                  <span
                    key={i}
                    className="inline-block transition-transform duration-300 group-hover:-translate-y-1"
                    style={{ transitionDelay: `${(i + 5) * 30}ms` }}
                  >
                    {letter}
                  </span>
                ))}
              </a>
            </MagneticButton>
            <p className="text-body text-sm opacity-60 max-w-sm mt-4">
              An award-winning architectural and interior design studio creating
              spaces that inspire, elevate, and transform.
            </p>
          </ScrollReveal>

          {/* Quick Links */}
          <ScrollReveal delay={100}>
            <span className="text-label text-stone mb-6 block text-xs tracking-[0.2em]">
              Quick Links
            </span>
            <nav className="flex flex-col gap-3">
              {["Services", "Portfolio", "About", "Contact"].map((item, index) => (
                <MagneticButton key={item} strength={0.15}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="text-body text-sm opacity-60 hover:opacity-100 transition-all duration-300 inline-flex items-center gap-2 group"
                  >
                    <span className="w-0 h-px bg-background transition-all duration-300 group-hover:w-4" />
                    {item}
                  </a>
                </MagneticButton>
              ))}
            </nav>
          </ScrollReveal>

          {/* Social */}
          <ScrollReveal delay={200}>
            <span className="text-label text-stone mb-6 block text-xs tracking-[0.2em]">
              Follow Us
            </span>
            <nav className="flex flex-col gap-3">
              {["Instagram", "LinkedIn", "Pinterest"].map((item) => (
                <MagneticButton key={item} strength={0.15}>
                  <a
                    href="#"
                    className="text-body text-sm opacity-60 hover:opacity-100 transition-all duration-300 inline-flex items-center gap-2 group"
                  >
                    <span className="w-0 h-px bg-background transition-all duration-300 group-hover:w-4" />
                    {item}
                  </a>
                </MagneticButton>
              ))}
            </nav>
          </ScrollReveal>
        </div>

        {/* Bottom Bar */}
        <ScrollReveal delay={300}>
          <div className="pt-8 border-t border-background/20 flex flex-col md:flex-row justify-between gap-4">
            <p className="text-body text-xs opacity-40">
              © {currentYear} Arch+Studio. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a
                href="#"
                className="text-body text-xs opacity-40 hover:opacity-100 transition-opacity duration-300 reveal-line"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-body text-xs opacity-40 hover:opacity-100 transition-opacity duration-300 reveal-line"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </footer>
  );
};

export default Footer;
