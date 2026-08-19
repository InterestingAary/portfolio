import { useRef } from "react";
import { useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";

const STATEMENT =
  "I don't just learn technology — I build with it, break it, and ship what survives.";

const WORDS = STATEMENT.split(" ");

/**
 * Scroll-scrubbed word paint-in (inspired by Chug-SPYLT's Message section).
 * Each word is filled by a background-clip gradient that sweeps left-to-right
 * as you scroll; words cascade in reading order. Values are written via
 * refs (no per-word motion values) so scroll mapping stays exact.
 */
export default function Manifesto() {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const wordRefs = useRef([]);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const s = 0.12;
    const width = 0.66;
    wordRefs.current.forEach((el, i) => {
      if (!el) return;
      const ws = s + (i / WORDS.length) * width;
      const we = s + ((i + 1) / WORDS.length) * width;
      const p = Math.min(Math.max((v - ws) / (we - ws), 0), 1);
      el.style.backgroundPosition = `${100 - p * 100}% 0`;
    });
  });

  return (
    <section
      ref={ref}
      id="manifesto"
      className="relative overflow-hidden"
      style={reduce ? undefined : { height: "150vh" }}
    >
      <div
        className={
          reduce
            ? "relative flex min-h-[60vh] items-center py-24"
            : "relative flex items-center px-6 md:sticky md:top-0 md:h-screen"
        }
      >
        <div className="mx-auto w-full max-w-5xl">
          <p className="flex items-center gap-3 font-mono text-[11px] font-medium uppercase tracking-[0.3em] text-accent">
            <span className="inline-block h-2 w-2 bg-accent" aria-hidden="true" />
            // manifesto
          </p>

          <p
            className={
              reduce
                ? "mt-10 font-display text-[clamp(1.8rem,4.2vw,3.4rem)] font-bold leading-[1.15] tracking-tight text-zinc-100"
                : "mt-10 font-display text-[clamp(1.8rem,4.2vw,3.4rem)] font-bold leading-[1.15] tracking-tight"
            }
          >
            {WORDS.map((w, i) =>
              reduce ? (
                <span key={i} className="inline-block whitespace-pre">
                  {w}{" "}
                </span>
              ) : (
                <span
                  key={i}
                  ref={(el) => {
                    wordRefs.current[i] = el;
                  }}
                  className="inline-block whitespace-pre"
                  style={{
                    color: "transparent",
                    backgroundImage:
                      "linear-gradient(90deg, var(--color-accent) 0%, var(--color-fg) 100%)",
                    backgroundSize: "200% 100%",
                    backgroundPosition: "100% 0",
                    backgroundRepeat: "no-repeat",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                  }}
                >
                  {w}{" "}
                </span>
              ),
            )}
          </p>

          <p className="mt-8 max-w-xl text-base leading-relaxed text-zinc-400">
            Every project here started as a question I couldn't put down — and
            ended as something you can click, play, or read. Scroll the work
            below.
          </p>
        </div>
      </div>
    </section>
  );
}