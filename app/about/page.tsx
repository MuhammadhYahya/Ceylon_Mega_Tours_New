import type { Metadata } from "next";
import Image from "next/image";
import { Languages, MapPin, MessageCircle, ShieldCheck } from "lucide-react";
import { blurProps } from "@/lib/images";
import { ButtonLink } from "@/components/ui/Button";
import EnquiryCta from "@/components/sections/EnquiryCta";
import { whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Обо мне",
  description:
    "Персональный гид с 15+ летним опытом в туризме и частном сопровождении по Шри-Ланке. Понятное общение, гибкое планирование и внимание к деталям.",
  alternates: { canonical: "/about" },
};

const stats = [
  { icon: ShieldCheck, value: "15+ лет", label: "Опыт в туризме и частном сопровождении" },
  { icon: Languages, value: "EN / RU", label: "Понятная коммуникация ещё до прилёта" },
  { icon: MapPin, value: "По всему острову", label: "Туры, трансферы и индивидуальные маршруты" },
];

export default function AboutPage() {
  return (
    <>
      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-14 md:grid-cols-2 md:px-8 md:py-20">
        <div>
          <p className="text-eyebrow font-semibold uppercase text-ochre-600">
            Обо мне
          </p>
          <h1 className="mt-4 font-display text-h1 font-semibold text-forest-950">
            Персональный гид с акцентом на доверие и глубокое знание острова
          </h1>
          <p className="mt-6 text-lead text-ink-700">
            Я помогаю парам, семьям и небольшим группам путешествовать по
            Шри-Ланке без стресса, спешки и сложной логистики.
          </p>
          <p className="mt-5 text-[0.98rem] leading-relaxed text-ink-700">
            От первого сообщения до финального трансфера поездка выстраивается
            в спокойном ритме, с надёжной организацией и внимательным
            сервисом. Гости получают понятную коммуникацию и сопровождение,
            удобное для русскоязычных путешественников, которые ценят комфорт
            и уверенность.
          </p>

          <div className="mt-9">
            <ButtonLink href={whatsappLink()} external>
              <MessageCircle size={17} aria-hidden="true" />
              Написать в WhatsApp
            </ButtonLink>
          </div>
        </div>

        <div className="relative aspect-[4/5] overflow-hidden rounded-card shadow-lift">
          <Image
            src="/images/guide.jpg"
            {...blurProps("/images/guide.jpg")}
            alt="Гид Ceylon Mega Tours у крепости Галле"
            fill
            priority
            sizes="(max-width: 767px) 100vw, 45vw"
            className="object-cover"
          />
        </div>
      </section>

      <section className="border-y border-sand-200 bg-sand-100/60">
        <div className="mx-auto max-w-7xl px-5 py-14 md:px-8 md:py-16">
          <ul className="grid gap-8 sm:grid-cols-3">
            {stats.map((s) => (
              <li key={s.label} className="flex flex-col items-start">
                <span className="grid h-12 w-12 place-items-center rounded-full bg-forest-900 text-sand-50">
                  <s.icon size={21} aria-hidden="true" />
                </span>
                <p className="mt-5 font-display text-2xl font-semibold text-forest-950">
                  {s.value}
                </p>
                <p className="mt-1.5 text-sm text-ink-600">{s.label}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <EnquiryCta />
    </>
  );
}
