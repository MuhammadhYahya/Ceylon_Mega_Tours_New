import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, Gauge } from "lucide-react";
import { blurProps } from "@/lib/images";
import type { TourPackage } from "@/lib/types";

const priceFormatter = new Intl.NumberFormat("ru-RU");

export default function PackageCard({ pkg }: { pkg: TourPackage }) {
  return (
    <Link
      href={`/tours/${pkg.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-card bg-sand-50 shadow-soft ring-1 ring-sand-200 transition-shadow hover:shadow-lift"
    >
      <div className="relative aspect-[3/2] overflow-hidden">
        <Image
          src={pkg.image.src}
          {...blurProps(pkg.image.src)}
          alt={pkg.image.alt}
          fill
          sizes="(max-width: 767px) 100vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
        />
        <span className="absolute left-4 top-4 rounded-full bg-sand-50/95 px-3.5 py-1.5 text-eyebrow font-semibold uppercase text-forest-800">
          {pkg.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-7">
        <h3 className="font-display text-h3 font-semibold text-forest-950">
          {pkg.title}
        </h3>
        <p className="mt-3 flex-1 text-[0.93rem] leading-relaxed text-ink-700">
          {pkg.summary}
        </p>

        <dl className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm text-ink-500">
          <div className="flex items-center gap-1.5">
            <Clock size={15} aria-hidden="true" />
            <dt className="sr-only">Длительность</dt>
            <dd>{pkg.duration}</dd>
          </div>
          <div className="flex items-center gap-1.5">
            <Gauge size={15} aria-hidden="true" />
            <dt className="sr-only">Сложность</dt>
            <dd>{pkg.difficulty}</dd>
          </div>
        </dl>

        <div className="mt-6 flex items-center justify-between gap-3 border-t border-sand-200 pt-5">
          {/* No price is shown at all until one is set in Sanity — an empty
              price slot reads better than a placeholder. */}
          {pkg.priceUsd ? (
            <p className="text-sm text-ink-500">
              от{" "}
              <span className="font-display text-xl font-semibold text-forest-900">
                {priceFormatter.format(pkg.priceUsd)} $
              </span>
            </p>
          ) : null}
          <span className="ml-auto flex items-center gap-1.5 text-sm font-semibold text-forest-700">
            Открыть
            <ArrowRight
              size={15}
              aria-hidden="true"
              className="transition-transform group-hover:translate-x-1"
            />
          </span>
        </div>
      </div>
    </Link>
  );
}
