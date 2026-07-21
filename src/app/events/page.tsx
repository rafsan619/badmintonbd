import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { events } from "@/lib/data";

export const metadata: Metadata = {
  title: "Events",
};

export default function EventsPage() {
  return (
    <>
      <PageHero
        eyebrow="Events"
        title="The national calendar."
        description="Championships, junior circuits, education workshops, and para competitions — structured competition across Bangladesh."
      />

      <section className="section-pad pt-0">
        <div className="mx-auto max-w-[1400px]">
          <div className="overflow-hidden rounded-2xl border border-bbf-line bg-bbf-white">
            {events.map((event, i) => (
              <Reveal key={event.title} delay={i * 0.05}>
                <div className="grid gap-3 border-b border-bbf-line px-5 py-6 last:border-b-0 md:grid-cols-[160px_1fr_140px] md:items-center md:px-8">
                  <p className="eyebrow !normal-case">{event.date}</p>
                  <div>
                    <h2 className="text-xl text-bbf-purple">{event.title}</h2>
                    <p className="mt-1 text-sm text-bbf-ink-soft">{event.location}</p>
                  </div>
                  <span className="w-fit rounded-full border border-bbf-line px-3 py-1 text-xs tracking-wide text-bbf-orange md:justify-self-end">
                    {event.type}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
