const fmt = (opts: Intl.DateTimeFormatOptions) =>
  new Intl.DateTimeFormat("en-GB", { timeZone: "UTC", ...opts });

const day = fmt({ day: "numeric" });
const dayMonth = fmt({ day: "numeric", month: "short" });
const full = fmt({ day: "numeric", month: "short", year: "numeric" });
const monthShort = fmt({ month: "short" });
const monthYear = fmt({ month: "long", year: "numeric" });

const d = (iso: string) => new Date(`${iso}T00:00:00Z`);

export const formatDate = (iso: string) => full.format(d(iso));
export const formatMonth = (iso: string) => monthShort.format(d(iso));
export const formatDay = (iso: string) => day.format(d(iso));
export const formatMonthYear = (iso: string) => monthYear.format(d(iso));

export function formatRange(start: string, end: string) {
  const a = d(start);
  const b = d(end);
  if (start === end) return full.format(a);
  if (a.getUTCMonth() === b.getUTCMonth() && a.getUTCFullYear() === b.getUTCFullYear()) {
    return `${day.format(a)}–${full.format(b)}`;
  }
  return `${dayMonth.format(a)} – ${full.format(b)}`;
}

export const initials = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0])
    .join("")
    .toUpperCase();
