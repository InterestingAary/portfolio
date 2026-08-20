import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowLeft, ArrowRight, Maximize2 } from "lucide-react";
import { projects } from "../data/projects";
import ProjectCard from "./ProjectCard";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import Showcase from "./Showcase";
import StatusChip from "./StatusChip";

function GroupHeader({ label, note, dotClass }) {
  return (
    <Reveal className="mt-20 flex flex-wrap items-center gap-4 first:mt-14">
      <span className={`h-2.5 w-2.5 -rotate-45 rounded-[3px] ${dotClass}`} aria-hidden="true" />
      <h3 className="font-mono text-sm font-bold uppercase tracking-[0.3em] text-zinc-100">
        [ {label} ]
      </h3>
      <span className="h-px flex-1 bg-gradient-to-r from-edge to-transparent" aria-hidden="true" />
      <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-500">{note}</span>
    </Reveal>
  );
}

function ParallaxItem({ progress, range, children }) {
  const reduce = useReducedMotion();
  const y = useTransform(progress, [0, 1], range);
  if (reduce) return <>{children}</>;
  return <motion.div style={{ y }}>{children}</motion.div>;
}

/**
 * Drag-to-explore deck: a snap-scrolling strip of project cards.
 * Mouse users drag it (or use the arrows), touch users swipe natively.
 */
