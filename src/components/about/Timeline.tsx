"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { history } from "@/lib/org";
import { Reveal } from "@/components/ui/Reveal";

export function Timeline() {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 55%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <section id="history" className="section on-dark bg-ink text-white">
      <div className="wrap grid gap-12 lg:grid-cols-[1fr_1.4fr]">
        <Reveal className="lg:sticky lg:top-32 lg:self-start">
          <div className="court-rule mb-8" />
          <h2 className="h-section">Our history</h2>
          <p className="mt-4 max-w-md text-white/70">
            Key moments for the federation. Dates are being verified against the federation archive.
          </p>
        </Reveal>
        <ol ref={ref} className="relative space-y-10 pl-10">
          <span aria-hidden className="absolute left-[7px] top-2 h-[calc(100%-1rem)] w-0.5 bg-white/15" />
          <motion.span aria-hidden style={{ scaleY }} className="absolute left-[7px] top-2 h-[calc(100%-1rem)] w-0.5 origin-top bg-orange" />
          {history.map((h) => (
            <motion.li
              key={h.year}
              initial={{ opacity: 0.25 }}
              whileInView={{ opacity: 1 }}
              viewport={{ margin: "-40% 0px -40% 0px" }}
              transition={{ duration: 0.4 }}
              className="relative"
            >
              <span aria-hidden className="absolute -left-10 top-3 h-4 w-4 rounded-full border-2 border-orange bg-ink" />
              <p className="font-display text-5xl font-black text-orange">{h.year}</p>
              <p className="mt-1 text-lg text-white/85">{h.text}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
