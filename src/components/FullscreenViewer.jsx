import { useEffect, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, ExternalLink, Maximize2, X } from "lucide-react";
import StatusChip from "./StatusChip";

const btnCls =
  "inline-flex items-center gap-2 rounded-lg border border-edge bg-ink p-2.5 text-zinc-300 transition-colors hover:border-accent/50 hover:text-accent disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-edge disabled:hover:text-zinc-300";

/**
 * Fullscreen interface viewer — opens with a circular wipe, shows the
 * project's HTML interface edge to edge, and can be exited at any time.
 */
export default function FullscreenViewer({ project, projects, onClose, onNavigate }) {
  const reduce = useReducedMotion();
  const closeRef = useRef(null);
  const idx = project ? projects.findIndex((p) => p.id === project.id) : -1;

  useEffect(() => {
    if (!project) return;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && idx > 0) onNavigate(idx - 1);
      if (e.key === "ArrowRight" && idx < projects.length - 1) onNavigate(idx + 1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [project, onClose, onNavigate, idx, projects.length]);

  const enter = reduce ? { opacity: 0 } : { clipPath: "circle(0% at 50% 42%)" };
  const show = reduce ? { opacity: 1 } : { clipPath: "circle(150% at 50% 42%)" };
  const leave = reduce ? { opacity: 0 } : { clipPath: "circle(0% at 88% 6%)" };

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={`${project.name} — fullscreen interface preview`}
          className="fixed inset-0 z-[100] flex flex-col bg-ink"
          initial={enter}
          animate={show}
          exit={leave}
          transition={{ duration: 0.5, ease: [0.65, 0, 0.35, 1] }}
        >
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 border-b border-edge bg-panel/90 px-4 py-3 backdrop-blur md:px-6">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-edge bg-ink font-display text-sm font-bold text-accent">
                {project.glyph}
              </span>
              <div>
                <p className="font-display text-base font-bold text-zinc-100">{project.name}</p>
                <div className="flex items-center gap-2">
                  <StatusChip status={project.status} className="px-2 py-0.5 text-[9px]" />
                  <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-500">
                    {project.category}
                  </span>
                </div>
              </div>
            </div>

            <div className="hidden items-center gap-2 md:flex">
              <span className="rounded-full border border-accent/40 bg-accent/10 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-accent">
                HTML file only
              </span>
              <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-500">
                interface preview — full product in the works
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onNavigate(idx - 1)}
                disabled={idx <= 0}
                aria-label="Previous project"
                className={btnCls}
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => onNavigate(idx + 1)}
                disabled={idx >= projects.length - 1}
                aria-label="Next project"
                className={btnCls}
              >
                <ArrowRight className="h-4 w-4" />
              </button>
              {project.embed && (
                <a
                  href={project.embed}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${project.name} — open interface in a new tab`}
                  className={btnCls}
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              )}
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                aria-label="Exit fullscreen"
                className="inline-flex items-center gap-2 rounded-lg border border-accent/40 bg-accent/10 px-4 py-2.5 text-sm font-semibold text-accent transition-colors hover:bg-accent hover:text-ink"
              >
                <X className="h-4 w-4" />
                <span className="hidden sm:inline">Exit Fullscreen</span>
              </button>
            </div>
          </div>

          {project.embed ? (
            <iframe
              src={project.embed}
              title={`${project.name} — fullscreen interface preview`}
              className="min-h-0 w-full flex-1 border-0 bg-panel"
              sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-modals"
              allow="geolocation; microphone; autoplay; clipboard-write; fullscreen"
            />
          ) : (
            <div className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden">
              <div className="grid-bg absolute inset-0" aria-hidden="true" />
              <div
                className="absolute inset-0"
                aria-hidden="true"
                style={{
                  background: `radial-gradient(80% 60% at 50% 40%, ${project.accent}1f 0%, transparent 60%)`,
                }}
              />
              <div className="relative flex max-w-md flex-col items-center gap-5 px-6 text-center">
                <span className="font-display text-7xl font-bold tracking-tight text-white/10" aria-hidden="true">
                  {project.glyph}
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-accent">
                  <Maximize2 className="h-3 w-3" aria-hidden="true" /> HTML file only
                </span>
                <h4 className="font-display text-2xl font-bold text-zinc-100">
                  Interface under construction
                </h4>
                <p className="text-sm leading-relaxed text-zinc-400">
                  This is only an HTML file for now — the full experience is being built and will
                  appear here once it's ready.
                </p>
                <button type="button" onClick={onClose} className="btn-ghost">
                  Back to projects
                </button>
              </div>
            </div>
          )}

          <div className="relative z-10 flex items-center justify-between border-t border-edge bg-panel/90 px-4 py-2.5 font-mono text-[10px] uppercase tracking-wider text-zinc-500 backdrop-blur md:px-6">
            <span className="flex items-center gap-2">
              <ArrowLeft className="h-3 w-3" aria-hidden="true" />
              <ArrowRight className="h-3 w-3" aria-hidden="true" />
              drag the deck or use arrow keys to switch
            </span>
            <span className="hidden text-accent sm:inline">html-only preview · fullscreen</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}