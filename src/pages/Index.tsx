import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
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
import NoiseOverlay from "@/components/NoiseOverlay";
import PageTransition from "@/components/PageTransition";
import useLenis from "@/hooks/useLenis";

const VALID_SECTIONS = ["home", "services", "portfolio", "team", "about", "contact"] as const;
type Section = (typeof VALID_SECTIONS)[number];

const Index = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);

  // Initialize Lenis smooth scroll
  useLenis();

  // Get active section from URL, default to "home"
  const sectionParam = searchParams.get("section");
  const activeSection: Section = VALID_SECTIONS.includes(sectionParam as Section)
    ? (sectionParam as Section)
    : "home";

  const handleNavigate = useCallback(
    (section: string) => {
      if (section === "home") {
        setSearchParams({});
      } else {
        setSearchParams({ section });
      }
      // Scroll to top on section change
      window.scrollTo({ top: 0, behavior: "instant" });
    },
    [setSearchParams]
  );

  const renderSection = () => {
    switch (activeSection) {
      case "home":
        return (
          <PageTransition keyId="home">
            <Hero onExplore={() => handleNavigate("services")} />
          </PageTransition>
        );
      case "services":
        return (
          <PageTransition keyId="services">
            <HorizontalSlider onBack={() => handleNavigate("home")} />
          </PageTransition>
        );
      case "portfolio":
        return (
          <PageTransition keyId="portfolio">
            <Portfolio onBack={() => handleNavigate("home")} />
          </PageTransition>
        );
      case "team":
        return (
          <PageTransition keyId="team">
            <Team onBack={() => handleNavigate("home")} />
          </PageTransition>
        );
      case "about":
        return (
          <PageTransition keyId="about">
            <About onBack={() => handleNavigate("home")} />
          </PageTransition>
        );
      case "contact":
        return (
          <PageTransition keyId="contact">
            <Contact onBack={() => handleNavigate("home")} />
          </PageTransition>
        );
      default:
        return (
          <PageTransition keyId="home">
            <Hero onExplore={() => handleNavigate("services")} />
          </PageTransition>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      <NoiseOverlay />
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}

      <div
        className={`transition-opacity duration-500 ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
      >
        <Header />
        <RangoliNavigation onNavigate={handleNavigate} activeSection={activeSection} />

        <main className="relative">
          <AnimatePresence mode="wait">
            {renderSection()}
          </AnimatePresence>
        </main>

        {activeSection !== "home" && <Footer />}
      </div>
    </div>
  );
};

export default Index;
