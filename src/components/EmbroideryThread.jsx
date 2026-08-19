import { useEffect, useRef } from "react";

/**
 * Embroidery thread running down the left edge of the page.
 * A needle stitches the thread downward as you scroll, "forming" a
 * dashed line of thread, and small hand-drawn section motifs (tech /
 * section related: terminal, rocket, trophy, flag, gear, bolt, code,
 * note, envelope) stitch themselves in as their section comes up.
 * Reduced motion: the thread is fully formed and all motifs drawn.
 */
const SECTIONS = [
  { id: "profile", icon: "person" },
  { id: "work", icon: "rocket" },
  { id: "achievements", icon: "trophy" },
  { id: "journey", icon: "flag" },
  { id: "skills", icon: "gear" },
  { id: "now", icon: "bolt" },
  { id: "code", icon: "terminal" },
  { id: "beyond", icon: "note" },
  { id: "contact", icon: "envelope" },
];

const ICONS = {
  person: (
    <path d="M13 6a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Zm0 3c-5 0-9 3.4-9 8v3h18v-3c0-4.6-4-8-9-8Z" />
  ),
  rocket: (
    <path d="M13 24c4-5 6-10 6-14 0-4-3-7-6-7s-6 3-6 7c0 4 2 9 6 14Zm-5-12a5 5 0 1 1 10 0M13 20l2 4M11 27l3 2" />
  ),
  trophy: (
    <path d="M8 3h10M8 4H5v3c0 4 2.5 6.5 8 6.5S21 11 21 7V4h-3M13 13.5V18M9 21h8M9 18h8M10 21c0-1.5-1-2-2-3M14 21c0-1.5 1-2 2-3" />
  ),
  flag: (
    <path d="M13 3v20M13 4c3 0 4.5 1.5 7 1.5 1 0 1.7-.3 2.5-.8v9c-.8.5-1.5.8-2.5.8-2.5 0-4-1.5-7-1.5M6 6v17" />
  ),
  gear: (
    <path d="M13 9a4 4 0 1 1 0 8 4 4 0 0 1 0-8Zm0-3v2.5M13 18v2.5M5.5 13H3m5.6-4.4-1.8-1.8M19.2 19.2l-1.8-1.8M20.5 13H23m-5.6 4.4 1.8 1.8M5.6 17.4l1.8-1.8" />
  ),
  bolt: <path d="M14 3 6 14h5.5L11 23l8-11h-5.5L14 3Z" />,
  terminal: (
    <path d="M4 6h18v14H4V6Zm3 3 4 4-4 4m7 0h5" />
  ),
  note: (
    <path d="M10 20a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm0 0V6l10-2v14a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
  ),
  envelope: (
    <path d="M4 6h18v14H4V6Zm0 1.5L13 14l9-6.5" />
  ),
};

export default function EmbroideryThread() {
  const overlayRef = useRef(null);
  const needleRef = useRef(null);
  const motifRefs = useRef([]);
  const positions = useRef([]);
  const docHeight = useRef(1);

  useEffect(() => {
    const measure = () => {
      docHeight.current = document.documentElement.scrollHeight;
      positions.current = SECTIONS.map((s) => {
        const el = document.getElementById(s.id);
        return el ? el.offsetTop : 0;
      });
    };
    measure();

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      if (overlayRef.current) overlayRef.current.style.height = "100%";
      if (needleRef.current) needleRef.current.style.top = `${docHeight.current - 24}px`;
      motifRefs.current.forEach((el, i) => {
        if (el) {
          el.style.top = `${positions.current[i] + 84}px`;
          el.style.strokeDashoffset = "0";
        }
      });
      return;
    }

    let raf = 0;
    const tick = () => {
      const docH = docHeight.current;
      const vh = window.innerHeight;
      const max = Math.max(docH - vh, 1);
      const y = window.scrollY;
      const progress = Math.min(Math.max(y / max, 0), 1);

      if (overlayRef.current) overlayRef.current.style.height = `${(progress * 100).toFixed(2)}%`;
      if (needleRef.current) needleRef.current.style.top = `${(progress * docH).toFixed(0)}px`;

      motifRefs.current.forEach((el, i) => {
        if (!el) return;
        const p = Math.min(Math.max((y + vh * 0.65 - positions.current[i]) / 130, 0), 1);
        el.style.top = `${positions.current[i] + 84}px`;
        el.style.strokeDashoffset = `${(60 * (1 - p)).toFixed(1)}`;
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const onResize = () => measure();
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-6 z-[5] hidden w-9 md:block">
      {/* base thread: faint dashed line the whole way down */}
      <div className="embroidery-base absolute inset-y-0 left-1/2 w-px -translate-x-1/2" />

      {/* formed thread: grows with scroll */}
      <div
        ref={overlayRef}
        className="embroidery-form absolute left-1/2 top-0 h-0 w-[2px] -translate-x-1/2"
      />

      {/* needle: rides the tip of the formed thread */}
      <svg
        ref={needleRef}
        className="embroidery-needle absolute left-1/2 -translate-x-1/2"
        width="14"
        height="26"
        viewBox="0 0 14 26"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        style={{ color: "var(--color-accent)" }}
      >
        <circle cx="7" cy="4" r="2.6" />
        <path d="M7 7.5v14" />
      </svg>

      {/* section motifs: stitch themselves in as you scroll past */}
      {SECTIONS.map((s, i) => (
        <svg
          key={s.id}
          ref={(el) => {
            motifRefs.current[i] = el;
          }}
          data-i={i}
          className="embroidery-motif absolute left-1/2 -translate-x-1/2"
          style={{ top: 0 }}
          width="26"
          height="26"
          viewBox="0 0 26 26"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="60"
          strokeDashoffset="60"
        >
          {ICONS[s.icon]}
        </svg>
      ))}
    </div>
  );
}