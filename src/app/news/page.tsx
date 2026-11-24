import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { NewsExplorer } from "@/components/news/NewsExplorer";

export const metadata: Metadata = {
  title: "News",
  description: "Announcements, results stories and development news from the Bangladesh Badminton Federation.",
};

export default function NewsPage() {
  return (
    <>
      <PageHero title="News" intro="Announcements, match reports and development updates from the federation." />
      <section className="section">
        <div className="wrap">
          <NewsExplorer />
        </div>
      </section>
    </>
  );
}
