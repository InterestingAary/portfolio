import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { achievements } from "../data/achievements";
import { projects } from "../data/projects";

/**
 * Doctrine — meermohsin.me-inspired, remixed:
 * two giant masked lines that slide on scroll scrub
 * (the "It Was Always Going to Be This Way." trick), plus a
 * real-data stats band (milestones / projects / hackathon win).
 */
const LINE_A = "EVERY PROJECT IS A LESSON.";
const LINE_B = "EVERY LESSON GETS SHIPPED.";

export default function Doctrine() {
  const reduce = useReducedMotion();
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const lineA = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);
  const lineB = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]);
  const isDesktop = typeof window !== "undefined" && window.innerWidth >= 768;
  const xA = useTransform(lineA, (v) => (isDesktop ? v : 0));
  const xB = useTransform(lineB, (v) => (isDesktop ? v : 0));
  const statOp = useTransform(scrollYProgress, [0.35, 0.65], [0, 1]);
  const statY = useTransform(scrollYProgress, [0.35, 0.65], [40, 0]);
  const statOpacity = useTransform(statOp, (v) => (isDesktop ? v : 1));
  const statOffset = useTransform(statY, (v) => (isDesktop ? v : 0));

  const stats = [
    { num: String(achievements.length).padStart(2, "0"), label: "milestones" },
    { num: String(projects.length).padStart(2, "0"), label: "projects shipped" },
    {
      num: "01",
      label: "hackathon win",
      extra: achievements.filter((a) => a.featured).length > 0,
    },
  ];

  return (
    <section ref={sectionRef} id="doctrine" className={`relative ${reduce ? "" : "md:h-[160vh]"}`}>
      <div className="relative flex min-h-[80vh] flex-col items-center justify-center overflow-hidden py-24 md:min-h-screen">
        {reduce ? (
          <div className="flex flex-col items-center gap-8 px-6">
            <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-accent">// doctrine</p>
            <h2 className="text-center font-serif text-[clamp(2rem,7vw,5.5rem)] leading-[0.95] tracking-tight text-zinc-100">
              {LINE_A}
            </h2>
            <h2 className="text-center font-serif text-[clamp(2rem,7vw,5.5rem)] leading-[0.95] tracking-tight text-zinc-600">
              {LINE_B}
            </h2>
            <div className="mt-10 flex gap-14">
              {stats.map((s) => (
                <div key={s.label} className="text-center">
                  <p className="font-serif text-5xl text-zinc-100">{s.num}</p>
                  <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-500">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="w-full">
            <p className="mb-6 px-6 font-mono text-[11px] uppercase tracking-[0.35em] text-accent md:px-10">
              // doctrine
            </p>
            <div className="overflow-hidden py-2">
              <motion.h2
                style={{ x: xA }}
                className="whitespace-nowrap text-center font-serif text-[clamp(2.2rem,8vw,7rem)] leading-[0.95] tracking-tight text-zinc-100"
                aria-label={LINE_A}
              >
                {LINE_A}
              </motion.h2>
            </div>
            <div className="overflow-hidden py-2">
              <motion.h2
                style={{ x: xB }}
                className="whitespace-nowrap text-center font-serif text-[clamp(2.2rem,8vw,7rem)] leading-[0.95] tracking-tight text-zinc-600"
                aria-label={LINE_B}
              >
                {LINE_B}
              </motion.h2>
            </div>

            <motion.div
              style={{ opacity: statOpacity, y: statOffset }}
              className="doctrine-stats mt-14 flex items-start justify-center gap-10 px-6 md:mt-20 md:gap-24"
            >
              {stats.map((s) => (
                <div key={s.label} className="flex items-baseline gap-3">
                  <span className="font-serif text-5xl text-zinc-100 md:text-7xl">{s.num}</span>
                  <span className="max-w-[7rem] font-mono text-[10px] uppercase leading-relaxed tracking-[0.2em] text-zinc-500">
                    {s.label}
                    {s.extra ? <span className="mt-1 block text-accent">featured</span> : null}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
}