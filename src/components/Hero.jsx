import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowRight, Gamepad2, Rocket, Trophy } from "lucide-react";
import { GitHubIcon } from "./icons";
import { profile } from "../data/profile";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};

const item = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] } },
};

const floatingCards = [
  {
    name: "Rural Guards",
    chip: "🏆 WINNER",
    chipCls: "bg-accent/10 text-accent border-accent/30",
    tech: "node.js · leaflet · twilio",
    pos: "left-0 top-14 w-60 -rotate-3 md:w-64",
    depth: 28,
    z: 20,
  },
  {
    name: "Birthday Wishes",
    chip: "● LIVE",
    chipCls: "bg-emerald-400/10 text-emerald-300 border-emerald-400/25",
    tech: "html · css · js",
    pos: "right-0 top-0 w-52 rotate-2 md:w-56",
    depth: 18,
    z: 10,
  },
  {
    name: "Muzilo",
    chip: "IN DEV",
    chipCls: "bg-amber-400/10 text-amber-300 border-amber-400/25",
    tech: "building…",
    pos: "bottom-8 left-8 w-48 rotate-1 md:w-52",
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

  const onMouseMove = (e) => {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center overflow-hidden"
      onMouseMove={onMouseMove}
    >
      <div className="grid-bg absolute inset-0" aria-hidden="true" />
      <div className="glow absolute -top-32 left-1/2 h-[520px] w-[820px] -translate-x-1/2 blur-2xl" aria-hidden="true" />
      <div className="absolute right-[-15%] top-1/3 h-[420px] w-[420px] rounded-full bg-accent/10 blur-3xl" aria-hidden="true" />

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-16 px-6 pb-24 pt-32 md:px-10 lg:grid-cols-[1.15fr_0.85fr] lg:pb-28 lg:pt-36">
        <motion.div variants={container} initial={reduce ? false : "hidden"} animate="show">
          <motion.div variants={item}>
            <span className="inline-flex items-center gap-2 rounded-full border border-edge bg-panel px-3.5 py-1.5 text-xs text-zinc-400">
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              {profile.status}
            </span>
          </motion.div>

          <motion.p
            variants={item}
            className="mt-8 font-mono text-xs font-semibold uppercase tracking-[0.35em] text-accent md:text-sm"
          >
            Aaryan Mittal
          </motion.p>
          <motion.p
            variants={item}
            className="mt-2 font-mono text-[11px] uppercase tracking-[0.25em] text-zinc-500"
          >
            Developer · Builder · Creator
          </motion.p>

          <h1 className="mt-6 font-display font-bold leading-[0.98] tracking-tight">
            <motion.span
              variants={item}
              className="block text-[clamp(2.2rem,5.8vw,4.25rem)] text-zinc-100"
            >
              I don't just learn
            </motion.span>
            <motion.span
              variants={item}
              className="block text-[clamp(2.2rem,5.8vw,4.25rem)] text-zinc-100"
            >
              technology.
            </motion.span>
            <motion.span
              variants={item}
              className="block text-[clamp(2.2rem,5.8vw,4.25rem)] text-accent"
            >
              I build with it.
            </motion.span>
          </h1>

          <motion.p variants={item} className="mt-8 max-w-xl text-lg font-medium text-zinc-200 md:text-xl">
            {profile.tagline}
          </motion.p>

          <motion.div variants={item} className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#work"
              className="btn-accent"
            >
              Explore My Work
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
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

        {!reduce && (
          <motion.div
            aria-hidden="true"
            className="relative hidden h-[440px] select-none lg:block"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <div className="glow absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 blur-xl" />
            {floatingCards.map((c) => (
              <ParallaxCard key={c.name} card={c} mx={sx} my={sy} />
            ))}
          </motion.div>
        )}
      </div>

      <div className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-zinc-600">scroll</span>
        <span className="h-10 w-px animate-pulse bg-gradient-to-b from-accent/60 to-transparent" />
      </div>
    </section>
  );
}
