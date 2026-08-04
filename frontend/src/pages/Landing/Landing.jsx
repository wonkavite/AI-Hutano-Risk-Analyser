import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Hero from "../../components/Hero/Hero";
import Features from "../../components/Features/Features";
import About from "../../components/About/About";
import FAQ from "../../components/FAQ/FAQ";
import CTA from "../../components/CTA/CTA";
import Footer from "../../components/Footer/Footer";

function Landing() {
  const [activeTab, setActiveTab] = useState("home");

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
      {/* Navbar receives activeTab and updater */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area */}
      <main className="grow flex flex-col">
        {activeTab === "home" && (
          <>
            <Hero />
    
            <CTA />
            <Footer />
          </>
        )}

        {activeTab === "features" && <Features />}
        {activeTab === "about" && <About />}
        {activeTab === "faq" && <FAQ />}
      </main>
    </div>
  );
}

export default Landing;