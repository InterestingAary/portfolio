import { ExternalLink, Sparkles } from "lucide-react";
import { currentlyLearning, dsa, skillGroups } from "../data/skills";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const tilts = [-1.5, 1, -0.8, 1.6, -1.2, 0.9, -1, 1.3, -0.7];

const groupStyles = [
  {
    tape: "tape",
    chip: "border-accent/25 bg-accent/5 hover:border-accent/60 hover:bg-accent/10",
    text: "text-accent",
  },
  {
    tape: "tape tape-blue",
    chip: "border-[#5b9dff]/25 bg-[#5b9dff]/5 hover:border-[#5b9dff]/60 hover:bg-[#5b9dff]/10",
    text: "text-[#7db4ff]",
  },
  {
    tape: "tape tape-purple",
    chip: "border-[#a78bfa]/25 bg-[#a78bfa]/5 hover:border-[#a78bfa]/60 hover:bg-[#a78bfa]/10",
    text: "text-[#c4b5fd]",
  },
];

export default function Skills() {
  const topics = dsa.topics;

  return (
    <section id="skills" className="relative py-28 md:py-36">
      <div className="mx-auto w-full max-w-6xl px-6 md:px-10">
        <SectionHeading
          eyebrow="Skills"
          title="Technologies I build with."
          description="Categorized and honest — no percentage bars, because a skill isn't a loading bar."
          chapter="07"
        />

        <div className="mt-16 grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-10">
            {skillGroups.map((group, gi) => {
              const s = groupStyles[gi % groupStyles.length];
              return (
                <Reveal key={group.title} delay={gi * 0.06}>
                  <div
                    className={`card-lift relative rounded-2xl border border-edge bg-panel p-7 ${
                      gi % 2 === 0 ? "-rotate-[0.6deg]" : "rotate-[0.5deg]"
                    }`}
                  >
                    <span className={`${s.tape}`} aria-hidden="true" />
                    <div className="flex items-baseline justify-between gap-4">
                      <h3 className={`font-mono text-[11px] font-semibold uppercase tracking-[0.3em] ${s.text}`}>
                        // {group.title}
                      </h3>
                      <span className="font-mono text-[10px] text-zinc-600">0{gi + 1}</span>
                    </div>
                    <div className="mt-5 flex flex-wrap gap-2.5">
                      {group.items.map((skill, i) => (
                        <span
                          key={skill}
                          style={{ transform: `rotate(${tilts[i % tilts.length]}deg)` }}
                          className={`rounded-lg border px-3 py-1.5 text-sm text-zinc-300 transition-colors ${s.chip}`}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>

          <div className="space-y-10">
            <Reveal delay={0.08}>
              <div className="card-lift overflow-hidden rounded-2xl border border-edge bg-panel">
                <div className="flex items-center gap-1.5 border-b border-edge bg-ink/70 px-4 py-2.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" aria-hidden="true" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" aria-hidden="true" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" aria-hidden="true" />
                  <span className="ml-3 font-mono text-[10px] text-zinc-500">problem-solving.ts</span>
                </div>
                <div className="p-7">
                  <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.3em] text-accent">
                    &gt; Problem Solving
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                    Practicing data structures and algorithms through structured problem solving and consistent practice.
                  </p>

                  <div className="mt-5 space-y-2.5">
                    {dsa.platforms.map((p) =>
                      p.url ? (
                        <a
                          key={p.name}
                          href={p.url}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center justify-between rounded-xl border border-edge bg-ink px-4 py-3 text-sm font-medium text-zinc-200 transition-colors hover:border-accent/50 hover:text-white"
                        >
                          {p.name}
                          <ExternalLink className="h-4 w-4 text-accent" aria-hidden="true" />
                        </a>
                      ) : (
                        <div
                          key={p.name}
                          className="flex items-center justify-between rounded-xl border border-edge bg-ink px-4 py-3 text-sm font-medium text-zinc-400"
                        >
                          {p.name}
                          <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-600">
                            daily practice
                          </span>
                        </div>
                      ),
                    )}
                  </div>

                  {topics.length > 0 && (
                    <div className="mt-6 border-t border-edge pt-5">
                      <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                        Topics practiced
                      </p>
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {topics.map((t, i) => (
                          <span
                            key={t}
                            style={{ transform: `rotate(${tilts[i % tilts.length]}deg)` }}
                            className="rounded-md border border-edge bg-ink px-2.5 py-1 font-mono text-xs text-zinc-300"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.14}>
              <div className="card-lift relative rotate-[1.2deg] rounded-lg border border-amber-300/25 bg-amber-400/[0.07] p-7 shadow-[0_14px_34px_-14px_rgba(0,0,0,0.6)]">
                <span className="tape tape-amber" aria-hidden="true" />
                <h3 className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.3em] text-amber-300">
                  <Sparkles className="h-3.5 w-3.5" aria-hidden="true" /> Currently learning
                </h3>
                <div className="mt-5 flex flex-wrap gap-2">
                  {currentlyLearning.map((s, i) => (
                    <span
                      key={s}
                      style={{ transform: `rotate(${tilts[i % tilts.length]}deg)` }}
                      className="rounded-lg border border-amber-400/20 bg-amber-400/10 px-3 py-1.5 text-sm text-amber-200/90 transition-colors hover:border-amber-300/50 hover:bg-amber-400/20"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}