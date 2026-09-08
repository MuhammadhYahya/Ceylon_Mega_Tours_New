import { cacheLife, cacheTag } from "next/cache";
import { sanityClient } from "@/lib/sanity/client";
import type { Review } from "@/lib/types";

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
