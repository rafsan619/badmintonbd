"use client";

import { Reveal } from "@/components/ui/Reveal";

export function Mission() {
  return (
    <section className="section-pad">
      <div className="mx-auto grid max-w-[1400px] gap-10 md:grid-cols-[0.9fr_1.1fr] md:items-end">
        <Reveal>
          <p className="eyebrow mb-4">Our purpose</p>
          <h2 className="display text-[clamp(2rem,5vw,3.8rem)] text-bbf-purple">
            A federation defined by movement.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="max-w-2xl text-base leading-relaxed text-bbf-ink-soft md:text-lg">
            Badminton shapes focus, resilience, and community. BBF exists to turn that
            energy into structured opportunity — clear pathways for athletes, coaches, and
            clubs, with standards worthy of international competition.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
