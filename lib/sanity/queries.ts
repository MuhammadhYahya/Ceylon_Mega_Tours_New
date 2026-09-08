import { cacheLife, cacheTag } from "next/cache";
import { sanityClient } from "@/lib/sanity/client";
import type { Destination, Review, Service, TourPackage } from "@/lib/types";

/**
 * Guest-submitted reviews publish immediately (see app/reviews/actions.ts) —
 * there is no moderation queue to bypass here. A brand new review may take
 * up to the cache window below to appear for *other* visitors browsing
 * concurrently; the submitter's own thank-you confirmation is immediate
 * regardless, since that comes from the action's return value, not a re-fetch.
 */
export async function getPublishedReviews(): Promise<Review[]> {
  "use cache";
  cacheTag("reviews");
  cacheLife("hours");

  return sanityClient.fetch<Review[]>(
    `*[_type == "review" && published == true] | order(date desc){
      name,
      location,
      rating,
      quote,
      date
    }`
  );
}

// Shared image projection: the CDN URL doubles as `Media.src` (next/image
// accepts it directly, since cdn.sanity.io is already an allowed remote
// pattern), and `metadata.lqip` supplies the blur placeholder — same role
// `lib/content/blur.json` plays for the couple of images that are still
// local (the homepage hero, the About page photo).
const IMAGE_PROJECTION = `
  "src": image.asset->url,
  "alt": image.alt,
  "blurDataURL": image.asset->metadata.lqip
`;

export async function getTourPackages(): Promise<TourPackage[]> {
  "use cache";
  cacheTag("tours");
  cacheLife("hours");

  return sanityClient.fetch<TourPackage[]>(
    `*[_type == "tourPackage"] | order(order asc){
      "slug": slug.current,
      title,
      summary,
      category,
      priceUsd,
      duration,
      difficulty,
      "image": {${IMAGE_PROJECTION}},
      featured,
      highlights,
      inclusions
    }`
  );
}

export async function getTourPackageBySlug(slug: string): Promise<TourPackage | undefined> {
  "use cache";
  cacheTag("tours");
  cacheLife("hours");

  const result = await sanityClient.fetch<TourPackage | null>(
    `*[_type == "tourPackage" && slug.current == $slug][0]{
      "slug": slug.current,
      title,
      summary,
      category,
      priceUsd,
      duration,
      difficulty,
      "image": {${IMAGE_PROJECTION}},
      featured,
      highlights,
      inclusions
    }`,
    { slug }
  );
  return result ?? undefined;
}

export async function getDestinations(): Promise<Destination[]> {
  "use cache";
  cacheTag("destinations");
  cacheLife("hours");

  return sanityClient.fetch<Destination[]>(
    `*[_type == "destination"] | order(order asc){
      "slug": slug.current,
      title,
      tag,
      summary,
      "image": {${IMAGE_PROJECTION}},
      "relatedTourSlugs": relatedTours[]->slug.current
    }`
  );
}

export async function getDestinationBySlug(slug: string): Promise<Destination | undefined> {
  "use cache";
  cacheTag("destinations");
  cacheLife("hours");

  const result = await sanityClient.fetch<Destination | null>(
    `*[_type == "destination" && slug.current == $slug][0]{
      "slug": slug.current,
      title,
      tag,
      summary,
      "image": {${IMAGE_PROJECTION}},
      "relatedTourSlugs": relatedTours[]->slug.current
    }`,
    { slug }
  );
  return result ?? undefined;
}

export async function getServices(): Promise<Service[]> {
  "use cache";
  cacheTag("services");
  cacheLife("hours");

  return sanityClient.fetch<Service[]>(
    `*[_type == "service"] | order(order asc){
      icon,
      eyebrow,
      title,
      "summary": description,
      details
    }`
  );
}
