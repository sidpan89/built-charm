const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-16 lg:py-24 bg-foreground text-background">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Logo & Tagline */}
          <div className="lg:col-span-2">
            <a href="/" className="font-serif text-2xl tracking-[0.1em] mb-4 inline-block">
              Studio Prangana
            </a>
            <p className="text-body text-sm opacity-60 max-w-sm mt-4">
              An architectural and interior design studio creating
              spaces that inspire, elevate, and transform.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <span className="text-label text-stone text-xs tracking-[0.2em] mb-6 block">
              Quick Links
            </span>
            <nav className="flex flex-col gap-3">
              {["Portfolio", "About", "Team", "Contact"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-body text-sm opacity-60 hover:opacity-100 transition-opacity duration-300 inline-flex items-center gap-2 group"
                >
                  <span className="w-0 h-px bg-background transition-all duration-300 group-hover:w-4" />
                  {item}
                </a>
              ))}
            </nav>
          </div>

          {/* Social */}
          <div>
            <span className="text-label text-stone text-xs tracking-[0.2em] mb-6 block">
              Follow Us
            </span>
            <nav className="flex flex-col gap-3">
              <a
                href="https://www.instagram.com/studio_prangana/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-body text-sm opacity-60 hover:opacity-100 transition-opacity duration-300 inline-flex items-center gap-2 group"
              >
                <span className="w-0 h-px bg-background transition-all duration-300 group-hover:w-4" />
                Instagram
              </a>
              <a
                href="#"
                className="text-body text-sm opacity-60 hover:opacity-100 transition-opacity duration-300 inline-flex items-center gap-2 group"
              >
                <span className="w-0 h-px bg-background transition-all duration-300 group-hover:w-4" />
                LinkedIn
              </a>
            </nav>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-background/20 flex flex-col md:flex-row justify-between gap-4">
          <p className="text-body text-xs opacity-40">
            © {currentYear} Studio Prangana. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a
              href="#"
              className="text-body text-xs opacity-40 hover:opacity-100 transition-opacity duration-300"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-body text-xs opacity-40 hover:opacity-100 transition-opacity duration-300"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
