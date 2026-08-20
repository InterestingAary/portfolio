import { useRef } from "react";
import { useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import { LinkedInIcon } from "./icons";
import { profile } from "../data/profile";

const TITLE = "STITCHED BY HAND";
const STATEMENT =
  "Every project here was stitched from experiments, late nights, and builds that didn't make the cut — yet it shipped.";

const TITLE_WORDS = TITLE.split(" ");
const STATEMENT_WORDS = STATEMENT.split(" ");
const ALL_WORDS = [...TITLE_WORDS, ...STATEMENT_WORDS];

const CHIPS = ["GSA 2026", "Srujana — 1st Place", "B.Tech CCE"];

const DOT_POSITIONS = [
  { x: 28, y: 40 },
  { x: 15, y: 95 },
  { x: 35, y: 150 },
  { x: 24, y: 200 },
  { x: 33, y: 250 },
  { x: 18, y: 300 },
  { x: 30, y: 345 },
  { x: 30, y: 390 },
];

/**
 * The "needle trail" section: a needle stitches a thread down the left
 * side as you scroll, forming an embroidered line, while a statement
 * paints itself in word by word and a stitch line draws under it.
 * Fills the pause after the manifesto with motion. Reduced motion:
 * fully formed and readable immediately.
 */
export default function EmbroiderySection() {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const wordRefs = useRef([]);
  const threadRef = useRef(null);
  const needleRef = useRef(null);
  const stitchLineRef = useRef(null);
  const dotRefs = useRef([]);
  const chipCtaRefs = useRef([]);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0%", "end 100%"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (reduce) return;
    const p = Math.min(Math.max(v, 0), 1);
    const s = 0.1;
    const span = 0.62;

    ALL_WORDS.forEach((_, i) => {
      const el = wordRefs.current[i];
      if (!el) return;
      const ws = s + (i / ALL_WORDS.length) * span;
      const we = s + ((i + 1) / ALL_WORDS.length) * span;
      const wp = Math.min(Math.max((p - ws) / (we - ws), 0), 1);
      el.style.backgroundPosition = `${100 - wp * 100}% 0`;
      el.style.opacity = `${0.35 + wp * 0.65}`;
    });

if (threadRef.current && threadRef.current.__path) {
      threadRef.current.__path.style.strokeDashoffset = `${threadRef.current.__len * (1 - p)}`;
    }
    if (stitchLineRef.current && stitchLineRef.current.__line) {
      stitchLineRef.current.__line.style.strokeDashoffset = `${stitchLineRef.current.__len * (1 - p)}`;
    }
    if (needleRef.current) {
      needleRef.current.style.top = `${p * 372}px`;
    }
    dotRefs.current.forEach((el, i) => {
      if (el) {
        const f = 0.06 + (i + 1) * 0.09;
        const dp = Math.min(Math.max((p - f) / 0.05, 0), 1);
        el.style.opacity = `${dp}`;
      }
    });
    chipCtaRefs.current.forEach((el) => {
      if (el) {
        const cp = Math.min(Math.max((p - 0.78) / 0.09, 0), 1);
        el.style.opacity = `${cp}`;
        el.style.transform = `translateY(${(1 - cp) * 14}px)`;
      }
    });
  });

  const stitchStyle = {
    color: "transparent",
    backgroundImage:
      "linear-gradient(90deg, var(--color-accent) 0%, var(--color-fg) 100%)",
    backgroundSize: "200% 100%",
    backgroundPosition: "100% 0",
    backgroundRepeat: "no-repeat",
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
  };

  return (
    <section
      ref={ref}
id="embroidery-section"
      className="relative"
      style={reduce ? undefined : { height: "190vh" }}
    >
      <div
        className={
          reduce
            ? "relative flex min-h-[70vh] items-center py-24"
            : "sticky top-0 flex h-svh items-center px-6"
        }
      >
        <div className="mx-auto grid w-full max-w-5xl items-center gap-14 md:grid-cols-[200px_1fr]">
          {/* needle column: stitches a thread downward as you scroll */}
          <div className="relative hidden h-[420px] md:block" aria-hidden="true">
            <svg className="absolute inset-0" width="60" height="420" viewBox="0 0 60 420" fill="none">
              <path
                d="M30 0 C8 90 52 180 30 270 C8 360 30 410 30 420"
                stroke="currentColor"
                strokeOpacity="0.14"
                strokeWidth="1.6"
                strokeDasharray="2 8"
                strokeLinecap="round"
              />
            </svg>
            <svg
ref={(el) => {
                threadRef.current = el;
                if (el && !reduce) {
                  const path = el.querySelector("path");
                  el.__path = path;
                  el.__len = path ? path.getTotalLength() : 0;
                  if (path) path.style.strokeDashoffset = `${el.__len}`;
                }
              }}
              className="embroidery-section-drawn absolute inset-0"
              width="60"
              height="420"
              viewBox="0 0 60 420"
              fill="none"
              style={{ color: "var(--color-accent)" }}
            >
              <path
                d="M30 0 C8 90 52 180 30 270 C8 360 30 410 30 420"
                stroke="currentColor"
                strokeWidth="2"
                strokeDasharray="3 9"
                strokeLinecap="round"
              />
            </svg>
            {DOT_POSITIONS.map((d, i) => (
              <span
                key={i}
                ref={(el) => {
                  dotRefs.current[i] = el;
                }}
                className="absolute h-1.5 w-1.5 rounded-full opacity-0"
                style={{
                  left: d.x,
                  top: d.y,
                  backgroundColor: "var(--color-accent)",
                  boxShadow: "0 0 6px color-mix(in srgb, var(--color-accent) 60%, transparent)",
                }}
              />
            ))}
            <svg
              ref={needleRef}
              className="embroidery-needle absolute left-1/2 top-0 -translate-x-1/2"
              width="14"
              height="26"
              viewBox="0 0 14 26"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              style={{ color: "var(--color-accent)", top: reduce ? "372px" : undefined }}
            >
              <circle cx="7" cy="4" r="2.6" />
              <path d="M7 7.5v14" />
            </svg>
          </div>

          {/* text: paints itself in as the needle passes */}
          <div>
            <p className="flex items-center gap-3 font-mono text-[11px] font-medium uppercase tracking-[0.3em] text-accent">
              <span className="inline-block h-2 w-2 bg-accent" aria-hidden="true" />
              // stitched
            </p>

            <h2 className="mt-8 font-display text-[clamp(2rem,6vw,4.5rem)] font-bold leading-[1.02] tracking-tight">
              {TITLE_WORDS.map((w, i) => (
                <span
                  key={i}
                  ref={(el) => {
                    wordRefs.current[i] = el;
                  }}
                  className="inline-block whitespace-pre"
                  style={reduce ? undefined : stitchStyle}
                >
                  {w}{" "}
                </span>
              ))}
            </h2>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-zinc-300 md:text-xl">
              {STATEMENT_WORDS.map((w, i) => (
                <span
                  key={i}
                  ref={(el) => {
                    wordRefs.current[TITLE_WORDS.length + i] = el;
                  }}
                  className="inline-block whitespace-pre"
                  style={reduce ? undefined : stitchStyle}
                >
                  {w}{" "}
                </span>
              ))}
            </p>

            <svg
ref={(el) => {
                stitchLineRef.current = el;
                if (el && !reduce) {
                  const line = el.querySelector("line");
                  el.__line = line;
                  el.__len = line ? line.getTotalLength() : 0;
                  if (line) line.style.strokeDashoffset = `${el.__len}`;
                }
              }}
              className="mt-4 w-full max-w-xl"
              height="10"
              viewBox="0 0 600 10"
              preserveAspectRatio="none"
              fill="none"
              aria-hidden="true"
            >
              <line
                x1="0"
                y1="5"
                x2="600"
                y2="5"
                stroke="var(--color-accent)"
                strokeWidth="2"
                strokeDasharray="5 7"
                strokeLinecap="round"
              />
            </svg>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              {CHIPS.map((c, i) => (
                <span
                  key={c}
                  ref={(el) => {
                    chipCtaRefs.current[i] = el;
                  }}
                  className="rounded-full border border-edge bg-panel px-3.5 py-1.5 text-xs text-zinc-300"
                  style={reduce ? undefined : { opacity: 0 }}
                >
                  {c}
                </span>
              ))}
              {profile.links.linkedin && (
                <a
                  href={profile.links.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  ref={(el) => {
                    chipCtaRefs.current[CHIPS.length] = el;
                  }}
                  className="btn-accent"
                  style={reduce ? undefined : { opacity: 0 }}
                >
                  <LinkedInIcon className="h-4 w-4" /> Connect on LinkedIn
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
