import { MessageCircle, Mail } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { site, whatsappLink } from "@/lib/site";

export default function EnquiryCta() {
  return (
    <section id="enquiry" className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
      <div className="reveal overflow-hidden rounded-card border border-sand-300 bg-sand-100 px-7 py-14 text-center md:px-16">
        <p className="text-eyebrow font-semibold uppercase text-ochre-600">
          Запрос
        </p>
        <h2 className="mx-auto mt-4 max-w-2xl font-display text-h2 font-semibold text-forest-950">
          Расскажите даты и предпочтения — маршрут подберём под вас
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-lead text-ink-700">
          Самый быстрый способ начать общение — WhatsApp. Если нужен более
          подробный вариант маршрута, отправьте форму запроса.
        </p>

        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <ButtonLink href={whatsappLink()} external>
            <MessageCircle size={17} aria-hidden="true" />
            Начать в WhatsApp
          </ButtonLink>
          <ButtonLink href="/contact" variant="secondary">
            <Mail size={17} aria-hidden="true" />
            Отправить запрос
          </ButtonLink>
        </div>

        <p className="mt-8 text-sm text-ink-500">
          Или напишите на{" "}
          <a
            href={`mailto:${site.email}`}
            className="font-medium text-forest-700 underline underline-offset-4 hover:text-forest-600"
          >
            {site.email}
          </a>
        </p>
      </div>
    </section>
  );
}
