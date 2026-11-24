"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { buildIndex, type SearchEntry } from "@/lib/search";
import { IconSearch } from "@/components/ui/Icons";
import { useLenis } from "@/components/providers/SmoothScroll";

const SearchContext = createContext<{ open: () => void }>({ open: () => {} });
export const useSearch = () => useContext(SearchContext);

const suggested = ["Rankings", "Find a club", "National Championships", "Coach zone", "Report a concern"];

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setOpen] = useState(false);
  const open = useCallback(() => setOpen(true), []);
  const lenis = useLenis();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const typing =
        e.target instanceof Element && e.target.closest("input, textarea, select, [contenteditable]");
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || (e.key === "/" && !typing)) {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (isOpen) lenis?.stop();
    else lenis?.start();
  }, [isOpen, lenis]);

  const value = useMemo(() => ({ open }), [open]);

  return (
    <SearchContext.Provider value={value}>
      {children}
      <AnimatePresence>{isOpen && <Palette onClose={() => setOpen(false)} />}</AnimatePresence>
    </SearchContext.Provider>
  );
}

function score(entry: SearchEntry, q: string) {
  const title = entry.title.toLowerCase();
  const terms = q.toLowerCase().split(/\s+/).filter(Boolean);
  let s = 0;
  for (const t of terms) {
    if (title.startsWith(t)) s += 6;
    else if (title.includes(t)) s += 4;
    else if (entry.keywords.includes(t)) s += 2;
    else return 0;
  }
  return s;
}

function Palette({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const index = useMemo(() => buildIndex(), []);
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const results = useMemo(() => {
    if (!q.trim()) return [];
    return index
      .map((e) => ({ e, s: score(e, q) }))
      .filter((r) => r.s > 0)
      .sort((a, b) => b.s - a.s)
      .slice(0, 12)
      .map((r) => r.e);
  }, [q, index]);

  useEffect(() => {
    inputRef.current?.focus();
    const prev = document.activeElement as HTMLElement | null;
    return () => prev?.focus?.();
  }, []);

  const go = (href: string) => {
    onClose();
    router.push(href);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") onClose();
    if (!results.length) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => (a + 1) % results.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => (a - 1 + results.length) % results.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      go(results[active].href);
    }
  };

  useEffect(() => {
    listRef.current?.querySelector<HTMLElement>(`[data-i="${active}"]`)?.scrollIntoView({ block: "nearest" });
  }, [active]);

  return (
    <motion.div
      className="fixed inset-0 z-[120] flex items-start justify-center px-4 pt-[12vh]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onKeyDown={onKeyDown}
    >
      <button aria-label="Close search" className="absolute inset-0 bg-ink/60 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label="Search the site"
        className="relative w-full max-w-2xl overflow-hidden rounded-xl bg-white shadow-[0_40px_80px_-20px_rgba(28,10,58,0.55)]"
        initial={{ y: -24, scale: 0.97 }}
        animate={{ y: 0, scale: 1 }}
        exit={{ y: -12, scale: 0.98 }}
        transition={{ type: "spring", stiffness: 420, damping: 34 }}
      >
        <div className="flex items-center gap-3 border-b border-line px-5">
          <IconSearch className="shrink-0 text-muted" />
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setActive(0);
            }}
            placeholder="Search players, events, news, pages…"
            className="h-16 w-full bg-transparent text-lg outline-none placeholder:text-muted/70"
            role="combobox"
            aria-expanded={results.length > 0}
            aria-controls="search-results"
            aria-activedescendant={results.length ? `sr-${active}` : undefined}
          />
          <kbd className="hidden rounded border border-line px-2 py-0.5 text-xs text-muted sm:block">Esc</kbd>
        </div>

        <div className="max-h-[55vh] overflow-y-auto" data-lenis-prevent>
          {!q.trim() ? (
            <div className="p-5">
              <p className="mb-3 text-sm text-muted">Popular searches</p>
              <div className="flex flex-wrap gap-2">
                {suggested.map((s) => (
                  <button key={s} className="chip hover:border-violet hover:text-violet" onClick={() => setQ(s)}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ) : results.length === 0 ? (
            <p className="p-6 text-muted">
              Nothing matches “{q}”. Try a player surname, a city or an event name.
            </p>
          ) : (
            <ul id="search-results" role="listbox" ref={listRef} className="p-2">
              {results.map((r, i) => (
                <li key={r.href + r.title} id={`sr-${i}`} role="option" aria-selected={i === active} data-i={i}>
                  <button
                    className={`flex w-full items-center justify-between gap-4 rounded-lg px-4 py-3 text-left transition-colors ${
                      i === active ? "bg-violet text-white" : "hover:bg-paper"
                    }`}
                    onMouseEnter={() => setActive(i)}
                    onClick={() => go(r.href)}
                  >
                    <span className="min-w-0">
                      <span className="block truncate font-semibold">{r.title}</span>
                      {r.hint && (
                        <span className={`block truncate text-sm ${i === active ? "text-white/75" : "text-muted"}`}>
                          {r.hint}
                        </span>
                      )}
                    </span>
                    <span
                      className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                        i === active ? "bg-white/15 text-white" : "bg-paper-2 text-muted"
                      }`}
                    >
                      {r.kind}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="hidden items-center gap-4 border-t border-line px-5 py-3 text-xs text-muted sm:flex">
          <span>
            <kbd className="font-sans">↑ ↓</kbd> to move
          </span>
          <span>
            <kbd className="font-sans">Enter</kbd> to open
          </span>
          <span className="ml-auto">
            Open anywhere with <kbd className="font-sans">Ctrl K</kbd> or <kbd className="font-sans">/</kbd>
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}
