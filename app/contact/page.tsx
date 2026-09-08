import type { Metadata } from "next";
import { Mail, MessageCircle, MapPin } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import EnquiryForm from "@/components/forms/EnquiryForm";
import { site, whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Запрос",
  description:
    "Напишите в WhatsApp или отправьте запрос — подберём частный маршрут по Шри-Ланке под ваши даты и предпочтения.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Запрос"
        title="Расскажите о поездке — и мы подберём маршрут"
        lead="Самый быстрый способ начать общение — WhatsApp. Если нужен более подробный вариант маршрута, заполните форму запроса."
      />

      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:grid-cols-[1fr_1.3fr] md:px-8 md:py-20">
        <div>
          <ButtonLink href={whatsappLink()} external className="w-full sm:w-auto">
            <MessageCircle size={17} aria-hidden="true" />
            Начать в WhatsApp
          </ButtonLink>

          <ul className="mt-9 space-y-5 border-t border-sand-200 pt-8 text-sm text-ink-700">
            <li className="flex items-start gap-3">
              <MessageCircle size={18} className="mt-0.5 shrink-0 text-forest-600" aria-hidden="true" />
              <div>
                <p className="font-semibold text-forest-900">WhatsApp</p>
                <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="hover:text-forest-700">
                  {site.phoneDisplay}
                </a>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <Mail size={18} className="mt-0.5 shrink-0 text-forest-600" aria-hidden="true" />
              <div>
                <p className="font-semibold text-forest-900">Email</p>
                <a href={`mailto:${site.email}`} className="hover:text-forest-700">
                  {site.email}
                </a>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <MapPin size={18} className="mt-0.5 shrink-0 text-forest-600" aria-hidden="true" />
              <div>
                <p className="font-semibold text-forest-900">Зона обслуживания</p>
                <p>Работаем по всей Шри-Ланке</p>
              </div>
            </li>
          </ul>

          <p className="mt-8 text-xs text-ink-500">
            Подходит для запросов на трансфер из аэропорта, индивидуальные
            маршруты и многодневные поездки. Ответ можно получить на русском
            и английском языках.
          </p>
        </div>

        <div className="rounded-card border border-sand-200 bg-sand-50 p-7 shadow-soft md:p-9">
          <EnquiryForm />
        </div>
      </section>
    </>
  );
}
