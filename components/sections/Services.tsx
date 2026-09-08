import { Compass, PlaneLanding, CarFront } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import { services } from "@/lib/content/services";
import type { Service } from "@/lib/types";

const icons: Record<Service["icon"], typeof Compass> = {
  compass: Compass,
  plane: PlaneLanding,
  car: CarFront,
};

export default function Services() {
  return (
    <section id="services" className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
      <SectionHeader
        eyebrow="Основные услуги"
        title="Три услуги, которые делают поездку простой"
        lead="Каждая услуга организуется в частном формате, гибко и с акцентом на комфорт, а не на спешку групповых туров."
      />

      <ul className="mt-14 grid gap-6 md:grid-cols-3">
        {services.map((s) => {
          const Icon = icons[s.icon];
          return (
            <li
              key={s.slug}
              className="reveal group rounded-card border border-sand-200 bg-sand-100/60 p-8 transition-colors hover:border-forest-200 hover:bg-sand-100"
            >
              <span className="grid h-12 w-12 place-items-center rounded-full bg-forest-900 text-sand-50">
                <Icon size={21} aria-hidden="true" />
              </span>
              <p className="mt-7 text-eyebrow font-semibold uppercase text-ochre-600">
                {s.eyebrow}
              </p>
              <h3 className="mt-3 font-display text-h3 font-semibold text-forest-950">
                {s.title}
              </h3>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-700">
                {s.summary}
              </p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
