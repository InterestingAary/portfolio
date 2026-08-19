import { useEffect, useRef } from "react";

const FEATHER_PATH =
  "M24 2C34 9 38 20 36.5 31 35 41 29 50 24 58 19 50 13 41 11.5 31 10 20 14 9 24 2Z";

const FEATHERS = [
  { top: "14%", left: "10%", size: 42, opacity: 0.55, duration: "7s", delay: "0s", rot: 24, speed: 0.09 },
  { top: "32%", left: "86%", size: 34, opacity: 0.45, duration: "8s", delay: "-2s", rot: -18, speed: 0.07 },
  { top: "50%", left: "6%", size: 38, opacity: 0.5, duration: "7.5s", delay: "-4s", rot: 12, speed: 0.11 },
  { top: "64%", left: "82%", size: 46, opacity: 0.6, duration: "9s", delay: "-5.5s", rot: -26, speed: 0.06 },
  { top: "78%", left: "12%", size: 30, opacity: 0.4, duration: "6.5s", delay: "-3s", rot: 30, speed: 0.1 },
  { top: "90%", left: "68%", size: 36, opacity: 0.48, duration: "8.5s", delay: "-7s", rot: -10, speed: 0.08 },
  { top: "42%", left: "47%", size: 26, opacity: 0.35, duration: "7s", delay: "-6s", rot: 16, speed: 0.12 },
];

/**
 * Heavenly theme decoration: golden-white feathers drifting down
 * with a gentle sway, like feathers falling through sunlight. Each
 * parallaxes with a bounded translate (the wrappers are fixed, so
 * they never scroll out of view). Purely decorative.
 */
export default function FeatherDecor() {
  const refs = useRef([]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const tick = () => {
      const y = window.scrollY;
      refs.current.forEach((el, i) => {
        if (el) el.style.transform = `translate3d(0, ${Math.min(y * FEATHERS[i].speed, 150)}px, 0)`;
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <>
      {FEATHERS.map((s, i) => (
        <div
          key={i}
          ref={(el) => {
            refs.current[i] = el;
          }}
          style={{ top: s.top, left: s.left }}
          className="pointer-events-none fixed z-0"
          aria-hidden="true"
        >
          <div
            className="feather-fall"
            style={{
              width: s.size,
              height: s.size * 2.1,
              opacity: s.opacity,
              animation: `feather-fall ${s.duration} ease-in-out infinite`,
              animationDelay: s.delay,
              transform: `rotate(${s.rot}deg)`,
            }}
          >
            <svg viewBox="0 0 48 100" width="100%" height="100%" fill="none">
              <path d={FEATHER_PATH} fill="#fdf6e3" />
              <path
                d="M24 6C27.5 12 29.5 19 29.2 26.5 28.9 34 27 41 24 48M24 6C20.5 12 18.5 19 18.8 26.5 19.1 34 21 41 24 48"
                stroke="#d9b45c"
                strokeWidth="0.8"
                strokeLinecap="round"
              />
              <line x1="24" y1="6" x2="24" y2="92" stroke="#c9a227" strokeWidth="1.4" strokeLinecap="round" />
              <path d="M24 86c2 2 3.4 4 4.2 7" stroke="#c9a227" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
          </div>
        </div>
      ))}
    </>
  );
}