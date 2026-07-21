"use client";

import Image from "next/image";
import Link from "next/link";
import { athleteTracks } from "@/lib/data";
import { Reveal } from "@/components/ui/Reveal";

export function GetStarted() {
  return (
    <section className="section-pad pt-0">
      <div className="mx-auto max-w-[1400px]">
        <Reveal>
          <p className="eyebrow mb-3">Get started</p>
          <h2 className="display mb-10 max-w-2xl text-[clamp(2rem,4.5vw,3.4rem)] text-bbf-purple">
            Find your place in the system.
          </h2>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {athleteTracks.map((track, i) => (
            <Reveal key={track.title} delay={i * 0.08}>
              <Link
                href="/athletes"
                className="group relative block aspect-[4/5] overflow-hidden rounded-[1.25rem]"
              >
                <Image
                  src={track.image}
                  alt={track.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bbf-ink/85 via-bbf-ink/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <h3 className="text-xl text-white">{track.title}</h3>
                  <p className="mt-2 text-sm text-white/75">{track.description}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
