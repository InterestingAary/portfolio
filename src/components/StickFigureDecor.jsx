import { useEffect, useRef } from "react";

/**
 * Stick figures that live on the page's edges.
 *  - A little runner jogs along the bottom edge of the viewport, looping
 *    forever as you scroll (one full lap per viewport-width of scrolling).
 *  - A sitter hangs off the top-right corner of the page, legs dangling
 *    over the edge and one arm waving.
 * Both are pure line art (currentColor), so they re-tint per theme.
 * Reduced motion: the runner stands still at the left edge, no limb cycle.
 */
export default function StickFigureDecor() {
  const runnerRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const tick = () => {
      const el = runnerRef.current;
      if (el) {
        const span = window.innerWidth + 160;
        const x = (window.scrollY % span) - 80;
        el.style.transform = `translate3d(${x}px, 0, 0)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <>
      {/* Runner: jogs along the bottom edge */}
      <div
        ref={runnerRef}
        aria-hidden="true"
        className="pointer-events-none fixed bottom-0 left-0 z-30 hidden md:block"
        style={{ color: "var(--color-fg)" }}
      >
        <div className="runner-bob">
          <svg width="38" height="40" viewBox="0 0 38 40" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="19" cy="8" r="5.2" />
            <line x1="19" y1="13.5" x2="19" y2="27" />
            <g className="runner-arm-a" style={{ transformOrigin: "19px 17px" }}>
              <line x1="19" y1="17" x2="27" y2="25" />
            </g>
            <g className="runner-arm-b" style={{ transformOrigin: "19px 17px" }}>
              <line x1="19" y1="17" x2="11" y2="25" />
            </g>
            <g className="runner-leg-a" style={{ transformOrigin: "19px 27px" }}>
              <line x1="19" y1="27" x2="27" y2="36" />
              <line x1="27" y1="36" x2="32" y2="34" />
            </g>
            <g className="runner-leg-b" style={{ transformOrigin: "19px 27px" }}>
              <line x1="19" y1="27" x2="11" y2="36" />
              <line x1="11" y1="36" x2="6" y2="34" />
            </g>
          </svg>
        </div>
      </div>

      {/* Sitter: hangs off the top-right corner, legs dangling over the edge */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed right-3 top-0 z-[60] hidden md:block"
        style={{ color: "var(--color-fg)" }}
      >
        <svg width="52" height="56" viewBox="0 0 52 56" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="26" cy="42" r="7" />
          <line x1="26" y1="49" x2="26" y2="28" />
          <g className="sitter-leg-a" style={{ transformOrigin: "26px 28px" }}>
            <line x1="26" y1="28" x2="18" y2="20" />
            <line x1="18" y1="20" x2="18" y2="10" />
          </g>
          <g className="sitter-leg-b" style={{ transformOrigin: "26px 28px" }}>
            <line x1="26" y1="28" x2="34" y2="20" />
            <line x1="34" y1="20" x2="34" y2="10" />
          </g>
          <g className="sitter-arm-wave" style={{ transformOrigin: "26px 33px" }}>
            <line x1="26" y1="33" x2="38" y2="30" />
          </g>
          <line x1="26" y1="33" x2="14" y2="30" />
          <line x1="4" y1="10" x2="48" y2="10" />
        </svg>
      </div>
    </>
  );
}