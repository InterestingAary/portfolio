import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { Activity, Flag, Hammer, Rocket, Sparkles, Terminal, Trophy } from "lucide-react";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const steps = [
  {
    icon: Terminal,
    label: "Started",
    text: "Learned to program — and fell in love with building software.",
    highlight: false,
  },
  {
    icon: Hammer,
    label: "Built",
    text: "Started creating real projects: websites, tools, experiments.",
    highlight: false,
  },
  {
    icon: Flag,
    label: "Competed",
    text: "Entered hackathons with teammates, building under pressure.",
    highlight: false,
  },
  {
    icon: Trophy,
    label: "Won",
    text: "Srujana 2026 — 1st Place, Open Innovation, with Rural Guards.",
    highlight: true,
  },
  {
    icon: Sparkles,
    label: "Community",
    text: "Selected as Google Student Ambassador 2026 — Gemini Program.",
    highlight: false,
  },
  {
    icon: Rocket,
    label: "Shipped",
    text: "Deployed my first public website — Birthday Wishes.",
    highlight: false,
  },
  {
    icon: Activity,
    label: "Now",
    text: "Building larger projects. Learning DSA, game development, AI, and cybersecurity.",
    highlight: false,
  },
];

export default function Journey() {
  const reduce = useReducedMotion();
  const listRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start 0.75", "end 0.55"],
  });
  const scaleY = useSpring(scrollYProgress, { stiffness: 70, damping: 22 });

  return (
    <section id="journey" className="relative py-28 md:py-36">
      <div className="mx-auto w-full max-w-6xl px-6 md:px-10">
        <SectionHeading
          eyebrow="Journey"
          title="A story, not a résumé."
          description="Still early — but the trajectory is real: started, built, competed, won, shipped."
          chapter="06"
        />

        <div className="relative mt-16">
          {reduce ? (
            <div
              className="absolute left-[13px] top-1 bottom-1 w-px bg-gradient-to-b from-accent/50 via-edge to-transparent md:left-[15px]"
              aria-hidden="true"
            />
          ) : (
            <motion.div
              style={{ scaleY, transformOrigin: "top" }}
              className="absolute left-[13px] top-1 bottom-1 w-px bg-gradient-to-b from-accent/50 via-edge to-transparent md:left-[15px]"
              aria-hidden="true"
            />
          )}
          <ol ref={listRef} className="space-y-10">
            {steps.map((s, i) => (
              <li key={s.label}>
                <Reveal delay={i * 0.06} className="flex gap-6">
                  <span
                    className={`relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border md:h-8 md:w-8 ${
                      s.highlight
                        ? "border-accent bg-accent/15"
                        : "border-edge bg-ink"
                    }`}
                    aria-hidden="true"
                  >
                    <s.icon
                      className={`h-3.5 w-3.5 ${s.highlight ? "text-accent" : "text-zinc-500"}`}
                    />
                  </span>
                  <div className="pt-0.5">
                    <p
                      className={`font-display text-lg font-bold ${
                        s.highlight ? "text-accent" : "text-zinc-100"
                      }`}
                    >
                      {s.label}
                    </p>
                    <p className="mt-1 max-w-xl text-sm leading-relaxed text-zinc-400">{s.text}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}