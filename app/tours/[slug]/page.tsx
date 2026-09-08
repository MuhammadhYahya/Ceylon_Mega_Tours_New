import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, Clock, Gauge, MessageCircle } from "lucide-react";
import { blurProps } from "@/lib/images";
import { ButtonLink } from "@/components/ui/Button";
import PackageCard from "@/components/ui/PackageCard";
import { packages, getPackageBySlug } from "@/lib/content/packages";
import { site, whatsappLink } from "@/lib/site";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return packages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const pkg = getPackageBySlug(slug);
  if (!pkg) return {};

  return {
    title: pkg.title,
    description: pkg.summary,
    alternates: { canonical: `/tours/${pkg.slug}` },
    openGraph: {
      title: pkg.title,
      description: pkg.summary,
      images: [{ url: pkg.image.src }],
    },
  };
}

const priceFormatter = new Intl.NumberFormat("ru-RU");

/**
 * Multi-day highlights carry an embedded "День N:" marker in the source
 * material rather than a separate structured itinerary. Splitting on that
 * marker turns flat bullets into a readable day-by-day list without
 * inventing structure the client's original copy didn't have.
 */
function groupHighlights(highlights: string[]) {
  const dayMarker = /^День\s+\d+:/;
  const hasDays = highlights.some((h) => dayMarker.test(h));
  if (!hasDays) return [{ day: null, items: highlights }];

  // Every line in the source carries its own "День N:" prefix (rather than
  // just the first line of each day), so a new group is started only when
  // the day number actually changes — not on every matching line.
  const groups: { day: string | null; items: string[] }[] = [];
  for (const line of highlights) {
    const match = line.match(dayMarker);
    const day = match ? match[0].replace(/:$/, "") : null;
    const item = match ? line.slice(match[0].length).trim() : line;

    const current = groups[groups.length - 1];
    if (current && current.day === day) {
      current.items.push(item);
    } else {
      groups.push({ day, items: [item] });
    }
  }
  return groups;
}

export default async function TourDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const pkg = getPackageBySlug(slug);
  if (!pkg) notFound();

  const groups = groupHighlights(pkg.highlights);
  const related = packages
    .filter((p) => p.slug !== pkg.slug && p.category === pkg.category)
    .slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: pkg.title,
    description: pkg.summary,
    image: `${site.url}${pkg.image.src}`,
    touristType: "Частные туры",
    ...(pkg.priceUsd
      ? { offers: { "@type": "Offer", priceCurrency: "USD", price: pkg.priceUsd } }
      : {}),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="mx-auto max-w-7xl px-5 pb-4 pt-8 text-sm text-ink-500 md:px-8">
        <Link href="/tours" className="hover:text-forest-700">
          Турпакеты
        </Link>
        <span className="mx-2">/</span>
        <span className="text-ink-700">{pkg.title}</span>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-5 pb-16 md:grid-cols-2 md:px-8 md:pb-24">
        <div className="relative aspect-[4/3] overflow-hidden rounded-card shadow-lift">
          <Image
            src={pkg.image.src}
            {...blurProps(pkg.image.src)}
            alt={pkg.image.alt}
            fill
            priority
            sizes="(max-width: 767px) 100vw, 50vw"
            className="object-cover"
          />
        </div>

        <div>
          <p className="text-eyebrow font-semibold uppercase text-ochre-600">
            {pkg.category}
          </p>
          <h1 className="mt-3 font-display text-h1 font-semibold text-forest-950">
            {pkg.title}
          </h1>
          <p className="mt-5 text-lead text-ink-700">{pkg.summary}</p>

          <dl className="mt-7 flex flex-wrap gap-x-7 gap-y-3 text-sm text-ink-600">
            <div className="flex items-center gap-2">
              <Clock size={17} className="text-forest-600" aria-hidden="true" />
              <dt className="sr-only">Длительность</dt>
              <dd>{pkg.duration}</dd>
            </div>
            <div className="flex items-center gap-2">
              <Gauge size={17} className="text-forest-600" aria-hidden="true" />
              <dt className="sr-only">Сложность</dt>
              <dd>{pkg.difficulty}</dd>
            </div>
          </dl>

          {pkg.priceUsd ? (
            <p className="mt-6 text-sm text-ink-500">
              от{" "}
              <span className="font-display text-3xl font-semibold text-forest-900">
                {priceFormatter.format(pkg.priceUsd)} $
              </span>{" "}
              с человека
            </p>
          ) : (
            <p className="mt-6 text-sm text-ink-500">
              Стоимость зависит от числа гостей и дат — уточните в WhatsApp.
            </p>
          )}

          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href={whatsappLink(`Здравствуйте! Интересует тур «${pkg.title}».`)} external>
              <MessageCircle size={17} aria-hidden="true" />
              Спросить в WhatsApp
            </ButtonLink>
            <ButtonLink href="/contact" variant="secondary">
              Отправить запрос
            </ButtonLink>
          </div>

          <div className="mt-10 border-t border-sand-200 pt-8">
            <h2 className="font-display text-h3 font-semibold text-forest-950">
              Что включено
            </h2>
            <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
              {pkg.inclusions.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-ink-700">
                  <Check size={16} className="mt-0.5 shrink-0 text-forest-600" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="border-t border-sand-200 bg-sand-100/60">
        <div className="mx-auto max-w-4xl px-5 py-16 md:px-8 md:py-20">
          <h2 className="font-display text-h2 font-semibold text-forest-950">
            Программа тура
          </h2>
          <div className="mt-8 space-y-8">
            {groups.map((group, i) => (
              <div key={i}>
                {group.day && (
                  <h3 className="font-display text-h3 font-semibold text-forest-800">
                    {group.day}
                  </h3>
                )}
                <ul className={`space-y-3 ${group.day ? "mt-4" : ""}`}>
                  {group.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-3 text-[0.95rem] leading-relaxed text-ink-700">
                      <span
                        aria-hidden="true"
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-ochre-500"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
          <h2 className="font-display text-h2 font-semibold text-forest-950">
            Похожие туры
          </h2>
          <ul className="mt-10 grid gap-7 md:grid-cols-3">
            {related.map((r) => (
              <li key={r.slug}>
                <PackageCard pkg={r} />
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  );
}
