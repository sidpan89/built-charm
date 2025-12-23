import { useState } from "react";
import Header from "@/components/Header";
import RangoliNavigation from "@/components/rangoli/RangoliNavigation";
import Hero from "@/components/Hero";
import HorizontalSlider from "@/components/HorizontalSlider";
import Portfolio from "@/components/Portfolio";
import Team from "@/components/Team";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import LoadingScreen from "@/components/LoadingScreen";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState<string>("home");

  const handleNavigate = (section: string) => {
    setActiveSection(section);
  };

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}

      <div
        className={`transition-opacity duration-500 ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
      >
        <Header />
        <RangoliNavigation onNavigate={handleNavigate} activeSection={activeSection} />

        <main className="relative">
          {/* Hero - always visible as the main landing */}
          <div className={activeSection === "home" ? "block" : "hidden"}>
            <Hero onExplore={() => setActiveSection("services")} />
          </div>

          {/* Services Slider */}
          <div className={activeSection === "services" ? "block" : "hidden"}>
            <HorizontalSlider onBack={() => setActiveSection("home")} />
          </div>

          {/* Portfolio */}
          <div className={activeSection === "portfolio" ? "block" : "hidden"}>
            <Portfolio onBack={() => setActiveSection("home")} />
          </div>

          {/* Team */}
          <div className={activeSection === "team" ? "block" : "hidden"}>
            <Team onBack={() => setActiveSection("home")} />
          </div>

          {/* About */}
          <div className={activeSection === "about" ? "block" : "hidden"}>
            <About onBack={() => setActiveSection("home")} />
          </div>

          {/* Contact */}
          <div className={activeSection === "contact" ? "block" : "hidden"}>
            <Contact onBack={() => setActiveSection("home")} />
          </div>
        </main>

        {activeSection !== "home" && <Footer />}
      </div>
    </div>
  );
};

export default Index;
