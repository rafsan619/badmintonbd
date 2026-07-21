import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { newsItems } from "@/lib/data";

export const metadata: Metadata = {
  title: "News",
};

export default function NewsPage() {
  return (
    <>
      <PageHero
        eyebrow="News"
        title="Updates from Bangladesh badminton."
        description="Results, selection camps, host opportunities, and federation announcements."
      />

      <section className="section-pad pt-0">
        <div className="mx-auto grid max-w-[1400px] gap-8">
          {newsItems.map((item, i) => (
            <Reveal key={item.slug} delay={i * 0.06}>
              <article
                id={item.slug}
                className="grid gap-6 overflow-hidden rounded-[1.5rem] border border-bbf-line bg-bbf-white md:grid-cols-[1.1fr_1.2fr]"
              >
                <div className="relative min-h-[240px]">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 45vw"
                  />
                </div>
                <div className="flex flex-col justify-center p-6 md:p-10">
                  <p className="eyebrow mb-3">
                    {item.category} · {item.date}
                  </p>
                  <h2 className="display text-[clamp(1.6rem,3vw,2.4rem)] text-bbf-purple">
                    {item.title}
                  </h2>
                  <p className="mt-4 text-bbf-ink-soft leading-relaxed">{item.excerpt}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
