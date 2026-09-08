import { ArrowRight } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import { ButtonLink } from "@/components/ui/Button";
import DestinationCard from "@/components/ui/DestinationCard";
import { destinations } from "@/lib/content/destinations";

export default function Destinations() {
  const featured = destinations.slice(0, 3);

  return (
    <section id="destinations" className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
      <SectionHeader
        eyebrow="Популярные направления"
        title="Места, которые гости выбирают чаще всего"
        lead="Начните с этих любимых мест, а затем откройте полную страницу направлений для новых идей."
      />

      <ul className="mt-14 grid gap-6 md:grid-cols-3">
        {featured.map((dest) => (
          <li key={dest.slug} className="reveal">
            <DestinationCard dest={dest} />
          </li>
        ))}
      </ul>

      <div className="reveal mt-10">
        <ButtonLink href="/destinations" variant="secondary">
          Смотреть все направления <ArrowRight size={17} aria-hidden="true" />
        </ButtonLink>
      </div>
    </section>
  );
}
