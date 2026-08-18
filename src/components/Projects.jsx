import { projects } from "../data/projects";
import ProjectCard from "./ProjectCard";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

function GroupHeader({ label, note, dotClass }) {
  return (
    <Reveal className="mt-20 flex flex-wrap items-center gap-3 first:mt-14">
      <span className={`h-2 w-2 rounded-full ${dotClass}`} aria-hidden="true" />
      <h3 className="font-display text-xl font-bold tracking-wide text-zinc-100 md:text-2xl">
        {label}
      </h3>
      <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-500">
        — {note}
      </span>
    </Reveal>
  );
}

export default function Projects({ onOpenProject }) {
  const shipped = projects.filter((p) => p.shipped);
  const building = projects.filter((p) => !p.shipped);

  return (
    <section id="work" className="relative py-28 md:py-36">
      <div className="relative mx-auto w-full max-w-6xl px-6 md:px-10">
        <SectionHeading
          eyebrow="Work"
          title="Shipped — and what's next."
          description="I keep two honest lists: things that are live or won, and things I'm actively building right now. Nothing here is pretend-finished."
        />

        <GroupHeader label="SHIPPED" note="live, deployed, or competition-winning" dotClass="bg-emerald-400" />
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {shipped.map((p, i) => (
            <Reveal
              key={p.id}
              delay={i * 0.08}
              className={i === 0 ? "lg:col-span-2" : ""}
            >
              <ProjectCard project={p} featured={i === 0} onOpen={() => onOpenProject(p)} />
            </Reveal>
          ))}
        </div>

        <GroupHeader label="BUILDING" note="in progress — being built right now" dotClass="bg-amber-400" />
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {building.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.08}>
              <ProjectCard project={p} onOpen={() => onOpenProject(p)} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}