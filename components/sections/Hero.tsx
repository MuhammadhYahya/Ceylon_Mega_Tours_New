import Image from "next/image";
import { blurProps } from "@/lib/images";
import { Check } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { whatsappLink } from "@/lib/site";

const trust = [
  "Поддержка для русскоязычных гостей",
  "Частный транспорт с кондиционером",
  "Гибкие маршруты по всей Шри-Ланке",
];

/**
 * Text-led hero. The headline is the LCP element and it is plain prerendered
 * HTML, so it paints on the first frame — no hydration, no reveal animation,
 * no opacity gate. The image loads in parallel with `priority`.
 */
export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Soft ambient wash — decorative only */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-40 h-[32rem] w-[32rem] rounded-full bg-forest-100/50 blur-3xl"
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 pb-16 pt-14 md:px-8 md:pb-24 md:pt-20 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
        <div>
          <p className="text-eyebrow font-semibold uppercase text-ochre-600">
            Частные путешествия по Шри-Ланке
          </p>

          <h1 className="mt-5 font-display text-display font-semibold text-forest-950">
            Шри-Ланка без спешки&nbsp;и лишних забот
          </h1>

          <p className="mt-6 max-w-xl text-lead text-ink-700">
            Ceylon Mega Tours организует частные маршруты, встречи в аэропорту и
            комфортные поездки для гостей, которые хотят увидеть остров легко,
            безопасно и в спокойном ритме.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <ButtonLink href={whatsappLink()} external>
              Написать в WhatsApp
            </ButtonLink>
            <ButtonLink href="/tours" variant="secondary">
              Смотреть пакеты
            </ButtonLink>
          </div>

          <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            {trust.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-ink-700">
                <Check
                  size={17}
                  className="mt-0.5 shrink-0 text-forest-600"
                  aria-hidden="true"
                />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-card shadow-lift sm:aspect-[5/4] lg:aspect-[4/5]">
            <Image
              src="/images/hero-sigiriya.jpg"
              {...blurProps("/images/hero-sigiriya.jpg")}
              alt="Скала Сигирия на рассвете, Шри-Ланка"
              fill
              priority
              sizes="(max-width: 1023px) 100vw, 45vw"
              className="object-cover"
            />
          </div>

          <div className="absolute -bottom-6 left-4 max-w-[15rem] rounded-2xl bg-sand-50 px-6 py-5 shadow-lift ring-1 ring-sand-200 sm:-left-8">
            <p className="font-display text-3xl font-semibold leading-none text-forest-900">
              15+ лет
            </p>
            <p className="mt-2 text-sm leading-snug text-ink-500">
              опыта в частном сопровождении
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
