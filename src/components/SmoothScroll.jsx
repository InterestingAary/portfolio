import { useEffect } from "react";
import { useReducedMotion } from "framer-motion";
import Lenis from "lenis";

/**
 * Lenis-powered smooth scroll — the same library the reference
 * (meermohsin.me) uses. Intercepts wheel/trackpad input and eases the
 * REAL window scroll position, so framer-motion useScroll, sticky
 * pinning, and programmatic window.scrollTo calls all keep working.
 *
 * Reduced motion: Lenis is not created at all (native scroll).
 * Modal/body-lock: Lenis is stopped while the body is locked, started
 * again when unlocked (MutationObserver on body style).
 */
export default function SmoothScroll() {
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;

    const lenis = new Lenis({
      lerp: 0.1,
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
      smoothWheel: true,
      syncTouch: false,
    });

    let raf = 0;
    const loop = (time) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    // Expose Lenis so nav components can drive smooth scrolls through it
    // instead of native smooth scrollIntoView, which fights the lerp.
    window.__lenis = lenis;

    // Track the position Lenis itself applied, so we can tell apart
    // Lenis's own scroll events from programmatic/external ones
    // (nav curtain, anchor jumps, audits). If the native position is
    // not what Lenis just applied, force Lenis to adopt it immediately.
    let lastApplied = window.scrollY;
    lenis.on("scroll", (e) => {
      lastApplied = e.scroll;
    });

    const onNativeScroll = () => {
      const y = window.scrollY;
      if (Math.abs(y - lastApplied) > 1.5) {
        lastApplied = y;
        lenis.scrollTo(y, { immediate: true });
      }
    };
    window.addEventListener("scroll", onNativeScroll, { passive: true });

    const onLockChange = () => {
      if (document.body.style.overflow === "hidden") {
        lenis.stop();
      } else {
        lenis.start();
      }
    };

    const mo = new MutationObserver(onLockChange);
    mo.observe(document.body, { attributes: true, attributeFilter: ["style"] });
    onLockChange();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onNativeScroll);
      mo.disconnect();
      if (window.__lenis === lenis) delete window.__lenis;
      lenis.destroy();
    };
  }, [reduce]);

  return null;
}