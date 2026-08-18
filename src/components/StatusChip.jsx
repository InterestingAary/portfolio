import { Trophy } from "lucide-react";

const styles = {
  winner: {
    label: "Hackathon Winner",
    cls: "border-accent/30 bg-accent/10 text-accent",
    icon: "trophy",
  },
  live: {
    label: "Live",
    cls: "border-emerald-400/25 bg-emerald-400/10 text-emerald-300",
    icon: "dot",
  },
  building: {
    label: "In Development",
    cls: "border-amber-400/25 bg-amber-400/10 text-amber-300",
    icon: "pulse",
  },
  demo: {
    label: "Demo",
    cls: "border-zinc-400/25 bg-zinc-400/10 text-zinc-300",
    icon: "dot",
  },
};

export default function StatusChip({ status, className = "" }) {
  const s = styles[status] ?? styles.demo;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider ${s.cls} ${className}`}
    >
      {s.icon === "trophy" && <Trophy className="h-3 w-3" aria-hidden="true" />}
      {s.icon === "dot" && (
        <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden="true" />
      )}
      {s.icon === "pulse" && (
        <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-current opacity-60" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-current" />
        </span>
      )}
      {s.label}
    </span>
  );
}
