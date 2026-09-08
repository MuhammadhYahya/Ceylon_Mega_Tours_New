import type { Metadata } from "next";
import { ExternalLink, Star } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import EnquiryCta from "@/components/sections/EnquiryCta";
import ReviewForm from "@/components/forms/ReviewForm";
import { getPublishedReviews } from "@/lib/sanity/queries";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Отзывы",
  description: `Рейтинг ${site.googleRating.toFixed(1)} из 5 на основе отзывов Google о Ceylon Mega Tours.`,
  alternates: { canonical: "/reviews" },
};

const GOOGLE_REVIEWS_URL =
  "https://www.google.com/search?q=Ceylon+Mega+Tours+reviews";

export default async function ReviewsPage() {
  const reviews = await getPublishedReviews();

  return (
    <>
      <PageHero
        eyebrow="Отзывы"
        title="Что говорят гости о поездках с Ceylon Mega Tours"
        lead="Короткие истории, которые отражают доверие, пунктуальность и внимательный, личный стиль сервиса."
      />

      <section className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-20">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
          <div className="reveal h-fit rounded-card border border-sand-300 bg-sand-100 p-9 text-center">
            <div className="flex items-center justify-center gap-3">
              <p className="font-display text-6xl font-semibold leading-none text-forest-950">
                {site.googleRating.toFixed(1)}
              </p>
              <div>
                <div className="flex gap-0.5" aria-hidden="true">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star key={i} size={16} className="fill-ochre-500 text-ochre-500" />
                  ))}
                </div>
                <p className="mt-1.5 text-sm text-ink-500">
                  {site.googleReviewCount}+ отзывов
                </p>
              </div>
            </div>
            <p className="mt-6 text-sm leading-relaxed text-ink-600">
              Рейтинг основан на отзывах из профиля Google Business. Каждый
              отзыв оставлен реальным гостем после поездки.
            </p>
            <a
              href={GOOGLE_REVIEWS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-forest-700 hover:text-forest-600"
            >
              Читать отзывы в Google
              <ExternalLink size={14} aria-hidden="true" />
            </a>
          </div>

          <div className="reveal rounded-card border border-sand-200 bg-sand-50 p-7 shadow-soft md:p-9">
            <h2 className="font-display text-h3 font-semibold text-forest-950">
              Оставить отзыв
            </h2>
            <p className="mt-2 text-sm text-ink-600">
              Отзыв публикуется сразу после отправки — без ожидания
              проверки.
            </p>
            <div className="mt-6">
              <ReviewForm />
            </div>
          </div>
        </div>

        {reviews.length > 0 ? (
          <ul className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {reviews.map((r) => (
              <li
                key={r.name}
                className="rounded-card border border-sand-200 bg-sand-50 p-7"
              >
                <div className="flex gap-0.5" aria-hidden="true">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={
                        i < r.rating
                          ? "fill-ochre-500 text-ochre-500"
                          : "text-sand-300"
                      }
                    />
                  ))}
                </div>
                <p className="mt-4 text-[0.95rem] leading-relaxed text-ink-700">
                  «{r.quote}»
                </p>
                <p className="mt-5 text-sm font-semibold text-forest-900">
                  {r.name}
                  {r.location && (
                    <span className="font-normal text-ink-500"> · {r.location}</span>
                  )}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="reveal mt-14 text-center text-sm text-ink-500">
            Отзывов пока нет — станьте первым, кто поделится впечатлением!
          </p>
        )}
      </section>

      <EnquiryCta />
    </>
  );
}
