import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const CHAPTERS = [
  { id: "top", num: "00", label: "Intro" },
  { id: "about", num: "01", label: "About" },
  { id: "what-i-build", num: "02", label: "Build" },
  { id: "work", num: "03", label: "Work" },
  { id: "achievements", num: "04", label: "Proof" },
  { id: "journey", num: "05", label: "Journey" },
  { id: "skills", num: "06", label: "Skills" },
  { id: "now", num: "07", label: "Now" },
  { id: "code", num: "08", label: "Code" },
  { id: "beyond", num: "09", label: "Beyond" },
  { id: "contact", num: "10", label: "Contact" },
];

export default function ChapterRail() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const barsRef = useRef([]);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      const vh = window.innerHeight;
      const mid = vh * 0.4;
      let current = 0;

      CHAPTERS.forEach((c, i) => {
        const el = document.getElementById(c.id);
        const bar = barsRef.current[i];
        if (!el || !bar) return;
        const rect = el.getBoundingClientRect();
        const top = rect.top;
        const bottom = rect.bottom;
        const progress = Math.min(Math.max((mid - top) / Math.max(bottom - top, 1), 0), 1);
        bar.style.transform = `scaleY(${progress})`;
        if (top <= mid && bottom >= mid) current = i;
      });
      setActive(current);
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <nav
      aria-label="Chapters"
      className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-end gap-3.5 lg:flex"
    >
      {CHAPTERS.map((c, i) => {
        const isActive = i === active;
        return (
          <a
            key={c.id}
            href={`#${c.id}`}
            aria-current={isActive ? "true" : undefined}
            className="group flex items-center gap-3"
          >
            <motion.span
              animate={reduce ? undefined : { opacity: isActive ? 1 : 0.55 }}
              className={`font-mono text-[10px] tabular-nums transition-colors ${
                isActive ? "text-accent" : "text-zinc-500"
              }`}
            >
              {c.num}
            </motion.span>
            <span
              className={`font-mono text-[10px] uppercase tracking-[0.2em] transition-all duration-300 ${
                isActive ? "text-zinc-200" : "text-zinc-500 group-hover:text-zinc-300"
              }`}
            >
              {c.label}
            </span>
            <span className="relative h-10 w-px overflow-hidden bg-white/10">
              <span
                ref={(el) => {
                  barsRef.current[i] = el;
                }}
                className="absolute inset-0 origin-top bg-accent"
                style={{ transform: "scaleY(0)" }}
              />
            </span>
          </a>
        );
      })}
    </nav>
  );
}