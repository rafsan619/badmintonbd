import Image from "next/image";
import Link from "next/link";
import { navLinks } from "@/lib/data";

export function Footer() {
  return (
    <footer className="border-t border-bbf-line bg-[#ebe7e1]">
      <div className="mx-auto grid max-w-[1400px] gap-10 px-4 py-14 md:grid-cols-[1.4fr_1fr_1fr] md:px-8">
        <div>
          <div className="flex items-center gap-3">
            <Image src="/images/bbf-logo.png" alt="BBF" width={56} height={70} />
            <div>
              <p className="text-lg font-medium text-bbf-purple">
                Bangladesh Badminton Federation
              </p>
              <p className="eyebrow mt-1">Governing body for badminton in Bangladesh</p>
            </div>
          </div>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-bbf-ink-soft">
            Fostering competitive excellence, athlete pathways, and nationwide access to the
            sport — from local clubs to international podiums.
          </p>
        </div>

        <div>
          <p className="eyebrow mb-4">Explore</p>
          <ul className="space-y-2 text-sm">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-bbf-orange">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="eyebrow mb-4">Contact</p>
          <ul className="space-y-2 text-sm text-bbf-ink-soft">
            <li>Dhaka, Bangladesh</li>
            <li>
              <a href="mailto:info@badmintonbd.org" className="hover:text-bbf-orange">
                info@badmintonbd.org
              </a>
            </li>
            <li>Member of BWF / BAC</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-bbf-line px-4 py-5 text-center text-xs text-bbf-ink-soft md:px-8">
        © {new Date().getFullYear()} Bangladesh Badminton Federation. All rights reserved.
      </div>
    </footer>
  );
}
