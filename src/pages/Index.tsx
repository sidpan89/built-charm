import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import LoadingScreen from "@/components/LoadingScreen";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="min-h-screen bg-background">
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      
      <div
        className={`transition-opacity duration-500 ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
      >
        <Header />
        <main>
          <Hero />
          <Services />
          <Portfolio />
          <About />
          <Contact />
        </main>
        <Footer />
      </div>

      {/* Custom cursor effect - decorative */}
      <style>{`
        @media (hover: hover) {
          body {
            cursor: default;
          }
          
          a, button {
            cursor: pointer;
          }
        }
      `}</style>
    </div>
  );
};

export default Index;
