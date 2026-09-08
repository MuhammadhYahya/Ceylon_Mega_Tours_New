import Image from "next/image";
import Link from "next/link";
import { mediaBlurProps } from "@/lib/images";
import type { Destination } from "@/lib/types";

export default function DestinationCard({ dest }: { dest: Destination }) {
  return (
    <Link
      href={`/destinations/${dest.slug}`}
      className="group relative block aspect-[4/5] overflow-hidden rounded-card"
    >
      <Image
        src={dest.image.src}
        {...mediaBlurProps(dest.image)}
        alt={dest.image.alt}
        fill
        sizes="(max-width: 767px) 100vw, 33vw"
        className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
      />
      {/* Gradient scrim keeps the caption legible on any photo */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-forest-950/85 via-forest-950/25 to-transparent"
      />
      <div className="absolute inset-x-0 bottom-0 p-7 text-sand-50">
        <p className="text-eyebrow font-semibold uppercase text-ochre-400">
          {dest.tag}
        </p>
        <h3 className="mt-2.5 font-display text-2xl font-semibold">
          {dest.title}
        </h3>
        <p className="mt-2.5 text-sm leading-relaxed text-sand-200/85">
          {dest.summary}
        </p>
      </div>
    </Link>
  );
}
