import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { athleteTracks } from "@/lib/data";

export const metadata: Metadata = {
  title: "Athletes",
};

export default function AthletesPage() {
  return (
    <>
      <PageHero
        eyebrow="Athletes"
        title="Pathways for every stage of play."
        description="Whether you are stepping onto your first court or preparing for international selection — BBF frameworks connect training, ranking, and representation."
      />

      <section className="section-pad pt-0">
        <div className="mx-auto grid max-w-[1400px] gap-5 md:grid-cols-2">
          {athleteTracks.map((track, i) => (
            <Reveal key={track.title} delay={i * 0.06}>
              <article className="group relative min-h-[360px] overflow-hidden rounded-[1.5rem]">
                <Image
                  src={track.image}
                  alt={track.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bbf-purple/90 via-bbf-purple/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-7">
                  <h2 className="display text-3xl text-white">{track.title}</h2>
                  <p className="mt-2 max-w-md text-sm text-white/80">{track.description}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
        <div className="mx-auto mt-10 max-w-[1400px] text-center">
          <Link href="/contact" className="btn btn-primary">
            Register interest
          </Link>
        </div>
      </section>
    </>
  );
}
