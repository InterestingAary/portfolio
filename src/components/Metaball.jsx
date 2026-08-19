import { useId } from "react";
import { useReducedMotion } from "framer-motion";

const DEFAULT_BLOBS = [
  { size: 240, color: "rgba(214,255,77,0.5)", x: 18, y: 28, delay: 0, dur: 11 },
  { size: 200, color: "rgba(91,157,255,0.42)", x: 62, y: 18, delay: 0.8, dur: 13 },
  { size: 220, color: "rgba(167,139,250,0.4)", x: 76, y: 62, delay: 1.6, dur: 12 },
  { size: 170, color: "rgba(214,255,77,0.35)", x: 34, y: 68, delay: 2.4, dur: 10 },
  { size: 150, color: "rgba(91,157,255,0.35)", x: 10, y: 74, delay: 0.4, dur: 14 },
];

export default function Metaball({ className = "", blobs = DEFAULT_BLOBS, opacity = 0.7 }) {
  const reduce = useReducedMotion();
  const id = useId().replace(/[^a-zA-Z0-9]/g, "");

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <svg className="absolute h-0 w-0" aria-hidden="true" focusable="false">
        <defs>
          <filter id={`goo-${id}`}>
            <feGaussianBlur in="SourceGraphic" stdDeviation="22" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -10"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>
      <div className="absolute inset-0" style={{ filter: `url(#goo-${id})`, opacity }}>
        {blobs.map((b, i) => (
          <span
            key={i}
            className={`absolute rounded-full ${reduce ? "" : "metaball-blob"}`}
            style={{
              width: b.size,
              height: b.size,
              left: `${b.x}%`,
              top: `${b.y}%`,
              transform: "translate(-50%, -50%)",
              background: `radial-gradient(circle at 50% 50%, ${b.color} 0%, transparent 72%)`,
              animationDelay: `${b.delay}s`,
              animationDuration: `${b.dur}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}