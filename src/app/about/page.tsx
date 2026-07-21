import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { images } from "@/lib/images";

export const metadata: Metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About BBF"
        title="Governance, integrity, and national standards."
        description="The Bangladesh Badminton Federation is the recognized national governing body for badminton — responsible for competition frameworks, athlete development, and representation in international sport."
      />

      <section className="section-pad pt-0">
        <div className="mx-auto grid max-w-[1400px] gap-8 md:grid-cols-2 md:items-center">
          <Reveal>
            <div className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem]">
              <Image
                src={images.about}
                alt="Athletes competing"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="eyebrow mb-3">Mission</p>
            <h2 className="display text-[clamp(1.8rem,3.5vw,2.8rem)] text-bbf-purple">
              Grow the game. Raise the standard.
            </h2>
            <p className="mt-4 text-bbf-ink-soft leading-relaxed">
              We foster participation across districts, protect clean sport, and prepare
              Bangladesh athletes for regional and Olympic pathways. Our work spans junior
              circuits, senior ranking, coaching education, and event hosting.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-bbf-ink-soft">
              <li>— National championships & ranking structure</li>
              <li>— Athlete selection & high-performance support</li>
              <li>— Coach / official education</li>
              <li>— Club affiliation & safe sport policies</li>
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="section-pad pt-0">
        <div className="mx-auto max-w-[1400px] grid gap-4 md:grid-cols-3">
          {[
            {
              title: "Board & leadership",
              body: "Elected officers and technical committees guiding strategy and compliance.",
            },
            {
              title: "Policies",
              body: "Safeguarding, eligibility, anti-doping alignment, and competition regulations.",
            },
            {
              title: "International",
              body: "Engagement with BWF, BAC, and Olympic structures for Bangladesh badminton.",
            },
          ].map((card, i) => (
            <Reveal key={card.title} delay={i * 0.08}>
              <div className="rounded-2xl border border-bbf-line bg-bbf-white p-7 h-full">
                <h3 className="text-xl text-bbf-purple">{card.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-bbf-ink-soft">{card.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
