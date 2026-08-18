import { ArrowRight, BookOpen, Bot, Gamepad2, GraduationCap, ShieldCheck, Target } from "lucide-react";
import { profile } from "../data/profile";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const pipeline = ["BUILD", "EXPERIMENT", "LEARN", "IMPROVE", "SHIP"];

const now = [
  { icon: Target, label: "Data Structures & Algorithms", note: "LeetCode · NeetCode" },
  { icon: Gamepad2, label: "Game development", note: "interactive experiences" },
  { icon: Bot, label: "AI experiments", note: "AI-assisted building" },
  { icon: ShieldCheck, label: "Cybersecurity", note: "security fundamentals" },
  { icon: BookOpen, label: "Web projects", note: "shipping what I learn" },
];

export default function About() {
  return (
    <section id="about" className="relative py-28 md:py-36">
      <div className="mx-auto w-full max-w-6xl px-6 md:px-10">
        <SectionHeading eyebrow="About" title="Learning by building." />

        <Reveal delay={0.1} className="mt-10">
          <blockquote className="border-l-2 border-accent pl-6 font-display text-2xl font-bold leading-snug text-zinc-100 md:text-4xl">
            I learn by
            <span className="text-accent"> building.</span>
          </blockquote>
        </Reveal>

        <div className="mt-14 grid gap-14 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <Reveal delay={0.05}>
              <div className="space-y-5 text-base leading-relaxed text-zinc-400">
                {profile.bio.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.15} className="mt-10">
              <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-zinc-500">
                How I work
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-2">
                {pipeline.map((step, i) => (
                  <span key={step} className="flex items-center gap-2">
                    <span
                      className={`rounded-md border px-3 py-1.5 font-mono text-xs font-semibold tracking-wide ${
                        i === pipeline.length - 1
                          ? "border-accent/40 bg-accent/10 text-accent"
                          : "border-edge bg-panel text-zinc-300"
                      }`}
                    >
                      {step}
                    </span>
                    {i < pipeline.length - 1 && (
                      <ArrowRight className="h-3.5 w-3.5 text-zinc-600" aria-hidden="true" />
                    )}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <div className="rounded-2xl border border-edge bg-panel p-7">
              <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-accent">now</p>
              <ul className="mt-5 space-y-4">
                {now.map((n) => (
                  <li key={n.label} className="flex items-start gap-3.5">
                    <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-edge bg-ink text-accent">
                      <n.icon className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <span>
                      <span className="block text-sm font-semibold text-zinc-200">{n.label}</span>
                      <span className="block text-xs text-zinc-500">{n.note}</span>
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex items-center gap-2.5 border-t border-edge pt-5 text-xs text-zinc-500">
                <GraduationCap className="h-4 w-4 text-accent" aria-hidden="true" />
                {profile.education}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}