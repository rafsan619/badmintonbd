"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { players } from "@/lib/data";
import { PlayerCard } from "@/components/players/PlayerCard";
import { SectionHeader } from "@/components/ui/SectionHeader";

/** Senior squad cards drift sideways as the section scrolls past; still scrollable by touch. */
export function SquadStrip() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], ["6%", "-22%"]);
  const senior = players.filter((p) => p.squad === "Senior");

  return (
    <section ref={ref} className="section overflow-hidden">
      <div className="wrap">
        <SectionHeader
          title="The national squad"
          intro="Senior players currently selected to represent Bangladesh."
          link={{ href: "/players", label: "All players" }}
        />
      </div>
      <div className="no-scrollbar overflow-x-auto lg:overflow-visible">
        <motion.ul style={{ x }} className="flex w-max gap-5 px-[clamp(1rem,4vw,3rem)] max-lg:!transform-none">
          {senior.map((p) => (
            <li key={p.slug} className="w-[62vw] shrink-0 sm:w-[34vw] lg:w-[19vw] lg:min-w-[240px]">
              <PlayerCard player={p} />
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
