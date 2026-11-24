import { navGroups } from "./nav";
import { events, newsItems, players, divisions, disciplineNames } from "./data";
import { clubs, documents } from "./org";
import { formatDate, formatRange } from "./format";

export type SearchEntry = {
  title: string;
  href: string;
  kind: "Page" | "Event" | "News" | "Player" | "Club" | "Document";
  hint?: string;
  keywords: string;
};

export function buildIndex(): SearchEntry[] {
  const out: SearchEntry[] = [];
  const seen = new Set<string>();

  for (const g of navGroups) {
    for (const l of g.links) {
      if (seen.has(l.href)) continue;
      seen.add(l.href);
      out.push({
        title: l.label,
        href: l.href,
        kind: "Page",
        hint: l.description,
        keywords: `${g.label} ${l.description ?? ""}`.toLowerCase(),
      });
    }
  }
  out.push({ title: "Contact the federation", href: "/contact", kind: "Page", hint: "Office, departments and FAQs", keywords: "email phone address faq" });
  out.push({ title: "Report a concern", href: "/integrity#report", kind: "Page", hint: "Confidential integrity reporting", keywords: "safeguarding whistleblower complaint" });

  for (const e of events) {
    out.push({
      title: e.title,
      href: `/events/${e.slug}`,
      kind: "Event",
      hint: `${formatRange(e.start, e.end)}, ${e.city}`,
      keywords: `${e.type} ${e.city} ${e.venue} ${e.categories.join(" ")}`.toLowerCase(),
    });
  }
  for (const n of newsItems) {
    out.push({
      title: n.title,
      href: `/news/${n.slug}`,
      kind: "News",
      hint: formatDate(n.date),
      keywords: `${n.category} ${n.excerpt}`.toLowerCase(),
    });
  }
  for (const p of players) {
    out.push({
      title: p.name,
      href: `/players/${p.slug}`,
      kind: "Player",
      hint: `${p.squad} squad, ${p.disciplines.map((d) => disciplineNames[d]).join(", ")}`,
      keywords: `${p.division} ${p.club} ${p.disciplines.join(" ")}`.toLowerCase(),
    });
  }
  for (const c of clubs) {
    out.push({
      title: c.name,
      href: `/play?division=${c.division}#clubs`,
      kind: "Club",
      hint: c.city,
      keywords: `${c.division} club`.toLowerCase(),
    });
  }
  for (const d of documents) {
    out.push({
      title: d.title,
      href: "/governance#documents",
      kind: "Document",
      hint: `${d.type}, ${d.year}`,
      keywords: `${d.type} pdf download`.toLowerCase(),
    });
  }
  for (const d of divisions) {
    out.push({ title: `Clubs in ${d}`, href: `/play?division=${d}#clubs`, kind: "Club", keywords: "division find club" });
  }
  return out;
}
