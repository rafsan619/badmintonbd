import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { RankingTable } from "@/components/rankings/RankingTable";
import { Reveal } from "@/components/ui/Reveal";
import { rankingsUpdated } from "@/lib/data";
import { formatDate } from "@/lib/format";

export const metadata: Metadata = {
  title: "National rankings",
  description: "Bangladesh national badminton rankings in all five disciplines.",
};

const notes = [
  { title: "How points work", body: "Points from your best eight results in the last 52 weeks count. Higher-grade events award more points." },
  { title: "When it updates", body: "Every Tuesday after sanctioned events finish. Corrections go to the competitions team within 14 days." },
  { title: "Why it matters", body: "Rankings decide seeding at national events and are one input to squad selection." },
];

export default function RankingsPage() {
  return (
    <>
      <PageHero
        title="National rankings"
        intro={`Senior rankings for men's and women's singles, doubles and mixed doubles. Last updated ${formatDate(rankingsUpdated)}.`}
      />
      <section className="section">
        <div className="wrap">
          <Reveal>
            <RankingTable searchable />
          </Reveal>
          <Reveal stagger={0.08} className="mt-14 grid gap-6 md:grid-cols-3">
            {notes.map((n) => (
              <div key={n.title} className="border-t-2 border-violet pt-5">
                <h2 className="h-card">{n.title}</h2>
                <p className="mt-2 text-muted">{n.body}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>
    </>
  );
}
