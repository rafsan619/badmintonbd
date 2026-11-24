import type { Metadata, Viewport } from "next";
import { Big_Shoulders, Hind_Siliguri } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { BackToTop } from "@/components/ui/BackToTop";
import { SearchProvider } from "@/components/search/SearchProvider";
import "./globals.css";

const display = Big_Shoulders({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
  // next/font has no metrics for Big Shoulders, so skip the auto-adjusted fallback
  // and fall back to a condensed system face instead.
  adjustFontFallback: false,
  fallback: ["Arial Narrow", "Roboto Condensed", "sans-serif"],
});

const body = Hind_Siliguri({
  variable: "--font-body",
  subsets: ["latin", "bengali"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://badmintonbd.org"),
  title: {
    default: "Bangladesh Badminton Federation",
    template: "%s | Bangladesh Badminton Federation",
  },
  description:
    "Official site of the Bangladesh Badminton Federation: national calendar, results, rankings, national squad, clubs, coaching, integrity and governance.",
  openGraph: {
    type: "website",
    siteName: "Bangladesh Badminton Federation",
    images: ["/images/bbf-logo.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#1c0a3a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="min-h-screen">
        <a
          href="#main"
          className="fixed left-4 top-4 z-[200] -translate-y-24 rounded-md bg-orange px-4 py-3 font-semibold text-ink transition-transform focus:translate-y-0"
        >
          Skip to content
        </a>
        <SmoothScroll>
          <SearchProvider>
            <ScrollProgress />
            <Header />
            <main id="main" tabIndex={-1} className="outline-none">
              {children}
            </main>
            <Footer />
            <BackToTop />
          </SearchProvider>
        </SmoothScroll>
      </body>
    </html>
  );
}
