import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { EventsExplorer } from "@/components/events/EventsExplorer";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Calendar",
  description: "National, junior, para, international and education events on the Bangladesh badminton calendar.",
};

const steps = [
  { title: "Check your player ID", body: "Every entrant needs an active BBF player ID. Look yours up or register through your club." },
  { title: "Read the prospectus", body: "Each event page lists categories, fees, venue and the entry deadline." },
  { title: "Enter through your division", body: "Submit your entry to your division association, which confirms eligibility and forwards it to BBF." },
  { title: "Watch for the draw", body: "Draws are published on the event page three days before play starts." },
];

export default function EventsPage() {
  return (
    <>
      <PageHero
        title="National calendar"
        intro="Championships, ranking circuits, para competitions and education courses across Bangladesh."
        crumbs={[]}
        jump={[
          { href: "#calendar", label: "Upcoming events" },
          { href: "#how-to-enter", label: "How to enter" },
        ]}
      />
      <section id="calendar" className="section">
        <div className="wrap">
          <EventsExplorer />
        </div>
      </section>
      <section id="how-to-enter" className="section bg-white">
        <div className="wrap">
          <SectionHeader title="How to enter a tournament" intro="Four steps from player ID to the draw." />
          <Reveal as="ol" stagger={0.08} className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <li key={s.title} className="rounded-xl bg-paper p-6">
                <span className="font-display text-5xl font-black text-orange">{i + 1}</span>
                <h3 className="h-card mt-3">{s.title}</h3>
                <p className="mt-2 text-muted">{s.body}</p>
              </li>
            ))}
          </Reveal>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/membership#player-id" className="btn btn-primary">
              Look up your player ID
            </Link>
            <Link href="/governance#documents" className="btn btn-outline">
              Tournament regulations
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
