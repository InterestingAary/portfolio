import { Fragment, useRef } from "react";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowRight, Gamepad2, Rocket, Trophy } from "lucide-react";
import { GitHubIcon } from "./icons";
import Metaball from "./Metaball";
import { profile } from "../data/profile";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};

const item = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] } },
};

const STAGES = ["01 / WHOAMI", "02 / BUILD", "03 / CONTEXT", "04 / ACTION"];

const floatingCards = [
  {
    name: "Rural Guards",
    chip: "🏆 WINNER",
    chipCls: "bg-accent/10 text-accent border-accent/30",
    tech: "node.js · leaflet · twilio",
    pos: "left-1 top-28 w-60 -rotate-3 md:w-64",
    depth: 28,
    z: 20,
  },
  {
    name: "Birthday Wishes",
    chip: "● LIVE",
    chipCls: "bg-emerald-400/10 text-emerald-300 border-emerald-400/25",
    tech: "html · css · js",
    pos: "right-0 top-2 w-52 rotate-2 md:w-56",
    depth: 18,
    z: 10,
  },
  {
    name: "Muzilo",
    chip: "IN DEV",
    chipCls: "bg-amber-400/10 text-amber-300 border-amber-400/25",
    tech: "building…",
    pos: "bottom-10 left-12 w-48 rotate-1 md:w-52",
    depth: 38,
    z: 30,
  },
];

