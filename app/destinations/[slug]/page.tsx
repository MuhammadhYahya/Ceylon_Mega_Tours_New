import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MessageCircle } from "lucide-react";
import { blurProps } from "@/lib/images";
import { ButtonLink } from "@/components/ui/Button";
import PackageCard from "@/components/ui/PackageCard";
import { destinations, getDestinationBySlug } from "@/lib/content/destinations";
import { packages } from "@/lib/content/packages";
import { whatsappLink } from "@/lib/site";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return destinations.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const dest = getDestinationBySlug(slug);
  if (!dest) return {};

  return {
    title: dest.title,
    description: dest.summary,
    alternates: { canonical: `/destinations/${dest.slug}` },
    openGraph: { title: dest.title, description: dest.summary, images: [{ url: dest.image.src }] },
  };
}

export default async function DestinationDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const dest = getDestinationBySlug(slug);
  if (!dest) notFound();

  const relatedTours = packages.filter((p) => dest.relatedTourSlugs.includes(p.slug));

  return (
    <>
      <section className="mx-auto max-w-7xl px-5 pb-4 pt-8 text-sm text-ink-500 md:px-8">
        <Link href="/destinations" className="hover:text-forest-700">
          Направления
        </Link>
        <span className="mx-2">/</span>
        <span className="text-ink-700">{dest.title}</span>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-5 pb-16 md:grid-cols-2 md:px-8 md:pb-24">
        <div className="relative aspect-[4/3] overflow-hidden rounded-card shadow-lift md:order-2">
          <Image
            src={dest.image.src}
            {...blurProps(dest.image.src)}
            alt={dest.image.alt}
            fill
            priority
            sizes="(max-width: 767px) 100vw, 50vw"
            className="object-cover"
          />
        </div>

        <div className="md:order-1">
          <p className="text-eyebrow font-semibold uppercase text-ochre-600">
            {dest.tag}
          </p>
          <h1 className="mt-3 font-display text-h1 font-semibold text-forest-950">
            {dest.title}
          </h1>
          <p className="mt-5 text-lead text-ink-700">{dest.summary}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink
              href={whatsappLink(`Здравствуйте! Хочу спланировать поездку в ${dest.title}.`)}
              external
            >
              <MessageCircle size={17} aria-hidden="true" />
              Спросить в WhatsApp
            </ButtonLink>
            <ButtonLink href="/tours" variant="secondary">
              Смотреть все туры
            </ButtonLink>
          </div>
        </div>
      </section>

      {relatedTours.length > 0 && (
        <section className="border-t border-sand-200 bg-sand-100/60">
          <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
            <h2 className="font-display text-h2 font-semibold text-forest-950">
              Туры, которые посещают {dest.title}
            </h2>
            <ul className="mt-10 grid gap-7 md:grid-cols-3">
              {relatedTours.map((pkg) => (
                <li key={pkg.slug}>
                  <PackageCard pkg={pkg} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}
