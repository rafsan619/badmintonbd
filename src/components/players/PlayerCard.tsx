import Link from "next/link";
import clsx from "clsx";
import type { Player } from "@/lib/data";
import { disciplineNames } from "@/lib/data";
import { initials } from "@/lib/format";
import { CourtLines } from "@/components/ui/CourtLines";

/** Portrait placeholder: monogram on a court diagram until official headshots are supplied. */
export function PlayerCard({ player, className }: { player: Player; className?: string }) {
  return (
    <Link
      href={`/players/${player.slug}`}
      className={clsx("group block", className)}
    >
      <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-violet text-white">
        <CourtLines
          className="absolute left-1/2 top-1/2 w-[190%] -translate-x-1/2 -translate-y-1/2 rotate-90 text-white/15 transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-110"
          quiet strokeWidth={0.05}
        />
        <span className="font-display absolute inset-0 flex items-center justify-center text-[5.5rem] font-black text-white/90 transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)] group-hover:-translate-y-3">
          {initials(player.name)}
        </span>
        <span className="absolute left-4 top-4 rounded-full bg-white/15 px-2.5 py-1 text-xs font-semibold backdrop-blur">
          {player.squad}
        </span>
        <span className="font-display absolute right-4 top-3 text-right leading-none">
          <span className="block text-xs font-semibold text-white/60">National rank</span>
          <span className="text-3xl font-extrabold text-orange">{player.nationalRank}</span>
        </span>
        <span className="absolute inset-x-0 bottom-0 translate-y-full bg-orange px-4 py-3 text-sm font-semibold text-ink transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover:translate-y-0">
          View profile
        </span>
      </div>
      <h3 className="h-card mt-4 group-hover:text-violet">{player.name}</h3>
      <p className="text-sm text-muted">
        {player.disciplines.map((d) => disciplineNames[d]).join(", ")}
      </p>
    </Link>
  );
}
