import { Mail } from "lucide-react";
import { GitHubIcon, InstagramIcon, LinkedInIcon, YouTubeIcon } from "./icons";
import { profile } from "../data/profile";
import Metaball from "./Metaball";
import Reveal from "./Reveal";

const socials = [
  { icon: GitHubIcon, label: "GitHub", url: profile.links.github },
  { icon: LinkedInIcon, label: "LinkedIn", url: profile.links.linkedin },
  { icon: InstagramIcon, label: "Instagram", url: profile.links.instagram },
  { icon: YouTubeIcon, label: "YouTube — Gaming", url: profile.links.youtube },
  { icon: YouTubeIcon, label: "YouTube — Vlogs", url: profile.links.youtubeVlogs },
];

export default function Contact() {
  const emailUrl = profile.links.email ? `mailto:${profile.links.email}` : "";

  return (
    <section id="contact" className="relative overflow-hidden py-32 md:py-40">
      <Metaball className="opacity-40" />

      <div className="relative mx-auto w-full max-w-4xl px-6 text-center md:px-10">
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-accent">Contact</p>
          <h2 className="mt-6 font-display text-4xl font-bold leading-tight tracking-tight text-zinc-100 md:text-6xl">
            HAVE AN IDEA?
          </h2>
          <p className="mt-2 font-display text-4xl font-bold leading-tight tracking-tight md:text-6xl">
            LET'S <span className="text-accent">BUILD IT.</span>
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-zinc-400">
            Whether it's a project, collaboration, hackathon, or just a conversation about
            technology — I'd love to hear from you.
          </p>
        </Reveal>

        <Reveal delay={0.18} className="mt-10 flex flex-wrap items-center justify-center gap-4">
          {emailUrl && (
            <a
              href={emailUrl}
              className="btn-accent"
            >
              <Mail className="h-4 w-4" /> Email Me
            </a>
          )}
          {profile.links.linkedin && (
            <a
              href={profile.links.linkedin}
              target="_blank"
              rel="noreferrer"
              className="btn-ghost"
            >
              <LinkedInIcon className="h-4 w-4" /> LinkedIn
            </a>
          )}
        </Reveal>

        <Reveal delay={0.25}>
          <div className="mt-12 flex items-center justify-center gap-3">
            {socials
              .filter((s) => s.url)
              .map((s) => (
                <a
                  key={s.label}
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="rounded-xl border border-edge bg-panel p-3 text-zinc-400 transition-colors hover:border-accent/50 hover:text-accent"
                >
                  <s.icon className="h-4 w-4" />
                </a>
              ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}