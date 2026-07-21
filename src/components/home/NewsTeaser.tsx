"use client";

import Image from "next/image";
import Link from "next/link";
import { newsItems } from "@/lib/data";
import { Reveal } from "@/components/ui/Reveal";

export function NewsTeaser() {
  return (
    <section className="section-pad pt-0">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-10 flex items-end justify-between gap-4">
          <Reveal>
            <p className="eyebrow mb-3">Latest news</p>
            <h2 className="display text-[clamp(2rem,4.5vw,3.2rem)] text-bbf-purple">
              From the federation desk
            </h2>
          </Reveal>
          <Reveal>
            <Link href="/news" className="btn btn-ghost">
              See more
            </Link>
          </Reveal>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {newsItems.map((item, i) => (
            <Reveal key={item.slug} delay={i * 0.08}>
              <article className="group">
                <Link href={`/news#${item.slug}`} className="block">
                  <div className="relative mb-4 aspect-[16/11] overflow-hidden rounded-2xl">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <p className="eyebrow mb-2">
                    {item.category} · {item.date}
                  </p>
                  <h3 className="text-xl leading-snug text-bbf-purple group-hover:text-bbf-orange">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-bbf-ink-soft">
                    {item.excerpt}
                  </p>
                </Link>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
