import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";
import { certificates } from "../data/certificates";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

/**
 * Envelope → certificates viewer.
 * The envelope (wax seal, flap, letter) opens on click, then the
 * certificates fan out one by one inside a framed viewer.
 * Reduced motion: static grid, no envelope, no carousel.
 */
function WaxSeal() {
  return (
    <span
      className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-[#8a2c1c] bg-gradient-to-br from-[#c2432c] to-[#7e2214] text-sm font-bold text-[#ffd9a8] shadow-[0_2px_10px_rgba(0,0,0,0.5)]"
      aria-hidden="true"
    >
      AM
    </span>
  );
}

function Envelope({ onOpen }) {
  return (
    <div className="mx-auto w-full max-w-md [perspective:1400px]">
      <button
        type="button"
        onClick={onOpen}
        aria-label="Open the envelope to view certificates"
        className="group block w-full text-left outline-none focus-visible:ring-2 focus-visible:ring-accent"
      >
        <div className="relative aspect-[5/3] w-full select-none">
          {/* back panel */}
          <div className="absolute inset-0 rounded-2xl border border-edge bg-gradient-to-br from-[#26262e] to-[#181820] shadow-2xl" />
          {/* letter */}
          <motion.div
            animate={{ y: 10 }}
            transition={{ duration: 0.4, repeat: Infinity, repeatType: "mirror", repeatDelay: 2.6 }}
            className="absolute inset-x-5 bottom-7 top-3 rounded-lg border border-edge bg-[#f5f1e6] p-4 shadow-lg"
          >
            <div className="mx-auto mt-1 h-2 w-24 rounded-full bg-zinc-300" />
            <div className="mx-auto mt-3 h-1.5 w-32 rounded-full bg-zinc-200" />
            <div className="mx-auto mt-2 h-1.5 w-28 rounded-full bg-zinc-200" />
            <div className="mx-auto mt-6 flex items-center justify-center gap-2 font-serif text-sm italic text-zinc-400">
              sealed with care — open to read
            </div>
          </motion.div>
          {/* side pockets */}
          <div
            className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#2c2c36] to-[#1d1d25]"
            style={{ clipPath: "polygon(0 0, 50% 50%, 0 100%)" }}
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 rounded-2xl bg-gradient-to-bl from-[#2c2c36] to-[#1d1d25]"
            style={{ clipPath: "polygon(100% 0, 50% 50%, 100% 100%)" }}
            aria-hidden="true"
          />
          {/* flap */}
          <motion.div
            initial={{ rotateX: 0 }}
            whileHover={{ rotateX: 14 }}
            className="absolute inset-x-0 top-0 h-[52%] rounded-t-2xl bg-gradient-to-b from-[#33333e] to-[#24242c]"
            style={{ clipPath: "polygon(0 0, 100% 0, 50% 100%)", transformOrigin: "top", transformStyle: "preserve-3d" }}
            aria-hidden="true"
          >
            <div className="absolute inset-x-0 top-0 h-full opacity-40" style={{ clipPath: "polygon(0 0, 100% 0, 50% 100%)", background: "repeating-linear-gradient(135deg, rgba(255,255,255,0.04) 0 6px, transparent 6px 12px)" }} />
          </motion.div>
          {/* wax seal */}
          <motion.div
            initial={{ y: 0 }}
            whileHover={{ y: -6 }}
            className="absolute inset-0"
            aria-hidden="true"
          >
            <WaxSeal />
          </motion.div>
        </div>
        <div className="mt-6 flex items-center justify-center gap-2 font-mono text-[11px] uppercase tracking-[0.3em] text-zinc-500 transition-colors group-hover:text-accent">
          <span className="inline-block h-2 w-2 animate-pulse bg-accent" aria-hidden="true" />
          click the envelope to open
        </div>
      </button>
    </div>
  );
}

/** Gold-style certificate frame: gradient border + corner ornaments. */
function CertificateFrame({ cert, children }) {
  return (
    <div className="relative">
      <div className="absolute -inset-3 rounded-2xl bg-gradient-to-br from-accent/25 via-transparent to-accent/10 blur-xl" aria-hidden="true" />
      <div className="relative rounded-xl border border-accent/40 bg-gradient-to-br from-[#3a3a22] via-[#26261c] to-[#2e2e22] p-[3px] shadow-2xl">
        <div className="relative overflow-hidden rounded-lg border border-[#d8c98a]/60 bg-[#faf6ea] p-2">
          {/* corner ornaments */}
          <span className="pointer-events-none absolute left-2 top-2 h-5 w-5 border-l-2 border-t-2 border-[#c9b56a]" aria-hidden="true" />
          <span className="pointer-events-none absolute right-2 top-2 h-5 w-5 border-r-2 border-t-2 border-[#c9b56a]" aria-hidden="true" />
          <span className="pointer-events-none absolute bottom-2 left-2 h-5 w-5 border-b-2 border-l-2 border-[#c9b56a]" aria-hidden="true" />
          <span className="pointer-events-none absolute bottom-2 right-2 h-5 w-5 border-b-2 border-r-2 border-[#c9b56a]" aria-hidden="true" />
          {/* sheen sweep */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-lg" aria-hidden="true">
            <div className="absolute inset-y-0 -left-1/2 w-1/3 rotate-12 bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-1000 group-hover:translate-x-[300%]" />
          </div>
          <img
            src={cert.image}
            alt={`${cert.title} — ${cert.level}`}
            className="block h-auto w-full rounded-sm"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
}

function CertificateCard({ cert }) {
  return (
    <motion.figure
      key={cert.id}
      initial={{ opacity: 0, x: 80, rotateY: 8 }}
      animate={{ opacity: 1, x: 0, rotateY: 0 }}
      exit={{ opacity: 0, x: -80, rotateY: -8 }}
      transition={{ duration: 0.45, ease: [0.21, 0.47, 0.32, 0.98] }}
      className="group text-center"
    >
      <CertificateFrame cert={cert}>
        <figcaption className="mt-6">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="rounded-full border border-accent/40 bg-accent/10 px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-widest text-accent">
              {cert.level}
            </span>
            {cert.year && (
              <span className="rounded-full border border-edge bg-panel px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-zinc-400">
                {cert.year}
              </span>
            )}
          </div>
          <h3 className="mt-3 font-display text-2xl font-bold tracking-tight text-zinc-100">
            {cert.title}
          </h3>
          <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.25em] text-zinc-500">
            {cert.issuer}
          </p>
        </figcaption>
      </CertificateFrame>
    </motion.figure>
  );
}

function CertificateDeck({ onReset }) {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const total = certificates.length;
  const cert = certificates[index];

  const go = (delta) => {
    setDir(delta);
    setIndex((i) => (i + delta + total) % total);
  };

  return (
    <div className="mx-auto w-full max-w-2xl">
      <AnimatePresence mode="wait" initial={false} custom={dir}>
        <CertificateCard key={cert.id} cert={cert} />
      </AnimatePresence>

      <div className="mt-8 flex items-center justify-center gap-5">
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Previous certificate"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-edge bg-panel text-zinc-300 transition-colors hover:border-accent/50 hover:text-accent"
        >
          <ChevronLeft className="h-5 w-5" aria-hidden="true" />
        </button>

        <div className="flex items-center gap-2">
          {certificates.map((c, i) => (
            <button
              key={c.id}
              type="button"
              onClick={() => {
                setDir(i > index ? 1 : -1);
                setIndex(i);
              }}
              aria-label={`Go to certificate ${i + 1}: ${c.title}`}
              className="h-1.5 rounded-full transition-all"
              style={{
                width: i === index ? 24 : 8,
                backgroundColor: i === index ? "var(--color-accent)" : "rgba(255,255,255,0.18)",
              }}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Next certificate"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-edge bg-panel text-zinc-300 transition-colors hover:border-accent/50 hover:text-accent"
        >
          <ChevronRight className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>

      <div className="mt-6 flex items-center justify-center gap-4">
        <span className="font-mono text-[10px] tracking-[0.3em] text-zinc-500">
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center gap-2 rounded-lg border border-edge bg-panel px-3 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-400 transition-colors hover:border-accent/50 hover:text-accent"
        >
          <RotateCcw className="h-3 w-3" aria-hidden="true" /> reseal
        </button>
      </div>
    </div>
  );
}

function StaticGrid() {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {certificates.map((c, i) => (
        <Reveal key={c.id} delay={(i % 2) * 0.08}>
          <CertificateFrame cert={c} />
          <div className="mt-3 text-center">
            <span className="rounded-full border border-accent/40 bg-accent/10 px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-widest text-accent">
              {c.level}
            </span>
            <h3 className="mt-2 font-display text-lg font-bold text-zinc-100">{c.title}</h3>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

export default function Certificates() {
  const reduce = useReducedMotion();
  const [opened, setOpened] = useState(false);
  const [phase, setPhase] = useState("envelope"); // "envelope" | "opening" | "deck"

  useEffect(() => {
    if (phase !== "opening") return;
    const t = setTimeout(() => setPhase("deck"), 900);
    return () => clearTimeout(t);
  }, [phase]);

  const open = () => {
    if (opened) return;
    setOpened(true);
    setPhase("opening");
  };

  return (
    <section id="certificates" className="relative py-28 md:py-36">
      <div className="mx-auto w-full max-w-6xl px-6 md:px-10">
        <SectionHeading
          eyebrow="Certificates"
          title="Sealed proof of effort."
          description="Every participation, win, and milestone — saved as a certificate. Click the envelope to unseal the collection."
          chapter="05"
        />

        <div className="mt-16">
          {reduce ? (
            <StaticGrid />
          ) : (
            <AnimatePresence mode="wait">
              {phase !== "deck" ? (
                <motion.div
                  key="envelope"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -60, scale: 0.96 }}
                  transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
                >
                  <Envelope onOpen={open} />
                </motion.div>
              ) : (
                <motion.div
                  key="deck"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
                >
                  <CertificateDeck onReset={() => { setOpened(false); setPhase("envelope"); }} />
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </div>
      </div>
    </section>
  );
}