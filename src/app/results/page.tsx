import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { results } from "@/lib/data";
import { formatDate } from "@/lib/format";

export const metadata: Metadata = {
  title: "Results",
  description: "Finals and winners from national, division and junior events in Bangladesh.",
};

export default function ResultsPage() {
  return (
    <>
      <PageHero
        title="Results"
        intro="Finals from recent national, division and junior events. Full draws are on each event page."
      />
      <section className="section">
        <div className="wrap space-y-14">
          {results.map((r) => (
            <Reveal key={r.event}>
              <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
                <h2 className="h-card !text-[2.2rem]">{r.event}</h2>
                <p className="text-muted">
                  <time dateTime={r.date}>{formatDate(r.date)}</time>, {r.city}
                </p>
              </div>
              <div className="overflow-x-auto rounded-xl border border-line bg-white">
                <table className="w-full min-w-[640px] text-left">
                  <thead className="bg-paper text-sm text-muted">
                    <tr>
                      <th scope="col" className="px-6 py-3 font-semibold">Event</th>
                      <th scope="col" className="px-4 py-3 font-semibold">Winner</th>
                      <th scope="col" className="px-4 py-3 font-semibold">Runner-up</th>
                      <th scope="col" className="px-6 py-3 text-right font-semibold">Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    {r.finals.map((f) => (
                      <tr key={f.discipline} className="border-t border-line transition-colors hover:bg-paper">
                        <td className="px-6 py-4 text-muted">{f.discipline}</td>
                        <td className="px-4 py-4 font-semibold text-violet">{f.winner}</td>
                        <td className="px-4 py-4">{f.runnerUp}</td>
                        <td className="px-6 py-4 text-right tabular">{f.score}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
