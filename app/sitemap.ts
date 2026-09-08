import type { MetadataRoute } from "next";
import { getTourPackages, getDestinations } from "@/lib/sanity/queries";
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

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const [packages, destinations] = await Promise.all([getTourPackages(), getDestinations()]);

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
