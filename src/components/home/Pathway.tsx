"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { pathway } from "@/lib/org";
import { Shuttle } from "@/components/ui/Icons";
import { SectionHeader } from "@/components/ui/SectionHeader";

/**
 * The athlete pathway is a real sequence, so it is numbered.
 * A shuttle travels along the line as the section scrolls through the viewport.
 */
export function Pathway({ id = "pathway" }: { id?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 45%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  const left = useTransform(progress, [0, 1], ["0%", "100%"]);
  const top = left;

  return (
    <section id={id} className="section on-dark bg-violet text-white">
      <div className="wrap">
        <SectionHeader
          title="From your first club to the world stage"
          intro="Five steps from district play to representing Bangladesh. Each one has clear entry points and selection criteria."
          className="[&_.lede]:text-white/70"
        />
        <div ref={ref} className="relative">
          {/* Track: horizontal on desktop, vertical on mobile */}
          <div aria-hidden className="absolute left-[19px] top-0 h-full w-0.5 bg-white/15 lg:left-0 lg:top-[19px] lg:h-0.5 lg:w-full" />
          <motion.div
            aria-hidden
            className="absolute left-[19px] top-0 w-0.5 origin-top bg-orange lg:hidden"
            style={{ height: top }}
          />
          <motion.div
            aria-hidden
            className="absolute left-0 top-[19px] hidden h-0.5 origin-left bg-orange lg:block"
            style={{ width: left }}
          />
          <motion.span
            aria-hidden
            className="absolute -top-1 hidden -translate-x-1/2 text-orange lg:block"
            style={{ left }}
          >
            <Shuttle className="h-11 w-11 rotate-90" />
          </motion.span>

          <ol className="relative grid gap-10 lg:grid-cols-5 lg:gap-6 lg:pt-20">
            {pathway.map((s, i) => (
              <li key={s.step} className="relative pl-14 lg:pl-0">
                <span className="font-display absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-full bg-orange text-xl font-extrabold text-ink lg:hidden">
                  {i + 1}
                </span>
                <span className="font-display hidden text-7xl font-black leading-none text-white/15 lg:block">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="mt-1 text-sm font-semibold text-orange">{s.step}</p>
                <h3 className="h-card mt-1">{s.title}</h3>
                <p className="mt-2 text-white/70">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
