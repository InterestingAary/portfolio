import { Fragment } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Reveal from "./Reveal";

export default function SectionHeading({ eyebrow, title, description, align = "left", chapter }) {
  const alignCls = align === "center" ? "items-center text-center" : "items-start text-left";
  const reduce = useReducedMotion();
  const words = title.split(" ");

  return (
    <Reveal className={`relative flex flex-col ${alignCls}`}>
      {chapter && (
        <span
          className="pointer-events-none absolute -top-14 right-0 select-none font-serif text-[clamp(5rem,12vw,11rem)] leading-none text-white/[0.04]"
          aria-hidden="true"
        >
          {chapter}
        </span>
      )}
      <p className="relative flex items-center gap-3 font-mono text-[11px] font-medium uppercase tracking-[0.3em] text-accent">
        <span className="inline-block h-2 w-2 bg-accent" aria-hidden="true" />
        // {eyebrow}
      </p>
      <h2 className="relative mt-4 font-serif text-[clamp(2.4rem,5.5vw,4.5rem)] leading-[0.98] tracking-tight text-zinc-100">
        {reduce
          ? title
          : words.map((w, i) => (
              <Fragment key={`${w}-${i}`}>
                <span className="inline-block overflow-hidden pb-1 align-bottom">
                  <motion.span
                    className="inline-block"
                    initial={{ y: "110%" }}
                    whileInView={{ y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{
                      duration: 0.55,
                      delay: 0.05 * i,
                      ease: [0.21, 0.47, 0.32, 0.98],
                    }}
                  >
                    {w}
                  </motion.span>
                </span>{" "}
              </Fragment>
            ))}
      </h2>
      <svg className="squiggle relative mt-3" viewBox="0 0 200 10" preserveAspectRatio="none" aria-hidden="true">
        <path d="M2 8 C 45 2, 95 9, 140 5 S 190 3, 198 6" />
      </svg>
      {description && (
        <p className="relative mt-5 max-w-2xl text-base leading-relaxed text-zinc-400">{description}</p>
      )}
    </Reveal>
  );
}