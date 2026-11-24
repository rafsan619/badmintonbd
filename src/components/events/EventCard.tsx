import Link from "next/link";
import clsx from "clsx";
import type { EventItem } from "@/lib/data";
import { formatDate, formatDay, formatMonth, formatRange } from "@/lib/format";
import { IconPin } from "@/components/ui/Icons";

const typeChip: Record<EventItem["type"], string> = {
  National: "chip-violet",
  International: "chip-orange",
  Junior: "chip-court",
  Para: "chip-violet",
  Education: "",
};

export function EventCard({ event, className }: { event: EventItem; className?: string }) {
  return (
    <Link
      href={`/events/${event.slug}`}
      className={clsx(
        "group relative flex h-full flex-col overflow-hidden rounded-xl border border-line bg-white p-6 transition-[transform,box-shadow,border-color] duration-500 ease-[cubic-bezier(.16,1,.3,1)] hover:-translate-y-1.5 hover:border-violet/40 hover:shadow-[0_24px_50px_-28px_rgba(28,10,58,0.45)]",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="leading-none">
          <span className="font-display block text-6xl font-extrabold text-violet tabular">{formatDay(event.start)}</span>
          <span className="font-display block text-xl font-bold text-muted">{formatMonth(event.start)}</span>
        </div>
        <span className={clsx("chip", typeChip[event.type])}>{event.type}</span>
      </div>
      <h3 className="h-card mt-6 group-hover:text-violet">{event.title}</h3>
      <p className="mt-2 text-sm text-muted">{formatRange(event.start, event.end)}</p>
      <p className="mt-1 flex items-center gap-1.5 text-sm text-muted">
        <IconPin width={16} height={16} /> {event.city}
      </p>
      <div className="mt-auto pt-6">
        {event.entryDeadline ? (
          <p className="text-sm">
            <span className="font-semibold text-court">Entries open</span>
            <span className="text-muted"> until {formatDate(event.entryDeadline)}</span>
          </p>
        ) : (
          <p className="text-sm text-muted">Entry opens soon</p>
        )}
      </div>
      <span aria-hidden className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-orange transition-transform duration-500 group-hover:scale-x-100" />
    </Link>
  );
}
