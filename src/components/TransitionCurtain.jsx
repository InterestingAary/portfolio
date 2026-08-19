import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

/**
 * Circular page transition: expands from the center while the page scrolls
 * to the target section, then collapses toward the top-right corner —
 * revealing the freshly re-mounted section playing its entrance effects.
 */
export default function TransitionCurtain({ nav, onMidway, onDone }) {
  useEffect(() => {
    if (!nav) return;

    const t1 = setTimeout(() => {
      const html = document.documentElement;
      const prev = html.style.scrollBehavior;
      html.style.scrollBehavior = "auto";
      document.getElementById(nav.id)?.scrollIntoView({ block: "start" });
      html.style.scrollBehavior = prev;
      onMidway();
    }, 360);

    const t2 = setTimeout(onDone, 720);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [nav, onMidway, onDone]);

  return (
    <AnimatePresence>
      {nav && (
        <motion.div
          className="fixed inset-0 z-[110] flex items-center justify-center bg-ink"
          initial={{ clipPath: "circle(0% at 50% 45%)" }}
          animate={{ clipPath: "circle(150% at 50% 45%)" }}
          exit={{ clipPath: "circle(0% at 88% 8%)" }}
          transition={{ duration: 0.4, ease: [0.65, 0, 0.35, 1] }}
          aria-hidden="true"
        >
          <div className="grid-bg absolute inset-0" aria-hidden="true" />
          <div className="relative flex flex-col items-center gap-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-accent">
              navigating
            </span>
            <span className="font-display text-2xl font-bold text-zinc-100 md:text-3xl">
              {nav.label}
            </span>
            <span className="h-px w-24 bg-accent/40" aria-hidden="true" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}