"use client";

import { Reveal } from "@/components/ui/Reveal";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function PageHero({ eyebrow, title, description }: PageHeroProps) {
  return (
    <section className="section-pad pb-10 pt-36">
      <div className="mx-auto max-w-[1400px]">
        <Reveal>
          <p className="eyebrow mb-4 text-bbf-orange">{eyebrow}</p>
          <h1 className="display max-w-4xl text-[clamp(2.4rem,6vw,4.8rem)] text-bbf-purple">
            {title}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-bbf-ink-soft md:text-lg">
            {description}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
