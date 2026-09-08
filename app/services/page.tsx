import type { Metadata } from "next";
import { Check, Compass, PlaneLanding, CarFront } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import EnquiryCta from "@/components/sections/EnquiryCta";
import { services } from "@/lib/content/services";
import { whatsappLink } from "@/lib/site";
import type { Service } from "@/lib/types";

export const metadata: Metadata = {
  title: "Услуги",
  description:
    "Частные экскурсии, трансферы из аэропорта и комфортный транспорт по Шри-Ланке — с русскоговорящим гидом и гибким планированием.",
  alternates: { canonical: "/services" },
};

const icons: Record<Service["icon"], typeof Compass> = {
  compass: Compass,
  plane: PlaneLanding,
  car: CarFront,
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Услуги"
        title="Три способа организовать поездку без лишних забот"
        lead="Каждая услуга работает в частном формате — можно заказать отдельно или собрать в единый маршрут вместе с турпакетом."
      />

      <section className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-20">
        <ul className="space-y-8">
          {services.map((s) => {
            const Icon = icons[s.icon];
            return (
              <li
                key={s.slug}
                className="reveal grid gap-8 rounded-card border border-sand-200 bg-sand-50 p-8 md:grid-cols-[auto_1fr] md:p-10"
              >
                <span className="grid h-14 w-14 place-items-center rounded-full bg-forest-900 text-sand-50">
                  <Icon size={24} aria-hidden="true" />
                </span>
                <div>
                  <p className="text-eyebrow font-semibold uppercase text-ochre-600">
                    {s.eyebrow}
                  </p>
                  <h2 className="mt-2 font-display text-h3 font-semibold text-forest-950">
                    {s.title}
                  </h2>
                  <p className="mt-3 max-w-2xl text-[0.98rem] leading-relaxed text-ink-700">
                    {s.summary}
                  </p>
                  <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
                    {s.details.map((d) => (
                      <li key={d} className="flex items-start gap-2.5 text-sm text-ink-700">
                        <Check size={16} className="mt-0.5 shrink-0 text-forest-600" aria-hidden="true" />
                        {d}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <ButtonLink
                      href={whatsappLink(`Здравствуйте! Интересует услуга «${s.title}».`)}
                      external
                      variant="secondary"
                    >
                      Спросить в WhatsApp
                    </ButtonLink>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </section>

      <EnquiryCta />
    </>
  );
}
