import { ArrowRight } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import { ButtonLink } from "@/components/ui/Button";
import PackageCard from "@/components/ui/PackageCard";
import { featuredPackages } from "@/lib/content/packages";

export default function FeaturedPackages() {
  return (
    <section id="packages" className="bg-sand-100/70 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeader
            eyebrow="Популярные пакеты"
            title="Частные турпакеты как основа вашего путешествия"
            lead="Здесь несколько популярных вариантов — полная подборка доступна на отдельной странице."
          />
          <ButtonLink href="/tours" variant="ghost" className="reveal">
            Смотреть все пакеты <ArrowRight size={17} aria-hidden="true" />
          </ButtonLink>
        </div>

        <ul className="mt-14 grid gap-7 md:grid-cols-3">
          {featuredPackages.map((pkg) => (
            <li key={pkg.slug} className="reveal">
              <PackageCard pkg={pkg} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
