import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { SquadExplorer } from "@/components/players/SquadExplorer";
import { Pathway } from "@/components/home/Pathway";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "National squad",
  description: "Profiles of Bangladesh's senior, junior and para national squad players, the athlete pathway and selection policy.",
};

const criteria = [
  { title: "National ranking", body: "Position on the ranking list published before each selection meeting." },
  { title: "Selection events", body: "Results at the National Championships and nominated ranking events." },
  { title: "Coach assessment", body: "Training data, fitness testing and match analysis from national coaches." },
  { title: "Conduct and integrity", body: "Players must meet the code of conduct and anti-doping obligations." },
];

export default function PlayersPage() {
  return (
    <>
      <PageHero
        title="National squad"
        intro="The players currently selected to represent Bangladesh, and how they got there."
        jump={[
          { href: "#squad", label: "Players" },
          { href: "#pathway", label: "Athlete pathway" },
          { href: "#selection", label: "Selection policy" },
        ]}
      />
      <section id="squad" className="section">
        <div className="wrap">
          <SquadExplorer />
        </div>
      </section>
      <Pathway />
      <section id="selection" className="section">
        <div className="wrap">
          <SectionHeader
            title="How squads are selected"
            intro="The selection committee meets after each National Championships and publishes its decisions within seven days. Players can appeal within 14 days."
          />
          <Reveal stagger={0.07} className="grid gap-4 md:grid-cols-2">
            {criteria.map((c) => (
              <div key={c.title} className="rounded-xl border border-line bg-white p-6">
                <h3 className="h-card">{c.title}</h3>
                <p className="mt-2 text-muted">{c.body}</p>
              </div>
            ))}
          </Reveal>
          <Link href="/governance#documents" className="btn btn-outline mt-8">
            Read the full selection policy
          </Link>
        </div>
      </section>
    </>
  );
}
