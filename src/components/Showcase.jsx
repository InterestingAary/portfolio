import { useRef } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowRight, BookOpen, Maximize2 } from "lucide-react";
import StatusChip from "./StatusChip";
import { projects } from "../data/projects";

const SLIDE_COUNT = 3;

// One featured project per full-screen slide + the "what's next" closer.
const slides = [
  { project: projects[0], chapter: "SHIPPED & LIVE" }, // Rural Guards
  { project: projects[2], chapter: "IN DEVELOPMENT" }, // Muzilo
  { project: null, chapter: "WHAT'S NEXT" }, // OmniTriage / Gym Training / closer
];

// Chapter rail labels — fromfauna's "#special_menu" chapter list.
const CHAPTERS = [
  { label: "SHIPPED & LIVE", range: [0, 1 / 3] },
  { label: "IN DEVELOPMENT", range: [1 / 3, 2 / 3] },
  { label: "WHAT'S NEXT", range: [2 / 3, 1] },
];

/**
 * Word-by-word reveal (fromfauna's "js-text_word" pattern): each word of the
 * title cascades in with a per-word scroll window as the slide enters.
 * `progress` is the slide's own opacity MotionValue (proven to track the
 * section correctly); words reveal over [i/n, (i+1)/n] of that value.
 */
function WordReveal({ text, progress }) {
  const words = text.split(" ");
  const n = words.length;
  return (
    <>
      {words.map((w, i) => {
        const opacity = useTransform(progress, [i / n, (i + 1) / n], [0, 1]);
        const y = useTransform(progress, [i / n, (i + 1) / n], [8, 0]);
        return (
          <motion.span
            key={i}
            className="inline-block whitespace-pre"
            style={{ opacity, y }}
          >
            {w}{" "}
          </motion.span>
        );
      })}
    </>
  );
}

/** Chapter rail row — numbered label + scroll-driven progress bar. */
function ChapterRow({ index, label, range, progress, onClick }) {
  // Function transform (not keyframes) so framer keeps this JS-driven instead
  // of compiling a WAAPI ViewTimeline bound to the bar's own view lifecycle.
  const fill = useTransform(progress, (v) => Math.min(1, Math.max(0, (v - range[0]) / (range[1] - range[0]))));
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`Go to project pair ${index + 1}`}
      className="group flex flex-col gap-2 text-left"
    >
      <span className="flex items-baseline gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-500 transition-colors group-hover:text-zinc-300">
        <span className="text-accent">0{index + 1}</span>
        {label}
      </span>
      <span className="relative h-px w-full overflow-hidden bg-white/10">
        <motion.span className="absolute inset-0 origin-left bg-accent" style={{ scaleX: fill }} />
      </span>
    </button>
  );
}

/**
 * Full-screen typographic slide — meermohsin.me's work-section feel,
 * remixed: the project name fills the viewport, a giant glyph watermark
 * drifts on entry, the accent gradient breathes, and scroll drives
 * opacity + parallax. One project per screen.
 */
