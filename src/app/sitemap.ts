import type { MetadataRoute } from "next";
import { events, newsItems, players } from "@/lib/data";

const base = "https://badmintonbd.org";
const pages = [
  "", "/play", "/rules", "/events", "/results", "/rankings", "/players", "/membership", "/coaching",
  "/partners", "/about", "/governance", "/integrity", "/news", "/media", "/contact",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...pages.map((p) => ({ url: `${base}${p}`, changeFrequency: "weekly" as const, priority: p === "" ? 1 : 0.7 })),
    ...events.map((e) => ({ url: `${base}/events/${e.slug}`, priority: 0.6 })),
    ...newsItems.map((n) => ({ url: `${base}/news/${n.slug}`, lastModified: n.date, priority: 0.5 })),
    ...players.map((p) => ({ url: `${base}/players/${p.slug}`, priority: 0.5 })),
  ];
}
