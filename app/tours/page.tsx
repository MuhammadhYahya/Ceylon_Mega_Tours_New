import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import ToursFilter from "@/components/tours/ToursFilter";
import EnquiryCta from "@/components/sections/EnquiryCta";
import { packages } from "@/lib/content/packages";

export const metadata: Metadata = {
  title: "Турпакеты",
  description:
    "Частные турпакеты по Шри-Ланке: культура, побережье, дикая природа и горы. Русскоговорящий гид, трансфер и входные билеты включены.",
  alternates: { canonical: "/tours" },
};

export default function ToursPage() {
  return (
    <>
      <PageHero
        eyebrow="Турпакеты"
        title="Частные туры для каждого настроения поездки"
        lead="От однодневных экскурсий до маршрутов с ночёвкой — каждый пакет организован в частном формате, с русскоговорящим гидом и без спешки групповых туров."
      />

      <section className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-20">
        <ToursFilter packages={packages} />
      </section>

      <EnquiryCta />
    </>
  );
}
