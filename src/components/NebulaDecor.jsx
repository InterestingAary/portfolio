import { useEffect, useRef } from "react";

/**
 * Nebula theme decoration: a twinkling starfield, a slowly rotating
 * spiral galaxy disc, and periodic shooting stars. The two star
 * layers move at different speeds while scrolling, creating a 3D
 * depth effect. Parallax is applied to the repeating background
 * (modulo the tile size) so the stars never run out no matter how
 * far down the page you scroll; the galaxy stays a deep backdrop.
 * Purely decorative.
 */
export default function NebulaDecor() {
  const stars1 = useRef(null);
  const stars2 = useRef(null);
  const galaxy = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const tick = () => {
      const y = window.scrollY;
      if (stars1.current) {
        stars1.current.style.backgroundPosition = `0 ${(y * 0.06) % 220}px`;
      }
      if (stars2.current) {
        stars2.current.style.backgroundPosition = `0 ${(y * 0.13) % 340}px`;
      }
      if (galaxy.current) {
        galaxy.current.style.transform = `translate3d(0, ${Math.min(y * 0.02, 160)}px, 0)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <>
      <div ref={stars1} className="starfield" aria-hidden="true" />
      <div ref={stars2} className="starfield-2" aria-hidden="true" />
      <div ref={galaxy} className="galaxy" aria-hidden="true" />
      {[
        { top: "22%", left: "68%", delay: "-1.2s" },
        { top: "48%", left: "14%", delay: "-5.4s" },
        { top: "74%", left: "58%", delay: "-8.1s" },
      ].map((s, i) => (
        <div
          key={i}
          className="shooting-star"
          style={{ top: s.top, left: s.left, animationDelay: s.delay }}
          aria-hidden="true"
        />
      ))}
    </>
  );
}