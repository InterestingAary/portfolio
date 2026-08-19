import { GitHubIcon, LinkedInIcon } from "./icons";
import Reveal from "./Reveal";
import { profile } from "../data/profile";

const HIGHLIGHTS = ["GSA 2026", "Srujana — 1st Place", "B.Tech CCE"];

export default function ProfileSection() {
  return (
    <section id="profile" className="relative overflow-hidden py-32 md:py-40">
      <div className="relative mx-auto w-full max-w-4xl px-6 md:px-10">
        <Reveal>
          <p className="flex items-center gap-3 font-mono text-[11px] font-medium uppercase tracking-[0.3em] text-accent">
            <span className="inline-block h-2 w-2 bg-accent" aria-hidden="true" />
            // profile
          </p>

          <h2 className="mt-6 font-display text-4xl font-bold leading-tight tracking-tight text-zinc-100 md:text-6xl">
            {profile.name}
          </h2>
          <p className="mt-3 font-display text-2xl font-bold tracking-tight md:text-3xl">
            {profile.role}
          </p>
          <p className="mt-2 text-zinc-400">{profile.education}</p>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="mt-8 flex flex-wrap items-center gap-2">
            {HIGHLIGHTS.map((h) => (
              <span
                key={h}
                className="rounded-full border border-edge bg-panel px-3 py-1 text-xs text-zinc-300"
              >
                {h}
              </span>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.16}>
          <div className="mt-10 space-y-5 text-base leading-relaxed text-zinc-400">
            {profile.bio.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.24} className="mt-10 flex flex-wrap items-center gap-4">
          {profile.links.linkedin && (
            <a href={profile.links.linkedin} target="_blank" rel="noreferrer" className="btn-accent">
              <LinkedInIcon className="h-4 w-4" /> Connect on LinkedIn
            </a>
          )}
          {profile.links.github && (
            <a href={profile.links.github} target="_blank" rel="noreferrer" className="btn-ghost">
              <GitHubIcon className="h-4 w-4" /> GitHub
            </a>
          )}
        </Reveal>
      </div>
    </section>
  );
}