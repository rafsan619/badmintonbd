import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // A package-lock.json in a parent folder otherwise makes Turbopack pick the wrong root.
  turbopack: {
    root: path.resolve(__dirname),
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "images.pexels.com" },
    ],
  },
  async redirects() {
    return [{ source: "/athletes", destination: "/players", permanent: true }];
  },
};

export default nextConfig;
