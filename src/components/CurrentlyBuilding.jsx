import { Bot, BrainCircuit, Code2, Gamepad2, Plus, ShieldCheck } from "lucide-react";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const items = [
  { icon: Gamepad2, title: "Game Development", note: "interactive experiences & worlds" },
  { icon: ShieldCheck, title: "Cybersecurity", note: "security-focused ideas" },
  { icon: Bot, title: "AI / Fitness Projects", note: "AI-assisted product ideas" },
  { icon: Code2, title: "Web Projects", note: "more apps & tools" },
  { icon: BrainCircuit, title: "DSA", note: "daily problem solving" },
];

export default function CurrentlyBuilding() {
  return (
    <section id="now" className="relative py-28 md:py-32">
      <div className="mx-auto w-full max-w-6xl px-6 md:px-10">
        <SectionHeading
          eyebrow="Currently building"
          title="A living roadmap."
          description="A live snapshot of what I'm exploring and building right now."
          chapter="08"
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.06}>
              <div
                className={`card-lift group relative flex h-full items-start gap-4 rounded-2xl border border-edge bg-panel p-6 ${
                  i % 2 === 0 ? "-rotate-[0.4deg]" : "rotate-[0.5deg]"
                }`}
              >
                <span className={`tape ${i % 3 === 0 ? "tape-amber" : i % 3 === 1 ? "tape-blue" : "tape"}`} aria-hidden="true" />
                <span className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-edge bg-ink text-accent">
                  <c.icon className="h-5 w-5" aria-hidden="true" />
                  <span
                    className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-amber-400"
                    aria-hidden="true"
                  >
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-60" />
                  </span>
                </span>
                <span className="min-w-0">
                  <span className="flex items-baseline gap-2">
                    <span className="font-mono text-[10px] font-semibold text-accent">
                      0{i + 1}
                    </span>
                    <span className="block truncate font-display text-base font-bold text-zinc-100">
                      {c.title}
                    </span>
                  </span>
                  <span className="mt-1 block text-xs text-zinc-500">{c.note}</span>
                </span>
              </div>
            </Reveal>
          ))}

          <Reveal delay={0.3}>
            <div className="flex h-full items-center justify-center gap-2.5 rounded-2xl border border-dashed border-edge bg-transparent p-6 text-sm text-zinc-600">
              <Plus className="h-4 w-4" aria-hidden="true" /> More experiments ahead.
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}