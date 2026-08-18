import Reveal from "./Reveal";

export default function SectionHeading({ eyebrow, title, description, align = "left" }) {
  const alignCls = align === "center" ? "items-center text-center" : "items-start text-left";

  return (
    <Reveal className={`flex flex-col ${alignCls}`}>
      <p className="font-mono text-[11px] font-medium uppercase tracking-[0.3em] text-accent">
        {eyebrow}
      </p>
      <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-zinc-100 md:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-zinc-400">{description}</p>
      )}
    </Reveal>
  );
}
