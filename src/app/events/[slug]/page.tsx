import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/layout/PageHero";
import { Countdown } from "@/components/ui/Countdown";
import { EventCard } from "@/components/events/EventCard";
import { Reveal } from "@/components/ui/Reveal";
import { IconCalendar, IconDownload, IconPin } from "@/components/ui/Icons";
import { events } from "@/lib/data";
import { contact } from "@/lib/nav";
import { formatDate, formatRange } from "@/lib/format";

export function generateStaticParams() {
  return events.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: PageProps<"/events/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const e = events.find((x) => x.slug === slug);
  return e ? { title: e.title, description: e.summary } : {};
}

export default async function EventPage({ params }: PageProps<"/events/[slug]">) {
  const { slug } = await params;
  const event = events.find((e) => e.slug === slug);
  if (!event) notFound();
  const others = events.filter((e) => e.slug !== slug).slice(0, 3);

  const facts = [
    { label: "Dates", value: formatRange(event.start, event.end), icon: <IconCalendar /> },
    { label: "Venue", value: `${event.venue}, ${event.city}`, icon: <IconPin /> },
  ];

  return (
    <>
      <PageHero title={event.title} intro={event.summary} crumbs={[{ href: "/events", label: "Calendar" }]}>
        <div className="flex flex-wrap gap-3">
          <span className="chip border-white/25 text-white">{event.type}</span>
          {event.categories.map((c) => (
            <span key={c} className="chip border-white/25 text-white/80">
              {c}
            </span>
          ))}
        </div>
      </PageHero>

      <section className="section">
        <div className="wrap grid gap-12 lg:grid-cols-[1.5fr_1fr]">
          <Reveal>
            <dl className="grid gap-4 sm:grid-cols-2">
              {facts.map((f) => (
                <div key={f.label} className="rounded-xl border border-line bg-white p-5">
                  <dt className="flex items-center gap-2 text-sm text-muted">
                    {f.icon} {f.label}
                  </dt>
                  <dd className="mt-2 font-semibold">{f.value}</dd>
                </div>
              ))}
            </dl>
            <div className="prose-bbf mt-10">
              <h2>About this event</h2>
              <p>{event.summary}</p>
              <p>
                Categories: {event.categories.join(", ")}. Seeding follows the national ranking list
                published before the entry deadline. Players must hold an active BBF player ID.
              </p>
              <h2>Draws and results</h2>
              <p>
                Draws will be published here three days before play starts. Results will be added at
                the end of each day and archived on the results page.
              </p>
              <h2>Contact</h2>
              <p>
                Questions about this event go to the competitions team at{" "}
                <a href={`mailto:${contact.email}`} className="font-semibold text-violet link-underline">
                  {contact.email}
                </a>
                .
              </p>
            </div>
          </Reveal>

          <aside className="lg:sticky lg:top-32 lg:self-start">
            <div className="rounded-xl bg-ink p-6 text-white on-dark">
              {event.entryDeadline ? (
                <>
                  <p className="flex items-center gap-2 font-semibold text-[#7fe0bd]">
                    <span className="live-dot" /> Entries open until {formatDate(event.entryDeadline)}
                  </p>
                  <p className="mt-5 text-sm text-white/60">Play starts in</p>
                  <div className="mt-2">
                    <Countdown to={event.start} dark />
                  </div>
                  <div className="mt-6 flex flex-col gap-3">
                    <Link href="/membership#player-id" className="btn btn-primary">
                      Check your player ID
                    </Link>
                    <Link href="/governance#documents" className="btn btn-outline">
                      <IconDownload width={18} height={18} /> Prospectus (PDF)
                    </Link>
                  </div>
                </>
              ) : (
                <>
                  <p className="font-semibold">Entry opens soon</p>
                  <p className="mt-2 text-white/70">
                    Subscribe to the bulletin at the bottom of this page to hear when entries open.
                  </p>
                </>
              )}
            </div>
          </aside>
        </div>
      </section>

      <section className="section bg-paper-2">
        <div className="wrap">
          <h2 className="h-section mb-10">More events</h2>
          <Reveal stagger={0.08} className="grid gap-4 md:grid-cols-3">
            {others.map((e) => (
              <EventCard key={e.slug} event={e} />
            ))}
          </Reveal>
        </div>
      </section>
    </>
  );
}
