/**
 * Content contract. These types are the boundary between the site and its
 * content source. `lib/content/*` implements them from local data today;
 * `lib/sanity/queries.ts` will implement the exact same shapes once the
 * Sanity project is connected, so no component has to change.
 */

export type Media = {
  src: string;
  alt: string;
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
  slug: string;
  icon: "compass" | "plane" | "car";
  eyebrow: string;
  title: string;
  summary: string;
  /** Longer copy for the dedicated /services page; the homepage teaser uses `summary` only. */
  details: string[];
};
