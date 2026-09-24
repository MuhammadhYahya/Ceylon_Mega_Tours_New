import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Clock, MessageCircle, Users } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import PackageCard from "@/components/ui/PackageCard";
import TourGallery from "@/components/tours/TourGallery";
import TourInclusions from "@/components/tours/TourInclusions";
import TourTimeline, { type StepGroup } from "@/components/tours/TourTimeline";
import { getTourPackages, getTourPackageBySlug } from "@/lib/sanity/queries";
import { whatsappLink } from "@/lib/site";
import type { TourInclusion, TourPackage, TourStep } from "@/lib/types";

type Params = { slug: string };

export async function generateStaticParams(): Promise<Params[]> {
  const packages = await getTourPackages();
  return packages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const pkg = await getTourPackageBySlug(slug);
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

const DAY_MARKER = /^День\s+\d+:/;

/**
 * The programme steps to draw, preferring the structured `programme` field.
 *
 * Tours that haven't been upgraded in Sanity yet fall back to the old flat
 * `highlights` lines, which fold the day into the text as a "День N:" prefix
 * rather than carrying a separate field. Splitting that back out means a
 * legacy tour still renders on the new trail — with no subtitle, badge or
 * chosen icon, because that copy simply doesn't exist yet and is not
 * something to invent on its behalf.
 */
function resolveSteps(pkg: TourPackage): TourStep[] {
  if (pkg.programme?.length) return pkg.programme;

  return (pkg.highlights ?? []).map((line) => {
    const match = line.match(DAY_MARKER);
    return {
      title: match ? line.slice(match[0].length).trim() : line,
      day: match ? match[0].replace(/:$/, "") : undefined,
    };
  });
}

/**
 * Consecutive steps sharing a day become one labelled group. Every legacy
 * line carries its own "День N:" prefix rather than just the first of each
 * day, so a group is only started when the day actually changes.
 */
function groupByDay(steps: TourStep[]): StepGroup[] {
  const groups: StepGroup[] = [];
  for (const step of steps) {
    const day = step.day ?? null;
    const current = groups[groups.length - 1];
    if (current && current.day === day) current.steps.push(step);
    else groups.push({ day, steps: [step] });
  }
  return groups;
}

/** Same fallback story as `resolveSteps`: structured first, plain lines after. */
function resolveInclusions(pkg: TourPackage): TourInclusion[] {
  if (pkg.inclusionItems?.length) return pkg.inclusionItems;
  return (pkg.inclusions ?? []).map((text) => ({ text }));
}

/**
 * Heading for one half of the dark programme/inclusions section. Both halves
 * use it so their rules and baselines line up across the two columns.
 */
function PanelHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="flex flex-col gap-2.5">
      <p className="flex items-center gap-2.5 text-eyebrow font-semibold uppercase text-ochre-600">
        <span aria-hidden="true" className="h-2 w-2 rounded-full bg-ochre-500" />
        {eyebrow}
      </p>
      <h2 className="font-display text-h2 font-semibold text-forest-950">{title}</h2>
    </div>
  );
}

