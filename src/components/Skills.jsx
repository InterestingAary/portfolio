import { ExternalLink, Sparkles } from "lucide-react";
import { currentlyLearning, dsa, skillGroups } from "../data/skills";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function Skills() {
  const topics = dsa.topics;

  return (
    <section id="skills" className="relative py-28 md:py-36">
      <div className="mx-auto w-full max-w-6xl px-6 md:px-10">
        <SectionHeading
          eyebrow="Skills"
          title="Technologies I build with."
          description="Categorized and honest — no percentage bars, because a skill isn't a loading bar."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-5">
            {skillGroups.map((group, gi) => (
              <Reveal key={group.title} delay={gi * 0.06}>
                <div className="card-lift h-full rounded-2xl border border-edge bg-panel p-7">
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="font-mono text-[11px] font-semibold uppercase tracking-[0.3em] text-accent">
                      {group.title}
                    </h3>
                    <span className="font-mono text-[10px] text-zinc-600">
                      0{gi + 1}
                    </span>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {group.items.map((s) => (
                      <span
                        key={s}
                        className="rounded-lg border border-edge bg-ink px-3 py-1.5 text-sm text-zinc-300 transition-colors hover:border-accent/40 hover:text-zinc-100"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="space-y-5">
            <Reveal delay={0.08}>
              <div className="card-lift rounded-2xl border border-edge bg-panel p-7">
                <h3 className="font-mono text-[11px] font-semibold uppercase tracking-[0.3em] text-accent">
                  Problem Solving
                </h3>
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
                      {topics.map((t) => (
                        <span
                          key={t}
                          className="rounded-md border border-edge bg-ink px-2.5 py-1 font-mono text-xs text-zinc-300"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </Reveal>

            <Reveal delay={0.14}>
              <div className="card-lift rounded-2xl border border-edge bg-panel p-7">
                <h3 className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.3em] text-amber-300">
                  <Sparkles className="h-3.5 w-3.5" aria-hidden="true" /> Currently learning
                </h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {currentlyLearning.map((s) => (
                    <span
                      key={s}
                      className="rounded-lg border border-amber-400/20 bg-amber-400/5 px-3 py-1.5 text-sm text-amber-200/90"
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