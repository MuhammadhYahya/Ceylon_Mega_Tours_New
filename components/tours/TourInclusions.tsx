import Image from "next/image";
import { Check } from "lucide-react";
import { mediaBlurProps } from "@/lib/images";
import { tourIcon } from "@/lib/tourIcons";
import type { TourInclusion } from "@/lib/types";

/**
 * "Что включено" as row cards — the same shape as TourTimeline's step cards
 * (a fixed-size icon circle beside the text), so the two halves of the
 * section read as one system rather than two different card languages.
 *
 * The icon sits in a fixed-size circle rather than a panel sized off the
 * card's own width. A width-based panel is what made this oversized on
 * mobile: a single-column card spans nearly the full viewport there, so an
 * aspect-ratio panel scaled up to match and dwarfed a one-line item. A
 * circle stays the same modest size no matter how many columns the grid is
 * currently showing.
 */
export default function TourInclusions({ items }: { items: TourInclusion[] }) {
  return (
    // Fits as many ~15rem rows as the column can hold: two when this sits
    // beside the programme, one on a phone, more if it ever runs full width.
    // The count follows the space it's given rather than a device guess.
    <ul className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,15rem),1fr))] gap-3">
      {items.map((item) => {
        const Icon = tourIcon(item.icon?.id);
        const custom = item.icon?.image;

        return (
          <li
            key={item.text}
            className="flex items-center gap-3.5 rounded-[1.65rem] bg-forest-950 p-2.5 pr-5 shadow-[0_0_0_4px_var(--color-forest-100)] ring-1 ring-forest-800"
          >
            <span className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full border border-forest-400/40">
              {custom?.src ? (
                <Image
                  src={custom.src}
                  {...mediaBlurProps(custom)}
                  alt=""
                  fill
                  sizes="48px"
                  className="object-contain p-2"
                />
              ) : (
                <Icon size={20} className="text-forest-200" aria-hidden="true" />
              )}
              {/* Small "included" tick, not the card-sized badge the panel
                  layout carried — this card is compact enough that the badge
                  no longer needs its own clearance at the top edge. */}
              <span
                aria-hidden="true"
                className="absolute -bottom-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-leaf-300 ring-2 ring-forest-950"
              >
                <Check size={9} strokeWidth={3.5} className="text-forest-950" />
              </span>
            </span>

            <p className="flex-1 text-[0.95rem] font-semibold leading-snug text-sand-50">
              {item.text}
            </p>
          </li>
        );
      })}
    </ul>
  );
}
