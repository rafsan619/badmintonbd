"use client";

import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { images } from "@/lib/images";

export function FeatureBand() {
  return (
    <section className="section-pad">
      <div className="mx-auto grid max-w-[1400px] overflow-hidden rounded-[2rem] bg-bbf-purple text-bbf-white md:grid-cols-2">
        <div className="relative min-h-[320px] md:min-h-[520px]">
          <Image
            src={images.training}
            alt="Athletes training on court"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
        <div className="flex flex-col justify-center p-8 md:p-14">
          <Reveal>
            <p className="eyebrow mb-4 !text-white/60">High performance</p>
            <h2 className="display text-[clamp(1.9rem,4vw,3.2rem)]">
              Measure what movement means.
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-white/75 md:text-base">
              Progress is not only ranking points. It is consistency, craft, and the quiet
              work between tournaments. BBF supports athletes with coaching frameworks,
              competition calendars, and standards aligned to BWF pathways.
            </p>
            <Link href="/about" className="btn btn-primary mt-8 w-fit">
              Our mission
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
