import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Политика конфиденциальности",
  alternates: { canonical: "/privacy" },
};

/**
 * Written to match what this specific site actually does — not generic
 * boilerplate. It is not a substitute for legal review; the client should
 * have this checked before relying on it, especially if the audience or
 * data practices change.
 */
export default function PrivacyPage() {
  return (
    <>
      <PageHero eyebrow="Политика" title="Политика конфиденциальности" />

      <section className="mx-auto max-w-3xl px-5 py-16 md:px-8 md:py-20">
        <div className="space-y-8 text-[0.98rem] leading-relaxed text-ink-700">
          <p>
            Эта страница объясняет, какие данные собирает сайт Ceylon Mega
            Tours ({site.url}), для чего они используются и кто может иметь к
            ним доступ.
          </p>

          <div>
            <h2 className="font-display text-h3 font-semibold text-forest-950">
              Форма запроса
            </h2>
            <p className="mt-3">
              Данные из формы на странице «Запрос» (имя, контакт, email,
              дата прибытия, количество гостей, комментарий) не сохраняются
              на сервере сайта. Форма собирает их в одно сообщение и
              открывает WhatsApp с этим сообщением — дальнейшая переписка
              происходит в WhatsApp и регулируется политикой
              конфиденциальности WhatsApp/Meta.
            </p>
          </div>

          <div>
            <h2 className="font-display text-h3 font-semibold text-forest-950">
              Отзывы
            </h2>
            <p className="mt-3">
              Отправляя отзыв через форму на странице «Отзывы», вы
              соглашаетесь, что указанные имя, город или страна, оценка и
              текст отзыва будут опубликованы на этой странице сразу после
              отправки. Не указывайте в отзыве данные, которые вы не хотите
              делать общедоступными. Отзывы хранятся в базе данных Sanity
              (сервис управления контентом); их можно удалить по запросу —
              напишите на {site.email}.
            </p>
          </div>

          <div>
            <h2 className="font-display text-h3 font-semibold text-forest-950">
              Защита от спама
            </h2>
            <p className="mt-3">
              Форма отзывов защищена сервисом Cloudflare Turnstile, который
              проверяет, что запрос отправлен человеком, а не программой.
              Turnstile может обрабатывать технические данные браузера
              (например, IP-адрес) в этих целях — подробнее в политике
              конфиденциальности Cloudflare.
            </p>
          </div>

          <div>
            <h2 className="font-display text-h3 font-semibold text-forest-950">
              Технические данные
            </h2>
            <p className="mt-3">
              Как и любой сайт, Ceylon Mega Tours получает стандартные
              технические журналы от хостинг-провайдера (например, IP-адрес
              и время запроса) для обеспечения работы и безопасности сайта.
              Сайт не использует рекламные или аналитические cookie.
            </p>
          </div>

          <div>
            <h2 className="font-display text-h3 font-semibold text-forest-950">
              Связь с нами
            </h2>
            <p className="mt-3">
              По любым вопросам о ваших данных пишите на{" "}
              <a
                href={`mailto:${site.email}`}
                className="font-medium text-forest-700 underline underline-offset-4 hover:text-forest-600"
              >
                {site.email}
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
