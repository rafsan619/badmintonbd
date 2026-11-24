import { events } from "@/lib/data";
import { EventCard } from "@/components/events/EventCard";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function HomeEvents() {
  return (
    <section className="section bg-paper-2">
      <div className="wrap">
        <SectionHeader
          title="Coming up on the calendar"
          intro="National, junior, para and education events. Enter through your division association before the deadline."
          link={{ href: "/events", label: "Full calendar" }}
        />
        <Reveal stagger={0.08} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {events.slice(0, 4).map((e) => (
            <EventCard key={e.slug} event={e} />
          ))}
        </Reveal>
      </div>
    </section>
  );
}
