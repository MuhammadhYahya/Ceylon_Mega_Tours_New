import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Next.js 16 replaces the experimental `ppr` flag with Cache Components.
  // Static shell is prerendered; Sanity-backed data is cached via `use cache`
  // and refreshed by tag, so pages stay static without going stale.
  cacheComponents: true,

  images: {
    // Sanity's CDN is the only remote source we serve images from.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/images/**",
      },
    ],
    formats: ["image/avif", "image/webp"],

    // Our largest rendered image is ~1260 CSS px (the hero at 45vw on a wide
    // screen at 2x DPR). The default list runs to 3840w, so every srcSet in the
    // HTML carried candidates no layout could ever select.
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [256, 384],
  },

  // The previous site served /ru and /en. The rebuild is Russian-only at the
  // root, so preserve whatever equity those URLs have instead of 404ing them.
  async redirects() {
    return [
      { source: "/ru", destination: "/", permanent: true },
      { source: "/ru/:path*", destination: "/:path*", permanent: true },
      { source: "/en", destination: "/", permanent: true },
      { source: "/en/:path*", destination: "/:path*", permanent: true },
    ];
  },
};

export default nextConfig;
