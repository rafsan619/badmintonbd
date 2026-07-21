"use client";

import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";

export function SupportCTA() {
  return (
    <section className="section-pad pt-0">
      <Reveal>
        <div className="mx-auto max-w-[1400px] rounded-[2rem] border border-bbf-line bg-bbf-white px-6 py-14 text-center md:px-16">
          <p className="eyebrow mb-4">Support badminton</p>
          <h2 className="display mx-auto max-w-3xl text-[clamp(2rem,5vw,3.6rem)] text-bbf-purple">
            Your partnership grows the next generation of champions.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-bbf-ink-soft">
            Clubs, sponsors, and volunteers — every contribution strengthens pathways from
            local halls to international arenas.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/contact" className="btn btn-primary">
              Partner with BBF
            </Link>
            <Link href="/about" className="btn btn-ghost">
              Governance
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
