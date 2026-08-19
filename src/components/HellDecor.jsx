import { useEffect, useRef } from "react";

const SKULL_PATH =
  "M40 18a20 20 0 0 0-20 20c0 5.5 2.2 10.3 5.8 13.7V64a5 5 0 0 0 5 5h18.4a5 5 0 0 0 5-5v-12.3c3.6-3.4 5.8-8.2 5.8-13.7a20 20 0 0 0-20-20Zm-8.5 17a5.5 5.5 0 1 1 0 11 5.5 5.5 0 0 1 0-11Zm17 0a5.5 5.5 0 1 1 0 11 5.5 5.5 0 0 1 0-11ZM40 51c4.3 0 8 1.6 10.4 4l-3.5 3.4c-1.9-1.8-4.3-2.8-6.9-2.8s-5 1-6.9 2.8l-3.5-3.4C32 52.6 35.7 51 40 51Z";

const SKULLS = [
  { top: "12%", left: "7%", size: 58, opacity: 0.2, duration: "10s", delay: "0s", rot: -12, speed: 0.1 },
  { top: "30%", left: "84%", size: 38, opacity: 0.15, duration: "8s", delay: "-2s", rot: 8, speed: 0.07 },
  { top: "47%", left: "5%", size: 30, opacity: 0.13, duration: "9s", delay: "-5s", rot: 14, speed: 0.12 },
  { top: "60%", left: "78%", size: 52, opacity: 0.18, duration: "11s", delay: "-7s", rot: -6, speed: 0.05 },
  { top: "76%", left: "12%", size: 44, opacity: 0.16, duration: "9.5s", delay: "-3s", rot: 10, speed: 0.09 },
  { top: "88%", left: "66%", size: 34, opacity: 0.14, duration: "8.5s", delay: "-6s", rot: -14, speed: 0.06 },
  { top: "40%", left: "45%", size: 26, opacity: 0.1, duration: "7.5s", delay: "-4s", rot: 4, speed: 0.11 },
  { top: "8%", left: "46%", size: 24, opacity: 0.12, duration: "8s", delay: "-1s", rot: -20, speed: 0.08 },
  { top: "22%", left: "28%", size: 32, opacity: 0.15, duration: "10.5s", delay: "-8s", rot: 18, speed: 0.06 },
  { top: "55%", left: "93%", size: 28, opacity: 0.11, duration: "7s", delay: "-2.5s", rot: -9, speed: 0.1 },
  { top: "70%", left: "55%", size: 40, opacity: 0.17, duration: "9s", delay: "-5.5s", rot: 22, speed: 0.07 },
  { top: "85%", left: "30%", size: 22, opacity: 0.1, duration: "6.5s", delay: "-3.5s", rot: -16, speed: 0.12 },
];

/**
 * Hell theme decoration: skulls scattered across the page at varied
 * sizes and angles, drifting upward with pulsing glowing eyes. Each
 * skull parallaxes with a bounded translate (the wrappers are fixed,
 * so they never scroll out of view). Purely decorative.
 */
export default function HellDecor() {
  const refs = useRef([]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const tick = () => {
      const y = window.scrollY;
      refs.current.forEach((el, i) => {
        if (el) el.style.transform = `translate3d(0, ${Math.min(y * SKULLS[i].speed, 150)}px, 0)`;
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <>
      {SKULLS.map((s, i) => (
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
            className="hell-skull"
            style={{
              width: s.size,
              height: s.size,
              opacity: s.opacity,
              animation: `skull-float ${s.duration} ease-in-out infinite`,
              animationDelay: s.delay,
              transform: `rotate(${s.rot}deg)`,
            }}
          >
            <svg viewBox="0 0 80 80" width={s.size} height={s.size} fill="none">
              <path d={SKULL_PATH} fill="#ff3030" opacity="0.85" />
              <g className="hell-skull-eyes">
                <circle cx="31.5" cy="35" r="2" fill="#ffb3b3" />
                <circle cx="48.5" cy="35" r="2" fill="#ffb3b3" />
              </g>
            </svg>
          </div>
        </div>
      ))}
    </>
  );
}