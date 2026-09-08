import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import DestinationCard from "@/components/ui/DestinationCard";
import EnquiryCta from "@/components/sections/EnquiryCta";
import { destinations } from "@/lib/content/destinations";

export const metadata: Metadata = {
  title: "Направления",
  description:
    "Сигирия, Элла, Галле, Канди, Яла и Мирисса — места по всей Шри-Ланке, куда чаще всего едут гости Ceylon Mega Tours.",
  alternates: { canonical: "/destinations" },
};

export default function DestinationsPage() {
  return (
    <>
      <PageHero
        eyebrow="Направления"
        title="Остров, который стоит увидеть не спеша"
        lead="От древних крепостей до чайных гор и дикой природы — подборка мест, вокруг которых строятся частные маршруты Ceylon Mega Tours."
      />

      <section className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-20">
        <ul className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {destinations.map((dest) => (
            <li key={dest.slug}>
              <DestinationCard dest={dest} />
            </li>
          ))}
        </ul>
      </section>

      <EnquiryCta />
    </>
  );
}