function ParallaxCard({ card, mx, my }) {
  const x = useTransform(mx, (v) => v * card.depth);
  const y = useTransform(my, (v) => v * card.depth);

  return (
    <motion.div className={`absolute ${card.pos}`} style={{ zIndex: card.z, x, y }}>
      <div className="float-slow">
        <div className="rounded-2xl border border-edge bg-panel/90 p-4 shadow-2xl shadow-black/50 backdrop-blur">
          <div className="flex items-center justify-between gap-3">
            <p className="font-display text-sm font-semibold text-zinc-100">{card.name}</p>
            <span
              className={`rounded-full border px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider ${card.chipCls}`}
            >
              {card.chip}
            </span>
          </div>
          <p className="mt-2 font-mono text-[10px] text-zinc-500">{card.tech}</p>
          <div className="mt-3 flex items-center gap-1.5">
            <span className="h-1 w-8 rounded-full bg-accent/40" />
            <span className="h-1 w-3 rounded-full bg-zinc-700" />
            <span className="h-1 w-5 rounded-full bg-zinc-700" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Hero() {
  const reduce = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 50, damping: 18 });
  const sy = useSpring(my, { stiffness: 50, damping: 18 });

  // Magnetic pull for the primary CTA
  const btnX = useSpring(0, { stiffness: 220, damping: 16 });
  const btnY = useSpring(0, { stiffness: 220, damping: 16 });

  const onMouseMove = (e) => {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  const onCtaMove = (e) => {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    btnX.set((e.clientX - r.left - r.width / 2) * 0.18);
    btnY.set((e.clientY - r.top - r.height / 2) * 0.18);
  };

  const onCtaLeave = () => {
    btnX.set(0);
    btnY.set(0);
  };

  // Scroll-driven scrollytelling stage: the hero pins for 300vh and
  // plays four acts as the reader scrolls, then zooms out and releases.
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    // "start start"/"end end" mapped to %-form so framer-motion v13
    // falls back to JS measurement instead of the CSS ViewTimeline
    // "contain" range, which inverts for targets taller than the
    // viewport and pins wrong styles at rest.
    offset: ["start 0%", "end 100%"],
  });

  // Act 2: "I build with it." rolls in over the same slot and STAYS
  // until the stage exit (0.88-1). Plateau keeps framer from decaying
  // the value back to 0 after the range ends.
  const act1Op = useTransform(scrollYProgress, [0.12, 0.24], [1, 0]);
  const act1Y = useTransform(scrollYProgress, [0.12, 0.24], [0, -14]);
  const act2Op = useTransform(scrollYProgress, [0.26, 0.38, 0.88, 1], [0, 1, 1, 0]);
  const act2Y = useTransform(scrollYProgress, [0.26, 0.38], [20, 0]);

  // Act 3: tagline + highlights rise in, stay, then ride out with the stage exit.
  const tagOp = useTransform(scrollYProgress, [0.5, 0.64, 0.88, 1], [0, 1, 1, 0]);
  const tagY = useTransform(scrollYProgress, [0.5, 0.64], [32, 0]);

  // Act 4: floating cards sweep in, CTAs rise (plateau until stage exit)
  const cardsOp = useTransform(scrollYProgress, [0.68, 0.82, 0.88, 1], [0, 1, 1, 0]);
  const cardsX = useTransform(scrollYProgress, [0.68, 0.82], [90, 0]);
  const ctaOp = useTransform(scrollYProgress, [0.68, 0.84, 0.88, 1], [0, 1, 1, 0]);
  const ctaY = useTransform(scrollYProgress, [0.68, 0.84], [24, 0]);

  // Ambient reactions while scrolling
  const blobScale = useTransform(scrollYProgress, [0.3, 0.55], [1, 1.35]);

  // Exit: the whole stage tilts and zooms out as it releases the pin
  const gridY = useTransform(scrollYProgress, [0, 1], [0, -30]);
  const exitRotate = useTransform(scrollYProgress, [0.84, 1], [0, -3.5]);
  const exitScale = useTransform(scrollYProgress, [0.84, 1], [1, 0.93]);
  const exitY = useTransform(scrollYProgress, [0.84, 1], [0, 70]);
  const exitOp = useTransform(scrollYProgress, [0.88, 1], [1, 0]);

  const scrollOp = useTransform(scrollYProgress, [0.12, 0.22], [1, 0]);
  const tickerOp = useTransform(scrollYProgress, [0.85, 1], [1, 0]);

  const gridMotionStyle = reduce ? undefined : { y: gridY };

  // Act ticker: bottom-left label + progress dots updated via DOM refs
  const labelRef = useRef(null);
  const dotRefs = useRef([]);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const idx = Math.min(STAGES.length - 1, Math.floor(v * STAGES.length));
    if (labelRef.current) labelRef.current.textContent = STAGES[idx];
    dotRefs.current.forEach((d, i) => {
      if (d) {
        d.style.backgroundColor = i <= idx ? "var(--color-accent)" : "rgba(255,255,255,0.18)";
      }
    });
  });

  const lineOne = ["I", "don't", "just", "learn", "technology."];
  const lineTwo = ["I", "build", "with", "it."];

  return (
    <section
      ref={heroRef}
      id="top"
      className="relative"
      style={reduce ? undefined : { height: "300vh" }}
    >
      <motion.div
        style={reduce ? undefined : { rotate: exitRotate, scale: exitScale, y: exitY, opacity: exitOp }}
        className={
          reduce
            ? "relative flex min-h-screen items-center overflow-hidden"
            : "sticky top-0 flex h-svh items-center overflow-hidden"
        }
        onMouseMove={onMouseMove}
      >
        <div className="grid-bg absolute inset-0" aria-hidden="true" />
        <motion.div className="absolute inset-0" style={reduce ? undefined : { scale: blobScale }}>
          <Metaball className="opacity-70" />
        </motion.div>

        <motion.div
          style={gridMotionStyle}
          className="relative mx-auto grid w-full max-w-6xl items-center gap-16 px-6 pb-24 pt-32 md:px-10 lg:grid-cols-[1.15fr_0.85fr] lg:pb-28 lg:pt-36"
        >
          <motion.div variants={container} initial={reduce ? false : "hidden"} animate="show">
            <motion.div
              variants={item}
              style={reduce ? undefined : { opacity: act1Op, y: act1Y }}
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-edge bg-panel px-3.5 py-1.5 text-xs text-zinc-400">
                <span className="relative flex h-2 w-2" aria-hidden="true">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                {profile.status}
              </span>
            </motion.div>

            <motion.div
              variants={item}
              style={reduce ? undefined : { opacity: act1Op, y: act1Y }}
              className="mt-8 flex items-center gap-3"
            >
                <span className="h-px w-8 bg-accent/50" aria-hidden="true" />
                <p className="font-mono text-sm text-zinc-400">
                  <span className="text-accent">$</span> whoami
                  <span className="blink ml-1 inline-block h-4 w-2 translate-y-0.5 bg-accent" aria-hidden="true" />
                </p>
              </motion.div>

              <h1 className="relative mt-6 font-display font-bold leading-[0.98] tracking-tight">
                <motion.span
                  style={reduce ? undefined : { opacity: act1Op, y: act1Y }}
                  className="block text-[clamp(2.2rem,5.8vw,4.25rem)] text-zinc-100"
                >
                  {lineOne.map((w, i) => (
                    <Fragment key={`${w}-${i}`}>
                      <motion.span
                        variants={item}
                        className={`inline-block ${w === "technology." ? "text-outline" : ""}`}
                      >
                        {w}
                      </motion.span>{" "}
                    </Fragment>
                  ))}
                </motion.span>
                <motion.span
                  style={reduce ? undefined : { opacity: act2Op, y: act2Y }}
                  className="absolute inset-x-0 top-0 block text-[clamp(2.2rem,5.8vw,4.25rem)]"
                >
                  {lineTwo.map((w, i) => (
                    <Fragment key={`${w}-${i}`}>
                      <motion.span
                        variants={item}
                        className={`inline-block ${w === "build" ? "font-serif italic text-accent" : "text-zinc-100"}`}
                      >
                        {w}
                      </motion.span>{" "}
                    </Fragment>
                  ))}
                </motion.span>
              </h1>

            <motion.div style={reduce ? undefined : { opacity: tagOp, y: tagY }}>
              <motion.p variants={item} className="mt-8 max-w-xl text-lg font-medium text-zinc-200 md:text-xl">
                {profile.tagline
                  .split("turning ideas into working projects")
                  .flatMap((part, i, arr) =>
                    i === arr.length - 1
                      ? [part]
                      : [
                          part,
                          <mark key={i} className="line text-zinc-100">
                            turning ideas into working projects
                          </mark>,
                        ],
                  )}
              </motion.p>

              <motion.ul
                variants={item}
                aria-label="Highlights"
                className="mt-10 flex flex-wrap items-center gap-2 lg:hidden"
              >
                <li className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-3 py-1.5 text-xs font-semibold text-accent">
                  <Trophy className="h-3.5 w-3.5" aria-hidden="true" /> Hackathon Winner
                </li>
                <li className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-3 py-1.5 text-xs font-semibold text-emerald-300">
                  <Rocket className="h-3.5 w-3.5" aria-hidden="true" /> First Ship
                </li>
                <li className="inline-flex items-center gap-1.5 rounded-full border border-edge bg-panel px-3 py-1.5 text-xs font-semibold text-zinc-300">
                  <Gamepad2 className="h-3.5 w-3.5" aria-hidden="true" /> Game Dev
                </li>
              </motion.ul>
            </motion.div>

            <motion.div style={reduce ? undefined : { opacity: ctaOp, y: ctaY }}>
              <motion.div variants={item} className="mt-10 flex flex-wrap items-center gap-4">
                <motion.a
                  href="#work"
                  className="btn-accent"
                  style={reduce ? undefined : { x: btnX, y: btnY }}
                  onMouseMove={onCtaMove}
                  onMouseLeave={onCtaLeave}
                >
                  Explore My Work
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 hover:translate-x-0.5" />
                </motion.a>
                {profile.links.github && (
                  <a
                    href={profile.links.github}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-ghost"
                  >
                    <GitHubIcon className="h-4 w-4" /> GitHub
                  </a>
                )}
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 px-4 py-3 text-sm font-medium text-zinc-300 transition-colors hover:text-white"
                >
                  Contact Me
                </a>
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div
            aria-hidden="true"
            className="relative hidden h-[440px] select-none lg:block"
            style={reduce ? undefined : { opacity: cardsOp, x: cardsX }}
          >
            {floatingCards.map((c) => (
              <ParallaxCard key={c.name} card={c} mx={sx} my={sy} />
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex [@media(max-height:780px)]:hidden"
          style={reduce ? undefined : { opacity: scrollOp }}
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-zinc-600">scroll</span>
          <span className="h-10 w-px animate-pulse bg-gradient-to-b from-accent/60 to-transparent" />
        </motion.div>

        {!reduce && (
          <motion.div
            className="absolute bottom-8 left-6 z-30 flex items-center gap-3"
            style={{ opacity: tickerOp }}
          >
            <span ref={labelRef} className="font-mono text-[10px] uppercase tracking-[0.3em] text-zinc-500">
              01 / WHOAMI
            </span>
            <span className="flex items-center gap-1">
              {STAGES.map((_, i) => (
                <span
                  key={i}
                  ref={(el) => {
                    dotRefs.current[i] = el;
                  }}
                  className="h-1 w-5 rounded-full"
                  style={{ backgroundColor: i === 0 ? "var(--color-accent)" : "rgba(255,255,255,0.18)" }}
                />
              ))}
            </span>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}