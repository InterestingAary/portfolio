import { Gamepad2, Rocket, Sparkles, Trophy } from "lucide-react";
import { achievements } from "../data/achievements";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const icons = {
  trophy: Trophy,
  sparkles: Sparkles,
  rocket: Rocket,
  gamepad: Gamepad2,
};

function FeaturedCard({ a, index }) {
  const Icon = icons[a.icon] ?? Trophy;
  return (
    <Reveal delay={index * 0.08} className="h-full">
      <div className="card-lift group relative h-full overflow-hidden rounded-2xl border border-edge bg-panel p-8">
        <span
          className="pointer-events-none absolute -right-2 -top-6 font-display text-[7rem] font-bold leading-none text-white/[0.03]"
          aria-hidden="true"
        >
          0{index + 1}
        </span>
        <div className="relative">
          <div className="flex items-start justify-between gap-4">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-accent/30 bg-accent/10 text-accent transition-transform duration-300 group-hover:scale-105">
              <Icon className="h-6 w-6" aria-hidden="true" />
            </span>
            <span className="rounded-full border border-accent/30 bg-accent/10 px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-accent">
              {a.year}
            </span>
          </div>
          <h3 className="mt-6 font-display text-2xl font-bold leading-tight text-zinc-100">
            {a.title}
          </h3>
          <p className="mt-1.5 text-xs font-semibold uppercase tracking-wide text-accent">
            {a.subtitle}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-zinc-400">{a.text}</p>
        </div>
      </div>
    </Reveal>
  );
}

function SupportingCard({ a, index }) {
  const Icon = icons[a.icon] ?? Trophy;
  return (
    <Reveal delay={index * 0.08} className="h-full">
      <div className="card-lift group flex h-full items-start gap-4 rounded-2xl border border-edge bg-panel p-5">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-edge bg-ink text-accent transition-transform duration-300 group-hover:scale-105">
          <Icon className="h-4 w-4" aria-hidden="true" />
        </span>
        <div>
          <h3 className="font-display text-base font-bold leading-snug text-zinc-100">
            {a.title}
          </h3>
          <p className="mt-0.5 text-[11px] font-semibold uppercase tracking-wide text-zinc-500">
            {a.subtitle}
          </p>
          <p className="mt-1.5 text-xs leading-relaxed text-zinc-500">{a.text}</p>
        </div>
      </div>
    </Reveal>
  );
}

export default function Achievements() {
  const featured = achievements.filter((a) => a.featured);
  const supporting = achievements.filter((a) => !a.featured);

  return (
    <section id="achievements" className="relative py-28 md:py-36">
      <div className="mx-auto w-full max-w-6xl px-6 md:px-10">
        <SectionHeading
          eyebrow="Achievements"
          title="Proof of work — so far."
          description="A short, factual list of things that actually happened. The list is young, and that's fine."
        />

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {featured.map((a, i) => (
            <FeaturedCard key={a.title} a={a} index={i} />
          ))}
        </div>

        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          {supporting.map((a, i) => (
            <SupportingCard key={a.title} a={a} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}