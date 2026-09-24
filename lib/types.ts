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

/**
 * An icon chosen in Sanity. `id` indexes `lib/tourIcons.tsx`; `image` is the
 * editor's own artwork and takes precedence when both are set. Both absent
 * means a neutral default is drawn.
 */
export type TourIcon = {
  id?: string;
  image?: Media;
};

/** One card on the tour programme path. */
export type TourStep = {
  title: string;
  subtitle?: string;
  icon?: TourIcon;
  /** Editor-chosen claim pill, e.g. "ТОП ВЫБОР". Never derived from position. */
  badge?: string;
  /** Groups steps under a shared heading on multi-day tours, e.g. "День 1". */
  day?: string;
};

/** One card in "Что включено". */
export type TourInclusion = {
  text: string;
  icon?: TourIcon;
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
  /** Optional. Empty or absent means no audience tags are rendered. */
  suitableFor?: string[];
  image: Media;
  /**
   * Optional extra photos, shown as a filmstrip under the main photo on the
   * tour detail page. Absent or empty means the main photo is shown alone,
   * with no filmstrip — only the detail query fetches this.
   */
  gallery?: Media[];
  featured: boolean;
  /**
   * Legacy plain-text programme. Still rendered, but only when `programme`
   * is empty — see `resolveSteps` in the tour detail page.
   */
  highlights: string[];
  /** Legacy plain-text inclusions, superseded by `inclusionItems`. */
  inclusions: string[];
  /** Structured programme. Preferred over `highlights` when present. */
  programme?: TourStep[];
  /** Structured inclusions. Preferred over `inclusions` when present. */
  inclusionItems?: TourInclusion[];
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