function ExploreDeck({ projects, onExplore }) {
  const trackRef = useRef(null);
  const dragState = useRef({ down: false, startX: 0, startScroll: 0, moved: false, projectId: null });
  const reduce = useReducedMotion();

  const onPointerDown = (e) => {
    const el = trackRef.current;
    if (!el) return;
    const btn = e.target.closest("button[data-project]");
    dragState.current = {
      down: true,
      startX: e.clientX,
      startScroll: el.scrollLeft,
      moved: false,
      projectId: btn ? btn.dataset.project : null,
    };
    el.setPointerCapture?.(e.pointerId);
  };

  const onPointerMove = (e) => {
    const d = dragState.current;
    const el = trackRef.current;
    if (!d.down || !el || e.pointerType === "touch") return;
    const dx = e.clientX - d.startX;
    if (Math.abs(dx) > 6) d.moved = true;
    if (d.moved) el.scrollLeft = d.startScroll - dx;
  };

  const onPointerUp = () => {
    const d = dragState.current;
    dragState.current.down = false;
    if (!d.moved && d.projectId) {
      const p = projects.find((x) => x.id === d.projectId);
      if (p) onExplore(p);
    }
  };

  const endDrag = () => {
    dragState.current.down = false;
  };

  const nudge = (dir) => () => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({
      left: dir * Math.round(el.clientWidth * 0.7),
      behavior: reduce ? "auto" : "smooth",
    });
  };

  return (
    <div className="mt-16">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.3em] text-accent">
            pick a project
          </p>
          <h3 className="mt-2 font-display text-2xl font-bold text-zinc-100 md:text-3xl">
            Which one do you want to explore?
          </h3>
          <p className="mt-2 font-mono text-xs uppercase tracking-wider text-zinc-500">
            drag the deck — every card opens its interface fullscreen
          </p>
        </div>
        <div className="hidden shrink-0 gap-2 sm:flex">
          <button
            type="button"
            onClick={nudge(-1)}
            aria-label="Scroll projects left"
            className="rounded-lg border border-edge bg-panel p-2.5 text-zinc-300 transition-colors hover:border-accent/50 hover:text-accent"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={nudge(1)}
            aria-label="Scroll projects right"
            className="rounded-lg border border-edge bg-panel p-2.5 text-zinc-300 transition-colors hover:border-accent/50 hover:text-accent"
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div
        ref={trackRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={endDrag}
        onPointerCancel={endDrag}
        className="scrollbar-hide -mx-6 mt-8 flex cursor-grab snap-x gap-6 overflow-x-auto px-6 pb-4 select-none active:cursor-grabbing md:-mx-10 md:px-10"
        style={{ touchAction: "pan-x" }}
      >
        <div className="w-72 shrink-0 snap-start">
          <div className="flex h-full min-h-[264px] flex-col justify-between rounded-2xl border border-accent/40 bg-accent/5 p-6">
            <div>
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-accent">
                explore deck
              </p>
              <p className="mt-3 font-display text-2xl font-bold leading-snug text-zinc-100">
                Which one do you want to explore?
              </p>
            </div>
            <p className="mt-6 text-xs leading-relaxed text-zinc-400">
              drag the deck and pick a card — it opens the project interface in fullscreen. exit
              anytime.
            </p>
          </div>
        </div>

        {projects.map((p) => (
          <button
            key={p.id}
            type="button"
            data-project={p.id}
            onClick={() => onExplore(p)}
            aria-label={`Explore ${p.name} in fullscreen`}
            className="card-lift group relative w-72 shrink-0 snap-start overflow-hidden rounded-2xl border border-edge bg-panel text-left"
          >
            <div
              className="relative h-32 overflow-hidden"
              style={{
                background: `radial-gradient(120% 140% at 15% 0%, ${p.accent}26 0%, transparent 55%), linear-gradient(180deg, var(--color-panel) 0%, var(--color-ink) 100%)`,
              }}
            >
              <div className="grid-bg absolute inset-0" aria-hidden="true" />
              <span
                className="absolute left-4 top-4 font-display text-4xl font-bold tracking-tight text-white/10 transition-colors duration-500 group-hover:text-white/20"
                aria-hidden="true"
              >
                {p.glyph}
              </span>
              <div className="absolute right-3 top-3">
                <StatusChip status={p.status} className="bg-ink/80 backdrop-blur" />
              </div>
              <span className="absolute bottom-3 left-4 rounded-full border border-edge bg-ink/80 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-zinc-400 backdrop-blur">
                {p.category}
              </span>
            </div>
            <div className="p-5">
              <p className="font-display text-lg font-bold text-zinc-100">{p.name}</p>
              <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-zinc-500">{p.oneLiner}</p>
              <div className="mt-4 flex items-center justify-between border-t border-edge/60 pt-3">
                <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-accent transition-colors group-hover:underline">
                  explore fullscreen
                </span>
                <Maximize2
                  className="h-3.5 w-3.5 text-zinc-600 transition-colors group-hover:text-accent"
                  aria-hidden="true"
                />
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export default function Projects({ onOpenProject, onExploreProject }) {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const shipped = projects.filter((p) => p.shipped);
  const building = projects.filter((p) => !p.shipped);

  return (
    <section id="work" ref={sectionRef} className="relative py-28 md:py-36">
      <div className="relative mx-auto w-full max-w-6xl px-6 md:px-10">
        <SectionHeading
          eyebrow="Work"
          title="Shipped — and what's next."
          description="I keep two honest lists: things that are live or won, and things I'm actively building right now. Nothing here is pretend-finished."
          chapter="03"
        />

        <Showcase
          onExplore={onExploreProject}
          onCaseStudy={onOpenProject}
        />

        <ExploreDeck projects={projects} onExplore={onExploreProject} />

        <GroupHeader label="SHIPPED" note="live, deployed, or competition winners" dotClass="bg-emerald-400" />
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {shipped.map((p, i) => (
            <ParallaxItem
              key={p.id}
              progress={scrollYProgress}
              range={i === 0 ? [56, -56] : i % 2 === 0 ? [38, -38] : [16, -16]}
            >
              <Reveal delay={i * 0.08} className={i === 0 ? "lg:col-span-2" : ""}>
                <ProjectCard project={p} featured={i === 0} onOpen={() => onOpenProject(p)} />
              </Reveal>
            </ParallaxItem>
          ))}
        </div>

        <GroupHeader label="BUILDING" note="in progress — being built right now" dotClass="bg-amber-400" />
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {building.map((p, i) => (
            <ParallaxItem
              key={p.id}
              progress={scrollYProgress}
              range={i % 2 === 0 ? [34, -34] : [14, -14]}
            >
              <Reveal delay={i * 0.08}>
                <ProjectCard project={p} onOpen={() => onOpenProject(p)} />
              </Reveal>
            </ParallaxItem>
          ))}
        </div>
      </div>
    </section>
  );
}