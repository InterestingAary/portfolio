import { useEffect, useRef } from "react";

/**
 * Ocean theme decoration: bubbles rising from the depths (light rays
 * and abyss glow come from CSS on body::before). The bubble layer
 * drifts downward with a bounded parallax while scrolling — the CSS
 * bubble-rise animation handles the infinite rising loop, so the
 * layer never runs out of bubbles no matter how far you scroll.
 * Purely decorative.
 */
export default function OceanDecor() {
  const layer = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const tick = () => {
      if (layer.current) {
        layer.current.style.transform = `translate3d(0, ${Math.min(window.scrollY * 0.08, 140)}px, 0)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div ref={layer} className="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
      <div className="ocean-bubbles" />
    </div>
  );
}