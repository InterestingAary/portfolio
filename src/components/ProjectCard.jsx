import { useEffect, useState } from "react";
import { ArrowRight, ExternalLink, Rocket, Trophy } from "lucide-react";
import { GitHubIcon } from "./icons";
import StatusChip from "./StatusChip";

function ProjectVisual({ project, featured }) {
  const height = featured ? "h-56 md:h-72" : "h-44";
  const [imageFailed, setImageFailed] = useState(false);

  useEffect(() => {
    setImageFailed(false);
  }, [project.id]);

  const showImage = project.image && !imageFailed;
  const showEmbed = Boolean(project.embed);

  return (
    <div className={`relative overflow-hidden ${height}`}>
      <div
        className="absolute inset-0"
        aria-hidden="true"
        style={{
          background: `radial-gradient(120% 140% at 15% 0%, ${project.accent}26 0%, transparent 55%), linear-gradient(180deg, var(--color-panel) 0%, var(--color-ink) 100%)`,
        }}
      />
      {showEmbed && (
        <iframe
          src={project.embed}
          title={`${project.name} — live demo`}
          allow="geolocation; microphone; autoplay; clipboard-write; fullscreen"
          sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-modals"
          className="absolute inset-0 z-20 h-full w-full border-0 bg-panel"
        />
      )}
      {!showEmbed && showImage && (
        <img
          src={project.image}
          alt={`${project.name} — project screenshot`}
          loading="lazy"
          onError={() => setImageFailed(true)}
          className="absolute inset-0 h-full w-full object-cover object-top transition-all duration-500 group-hover:scale-[1.03] group-hover:brightness-110"
        />
      )}
      {!showEmbed && !showImage && (
        <div className="relative flex h-full w-full flex-col">
          {/* browser-chrome style frame to suggest a screenshot slot */}
          <div className="flex items-center gap-1.5 border-b border-edge/60 px-4 py-2.5">
            <span className="h-2 w-2 rounded-full bg-zinc-700" />
            <span className="h-2 w-2 rounded-full bg-zinc-700" />
            <span className="h-2 w-2 rounded-full bg-zinc-700" />
            <span className="ml-3 flex-1 rounded-md bg-white/5 px-2 py-0.5 font-mono text-[10px] text-zinc-600">
              {project.name.toLowerCase().replace(/\s+/g, "-")}
            </span>
          </div>
          <div className="relative flex flex-1 items-center justify-center">
            <div className="grid-bg absolute inset-0" aria-hidden="true" />
            <span
              className="font-display text-5xl font-bold tracking-tight text-white/5 transition-colors duration-500 group-hover:text-white/10 md:text-6xl"
              aria-hidden="true"
            >
              {project.glyph}
            </span>
          </div>
        </div>
      )}

      <div className="pointer-events-none absolute left-4 top-4 z-30">
        <span className="rounded-full border border-edge bg-ink/80 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-zinc-400 backdrop-blur">
          {project.category}
        </span>
      </div>
      <div className="pointer-events-none absolute right-4 top-4 z-30">
        <StatusChip status={project.status} className="bg-ink/80 backdrop-blur" />
      </div>

      {project.achievement && (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30 flex items-center gap-2 bg-gradient-to-t from-black/85 via-black/60 to-transparent px-4 pb-3 pt-8">
          <Trophy className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
          <span className="text-xs font-bold uppercase tracking-wide text-accent">
            {project.achievement}
          </span>
        </div>
      )}

      {project.milestone && !project.achievement && (
        <div className="pointer-events-none absolute bottom-3 left-4 z-30">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-300 backdrop-blur">
            <Rocket className="h-3 w-3" aria-hidden="true" />
            {project.milestone}
          </span>
        </div>
      )}
    </div>
  );
}

export default function ProjectCard({ project, onOpen, featured = false }) {
  const techCount = featured ? 6 : 4;
  const hasLinks = Boolean(project.links.demo || project.links.github);

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <article
      onMouseMove={onMove}
      className={`card-lift spotlight-card group relative flex h-full flex-col overflow-hidden rounded-2xl border border-edge bg-panel ${
        featured ? "lg:min-h-[480px]" : ""
      }`}
    >
      <button
        type="button"
        onClick={onOpen}
        aria-label={`Open case study: ${project.name}`}
        className="absolute inset-0 z-10 cursor-pointer"
      />

      <ProjectVisual project={project} featured={featured} />

      <div className="relative flex flex-1 flex-col p-6">
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
          style={{
            background: `radial-gradient(460px circle at var(--mx, 50%) var(--my, 50%), ${project.accent}14, transparent 55%)`,
          }}
        />
        <div className="flex items-center justify-between gap-3">
          <h4 className="font-display text-xl font-bold text-zinc-100">{project.name}</h4>
          {featured && (
            <span className="hidden shrink-0 items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-accent sm:inline-flex">
              <Trophy className="h-3 w-3" aria-hidden="true" /> Winner
            </span>
          )}
        </div>
        <p className="mt-2 text-sm leading-relaxed text-zinc-400">{project.oneLiner}</p>

        {project.technologies.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {project.technologies.slice(0, techCount).map((t, i) => (
              <span
                key={t}
                style={{ transform: `rotate(${[-1, 1.4, -1.8, 0.8, -0.6, 1.8][i % 6]}deg)` }}
                className="rounded-md border border-edge bg-ink px-2 py-1 font-mono text-[10px] text-zinc-400 transition-colors hover:border-accent/40 hover:text-zinc-200"
              >
                {t}
              </span>
            ))}
            {project.technologies.length > techCount && (
              <span className="rounded-md border border-edge bg-ink px-2 py-1 font-mono text-[10px] text-zinc-500">
                +{project.technologies.length - techCount}
              </span>
            )}
          </div>
        )}

        <div className="mt-auto flex items-center justify-between pt-6">
          <span className="inline-flex items-center gap-1.5 rounded-md border border-accent/40 bg-accent/10 px-4 py-2 font-mono text-xs font-bold tracking-wider text-accent transition-colors duration-300 group-hover:bg-accent group-hover:text-ink">
            [ open case study ]
            <ArrowRight
              className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </span>
          {hasLinks && (
            <span className="relative z-20 flex items-center gap-2">
              {project.links.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${project.name} source code on GitHub`}
                  className="rounded-lg border border-edge bg-ink p-2 text-zinc-400 transition-colors hover:border-accent/50 hover:text-accent"
                >
                  <GitHubIcon className="h-4 w-4" />
                </a>
              )}
              {project.links.demo && (
                <a
                  href={project.links.demo}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${project.name} live demo`}
                  className="rounded-lg border border-edge bg-ink p-2 text-zinc-400 transition-colors hover:border-accent/50 hover:text-accent"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              )}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}