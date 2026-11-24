"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { images } from "@/lib/images";
import { IconArrow } from "@/components/ui/Icons";
import { SectionHeader } from "@/components/ui/SectionHeader";

const options = [
  { label: "Start playing", detail: "Beginner sessions, equipment tips and what to expect", href: "/play", image: images.outdoor },
  { label: "Find a club", detail: "Over 300 affiliated clubs, filtered by division", href: "/play#clubs", image: images.junior },
  { label: "Enter a tournament", detail: "Calendar, entry deadlines and your player ID", href: "/events", image: images.smash },
  { label: "Coach or umpire", detail: "Licensing levels, courses and assessments", href: "/coaching", image: images.court },
  { label: "Follow the national team", detail: "Squad profiles, rankings and results", href: "/players", image: images.senior },
  { label: "Partner with BBF", detail: "Sponsorship, venue hosting and supporters", href: "/partners", image: images.shuttleNet },
];

export function AudienceSelector() {
  const [active, setActive] = useState(0);

  return (
    <section className="section bg-paper">
      <div className="wrap">
        <SectionHeader title="What would you like to do?" intro="Start from what you need. Every route leads to the right page in one click." />
        <div className="grid gap-10 lg:grid-cols-[1.25fr_1fr]">
          <ul className="border-t border-line" onMouseLeave={() => undefined}>
            {options.map((o, i) => (
              <li key={o.href} className="border-b border-line">
                <Link
                  href={o.href}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  className="group relative flex items-center justify-between gap-6 overflow-hidden py-5 md:py-6"
                >
                  <span
                    aria-hidden
                    className="absolute inset-0 -z-0 origin-left scale-x-0 bg-white transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-x-100 group-focus-visible:scale-x-100"
                  />
                  <span className="relative pl-0 transition-[padding] duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover:pl-5">
                    <span className="h-card block text-[clamp(1.8rem,3.4vw,2.7rem)] transition-colors group-hover:text-violet">
                      {o.label}
                    </span>
                    <span className="mt-1 block text-muted">{o.detail}</span>
                  </span>
                  <span className="relative mr-5 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-line transition-all duration-500 group-hover:border-orange group-hover:bg-orange group-hover:text-ink">
                    <IconArrow className="transition-transform duration-500 group-hover:-rotate-45" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="relative hidden lg:block">
            <div className="sticky top-32 aspect-[4/5] overflow-hidden rounded-xl bg-ink">
              <AnimatePresence initial={false}>
                <motion.div
                  key={active}
                  className="absolute inset-0"
                  initial={{ clipPath: "inset(100% 0 0 0)", scale: 1.1 }}
                  animate={{ clipPath: "inset(0% 0 0 0)", scale: 1 }}
                  exit={{ opacity: 0.6 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Image src={options[active].image} alt="" fill sizes="40vw" className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/80 to-transparent" />
                  <p className="font-display absolute bottom-6 left-6 right-6 text-4xl font-extrabold text-white">
                    {options[active].label}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
