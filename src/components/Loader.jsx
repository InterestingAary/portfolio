import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { profile } from "../data/profile";

/**
 * Click-to-activate intro — the meermohsin.me signature, remixed.
 * Giant serif name splits in, "CLICK ANYWHERE TO ACTIVATE THE
 * EXPERIENCE" hint pulses below, then the curtain lifts on user
 * interaction. pointer-events: none so it can never block the page.
 */
export default function Loader() {
  const reduce = useReducedMotion();
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (reduce) {
      setDone(true);
      return;
    }
    const onInteract = () => setDone(true);
    window.addEventListener("wheel", onInteract, { passive: true });
    window.addEventListener("pointerdown", onInteract);
    window.addEventListener("keydown", onInteract);
    window.addEventListener("touchstart", onInteract, { passive: true });
    return () => {
      window.removeEventListener("wheel", onInteract);
      window.removeEventListener("pointerdown", onInteract);
      window.removeEventListener("keydown", onInteract);
      window.removeEventListener("touchstart", onInteract);
    };
  }, [reduce]);

  if (reduce) return null;

  const [first, ...rest] = profile.name.split(" ");
  const last = rest.join(" ");

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[120] flex items-center justify-center bg-ink"
          style={{ pointerEvents: "none" }}
          exit={{ y: "-100%", transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] } }}
          aria-hidden="true"
        >
          <div className="flex flex-col items-center overflow-hidden px-6">
            <div className="text-center font-serif leading-[0.9] tracking-tight text-zinc-100">
              <span className="block overflow-hidden">
                <motion.span
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ delay: 0.1, duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                  className="block text-[clamp(3rem,11vw,9rem)]"
                >
                  {first}
                </motion.span>
              </span>
              {last ? (
                <span className="block overflow-hidden">
                  <motion.span
                    initial={{ y: "110%" }}
                    animate={{ y: 0 }}
                    transition={{ delay: 0.28, duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                    className="block text-[clamp(3rem,11vw,9rem)] text-zinc-600"
                  >
                    {last}
                  </motion.span>
                </span>
              ) : null}
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.5 }}
              className="mt-8 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-zinc-500 md:text-[11px]"
            >
              <span className="inline-block h-2 w-2 animate-pulse bg-accent" aria-hidden="true" />
              click anywhere to activate the experience
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}