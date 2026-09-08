import { Star } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { site } from "@/lib/site";

export default function ReviewsTeaser() {
  return (
    <section id="reviews" className="bg-forest-950 py-20 text-sand-100 md:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 md:px-8 lg:grid-cols-[1.1fr_1fr]">
        <div className="reveal max-w-2xl">
          <p className="text-eyebrow font-semibold uppercase text-ochre-400">
            Опыт гостей
          </p>
          <h2 className="mt-4 font-display text-h2 font-semibold text-sand-50">
            Поездку запоминают за то, насколько она была лёгкой
          </h2>
          <p className="mt-5 text-lead text-sand-200/75">
            Короткие истории, которые отражают доверие, пунктуальность и
            премиальный, но очень личный стиль сервиса.
          </p>
          <div className="mt-9">
            <ButtonLink href="/reviews" variant="invert">
              Читать отзывы
            </ButtonLink>
          </div>
        </div>

        <div className="reveal rounded-card border border-forest-800 bg-forest-900/60 p-9">
          <div className="flex items-baseline gap-3">
            <p className="font-display text-6xl font-semibold leading-none text-sand-50">
              {site.googleRating.toFixed(1)}
            </p>
            <div>
              <div className="flex gap-0.5" aria-hidden="true">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star key={i} size={16} className="fill-ochre-400 text-ochre-400" />
                ))}
              </div>
              <p className="mt-1.5 text-sm text-sand-200/70">
                {site.googleReviewCount}+ отзывов
              </p>
            </div>
          </div>
          <p className="sr-only">
            Средняя оценка {site.googleRating.toFixed(1)} из 5 на основе {site.googleReviewCount} отзывов.
          </p>
          <p className="mt-7 border-t border-forest-800 pt-7 text-[0.95rem] leading-relaxed text-sand-200/80">
            Рейтинг основан на отзывах из нашего профиля Google Business. Каждый
            отзыв был оставлен реальным гостем после его пребывания.
          </p>
        </div>
      </div>
    </section>
  );
}
