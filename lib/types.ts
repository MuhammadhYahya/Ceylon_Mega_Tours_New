/**
 * Content contract. These types are the boundary between the site and its
 * content source — components import types, never a data source's shape
 * directly. Tours, destinations, services, and reviews are all live Sanity
 * queries now (`lib/sanity/queries.ts`); nothing reads from `lib/content/*`
 * anymore.
 */

export type Media = {
  src: string;
  alt: string;
  /** Present for Sanity-sourced images (from the asset's metadata.lqip). */
  blurDataURL?: string;
};

export type TourPackage = {
  slug: string;
  title: string;
  summary: string;
  category: string;
  /**
   * Optional. When absent, no price is rendered at all — not a placeholder,
   * not "on request". The client has no published prices yet, so the field
   * exists in Sanity and stays empty until they choose to fill it.
   */
  priceUsd?: number;
  duration: string;
  difficulty: string;
  image: Media;
  featured: boolean;
  highlights: string[];
  inclusions: string[];
};

export type Destination = {
  slug: string;
  title: string;
  tag: string;
  summary: string;
  image: Media;
  /** Slugs of TourPackage entries that visit this destination. */
  relatedTourSlugs: string[];
};

export type Review = {
  name: string;
  location?: string;
  rating: 1 | 2 | 3 | 4 | 5;
  quote: string;
  date?: string;
};

export type Service = {
  icon: "compass" | "plane" | "car";
  eyebrow: string;
  title: string;
  summary: string;
  /** Longer copy for the dedicated /services page; the homepage teaser uses `summary` only. */
  details: string[];
};
