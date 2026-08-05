import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Hero from "../../components/Hero/Hero";
import Features from "../../components/Features/Features";
import About from "../../components/About/About";
import FAQ from "../../components/FAQ/FAQ";
import CTA from "../../components/CTA/CTA";
import Footer from "../../components/Footer/Footer";

function Landing() {
  const [activeSection, setActiveSection] = useState("home");

  const renderSection = () => {
    switch (activeSection) {
      case "features":
        return (
          <section id="features" className="scroll-mt-24">
            <Features />
          </section>
        );
      case "about":
        return (
          <section id="about" className="scroll-mt-24">
            <About />
          </section>
        );
      case "faq":
        return (
          <section id="faq" className="scroll-mt-24">
            <FAQ />
          </section>
        );
      case "home":
      default:
        return (
          <section id="home" className="scroll-mt-24">
            <Hero />
            <CTA />
          </section>
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
      <Navbar onSectionChange={setActiveSection} activeSection={activeSection} />

      <main className="grow flex flex-col">{renderSection()}</main>

      <Footer />
    </div>
  );
}

export default Landing;