"use client";

import Image from "next/image";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { programs } from "@/lib/data";
import { Reveal } from "@/components/ui/Reveal";

gsap.registerPlugin(ScrollTrigger);

export function Programs() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const panels = gsap.utils.toArray<HTMLElement>(".program-panel");
      panels.forEach((panel) => {
        gsap.fromTo(
          panel.querySelector(".program-img"),
          { scale: 1.12 },
          {
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: panel,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="pb-8">
      <div className="mx-auto max-w-[1400px] px-4 md:px-8">
        <Reveal>
          <div className="mb-10 flex items-end justify-between gap-6">
            <div>
              <p className="eyebrow mb-3">Programs</p>
              <h2 className="display text-[clamp(2rem,4.5vw,3.4rem)] text-bbf-purple">
                Built for progression
              </h2>
            </div>
            <p className="hidden max-w-sm text-sm text-bbf-ink-soft md:block">
              From national teams to coaching education — structured systems that scale
              across Bangladesh.
            </p>
          </div>
        </Reveal>
      </div>

      <div className="mx-auto flex max-w-[1400px] flex-col gap-4 px-4 md:px-8">
        {programs.map((program, i) => (
          <Link
            key={program.id}
            href={program.href}
            className="program-panel group relative block min-h-[70vh] overflow-hidden rounded-[1.5rem] md:rounded-[2rem]"
          >
            <div className="program-img absolute inset-0">
              <Image
                src={program.image}
                alt={program.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bbf-purple/90 via-bbf-purple/35 to-transparent" />
            </div>
            <div className="relative z-10 flex h-full min-h-[70vh] flex-col justify-end p-6 md:p-12">
              <p className="font-mono text-xs tracking-[0.2em] text-white/70">
                {program.id} — {String(programs.length).padStart(2, "0")}
              </p>
              <h3 className="mt-3 display text-[clamp(1.8rem,4vw,3.2rem)] text-white">
                {program.title}
              </h3>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/85 md:text-base">
                {program.description}
              </p>
              <span className="mt-6 inline-flex text-sm text-bbf-orange">
                Explore {i === 0 ? "teams" : "pathway"} →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
