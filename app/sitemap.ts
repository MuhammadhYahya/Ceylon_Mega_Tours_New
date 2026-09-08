import type { MetadataRoute } from "next";
import { packages } from "@/lib/content/packages";
import { destinations } from "@/lib/content/destinations";
import { site } from "@/lib/site";

const staticRoutes = [
  "",
  "/about",
  "/services",
  "/tours",
  "/destinations",
  "/reviews",
  "/contact",
  "/privacy",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    ...staticRoutes.map((path) => ({
      url: `${site.url}${path}`,
      lastModified: now,
    })),
    ...packages.map((p) => ({
      url: `${site.url}/tours/${p.slug}`,
      lastModified: now,
    })),
    ...destinations.map((d) => ({
      url: `${site.url}/destinations/${d.slug}`,
      lastModified: now,
    })),
  ];
}
