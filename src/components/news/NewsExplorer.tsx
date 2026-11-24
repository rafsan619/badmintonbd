"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { newsItems, type NewsItem } from "@/lib/data";
import { formatDate } from "@/lib/format";

const cats: ("All" | NewsItem["category"])[] = ["All", "Events", "Results", "Development", "Integrity", "Federation"];

export function NewsExplorer() {
  const [cat, setCat] = useState<(typeof cats)[number]>("All");
  const list = newsItems.filter((n) => cat === "All" || n.category === cat);

  return (
    <div>
      <div role="group" aria-label="Filter by topic" className="no-scrollbar -mx-1 flex w-fit max-w-full overflow-x-auto rounded-full bg-white p-1 shadow-[inset_0_0_0_1px_var(--bbf-line)]">
        {cats.map((c) => (
          <button key={c} aria-pressed={cat === c} onClick={() => setCat(c)} className="pill shrink-0">
            {cat === c && (
              <motion.span layoutId="news-cat" className="absolute inset-0 rounded-full bg-violet" transition={{ type: "spring", stiffness: 500, damping: 40 }} />
            )}
            <span className="relative">{c}</span>
          </button>
        ))}
      </div>

      <motion.ul layout className="mt-10 grid gap-x-6 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {list.map((n, i) => (
            <motion.li
              layout
              key={n.slug}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className={i === 0 && cat === "All" ? "md:col-span-2" : ""}
            >
              <Link href={`/news/${n.slug}`} className="group block">
                <div className={`img-zoom relative overflow-hidden rounded-xl ${i === 0 && cat === "All" ? "aspect-[16/9]" : "aspect-[4/3]"}`}>
                  <Image src={n.image} alt="" fill sizes="(max-width:768px) 100vw, 50vw" className="object-cover" />
                </div>
                <p className="mt-4 flex flex-wrap gap-3 text-sm">
                  <span className="font-semibold text-violet">{n.category}</span>
                  <time dateTime={n.date} className="text-muted">{formatDate(n.date)}</time>
                </p>
                <h2 className="h-card mt-1 group-hover:text-violet">
                  <span className="link-underline">{n.title}</span>
                </h2>
                <p className="mt-2 text-muted">{n.excerpt}</p>
              </Link>
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
      {list.length === 0 && <p className="mt-6 text-muted">No stories in this topic yet.</p>}
    </div>
  );
}
