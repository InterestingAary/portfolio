import { ArrowRight, Bot, Code2, Gamepad2, ShieldCheck } from "lucide-react";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const categories = [
  {
    icon: Code2,
    title: "Software",
    desc: "Web applications, APIs, tools, and experiments.",
    href: "#work",
  },
  {
    icon: Gamepad2,
    title: "Games",
    desc: "Game development and interactive experiences.",
    href: "#work",
  },
  {
    icon: Bot,
    title: "AI",
    desc: "AI-powered experiments and intelligent systems.",
    href: "#work",
  },
  {
    icon: ShieldCheck,
    title: "Security",
    desc: "Cybersecurity and safety-focused ideas.",
    href: "#work",
  },
];

export default function WhatIBuild() {
  return (
    <section className="relative py-28 md:py-32">
      <div className="mx-auto w-full max-w-6xl px-6 md:px-10">
        <SectionHeading
          eyebrow="What I build"
          title="Four lanes, one mindset."
          description="I explore across software, games, AI, and security — shipping experiments in each one."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.08}>
              <a
                href={c.href}
                className="card-lift group relative block h-full overflow-hidden rounded-2xl border border-edge bg-panel p-7"
                onMouseMove={(e) => {
                  const r = e.currentTarget.getBoundingClientRect();
                  e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
                  e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
                }}
              >
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    background:
                      "radial-gradient(260px circle at var(--mx, 50%) var(--my, 50%), rgba(91,157,255,0.10), transparent 65%)",
                  }}
                  aria-hidden="true"
                />
                <div className="relative">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-edge bg-ink text-accent transition-transform duration-300 group-hover:scale-110">
                    <c.icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-6 font-display text-lg font-bold tracking-wide text-zinc-100">
                    {c.title.toUpperCase()}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-400">{c.desc}</p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold text-accent opacity-0 transition-all duration-300 group-hover:opacity-100">
                    Explore <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}