function FullScreenSlide({ project, index, isLast, ms, onExplore, onCaseStudy }) {
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  // Identity function transforms: forcing framer-motion to evaluate these
  // in JS. Keyframe useTransform chains against scrollYProgress get compiled
  // into WAAPI ViewTimeline animations bound to this slide's OWN view
  // lifecycle (inline style frozen at "1", computed value driven by the
  // element's position in the viewport), which breaks pinned sections.
  const opacity = useTransform(ms.opacity, (v) => v);
  const y = useTransform(ms.y, (v) => v);
  const bgScale = useTransform(ms.bgScale, (v) => v);
  const glyphX = useTransform(ms.glyphX, (v) => v);
  const pointerEvents = useTransform(ms.pointerEvents, (v) => v);

  return (
    <motion.div
      className="absolute inset-0"
      style={{ opacity, y, pointerEvents }}
    >
      <motion.div className="absolute inset-0" style={{ scale: bgScale }} aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(110% 90% at 70% 0%, ${project.accent}26 0%, transparent 55%), linear-gradient(180deg, var(--color-panel) 0%, var(--color-ink) 100%)`,
          }}
        />
        <div className="grid-bg absolute inset-0 opacity-50" />
      </motion.div>

      <article
        onMouseMove={onMove}
        className="spotlight-card group relative h-full w-full overflow-hidden"
        aria-label={project.name}
      >
        {/* giant glyph watermark */}
        <motion.span
          style={{ x: glyphX }}
          className="pointer-events-none absolute -right-6 top-1/2 -translate-y-1/2 font-display text-[clamp(10rem,26vw,26rem)] font-bold leading-none tracking-tight text-white/[0.04] transition-colors duration-700 group-hover:text-white/[0.07]"
          aria-hidden="true"
        >
          {project.glyph}
        </motion.span>

        {/* index number */}
        <span className="absolute left-6 top-6 font-mono text-[11px] tracking-[0.3em] text-zinc-600 md:left-10 md:top-10">
          0{index + 1} <span className="text-zinc-700">/ 0{SLIDE_COUNT}</span>
        </span>

        {/* content */}
        <div className="relative z-10 flex h-full flex-col justify-end p-6 pb-14 md:p-16 md:pb-20 lg:pl-24 xl:pr-72">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[11px] font-bold uppercase tracking-[0.3em] text-zinc-500">
              {project.category}
            </span>
            <StatusChip status={project.status} />
          </div>

          <h4 className="mt-5 font-display text-[clamp(2.8rem,8.5vw,7.5rem)] font-bold leading-[0.95] tracking-tight text-zinc-100">
            {index === 0 ? (
              project.name
            ) : (
              <WordReveal text={project.name} progress={ms.opacity} />
            )}
          </h4>

          <p className="mt-5 max-w-xl text-sm leading-relaxed text-zinc-400 md:text-lg">
            {project.oneLiner}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            {project.embed && (
              <button type="button" onClick={() => onExplore(project)} className="btn-accent">
                <Maximize2 className="h-4 w-4" aria-hidden="true" /> Open Interface
              </button>
            )}
            {project.shipped && (
              <button
                type="button"
                onClick={() => onCaseStudy(project)}
                aria-label={`Open case study: ${project.name}`}
                className="inline-flex items-center gap-2 rounded-lg border border-edge bg-ink/60 px-4 py-3 text-sm font-medium text-zinc-300 transition-colors hover:border-accent/50 hover:text-white"
              >
                <BookOpen className="h-4 w-4" aria-hidden="true" /> Case Study
              </button>
            )}
          </div>
        </div>
      </article>
    </motion.div>
  );
}

function NextSlide({ ms, index }) {
  const nextProjects = [projects[3], projects[4], projects[1]]; // OmniTriage, Gym Training, Birthday Wishes
  // Identity function transforms — see FullScreenSlide for why (framer must
  // not compile these into WAAPI ViewTimeline animations).
  const opacity = useTransform(ms.opacity, (v) => v);
  const y = useTransform(ms.y, (v) => v);
  const bgScale = useTransform(ms.bgScale, (v) => v);
  const pointerEvents = useTransform(ms.pointerEvents, (v) => v);
  return (
    <motion.div
      className="absolute inset-0"
      style={{ opacity, y, pointerEvents }}
    >
      <motion.div className="absolute inset-0" style={{ scale: bgScale }} aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(110% 90% at 30% 0%, rgba(214,255,77,0.10) 0%, transparent 55%), linear-gradient(180deg, var(--color-panel) 0%, var(--color-ink) 100%)",
          }}
        />
        <div className="grid-bg absolute inset-0 opacity-50" />
      </motion.div>

      <div className="relative z-10 flex h-full flex-col justify-end p-6 pb-14 md:p-16 md:pb-20 lg:pl-24 xl:pr-72">
        <div className="flex items-center gap-3">
          <span className="font-mono text-[11px] font-bold uppercase tracking-[0.3em] text-accent">
            what's next
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-600">
            0{index + 1} / 0{SLIDE_COUNT}
          </span>
        </div>

        <h4 className="mt-5 max-w-3xl font-display text-[clamp(2.4rem,7vw,6rem)] font-bold leading-[0.95] tracking-tight text-zinc-100">
          More projects are being built right now.
        </h4>

        <div className="mt-8 flex flex-wrap gap-x-10 gap-y-3">
          {nextProjects.map((p, i) => (
            <span
              key={p.id}
              className="flex items-baseline gap-2 font-mono text-sm text-zinc-400"
            >
              <span className="text-accent">0{i + 1}</span> {p.name}
            </span>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => {
              const target = document.getElementById("now");
              if (!target) return;
              if (window.__lenis) window.__lenis.scrollTo(target, { offset: 0, duration: 1.2 });
              else target.scrollIntoView();
            }}
            className="btn-accent"
          >
            See what I'm building now <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
          <span className="font-mono text-xs uppercase tracking-wider text-zinc-500">
            or keep scrolling for the full list
          </span>
        </div>
      </div>
    </motion.div>
  );
}

function StackedFallback({ onExplore, onCaseStudy }) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {projects.map((p) => (
        <article
          key={p.id}
          className="card-lift relative flex flex-col overflow-hidden rounded-2xl border border-edge bg-panel p-7"
        >
          <div className="grid-bg absolute inset-0 opacity-60" aria-hidden="true" />
          <div className="relative z-10">
            <span className="font-mono text-[11px] font-bold uppercase tracking-[0.3em] text-zinc-500">
              {p.category}
            </span>
            <h4 className="mt-3 font-display text-3xl font-bold tracking-tight text-zinc-100">
              {p.name}
            </h4>
            <p className="mt-3 text-sm leading-relaxed text-zinc-400">{p.oneLiner}</p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              {p.embed && (
                <button type="button" onClick={() => onExplore(p)} className="btn-accent">
                  <Maximize2 className="h-4 w-4" aria-hidden="true" /> Open Interface
                </button>
              )}
              {p.shipped && (
                <button
                  type="button"
                  onClick={() => onCaseStudy(p)}
                  aria-label={`Open case study: ${p.name}`}
                  className="inline-flex items-center gap-2 rounded-lg border border-edge bg-ink/60 px-4 py-3 text-sm font-medium text-zinc-300 transition-colors hover:border-accent/50 hover:text-white"
                >
                  <BookOpen className="h-4 w-4" aria-hidden="true" /> Case Study
                </button>
              )}
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

/**
 * Pinned full-screen showcase — one project per screen, meermohsin-style.
 * Scroll flips between three chapters; the last slide holds at full
 * opacity when the section releases (never fades to transparent).
 */
export default function Showcase({ onExplore, onCaseStudy }) {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const perSlide = slides.map((_, i) => {
    const s = i / SLIDE_COUNT;
    const e = (i + 1) / SLIDE_COUNT;
    const a = s;
    const b = s + 0.1;
    const c = e - 0.1;
    const d = e;
    const isFirst = i === 0;
    const isLast = i === SLIDE_COUNT - 1;
    return {
      opacity: useTransform(
        scrollYProgress,
        isFirst ? [s, c, d] : isLast ? [a, b, c] : [a, b, c, d],
        isFirst ? [1, 1, 0] : isLast ? [0, 1, 1] : [0, 1, 1, 0],
      ),
      y: useTransform(
        scrollYProgress,
        isFirst ? [s, c, d] : isLast ? [a, b, c] : [a, b, c, d],
        isFirst ? [0, 0, -180] : isLast ? [180, 0, 0] : [180, 0, 0, -180],
      ),
      bgScale: useTransform(scrollYProgress, [s, b], [1.12, 1]),
      glyphX: useTransform(scrollYProgress, [s, b], [120, 0]),
      pointerEvents: useTransform(
        scrollYProgress,
        isFirst ? [s, c, d] : isLast ? [a, b, c] : [a, b, c, d],
        isFirst ? ["auto", "auto", "none"] : isLast ? ["none", "auto", "auto"] : ["none", "auto", "auto", "none"],
      ),
    };
  });

  // Chapter rail + counter driven via DOM refs (no re-renders while scrolling)
  const dotRefs = useRef([]);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const idx = Math.min(SLIDE_COUNT - 1, Math.floor(v * SLIDE_COUNT));
    dotRefs.current.forEach((d, i) => {
      if (d) d.style.backgroundColor = i <= idx ? "var(--color-accent)" : "rgba(255,255,255,0.18)";
    });
    document.querySelectorAll("[data-counter]").forEach((c) => {
      c.textContent = String(idx + 1).padStart(2, "0");
    });
  });

  const jumpTo = (i) => () => {
    const el = ref.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const room = el.getBoundingClientRect().height - window.innerHeight;
    window.scrollTo({
      top: top + ((i + 0.5) / SLIDE_COUNT) * room,
      behavior: reduce ? "auto" : "smooth",
    });
  };

  return (
    <section ref={ref} id="showcase" className="relative" style={{ height: reduce ? undefined : `${SLIDE_COUNT * 100}vh` }}>
      <div
        className={
          reduce
            ? "relative overflow-hidden py-6"
            : "relative overflow-hidden md:sticky md:top-0 md:flex md:h-screen md:items-center"
        }
      >
        {reduce ? (
          <StackedFallback onExplore={onExplore} onCaseStudy={onCaseStudy} />
        ) : (
          <>
            {/* Desktop pinned chapters */}
            <div className="relative hidden h-full w-full md:block">
              {perSlide.map((ms, i) =>
                slides[i].project ? (
                  <FullScreenSlide
                    key={i}
                    project={slides[i].project}
                    index={i}
                    isLast={i === SLIDE_COUNT - 1}
                    ms={ms}
                    onExplore={onExplore}
                    onCaseStudy={onCaseStudy}
                  />
                ) : (
                  <NextSlide key={i} ms={ms} index={i} />
                ),
              )}

              {/* chapter rail (xl+, fromfauna-style) */}
              <div className="absolute right-6 top-1/2 z-30 hidden w-44 -translate-y-1/2 flex-col gap-7 xl:flex">
                {CHAPTERS.map((c, i) => (
                  <ChapterRow
                    key={c.label}
                    index={i}
                    label={c.label}
                    range={c.range}
                    progress={scrollYProgress}
                    onClick={jumpTo(i)}
                  />
                ))}
                <span className="mt-2 flex items-center gap-1 font-mono text-[10px] tracking-[0.2em] text-zinc-500">
                  <span data-counter>01</span>
                  <span className="text-zinc-700">/ 03</span>
                </span>
              </div>

              {/* chapter dots (below xl) */}
              <div className="absolute right-5 top-1/2 z-30 flex -translate-y-1/2 flex-col items-center gap-2.5 xl:hidden">
                <div className="flex flex-col items-center gap-2.5">
                  {slides.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={jumpTo(i)}
                      aria-label={`Go to project pair ${i + 1}`}
                      className="h-1 w-6 rounded-full transition-colors"
                      style={{ backgroundColor: i === 0 ? "var(--color-accent)" : "rgba(255,255,255,0.18)" }}
                    />
                  ))}
                </div>
                <span className="mt-4 flex items-center gap-1 font-mono text-[10px] tracking-[0.2em] text-zinc-500">
                  <span data-counter>01</span>
                  <span className="text-zinc-700">/ 03</span>
                </span>
              </div>

              {/* scroll hint */}
              <div className="pointer-events-none absolute bottom-6 left-1/2 z-30 -translate-x-1/2 flex-col items-center gap-2">
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-zinc-600">
                  scroll to flip
                </span>
                <span className="h-8 w-px animate-pulse bg-gradient-to-b from-accent/60 to-transparent" />
              </div>
            </div>

            {/* Mobile / small screens: stacked slides (no pinning) */}
            <div className="flex flex-col gap-6 py-6 md:hidden">
              {projects.map((p) => (
                <article
                  key={p.id}
                  className="card-lift relative flex flex-col overflow-hidden rounded-2xl border border-edge bg-panel p-7"
                >
                  <div className="grid-bg absolute inset-0 opacity-60" aria-hidden="true" />
                  <div className="relative z-10">
                    <span className="font-mono text-[11px] font-bold uppercase tracking-[0.3em] text-zinc-500">
                      {p.category}
                    </span>
                    <h4 className="mt-3 font-display text-3xl font-bold tracking-tight text-zinc-100">
                      {p.name}
                    </h4>
                    <p className="mt-3 text-sm leading-relaxed text-zinc-400">{p.oneLiner}</p>
                    <div className="mt-6 flex flex-wrap items-center gap-3">
                      {p.embed && (
                        <button type="button" onClick={() => onExplore(p)} className="btn-accent">
                          <Maximize2 className="h-4 w-4" aria-hidden="true" /> Open Interface
                        </button>
                      )}
                      {p.shipped && (
                        <button
                          type="button"
                          onClick={() => onCaseStudy(p)}
                          aria-label={`Open case study: ${p.name}`}
                          className="inline-flex items-center gap-2 rounded-lg border border-edge bg-ink/60 px-4 py-3 text-sm font-medium text-zinc-300 transition-colors hover:border-accent/50 hover:text-white"
                        >
                          <BookOpen className="h-4 w-4" aria-hidden="true" /> Case Study
                        </button>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}