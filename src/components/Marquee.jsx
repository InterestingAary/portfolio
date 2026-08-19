export default function Marquee({ items, reverse = false, className = "" }) {
  const half = (ariaHidden) => (
    <div className="flex shrink-0 items-center gap-8 pr-8" aria-hidden={ariaHidden || undefined}>
      {items.map((t, i) => (
        <span
          key={i}
          className="flex items-center gap-8 whitespace-nowrap font-mono text-xs font-semibold uppercase tracking-[0.25em] text-zinc-400"
        >
          {t}
          <span className="text-accent" aria-hidden="true">
            ✦
          </span>
        </span>
      ))}
    </div>
  );

  return (
    <div
      className={`tape-band marquee-paused relative overflow-hidden border-y border-edge py-3.5 ${className}`}
      aria-hidden="true"
    >
      <div className={`marquee-track flex w-max ${reverse ? "marquee-reverse" : ""}`}>
        {half(false)}
        {half(true)}
      </div>
    </div>
  );
}