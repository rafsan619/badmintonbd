import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/layout/PageHero";
import { PlayerCard } from "@/components/players/PlayerCard";
import { CourtLines } from "@/components/ui/CourtLines";
import { Reveal } from "@/components/ui/Reveal";
import { disciplineNames, players, rankings, type Discipline } from "@/lib/data";
import { initials } from "@/lib/format";

export function generateStaticParams() {
  return players.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/players/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = players.find((x) => x.slug === slug);
  return p ? { title: p.name, description: p.bio } : {};
}

export default async function PlayerPage({ params }: PageProps<"/players/[slug]">) {
  const { slug } = await params;
  const player = players.find((p) => p.slug === slug);
  if (!player) notFound();

  const rankRows = (Object.keys(rankings) as Discipline[])
    .map((d) => ({ d, row: rankings[d].find((r) => r.name.includes(player.name)) }))
    .filter((x) => x.row);

  const teammates = players.filter((p) => p.squad === player.squad && p.slug !== player.slug).slice(0, 4);

  const facts = [
    ["Squad", player.squad],
    ["Division", player.division],
    ["Club", player.club],
    ["Born", String(player.born)],
    ["Plays", `${player.hand}-handed`],
    ["Events", player.disciplines.map((d) => disciplineNames[d]).join(", ")],
  ];

  return (
    <>
      <PageHero title={player.name} intro={player.bio} crumbs={[{ href: "/players", label: "National squad" }]} />
      <section className="section">
        <div className="wrap grid gap-12 lg:grid-cols-[360px_1fr]">
          <Reveal>
            <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-violet text-white">
              <CourtLines className="absolute left-1/2 top-1/2 w-[190%] -translate-x-1/2 -translate-y-1/2 rotate-90 text-white/15" quiet strokeWidth={0.05} />
              <span className="font-display absolute inset-0 flex items-center justify-center text-[8rem] font-black">
                {initials(player.name)}
              </span>
              <p className="absolute inset-x-0 bottom-0 bg-ink/50 p-4 text-sm text-white/80 backdrop-blur">
                Official headshot coming soon
              </p>
            </div>
          </Reveal>
          <div>
            <Reveal>
              <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line md:grid-cols-3">
                {facts.map(([k, v]) => (
                  <div key={k} className="bg-white p-5">
                    <dt className="text-sm text-muted">{k}</dt>
                    <dd className="mt-1 font-semibold">{v}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
            {rankRows.length > 0 && (
              <Reveal className="mt-10">
                <h2 className="h-card !text-3xl">National ranking</h2>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                  {rankRows.map(({ d, row }) => (
                    <li key={d} className="flex items-center justify-between rounded-xl bg-paper-2 px-5 py-4">
                      <span>
                        <span className="block font-semibold">{disciplineNames[d]}</span>
                        <span className="text-sm text-muted">{row!.name}</span>
                      </span>
                      <span className="font-display text-5xl font-black text-violet">{row!.rank}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            )}
            <Reveal className="mt-10">
              <h2 className="h-card !text-3xl">Career highlights</h2>
              <ul className="mt-4 space-y-3">
                {player.highlights.map((h) => (
                  <li key={h} className="flex gap-3">
                    <span aria-hidden className="mt-2.5 h-0.5 w-5 shrink-0 bg-orange" />
                    {h}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>
      {teammates.length > 0 && (
        <section className="section bg-paper-2">
          <div className="wrap">
            <div className="mb-10 flex items-end justify-between gap-4">
              <h2 className="h-section">More from the {player.squad.toLowerCase()} squad</h2>
              <Link href="/players" className="btn btn-outline">All players</Link>
            </div>
            <Reveal stagger={0.07} className="grid grid-cols-2 gap-5 md:grid-cols-4">
              {teammates.map((p) => (
                <PlayerCard key={p.slug} player={p} />
              ))}
            </Reveal>
          </div>
        </section>
      )}
    </>
  );
}