export default async function TourDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const pkg = await getTourPackageBySlug(slug);
  if (!pkg) notFound();

  const groups = groupByDay(resolveSteps(pkg));
  // The main photo leads the filmstrip so it can be returned to after a
  // thumbnail is picked. `src` is guarded because a gallery entry whose asset
  // was deleted in Sanity still comes back as an object, just an empty one.
  const galleryImages = [pkg.image, ...(pkg.gallery ?? [])].filter((img) => img?.src);
  const inclusions = resolveInclusions(pkg);
  const allPackages = await getTourPackages();
  const related = allPackages
    .filter((p) => p.slug !== pkg.slug && p.category === pkg.category)
    .slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: pkg.title,
    description: pkg.summary,
    // pkg.image.src is already an absolute Sanity CDN URL — do not prefix
    // it with site.url (that was only correct back when this was a local
    // "/images/..." path).
    image: pkg.image.src,
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

      <nav
        aria-label="Хлебные крошки"
        className="mx-auto max-w-7xl px-5 pb-5 pt-8 text-sm text-ink-500 md:px-8"
      >
        <Link href="/tours" className="hover:text-forest-700">
          Турпакеты
        </Link>
        <span className="mx-2">/</span>
        <span className="font-medium text-ink-700">{pkg.title}</span>
      </nav>

      {/* Intrinsic two-up: each column asks for 26rem and the row breaks to
          one column the moment both can't have it. No breakpoint to tune —
          it reflows off its own available width, so it behaves the same in a
          phone, a split-screen tablet, or a narrow desktop window. The inner
          `min()` keeps the track from ever exceeding the viewport on a small
          screen, which a bare `minmax(26rem, 1fr)` would do. */}
      <section className="mx-auto grid max-w-7xl grid-cols-[repeat(auto-fit,minmax(min(100%,26rem),1fr))] gap-[clamp(2rem,4vw,3rem)] px-5 pb-[clamp(4rem,8vw,6rem)] md:px-8">
        <TourGallery images={galleryImages} />

        <div className="md:py-2">
          <p className="text-eyebrow font-semibold uppercase text-ochre-600">
            {pkg.category}
          </p>
          <h1 className="mt-3 font-display text-h1 font-semibold text-forest-950">
            {pkg.title}
          </h1>
          <p className="mt-5 text-lead text-ink-700">{pkg.summary}</p>

          <dl className="mt-6 flex flex-wrap gap-2.5 text-sm text-ink-700">
            <div className="flex items-center gap-2 rounded-full bg-sand-100 px-3.5 py-1.5 ring-1 ring-sand-200">
              <Clock size={15} className="text-ochre-600" aria-hidden="true" />
              <dt className="sr-only">Длительность</dt>
              <dd>{pkg.duration}</dd>
            </div>
            {pkg.suitableFor?.length ? (
              <div className="flex items-center gap-2 rounded-full bg-sand-100 px-3.5 py-1.5 ring-1 ring-sand-200">
                <Users size={15} className="text-ochre-600" aria-hidden="true" />
                <dt className="sr-only">Подходит для</dt>
                <dd>{pkg.suitableFor.join(", ")}</dd>
              </div>
            ) : null}
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
            <p className="mt-6 text-sm italic text-ink-500">
              Стоимость зависит от числа гостей и дат — уточните в WhatsApp.
            </p>
          )}

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <ButtonLink href={whatsappLink(`Здравствуйте! Интересует тур «${pkg.title}».`)} external>
              <MessageCircle size={17} aria-hidden="true" />
              Спросить в WhatsApp
            </ButtonLink>
            <ButtonLink href="/contact" variant="secondary">
              Отправить запрос
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="paper-grain bg-sand-100">
        {/* A size container, so the two halves below and their divider can
            key off this band's own width rather than the viewport's — they
            stay correct no matter what the page around them does. */}
        <div className="@container mx-auto max-w-7xl px-5 py-[clamp(4rem,8vw,6rem)] md:px-8">
          {/* Same intrinsic two-up as the hero. 26.5rem tracks with a 3rem
              gap need 56rem to sit side by side — exactly the `@4xl` the
              divider and the sticky below key off, so the decoration and the
              column count always agree without either being hard-coded to a
              device width. */}
          <div
            className={`grid gap-y-14 ${
              inclusions.length > 0
                ? "grid-cols-[repeat(auto-fit,minmax(min(100%,26.5rem),1fr))] gap-x-12"
                : ""
            }`}
          >
            <div className="relative">
              <PanelHeading eyebrow="Маршрут и впечатления" title="Программа тура" />
              <div className="mt-10">
                <TourTimeline groups={groups} />
              </div>

              {inclusions.length > 0 && (
                <span
                  aria-hidden="true"
                  className="absolute -right-6 top-2 hidden h-[calc(100%-1rem)] border-l-2 border-dashed border-forest-200 @4xl:block"
                />
              )}
            </div>

            {inclusions.length > 0 && (
              <div>
                {/* Sticks alongside a long programme instead of leaving the
                    right half empty part-way down — but only once it is
                    actually a side-by-side column; sticky while stacked
                    would pin it over the content below it. */}
                <div className="@4xl:sticky @4xl:top-28">
                  <PanelHeading eyebrow="Всё в одной цене" title="Что включено" />
                  <div className="mt-10">
                    <TourInclusions items={inclusions} />
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="mt-14 flex justify-end border-t border-forest-200 pt-6 md:mt-16">
            <a
              href={whatsappLink(`Здравствуйте! Хочу обсудить маршрут тура «${pkg.title}».`)}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-1.5 text-sm font-semibold text-forest-800 hover:text-ochre-600"
            >
              Обсудить детали маршрута с гидом
              <ArrowRight
                size={15}
                aria-hidden="true"
                className="transition-transform group-hover:translate-x-1"
              />
            </a>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="mx-auto max-w-7xl px-5 py-[clamp(4rem,8vw,6rem)] md:px-8">
          <h2 className="font-display text-h2 font-semibold text-forest-950">
            Похожие туры
          </h2>
          {/* `auto-fill`, not `auto-fit`: with only one or two related tours
              left, auto-fit would stretch them across the full row into
              cards far larger than every other card on the site. auto-fill
              keeps the empty tracks, so a lone card stays card-sized. */}
          <ul className="mt-8 grid grid-cols-[repeat(auto-fill,minmax(min(100%,17rem),1fr))] gap-6 md:mt-10 md:gap-7">
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
