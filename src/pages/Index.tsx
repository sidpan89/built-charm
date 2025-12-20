import { useState } from "react";
import Header from "@/components/Header";
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
          <HorizontalSlider />
          <Portfolio />
          <Team />
          <About />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Index;
