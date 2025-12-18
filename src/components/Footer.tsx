const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-16 lg:py-24 bg-foreground text-background">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Logo & Tagline */}
          <div className="lg:col-span-2">
            <span className="font-serif text-2xl tracking-wider mb-4 block">
              ARCH<span className="text-stone">+</span>STUDIO
            </span>
            <p className="text-body text-sm opacity-70 max-w-sm">
              An award-winning architectural and interior design studio creating
              spaces that inspire, elevate, and transform.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <span className="text-label text-stone mb-6 block text-xs">
              Quick Links
            </span>
            <nav className="flex flex-col gap-3">
              <a
                href="#services"
                className="text-body text-sm opacity-70 hover:opacity-100 transition-opacity duration-300"
              >
                Services
              </a>
              <a
                href="#portfolio"
                className="text-body text-sm opacity-70 hover:opacity-100 transition-opacity duration-300"
              >
                Portfolio
              </a>
              <a
                href="#about"
                className="text-body text-sm opacity-70 hover:opacity-100 transition-opacity duration-300"
              >
                About
              </a>
              <a
                href="#contact"
                className="text-body text-sm opacity-70 hover:opacity-100 transition-opacity duration-300"
              >
                Contact
              </a>
            </nav>
          </div>

          {/* Social */}
          <div>
            <span className="text-label text-stone mb-6 block text-xs">
              Follow Us
            </span>
            <nav className="flex flex-col gap-3">
              <a
                href="#"
                className="text-body text-sm opacity-70 hover:opacity-100 transition-opacity duration-300"
              >
                Instagram
              </a>
              <a
                href="#"
                className="text-body text-sm opacity-70 hover:opacity-100 transition-opacity duration-300"
              >
                LinkedIn
              </a>
              <a
                href="#"
                className="text-body text-sm opacity-70 hover:opacity-100 transition-opacity duration-300"
              >
                Pinterest
              </a>
            </nav>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-background/20 flex flex-col md:flex-row justify-between gap-4">
          <p className="text-body text-xs opacity-50">
            © {currentYear} Arch+Studio. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a
              href="#"
              className="text-body text-xs opacity-50 hover:opacity-100 transition-opacity duration-300"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-body text-xs opacity-50 hover:opacity-100 transition-opacity duration-300"
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
