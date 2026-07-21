import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Contact",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Speak with the federation."
        description="Membership, events, media, and partnership enquiries — reach the BBF office."
      />

      <section className="section-pad pt-0">
        <div className="mx-auto grid max-w-[1400px] gap-8 md:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <div className="rounded-2xl border border-bbf-line bg-bbf-white p-8">
              <p className="eyebrow mb-4">Office</p>
              <ul className="space-y-4 text-bbf-ink-soft">
                <li>
                  <span className="block text-bbf-purple">Address</span>
                  Dhaka, Bangladesh
                </li>
                <li>
                  <span className="block text-bbf-purple">Email</span>
                  <a href="mailto:info@badmintonbd.org" className="hover:text-bbf-orange">
                    info@badmintonbd.org
                  </a>
                </li>
                <li>
                  <span className="block text-bbf-purple">Media</span>
                  <a href="mailto:media@badmintonbd.org" className="hover:text-bbf-orange">
                    media@badmintonbd.org
                  </a>
                </li>
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <form className="rounded-2xl border border-bbf-line bg-bbf-white p-8">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block text-sm">
                  <span className="mb-2 block text-bbf-ink-soft">Name</span>
                  <input
                    className="w-full rounded-xl border border-bbf-line bg-bbf-bg px-4 py-3 outline-none focus:border-bbf-orange"
                    name="name"
                    required
                  />
                </label>
                <label className="block text-sm">
                  <span className="mb-2 block text-bbf-ink-soft">Email</span>
                  <input
                    type="email"
                    className="w-full rounded-xl border border-bbf-line bg-bbf-bg px-4 py-3 outline-none focus:border-bbf-orange"
                    name="email"
                    required
                  />
                </label>
              </div>
              <label className="mt-4 block text-sm">
                <span className="mb-2 block text-bbf-ink-soft">Subject</span>
                <input
                  className="w-full rounded-xl border border-bbf-line bg-bbf-bg px-4 py-3 outline-none focus:border-bbf-orange"
                  name="subject"
                  required
                />
              </label>
              <label className="mt-4 block text-sm">
                <span className="mb-2 block text-bbf-ink-soft">Message</span>
                <textarea
                  className="min-h-[140px] w-full rounded-xl border border-bbf-line bg-bbf-bg px-4 py-3 outline-none focus:border-bbf-orange"
                  name="message"
                  required
                />
              </label>
              <button type="submit" className="btn btn-primary mt-6">
                Send message
              </button>
            </form>
          </Reveal>
        </div>
      </section>
    </>
  );
}
