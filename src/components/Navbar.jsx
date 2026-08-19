import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { GitHubIcon } from "./icons";
import { profile } from "../data/profile";

const links = [
  { label: "Work", href: "#work" },
  { label: "Achievements", href: "#achievements" },
  { label: "Journey", href: "#journey" },
  { label: "Skills", href: "#skills" },
  { label: "Code", href: "#code" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = links.map((l) => document.querySelector(l.href)).filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        }
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Scroll through Lenis when active (it owns smooth scroll); fall back to an
  // instant jump otherwise. Native smooth scrollIntoView fights Lenis's lerp
  // and the page gets stuck mid-scroll. Resolve to a numeric position first —
  // Lenis element targets can undershoot.
  const scrollToTarget = (href) => {
    const target = document.querySelector(href);
    if (!target) return;
    const pos = target.getBoundingClientRect().top + window.scrollY;
    if (window.__lenis) {
      window.__lenis.scrollTo(pos, { duration: 1.2 });
    } else {
      window.scrollTo({ top: pos });
    }
  };

  const goTop = () => {
    if (window.__lenis) {
      window.__lenis.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({ top: 0 });
    }
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open
          ? "border-b border-edge bg-ink/85 backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <nav
        className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6 md:px-10"
        aria-label="Main navigation"
      >
        <a
          href="#top"
          className="font-display text-lg font-bold tracking-tight text-zinc-100"
          onClick={(e) => {
            e.preventDefault();
            setOpen(false);
            setTimeout(goTop, 50);
          }}
        >
          aaryan<span className="blink text-accent">.</span>mittal
        </a>

        <div className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              aria-current={active === l.href ? "true" : undefined}
              className={`relative text-sm transition-colors ${
                active === l.href ? "text-accent" : "text-zinc-400 hover:text-zinc-100"
              }`}
            >
              {l.label}
              <span
                className={`absolute -bottom-1.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-accent transition-opacity duration-300 ${
                  active === l.href ? "opacity-100" : "opacity-0"
                }`}
                aria-hidden="true"
              />
            </a>
          ))}
          {profile.links.github && (
            <a
              href={profile.links.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub profile"
              className="text-zinc-400 transition-colors hover:text-zinc-100"
            >
              <GitHubIcon className="h-[18px] w-[18px]" />
            </a>
          )}
        </div>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-lg text-zinc-300 transition-colors hover:bg-panel md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="overflow-hidden border-t border-edge bg-ink md:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-5">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={(e) => {
                    e.preventDefault();
                    setOpen(false);
                    setTimeout(() => scrollToTarget(l.href), 50);
                  }}
                  className="rounded-lg px-3 py-3 font-display text-xl font-semibold text-zinc-200 transition-colors hover:bg-panel hover:text-accent"
                >
                  {l.label}
                </a>
              ))}
              {profile.links.github && (
                <a
                  href={profile.links.github}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setOpen(false)}
                  className="mt-2 inline-flex items-center gap-2 rounded-lg px-3 py-3 text-sm text-zinc-400"
                >
                  <GitHubIcon className="h-4 w-4" /> GitHub
                </a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
