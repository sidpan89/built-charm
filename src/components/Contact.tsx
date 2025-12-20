import { useState, useRef, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const Contact = () => {
  const { toast } = useToast();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: "",
    message: "",
  });
  const [focusedField, setFocusedField] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message sent",
      description: "Thank you for your inquiry. We'll be in touch soon.",
    });
    setFormData({ name: "", email: "", phone: "", projectType: "", message: "" });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-24 lg:py-32 bg-background"
    >
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left Column - Info */}
          <div>
            <span
              className={cn(
                "text-label text-stone text-xs tracking-[0.3em] mb-4 block transition-all duration-700",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              )}
            >
              Contact
            </span>
            <h2
              className={cn(
                "font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-8 transition-all duration-700 delay-100",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              )}
            >
              Let's Create
              <br />
              Something Together
            </h2>
            <p
              className={cn(
                "text-body text-lg text-muted-foreground mb-12 max-w-md transition-all duration-700 delay-200",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              )}
            >
              Contact us and let us know about your project, or find out more
              about our services.
            </p>

            <div className="space-y-8">
              <div
                className={cn(
                  "group transition-all duration-700 delay-300",
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                )}
              >
                <span className="text-label text-stone text-xs tracking-[0.15em] mb-2 block">
                  Email
                </span>
                <a
                  href="mailto:hello@studioprangana.com"
                  className="text-body text-lg text-foreground inline-flex items-center gap-2 group-hover:gap-4 transition-all duration-300"
                >
                  hello@studioprangana.com
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    <path
                      d="M1 11L11 1M11 1H3M11 1V9"
                      stroke="currentColor"
                      strokeWidth="1"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                    />
                  </svg>
                </a>
              </div>
              <div
                className={cn(
                  "group transition-all duration-700 delay-400",
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                )}
              >
                <span className="text-label text-stone text-xs tracking-[0.15em] mb-2 block">
                  Phone
                </span>
                <a
                  href="tel:+919876543210"
                  className="text-body text-lg text-foreground"
                >
                  +91 98765 43210
                </a>
              </div>
              <div
                className={cn(
                  "transition-all duration-700 delay-500",
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                )}
              >
                <span className="text-label text-stone text-xs tracking-[0.15em] mb-2 block">
                  Studio
                </span>
                <address className="text-body text-lg text-foreground not-italic">
                  Bangalore, Karnataka
                  <br />
                  India
                </address>
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div
            className={cn(
              "transition-all duration-700 delay-300",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
          >
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="relative">
                  <label
                    htmlFor="name"
                    className={cn(
                      "text-label text-xs tracking-[0.1em] absolute left-0 transition-all duration-300",
                      focusedField === "name" || formData.name
                        ? "-top-5 text-stone"
                        : "top-4 text-muted-foreground"
                    )}
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("name")}
                    onBlur={() => setFocusedField(null)}
                    required
                    className="w-full px-0 py-4 bg-transparent border-0 border-b border-border text-foreground focus:outline-none focus:border-foreground transition-colors duration-300"
                  />
                </div>
                <div className="relative">
                  <label
                    htmlFor="email"
                    className={cn(
                      "text-label text-xs tracking-[0.1em] absolute left-0 transition-all duration-300",
                      focusedField === "email" || formData.email
                        ? "-top-5 text-stone"
                        : "top-4 text-muted-foreground"
                    )}
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField(null)}
                    required
                    className="w-full px-0 py-4 bg-transparent border-0 border-b border-border text-foreground focus:outline-none focus:border-foreground transition-colors duration-300"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="relative">
                  <label
                    htmlFor="phone"
                    className={cn(
                      "text-label text-xs tracking-[0.1em] absolute left-0 transition-all duration-300",
                      focusedField === "phone" || formData.phone
                        ? "-top-5 text-stone"
                        : "top-4 text-muted-foreground"
                    )}
                  >
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("phone")}
                    onBlur={() => setFocusedField(null)}
                    className="w-full px-0 py-4 bg-transparent border-0 border-b border-border text-foreground focus:outline-none focus:border-foreground transition-colors duration-300"
                  />
                </div>
                <div className="relative">
                  <label
                    htmlFor="projectType"
                    className="text-label text-stone text-xs tracking-[0.1em] absolute left-0 -top-5"
                  >
                    Project Type
                  </label>
                  <select
                    id="projectType"
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    className="w-full px-0 py-4 bg-transparent border-0 border-b border-border text-foreground focus:outline-none focus:border-foreground transition-colors duration-300 cursor-pointer"
                  >
                    <option value="" className="bg-background">Select type</option>
                    <option value="residential" className="bg-background">Residential</option>
                    <option value="commercial" className="bg-background">Commercial</option>
                    <option value="interior" className="bg-background">Interior Design</option>
                    <option value="heritage" className="bg-background">Heritage & Conservation</option>
                  </select>
                </div>
              </div>

              <div className="relative">
                <label
                  htmlFor="message"
                  className={cn(
                    "text-label text-xs tracking-[0.1em] absolute left-0 transition-all duration-300",
                    focusedField === "message" || formData.message
                      ? "-top-5 text-stone"
                      : "top-4 text-muted-foreground"
                  )}
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("message")}
                  onBlur={() => setFocusedField(null)}
                  required
                  rows={4}
                  className="w-full px-0 py-4 bg-transparent border-0 border-b border-border text-foreground focus:outline-none focus:border-foreground transition-colors duration-300 resize-none"
                />
              </div>

              <button
                type="submit"
                className="group relative inline-flex items-center justify-center px-8 py-4 text-label text-sm tracking-[0.15em] bg-foreground text-background overflow-hidden transition-all duration-300 hover:bg-stone"
              >
                <span className="relative z-10">Send Message</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
