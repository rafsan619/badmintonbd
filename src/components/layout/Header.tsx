"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";
import { navGroups, utilityLinks, type NavGroup } from "@/lib/nav";
import { useSearch } from "@/components/search/SearchProvider";
import { useLenis } from "@/components/providers/SmoothScroll";
import { IconChevron, IconSearch } from "@/components/ui/Icons";

const isActive = (pathname: string, g: NavGroup) =>
  g.links.some((l) => {
    const base = l.href.split("#")[0];
    return base !== "/" && (pathname === base || pathname.startsWith(`${base}/`));
  });

export function Header() {
  const pathname = usePathname();
  const { open: openSearch } = useSearch();
  const lenis = useLenis();
  const [menu, setMenu] = useState<number | null>(null);
  const [mobile, setMobile] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const closeTimer = useRef<number | undefined>(undefined);
  const headerRef = useRef<HTMLElement>(null);

  const overHero = pathname === "/" && !scrolled && menu === null && !mobile;

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      if (Math.abs(y - last) > 6) {
        setHidden(y > last && y > 400);
        last = y;
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menus on navigation.
  const [prevPath, setPrevPath] = useState(pathname);
  if (prevPath !== pathname) {
    setPrevPath(pathname);
    setMenu(null);
    setMobile(false);
  }

  useEffect(() => {
    if (mobile) lenis?.stop();
    else lenis?.start();
    document.documentElement.style.overflow = mobile ? "hidden" : "";
  }, [mobile, lenis]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenu(null);
        setMobile(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const openMenu = useCallback((i: number) => {
    window.clearTimeout(closeTimer.current);
    setMenu(i);
  }, []);
  const scheduleClose = useCallback(() => {
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setMenu(null), 160);
  }, []);

  return (
    <header
      ref={headerRef}
      className={clsx(
        "fixed inset-x-0 top-0 z-50 transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)]",
        hidden && menu === null && !mobile && "-translate-y-full",
      )}
      onMouseLeave={scheduleClose}
      onBlur={(e) => {
        if (!headerRef.current?.contains(e.relatedTarget as Node)) setMenu(null);
      }}
    >
      {/* Utility bar */}
      <div className="hidden h-9 bg-ink text-[0.8rem] text-white/75 lg:block">
        <div className="wrap flex h-full items-center justify-between">
          <p>
            Member of the Badminton World Federation and Badminton Asia
          </p>
          <ul className="flex items-center gap-6">
            {utilityLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="transition-colors hover:text-orange">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Main bar */}
      <div
        className={clsx(
          "relative transition-[background-color,box-shadow,color] duration-300",
          overHero
            ? "bg-transparent text-white"
            : "bg-white/92 text-ink shadow-[0_1px_0_var(--bbf-line)] backdrop-blur-xl",
        )}
      >
        {overHero && (
          <div className="pointer-events-none absolute inset-0 -bottom-10 bg-gradient-to-b from-ink/70 to-transparent" />
        )}
        <div className="wrap relative flex h-[76px] items-center gap-6">
          <Link href="/" className="flex shrink-0 items-center gap-3" aria-label="Bangladesh Badminton Federation, home">
            <Image
              src="/images/bbf-logo.png"
              alt=""
              width={44}
              height={61}
              priority
              className="h-[52px] w-auto"
            />
            <span className="hidden leading-none sm:block lg:hidden xl:block">
              <span className="font-display block text-[1.3rem] font-extrabold tracking-wide">
                Bangladesh Badminton Federation
              </span>
              <span lang="bn" className={clsx("mt-1 block text-[0.85rem]", overHero ? "text-white/70" : "text-muted")}>
                বাংলাদেশ ব্যাডমিন্টন ফেডারেশন
              </span>
            </span>
          </Link>

          <nav aria-label="Main" className="ml-auto hidden lg:block">
            <ul className="flex items-center">
              {navGroups.map((g, i) => {
                const active = isActive(pathname, g);
                return (
                  <li key={g.label} onMouseEnter={() => openMenu(i)}>
                    <button
                      type="button"
                      aria-expanded={menu === i}
                      aria-controls="mega-menu"
                      onClick={() => setMenu((m) => (m === i ? null : i))}
                      onFocus={() => menu !== null && openMenu(i)}
                      className={clsx(
                        "relative flex items-center gap-1 px-3.5 py-6 text-[0.95rem] font-semibold transition-colors",
                        overHero ? "text-white/90 hover:text-white" : "hover:text-violet",
                        active && !overHero && "text-violet",
                      )}
                    >
                      {g.label}
                      <IconChevron
                        width={15}
                        height={15}
                        className={clsx("transition-transform duration-300", menu === i && "rotate-180")}
                      />
                      {(menu === i || (active && menu === null)) && (
                        <motion.span
                          layoutId="nav-indicator"
                          className="absolute inset-x-3.5 bottom-0 h-[3px] bg-orange"
                          transition={{ type: "spring", stiffness: 500, damping: 40 }}
                        />
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="ml-auto flex items-center gap-2 lg:ml-2">
            <button
              type="button"
              onClick={openSearch}
              className={clsx(
                "flex h-11 items-center gap-2 rounded-md border px-3 text-sm transition-colors",
                overHero ? "border-white/30 hover:bg-white/10" : "border-line hover:border-violet",
              )}
              aria-label="Search the site"
            >
              <IconSearch width={18} height={18} />
              <kbd className={clsx("hidden font-sans text-xs xl:inline", overHero ? "text-white/60" : "text-muted")}>
                Ctrl K
              </kbd>
            </button>
            <Link href="/membership" className="btn btn-primary hidden !min-h-11 md:inline-flex">
              Register
            </Link>
            <button
              type="button"
              className={clsx(
                "flex h-11 w-11 items-center justify-center rounded-md border lg:hidden",
                overHero ? "border-white/30" : "border-line",
              )}
              aria-label={mobile ? "Close menu" : "Open menu"}
              aria-expanded={mobile}
              onClick={() => setMobile((v) => !v)}
            >
              <span className="relative block h-3.5 w-5" aria-hidden>
                <span className={clsx("absolute left-0 h-0.5 w-full bg-current transition-all duration-300", mobile ? "top-1.5 rotate-45" : "top-0")} />
                <span className={clsx("absolute left-0 top-1.5 h-0.5 w-full bg-current transition-opacity", mobile && "opacity-0")} />
                <span className={clsx("absolute left-0 h-0.5 w-full bg-current transition-all duration-300", mobile ? "top-1.5 -rotate-45" : "top-3")} />
              </span>
            </button>
          </div>
        </div>

        {/* Desktop mega menu */}
        <AnimatePresence>
          {menu !== null && (
            <motion.div
              id="mega-menu"
              key="mega"
              initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
              animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
              exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-x-0 top-full hidden border-t border-line bg-white text-ink shadow-[0_30px_60px_-30px_rgba(28,10,58,0.4)] lg:block"
              onMouseEnter={() => window.clearTimeout(closeTimer.current)}
            >
              <AnimatePresence mode="wait" initial={false}>
                <MegaPanel key={menu} group={navGroups[menu]} />
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>{mobile && <MobileMenu pathname={pathname} onSearch={openSearch} />}</AnimatePresence>
    </header>
  );
}

function MegaPanel({ group }: { group: NavGroup }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 12 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -12 }}
      transition={{ duration: 0.22 }}
      className="wrap grid grid-cols-[1fr_2fr_1.2fr] gap-10 py-10"
    >
      <div>
        <p className="h-card text-[2.2rem] text-violet">{group.label}</p>
        <p className="mt-3 max-w-xs text-muted">{group.intro}</p>
        <Link href={group.href} className="mt-5 inline-block font-semibold text-violet link-underline">
          Go to {group.label.toLowerCase()} overview
        </Link>
      </div>
      <ul className="grid grid-cols-2 content-start gap-x-8 gap-y-1">
        {group.links.map((l, i) => (
          <motion.li
            key={l.href}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.04 * i + 0.05, duration: 0.3 }}
          >
            <Link href={l.href} className="group block rounded-lg px-4 py-3 transition-colors hover:bg-paper">
              <span className="block font-semibold text-ink group-hover:text-violet">{l.label}</span>
              {l.description && <span className="block text-sm text-muted">{l.description}</span>}
            </Link>
          </motion.li>
        ))}
      </ul>
      {group.feature ? (
        <Link href={group.feature.href} className="group relative block min-h-[200px] overflow-hidden rounded-lg">
          <span className="img-zoom absolute inset-0">
            <Image src={group.feature.image} alt="" fill sizes="400px" className="object-cover" />
          </span>
          <span className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-transparent" />
          <span className="absolute inset-x-0 bottom-0 p-5 text-white">
            <span className="block font-semibold leading-snug">{group.feature.title}</span>
            <span className="mt-2 inline-block text-sm text-orange link-underline">{group.feature.cta}</span>
          </span>
        </Link>
      ) : (
        <div className="rounded-lg bg-paper p-6">
          <p className="font-semibold">Can’t find something?</p>
          <p className="mt-1 text-sm text-muted">Search covers every player, event, club and document.</p>
          <p className="mt-4 text-sm text-muted">
            Press <kbd className="rounded border border-line bg-white px-1.5">Ctrl K</kbd> anywhere.
          </p>
        </div>
      )}
    </motion.div>
  );
}

function MobileMenu({ pathname, onSearch }: { pathname: string; onSearch: () => void }) {
  const [openGroup, setOpenGroup] = useState<number | null>(() => {
    const i = navGroups.findIndex((g) => isActive(pathname, g));
    return i >= 0 ? i : null;
  });

  return (
    <motion.div
      className="fixed inset-x-0 bottom-0 top-[76px] z-40 overflow-y-auto bg-ink text-white lg:hidden"
      initial={{ clipPath: "circle(0% at 100% 0%)" }}
      animate={{ clipPath: "circle(150% at 100% 0%)" }}
      exit={{ clipPath: "circle(0% at 100% 0%)" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      data-lenis-prevent
    >
      <div className="wrap py-6">
        <button
          onClick={onSearch}
          className="mb-6 flex w-full items-center gap-3 rounded-md border border-white/20 px-4 py-3.5 text-left text-white/70"
        >
          <IconSearch /> Search players, events, clubs…
        </button>
        <ul>
          {navGroups.map((g, i) => (
            <motion.li
              key={g.label}
              className="border-b border-white/10"
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.12 + i * 0.05, duration: 0.4 }}
            >
              <button
                className="flex w-full items-center justify-between py-4 text-left"
                aria-expanded={openGroup === i}
                onClick={() => setOpenGroup((o) => (o === i ? null : i))}
              >
                <span className="h-card text-[2rem]">{g.label}</span>
                <span className={clsx("transition-transform duration-300", openGroup === i && "rotate-180")}>
                  <IconChevron />
                </span>
              </button>
              <AnimatePresence initial={false}>
                {openGroup === i && (
                  <motion.ul
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    {g.links.map((l) => (
                      <li key={l.href}>
                        <Link href={l.href} className="block py-2.5 pl-1 text-white/80 hover:text-orange">
                          {l.label}
                        </Link>
                      </li>
                    ))}
                    <li className="h-4" />
                  </motion.ul>
                )}
              </AnimatePresence>
            </motion.li>
          ))}
        </ul>
        <div className="mt-8 flex flex-col gap-3 on-dark">
          <Link href="/membership" className="btn btn-primary">
            Register as a player or club
          </Link>
          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/70">
            {utilityLinks.map((l) => (
              <Link key={l.href} href={l.href} className="hover:text-orange">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
