"use server";

import { revalidateTag } from "next/cache";
import { getWriteClient } from "@/lib/sanity/client";
import { verifyTurnstile } from "@/lib/turnstile";

export type ReviewState = {
  error?: string;
  success?: boolean;
};

/**
 * Guest reviews publish immediately — there is no approval queue. A
 * pre-moderation step would let the client hold back negative reviews
 * without any visitor being able to tell, which undermines the whole point
 * of showing reviews at all. The client's role is reactive: remove spam or
 * abuse from Studio after the fact, never gate on sentiment beforehand.
 *
 * Because publishing is instant, this route needs a real bot check — a
 * honeypot alone isn't enough once junk becomes visible to every visitor
 * the moment it's submitted. Turnstile is verified before anything is
 * written.
 */
export async function submitReview(
  _prevState: ReviewState,
  formData: FormData
): Promise<ReviewState> {
  // Honeypot: real visitors never fill this field. A bot that does gets a
  // silent "success" — telling it otherwise only teaches it to adapt.
  if (formData.get("company")) {
    return { success: true };
  }

  const turnstileToken = formData.get("cf-turnstile-response");
  const verified = await verifyTurnstile(
    typeof turnstileToken === "string" ? turnstileToken : null
  );
  if (!verified) {
    return { error: "Не удалось подтвердить, что вы не робот. Попробуйте ещё раз." };
  }

  const name = String(formData.get("name") ?? "").trim();
  const location = String(formData.get("location") ?? "").trim();
  const rating = Number(formData.get("rating"));
  const quote = String(formData.get("quote") ?? "").trim();

  if (!name) return { error: "Укажите, пожалуйста, ваше имя." };
  if (!rating || rating < 1 || rating > 5) {
    return { error: "Поставьте оценку от 1 до 5 звёзд." };
  }
  if (!quote) return { error: "Напишите, пожалуйста, несколько слов о поездке." };

  const client = getWriteClient();
  await client.create({
    _type: "review",
    name,
    location: location || undefined,
    rating,
    quote,
    date: new Date().toISOString().slice(0, 10),
    source: "Сайт",
    published: true,
  });

  // The reviews list is cached (`cacheTag("reviews")` in
  // lib/sanity/queries.ts); without this the new review wouldn't appear
  // until the cache window naturally expired.
  revalidateTag("reviews", "max");

  return { success: true };
}
