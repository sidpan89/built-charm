import { useState, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import ScrollReveal from "./ScrollReveal";
import MagneticButton from "./MagneticButton";
import { cn } from "@/lib/utils";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: "",
    message: "",
  });
  const [focusedField, setFocusedField] = useState<string | null>(null);

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

  const inputClasses = (fieldName: string) => cn(
    "w-full px-0 py-4 bg-transparent border-0 border-b text-foreground placeholder:text-muted-foreground/50 focus:outline-none transition-all duration-500",
    focusedField === fieldName ? "border-foreground" : "border-border"
  );

  return (
    <section id="contact" className="py-24 lg:py-32 bg-secondary/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-[500px] h-[500px] rounded-full bg-gradient-to-br from-muted to-transparent blur-3xl top-0 right-0 animate-float" />
        <div className="absolute w-[300px] h-[300px] rounded-full bg-gradient-to-br from-stone/10 to-transparent blur-3xl bottom-1/4 left-10 animate-morph" style={{ animationDelay: "4s" }} />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left Column - Info */}
          <div>
            <ScrollReveal>
              <span className="text-label text-stone mb-4 block tracking-[0.2em]">Contact</span>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <h2 className="text-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-8">
                Let's Create
                <br />
                Something
                <br />
                <span className="text-stone">Together</span>
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <p className="text-body text-lg text-muted-foreground mb-12 max-w-md">
                Contact us and let us know about your project, or find out more
                about our award-winning services.
              </p>
            </ScrollReveal>

            <div className="space-y-8">
              <ScrollReveal delay={300}>
                <div className="group">
                  <span className="text-label text-stone mb-2 block text-xs">
                    Email
                  </span>
                  <a
                    href="mailto:hello@archstudio.com"
                    className="text-body text-lg text-foreground inline-flex items-center gap-2 group-hover:gap-4 transition-all duration-300 reveal-line"
                  >
                    hello@archstudio.com
                    <svg width="12" height="12" viewBox="0 0 12 12" className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <path d="M1 11L11 1M11 1H3M11 1V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                    </svg>
                  </a>
                </div>
              </ScrollReveal>
              <ScrollReveal delay={400}>
                <div className="group">
                  <span className="text-label text-stone mb-2 block text-xs">
                    Phone
                  </span>
                  <a
                    href="tel:+442071234567"
                    className="text-body text-lg text-foreground inline-flex items-center gap-2 group-hover:gap-4 transition-all duration-300 reveal-line"
                  >
                    +44 20 7123 4567
                  </a>
                </div>
              </ScrollReveal>
              <ScrollReveal delay={500}>
                <div>
                  <span className="text-label text-stone mb-2 block text-xs">
                    Studio
                  </span>
                  <address className="text-body text-lg text-foreground not-italic">
                    123 Design Street
                    <br />
                    London, EC1A 1BB
                  </address>
                </div>
              </ScrollReveal>
            </div>
          </div>

          {/* Right Column - Form */}
          <ScrollReveal delay={200} direction="right">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="relative">
                  <label
                    htmlFor="name"
                    className={cn(
                      "text-label mb-2 block text-xs absolute left-0 transition-all duration-300",
                      focusedField === "name" || formData.name
                        ? "-top-4 text-stone"
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
                    className={inputClasses("name")}
                  />
                  <div className={cn(
                    "absolute bottom-0 left-0 h-px bg-foreground transition-all duration-500",
                    focusedField === "name" ? "w-full" : "w-0"
                  )} />
                </div>
                <div className="relative">
                  <label
                    htmlFor="email"
                    className={cn(
                      "text-label mb-2 block text-xs absolute left-0 transition-all duration-300",
                      focusedField === "email" || formData.email
                        ? "-top-4 text-stone"
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
                    className={inputClasses("email")}
                  />
                  <div className={cn(
                    "absolute bottom-0 left-0 h-px bg-foreground transition-all duration-500",
                    focusedField === "email" ? "w-full" : "w-0"
                  )} />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="relative">
                  <label
                    htmlFor="phone"
                    className={cn(
                      "text-label mb-2 block text-xs absolute left-0 transition-all duration-300",
                      focusedField === "phone" || formData.phone
                        ? "-top-4 text-stone"
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
                    className={inputClasses("phone")}
                  />
                  <div className={cn(
                    "absolute bottom-0 left-0 h-px bg-foreground transition-all duration-500",
                    focusedField === "phone" ? "w-full" : "w-0"
                  )} />
                </div>
                <div className="relative">
                  <label
                    htmlFor="projectType"
                    className="text-label text-muted-foreground mb-2 block text-xs absolute left-0 -top-4"
                  >
                    Project Type
                  </label>
                  <select
                    id="projectType"
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("projectType")}
                    onBlur={() => setFocusedField(null)}
                    className={cn(inputClasses("projectType"), "cursor-pointer pt-6")}
                  >
                    <option value="" className="bg-background">Select type</option>
                    <option value="residential" className="bg-background">Residential</option>
                    <option value="commercial" className="bg-background">Commercial</option>
                    <option value="interior" className="bg-background">Interior Design</option>
                    <option value="heritage" className="bg-background">Heritage & Conservation</option>
                  </select>
                  <div className={cn(
                    "absolute bottom-0 left-0 h-px bg-foreground transition-all duration-500",
                    focusedField === "projectType" ? "w-full" : "w-0"
                  )} />
                </div>
              </div>

              <div className="relative">
                <label
                  htmlFor="message"
                  className={cn(
                    "text-label mb-2 block text-xs absolute left-0 transition-all duration-300",
                    focusedField === "message" || formData.message
                      ? "-top-4 text-stone"
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
                  className={cn(inputClasses("message"), "resize-none")}
                />
                <div className={cn(
                  "absolute bottom-0 left-0 h-px bg-foreground transition-all duration-500",
                  focusedField === "message" ? "w-full" : "w-0"
                )} />
              </div>

              <MagneticButton className="mt-8">
                <button
                  type="submit"
                  className="group relative inline-flex items-center justify-center px-8 py-4 text-label bg-foreground text-background overflow-hidden"
                >
                  <span className="relative z-10 transition-transform duration-300 group-hover:-translate-y-full group-hover:opacity-0">
                    Send Message
                  </span>
                  <span className="absolute z-10 transition-transform duration-300 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
                    Send Message
                  </span>
                  <span className="absolute inset-0 bg-stone scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100" />
                </button>
              </MagneticButton>
            </form>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default Contact;
