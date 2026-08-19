import { useCallback, useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import About from "./components/About";
import Achievements from "./components/Achievements";
import BeyondCode from "./components/BeyondCode";
import ChapterRail from "./components/ChapterRail";
import Certificates from "./components/Certificates";
import CodeSection from "./components/CodeSection";
import Contact from "./components/Contact";
import CurrentlyBuilding from "./components/CurrentlyBuilding";
import Cursor from "./components/Cursor";
import Doctrine from "./components/Doctrine";
import EmbroideryThread from "./components/EmbroideryThread";
import Footer from "./components/Footer";
import FullscreenViewer from "./components/FullscreenViewer";
import HellDecor from "./components/HellDecor";
import Hero from "./components/Hero";
import Journey from "./components/Journey";
import Loader from "./components/Loader";
import Marquee from "./components/Marquee";
import Manifesto from "./components/Manifesto";
import Navbar from "./components/Navbar";
import NebulaDecor from "./components/NebulaDecor";
import OceanDecor from "./components/OceanDecor";
import FeatherDecor from "./components/FeatherDecor";
import ProjectModal from "./components/ProjectModal";
import Projects from "./components/Projects";
import ProfileSection from "./components/ProfileSection";
import ScrollProgress from "./components/ScrollProgress";
import Skills from "./components/Skills";
import SmoothScroll from "./components/SmoothScroll";
import StickFigureDecor from "./components/StickFigureDecor";
import ThemeSwitcher from "./components/ThemeSwitcher";
import TransitionCurtain from "./components/TransitionCurtain";
import WhatIBuild from "./components/WhatIBuild";
import { currentlyLearning, dsa, skillGroups } from "./data/skills";
import { projects } from "./data/projects";
import { setupEasterEggs } from "./lib/easterEggs";

const tickerItems = [
  ...skillGroups.flatMap((g) => g.items),
  ...currentlyLearning,
  ...dsa.topics,
];

const processItems = ["BUILD", "EXPERIMENT", "LEARN", "IMPROVE", "SHIP", "REPEAT"];

const SECTION_LABELS = {
  top: "Intro",
  about: "About",
  "what-i-build": "What I Build",
  work: "Projects",
  achievements: "Achievements",
  certificates: "Certificates",
  journey: "Journey",
  skills: "Skills",
  now: "Now Building",
  code: "Code",
  beyond: "Beyond Code",
  contact: "Contact",
};

const THEMES = ["nebula", "ocean", "heavenly", "hell"];

export default function App() {
  const reduce = useReducedMotion();
  const [theme, setTheme] = useState(() => {
    try {
      const saved = localStorage.getItem("portfolio-theme");
      return THEMES.includes(saved) ? saved : "nebula";
    } catch {
      return "nebula";
    }
  });
  const [activeProject, setActiveProject] = useState(null);
  const [viewerProject, setViewerProject] = useState(null);
  const [nav, setNav] = useState(null);
  const [navKey, setNavKey] = useState(0);

  useEffect(() => {
    setupEasterEggs();
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem("portfolio-theme", theme);
    } catch {}
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
      meta.content =
        theme === "heavenly" ? "#faf6ec" : theme === "hell" ? "#0a0505" : theme === "ocean" ? "#051019" : "#0a0a0e";
    }
  }, [theme]);

  // Intercept in-page anchor clicks so navigation plays the circular curtain.
  // The target section scrolls into view while covered, then the main content
  // re-mounts so every section replays its entrance effects on arrival.
  useEffect(() => {
    if (reduce) return;
    const onClick = (e) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
        return;
      }
      const a = e.target.closest?.('a[href^="#"]');
      if (!a || a.getAttribute("target")) return;
      const id = a.getAttribute("href").slice(1);
      if (!id || id === "main") return;
      const el = document.getElementById(id);
      if (!el || !el.closest("main")) return;
      e.preventDefault();
      setNav({ id, label: SECTION_LABELS[id] || id.replace(/-/g, " ") });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [reduce]);

  const handleNavMidway = useCallback(() => setNavKey((k) => k + 1), []);
  const handleNavDone = useCallback(() => setNav(null), []);

  const navigateViewer = (i) => {
    if (i >= 0 && i < projects.length) setViewerProject(projects[i]);
  };

  return (
    <div className="relative min-h-screen text-zinc-100 antialiased">
      <a
        href="#main"
        className="sr-only z-[110] rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-ink focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>
      <div className="dot-grid" aria-hidden="true" />
      {theme === "nebula" && <NebulaDecor />}
      {theme === "heavenly" && <FeatherDecor />}
      {theme === "hell" && <HellDecor />}
      {theme === "ocean" && <OceanDecor />}
      <EmbroideryThread />
      <StickFigureDecor />
      <SmoothScroll />
      <ScrollProgress />
      <Cursor />
      <Loader />
      <Navbar />
      <ChapterRail />
      <ThemeSwitcher theme={theme} onChange={setTheme} />
      <main id="main" key={navKey}>
        <Hero />
        <Marquee items={tickerItems} />
        <Manifesto />
        <ProfileSection />
        <About />
        <WhatIBuild />
        <Projects
          onOpenProject={setActiveProject}
          onExploreProject={setViewerProject}
        />
        <Achievements />
        <Certificates />
        <Journey />
        <Skills />
        <Doctrine />
        <CurrentlyBuilding />
        <CodeSection />
        <BeyondCode />
        <Marquee items={processItems} reverse />
        <Contact />
      </main>
      <Footer />
      <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
      <FullscreenViewer
        project={viewerProject}
        projects={projects}
        onClose={() => setViewerProject(null)}
        onNavigate={navigateViewer}
      />
      <TransitionCurtain nav={nav} onMidway={handleNavMidway} onDone={handleNavDone} />
    </div>
  );
}