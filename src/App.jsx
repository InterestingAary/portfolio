import { useEffect, useState } from "react";
import About from "./components/About";
import Achievements from "./components/Achievements";
import BeyondCode from "./components/BeyondCode";
import CodeSection from "./components/CodeSection";
import Contact from "./components/Contact";
import CurrentlyBuilding from "./components/CurrentlyBuilding";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Journey from "./components/Journey";
import Navbar from "./components/Navbar";
import ProjectModal from "./components/ProjectModal";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import WhatIBuild from "./components/WhatIBuild";
import { setupEasterEggs } from "./lib/easterEggs";

export default function App() {
  const [activeProject, setActiveProject] = useState(null);

  useEffect(() => {
    setupEasterEggs();
  }, []);

  return (
    <div className="min-h-screen bg-ink text-zinc-100 antialiased">
      <a
        href="#main"
        className="sr-only z-[110] rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-ink focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main">
        <Hero />
        <About />
        <WhatIBuild />
        <Projects onOpenProject={setActiveProject} />
        <Achievements />
        <Journey />
        <Skills />
        <CurrentlyBuilding />
        <CodeSection />
        <BeyondCode />
        <Contact />
      </main>
      <Footer />
      <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
    </div>
  );
}