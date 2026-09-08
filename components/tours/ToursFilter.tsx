"use client";

import { useMemo, useState } from "react";
import PackageCard from "@/components/ui/PackageCard";
import type { TourPackage } from "@/lib/types";

/**
 * The full list is passed in and rendered on the server as part of this
 * component's initial HTML — filtering only ever narrows what is already
 * painted. If hydration never runs, every package stays visible; nothing
 * here can end up gating content the way the previous site's `.reveal` did.
 */
export default function ToursFilter({ packages }: { packages: TourPackage[] }) {
  const categories = useMemo(
    () => Array.from(new Set(packages.map((p) => p.category))),
    [packages]
  );
  const [active, setActive] = useState<string | null>(null);

  const visible = active ? packages.filter((p) => p.category === active) : packages;

  return (
    <div>
      <div className="reveal flex flex-wrap gap-2.5" role="group" aria-label="Фильтр по категориям">
        <button
          type="button"
          onClick={() => setActive(null)}
          aria-pressed={active === null}
          className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${
            active === null
              ? "bg-forest-900 text-sand-50"
              : "border border-sand-300 text-ink-700 hover:border-forest-300 hover:text-forest-800"
          }`}
        >
          Все туры
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActive(cat)}
            aria-pressed={active === cat}
            className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${
              active === cat
                ? "bg-forest-900 text-sand-50"
                : "border border-sand-300 text-ink-700 hover:border-forest-300 hover:text-forest-800"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <p className="mt-5 text-sm text-ink-500" aria-live="polite">
        {visible.length} {pluralTours(visible.length)}
      </p>

      <ul className="mt-6 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
        {visible.map((pkg) => (
          <li key={pkg.slug}>
            <PackageCard pkg={pkg} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function pluralTours(n: number) {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return "тур";
  if ([2, 3, 4].includes(mod10) && ![12, 13, 14].includes(mod100)) return "тура";
  return "туров";
}
