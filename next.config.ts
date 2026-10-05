import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // The gallery's placeholder nature photos come from the Unsplash CDN.
    // Swap this entry when real DCC event photos are hosted elsewhere.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
