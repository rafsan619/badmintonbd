import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { Gallery } from "@/components/media/Gallery";

export const metadata: Metadata = {
  title: "Photos and video",
  description: "Photo galleries from Bangladesh badminton events, squad camps and development programmes.",
};

export default function MediaPage() {
  return (
    <>
      <PageHero title="Photos and video" intro="Pictures from national events, squad camps and community sessions. Select any photo to view it full screen.">
        <div className="on-dark flex flex-wrap gap-3">
          <a href="https://www.youtube.com/" target="_blank" rel="noreferrer" className="btn btn-outline">
            Watch on YouTube
          </a>
          <Link href="/contact#media" className="btn btn-outline">
            Request photos for publication
          </Link>
        </div>
      </PageHero>
      <section className="section">
        <div className="wrap">
          <Gallery />
        </div>
      </section>
    </>
  );
}
