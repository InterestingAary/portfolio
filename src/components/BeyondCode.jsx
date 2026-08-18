import { ArrowUpRight, Gamepad2, Video } from "lucide-react";
import { profile } from "../data/profile";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const channels = [
  {
    icon: Gamepad2,
    title: "Gaming",
    handle: profile.creator.gaming.handle,
    url: profile.creator.gaming.url,
    note: profile.creator.gaming.note,
  },
  {
    icon: Video,
    title: "Vlogging",
    handle: profile.creator.vlogs.handle,
    url: profile.creator.vlogs.url,
    note: profile.creator.vlogs.note,
  },
];

export default function BeyondCode() {
  const visible = channels.filter((c) => c.url);

  if (visible.length === 0) return null;

  return (
    <section className="relative py-28 md:py-32">
      <div className="mx-auto w-full max-w-6xl px-6 md:px-10">
        <SectionHeading
          eyebrow="Beyond code"
          title="Also, I make content."
          description="A smaller side of the story — gaming and vlogging, when I'm not building."
        />

        <div className="mt-12 grid max-w-3xl gap-5 sm:grid-cols-2">
          {visible.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.08}>
              <a
                href={c.url}
                target="_blank"
                rel="noreferrer"
                className="card-lift group flex items-center gap-5 rounded-2xl border border-edge bg-panel p-6"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-edge bg-ink text-accent transition-transform duration-300 group-hover:scale-110">
                  <c.icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="min-w-0">
                  <span className="flex items-center gap-2">
                    <span className="font-display text-base font-bold text-zinc-100">{c.title}</span>
                    <ArrowUpRight
                      className="h-4 w-4 text-zinc-500 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
                      aria-hidden="true"
                    />
                  </span>
                  <span className="mt-0.5 block truncate font-mono text-xs text-zinc-500">
                    {c.handle}
                  </span>
                  <span className="mt-0.5 block text-xs text-zinc-600">{c.note}</span>
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}