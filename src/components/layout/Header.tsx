"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";
import { navLinks } from "@/lib/data";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const overHomeHero = pathname === "/" && !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={clsx(
        "fixed inset-x-0 top-0 z-40 transition-all duration-300",
        scrolled
          ? "nav-blur py-2"
          : overHomeHero
            ? "bg-gradient-to-b from-black/65 via-black/35 to-transparent py-4"
            : "bg-transparent py-4",
      )}
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-4 md:px-8">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/images/bbf-logo.png"
            alt="BBF logo"
            width={48}
            height={60}
            className="h-12"
            style={{ width: "auto" }}
            priority
          />
          <div className="hidden leading-tight sm:block">
            <p
              className={clsx(
                "text-[0.95rem] font-medium tracking-tight transition-colors",
                overHomeHero ? "!text-white" : "text-bbf-purple",
              )}
            >
              Bangladesh Badminton
            </p>
            <p
              className={clsx(
                "eyebrow !normal-case !tracking-[0.08em] transition-colors",
                overHomeHero && "!text-white/75",
              )}
            >
              Federation
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={clsx(
                "text-sm transition-colors",
                pathname === link.href
                  ? overHomeHero
                    ? "!text-white"
                    : "text-bbf-orange"
                  : overHomeHero
                    ? "!text-white/85 hover:!text-white"
                    : "text-bbf-ink-soft hover:text-bbf-ink",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/contact" className="btn btn-primary hidden sm:inline-flex">
            Join / Contact
          </Link>
          <button
            type="button"
            aria-label="Toggle menu"
            className={clsx(
              "inline-flex h-11 w-11 items-center justify-center rounded-full border lg:hidden",
              overHomeHero ? "border-white/40" : "border-bbf-line",
            )}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="relative block h-3 w-5">
              <span
                className={clsx(
                  "absolute left-0 h-[1.5px] w-full transition-all",
                  overHomeHero ? "bg-white" : "bg-bbf-ink",
                  open ? "top-1.5 rotate-45" : "top-0",
                )}
              />
              <span
                className={clsx(
                  "absolute left-0 top-1.5 h-[1.5px] w-full transition-opacity",
                  overHomeHero ? "bg-white" : "bg-bbf-ink",
                  open && "opacity-0",
                )}
              />
              <span
                className={clsx(
                  "absolute left-0 h-[1.5px] w-full transition-all",
                  overHomeHero ? "bg-white" : "bg-bbf-ink",
                  open ? "top-1.5 -rotate-45" : "top-3",
                )}
              />
            </span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="nav-blur mx-4 mt-3 rounded-2xl border border-bbf-line p-5 lg:hidden"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={clsx(
                    "text-lg",
                    pathname === link.href ? "text-bbf-orange" : "text-bbf-ink",
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/contact"
                className="btn btn-primary mt-2"
                onClick={() => setOpen(false)}
              >
                Join / Contact
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
