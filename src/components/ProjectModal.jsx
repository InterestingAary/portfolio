import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, ExternalLink, Trophy, X } from "lucide-react";
import { GitHubIcon } from "./icons";
import StatusChip from "./StatusChip";

function Section({ title, children }) {
  if (!children) return null;
  return (
    <div className="mt-8">
      <h4 className="font-mono text-[11px] font-semibold uppercase tracking-[0.3em] text-accent">
        {title}
      </h4>
      <div className="mt-3 text-sm leading-relaxed text-zinc-400">{children}</div>
    </div>
  );
}

function List({ items }) {
  if (!items || items.length === 0) return null;
  return (
    <ul className="mt-2 grid gap-2 sm:grid-cols-2">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2 text-sm text-zinc-400">
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
          {item}
        </li>
      ))}
    </ul>
  );
}

export default function ProjectModal({ project, onClose }) {
  const closeRef = useRef(null);

  useEffect(() => {
    if (!project) return;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [project, onClose]);

  const building = project && !project.shipped;
  const hasLinks = project && (project.links.demo || project.links.github);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-end justify-center p-0 sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          role="dialog"
          aria-modal="true"
          aria-label={`${project.name} — case study`}
        >
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="relative max-h-[88vh] w-full max-w-3xl overflow-y-auto rounded-t-2xl border border-edge bg-panel shadow-2xl shadow-black/60 sm:rounded-2xl"
          >
            <div
              className="relative h-40 shrink-0 overflow-hidden sm:h-48"
              style={{
                background: `radial-gradient(120% 140% at 15% 0%, ${project.accent}2e 0%, transparent 55%), linear-gradient(180deg, var(--color-panel) 0%, var(--color-ink) 100%)`,
              }}
            >
              <div className="grid-bg absolute inset-0" aria-hidden="true" />
              <div className="absolute left-5 top-5 flex items-center gap-2.5">
                <span className="rounded-full border border-edge bg-ink/80 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-zinc-400 backdrop-blur">
                  {project.category}
                </span>
                <StatusChip status={project.status} className="bg-ink/80 backdrop-blur" />
              </div>
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                aria-label="Close case study"
                className="absolute right-4 top-4 rounded-lg border border-edge bg-ink/80 p-2 text-zinc-300 backdrop-blur transition-colors hover:border-accent/50 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
              <span
                className="absolute bottom-3 left-6 font-display text-6xl font-bold tracking-tight text-white/5"
                aria-hidden="true"
              >
                {project.glyph}
              </span>
            </div>

            <div className="p-6 sm:p-8">
              <h3 className="font-display text-2xl font-bold text-zinc-100 md:text-3xl">
                {project.name}
              </h3>
              <p className="mt-2 text-sm text-zinc-400">{project.oneLiner}</p>

              {project.achievement && (
                <p className="mt-3 inline-flex items-center gap-2 rounded-lg border border-accent/30 bg-accent/10 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-accent">
                  <Trophy className="h-3.5 w-3.5" aria-hidden="true" />
                  {project.achievement}
                </p>
              )}

              {building && (
                <div className="mt-6 rounded-xl border border-amber-400/25 bg-amber-400/10 p-4 text-sm leading-relaxed text-amber-200">
                  This project is actively being built. The case study will fill in as the project progresses.
                </div>
              )}

              <Section title="Overview">{project.overview}</Section>
              <Section title="Problem">{project.problem}</Section>
              <Section title="Solution">{project.solution}</Section>

              {project.features?.length > 0 && (
                <Section title="Features">
                  <List items={project.features} />
                </Section>
              )}

              {project.technologies?.length > 0 && (
                <Section title="Technology">
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.map((t) => (
                      <span
                        key={t}
                        className="rounded-md border border-edge bg-ink px-2.5 py-1 font-mono text-xs text-zinc-300"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </Section>
              )}

              <Section title="My Role">{project.role}</Section>

              {project.challenges?.length > 0 && (
                <Section title="Challenges">
                  <ul className="mt-2 space-y-2">
                    {project.challenges.map((c) => (
                      <li key={c} className="flex items-start gap-2 text-sm text-zinc-400">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                        {c}
                      </li>
                    ))}
                  </ul>
                </Section>
              )}

              {project.learned?.length > 0 && (
                <Section title="What I Learned">
                  <ul className="mt-2 space-y-2">
                    {project.learned.map((l) => (
                      <li key={l} className="flex items-start gap-2 text-sm text-zinc-400">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                        {l}
                      </li>
                    ))}
                  </ul>
                </Section>
              )}

              <div className="mt-9 flex flex-wrap items-center gap-3 border-t border-edge pt-6">
                {project.links.github && (
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-ghost"
                  >
                    <GitHubIcon className="h-4 w-4" /> Source
                  </a>
                )}
                {project.links.demo && (
                  <a
                    href={project.links.demo}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-accent"
                  >
                    <ExternalLink className="h-4 w-4" /> Live Demo
                  </a>
                )}
                {!hasLinks && (
                  <p className="text-xs text-zinc-500">
                    {building
                      ? "Demo & source links will be added here as the project progresses."
                      : "Demo & source links will be added here once available."}
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}