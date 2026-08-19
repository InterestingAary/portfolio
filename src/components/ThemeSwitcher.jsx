import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const THEMES = [
  { id: "nebula", label: "Nebula", swatch: "#d6ff4d", desc: "Deep space" },
  { id: "ocean", label: "Ocean", swatch: "#22d3ee", desc: "Deep sea" },
  { id: "heavenly", label: "Heavenly", swatch: "#c9a227", desc: "Golden light" },
  { id: "hell", label: "Hell", swatch: "#ff3030", desc: "Blood & ember" },
];

export default function ThemeSwitcher({ theme, onChange }) {
  const [open, setOpen] = useState(false);
  const current = THEMES.find((t) => t.id === theme) ?? THEMES[0];

  return (
    <div className="fixed bottom-5 left-5 z-50">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.18 }}
            className="absolute bottom-14 left-0 w-44 overflow-hidden rounded-xl border border-edge bg-panel p-1.5 shadow-2xl shadow-black/40"
          >
            <p className="px-3 pb-1.5 pt-2 font-mono text-[9px] uppercase tracking-[0.25em] text-zinc-500">
              Theme
            </p>
            {THEMES.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => {
                  onChange(t.id);
                  setOpen(false);
                }}
                aria-current={t.id === theme ? "true" : undefined}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                  t.id === theme ? "bg-accent/10 text-accent" : "text-zinc-300 hover:bg-panel-2 hover:text-zinc-100"
                }`}
              >
                <span
                  aria-hidden="true"
                  className="h-3 w-3 shrink-0 rounded-full border border-black/20"
                  style={{ backgroundColor: t.swatch }}
                />
                <span className="flex-1">
                  <span className="block font-medium">{t.label}</span>
                  <span className="block text-[10px] text-zinc-500">{t.desc}</span>
                </span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label="Change theme"
        className="group flex items-center gap-2.5 rounded-full border border-edge bg-panel/90 py-2 pl-3 pr-4 text-sm font-medium text-zinc-300 shadow-lg shadow-black/30 backdrop-blur transition-colors hover:border-accent/50 hover:text-zinc-100"
      >
        <span
          aria-hidden="true"
          className="h-3 w-3 rounded-full border border-black/20 transition-transform group-hover:scale-110"
          style={{ backgroundColor: current.swatch }}
        />
        <span className="font-mono text-[10px] uppercase tracking-[0.2em]">{current.label}</span>
        <span
          aria-hidden="true"
          className={`text-zinc-500 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M1 3.5 5 7l4-3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </button>
    </div>
  );
}