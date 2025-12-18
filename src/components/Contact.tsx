import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: "",
    message: "",
  });

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
    <section id="contact" className="py-24 lg:py-32 bg-secondary/30">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left Column - Info */}
          <div>
            <span className="text-label text-stone mb-4 block">Contact</span>
            <h2 className="text-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-8">
              Let's Create
              <br />
              Something
              <br />
              <span className="text-stone">Together</span>
            </h2>
            <p className="text-body text-lg text-muted-foreground mb-12 max-w-md">
              Contact us and let us know about your project, or find out more
              about our award-winning services.
            </p>

            <div className="space-y-8">
              <div>
                <span className="text-label text-stone mb-2 block text-xs">
                  Email
                </span>
                <a
                  href="mailto:hello@archstudio.com"
                  className="text-body text-lg text-foreground hover:text-stone transition-colors duration-300"
                >
                  hello@archstudio.com
                </a>
              </div>
              <div>
                <span className="text-label text-stone mb-2 block text-xs">
                  Phone
                </span>
                <a
                  href="tel:+442071234567"
                  className="text-body text-lg text-foreground hover:text-stone transition-colors duration-300"
                >
                  +44 20 7123 4567
                </a>
              </div>
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
            </div>
          </div>

          {/* Right Column - Form */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="text-label text-muted-foreground mb-2 block text-xs"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-0 py-4 bg-transparent border-0 border-b border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground transition-colors duration-300"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="text-label text-muted-foreground mb-2 block text-xs"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-0 py-4 bg-transparent border-0 border-b border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground transition-colors duration-300"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="phone"
                    className="text-label text-muted-foreground mb-2 block text-xs"
                  >
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-0 py-4 bg-transparent border-0 border-b border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground transition-colors duration-300"
                    placeholder="+44 123 456 789"
                  />
                </div>
                <div>
                  <label
                    htmlFor="projectType"
                    className="text-label text-muted-foreground mb-2 block text-xs"
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

              <div>
                <label
                  htmlFor="message"
                  className="text-label text-muted-foreground mb-2 block text-xs"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-0 py-4 bg-transparent border-0 border-b border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground transition-colors duration-300 resize-none"
                  placeholder="Tell us about your project..."
                />
              </div>

              <button
                type="submit"
                className="mt-8 inline-flex items-center justify-center px-8 py-4 text-label bg-foreground text-background hover:bg-foreground/90 transition-colors duration-300"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
