import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import FeaturedPackages from "@/components/sections/FeaturedPackages";
import Destinations from "@/components/sections/Destinations";
import ReviewsTeaser from "@/components/sections/ReviewsTeaser";
import EnquiryCta from "@/components/sections/EnquiryCta";
import { site, whatsappLink } from "@/lib/site";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  name: site.name,
  url: site.url,
  email: site.email,
  telephone: site.phoneDisplay,
  areaServed: { "@type": "Country", name: "Sri Lanka" },
  availableLanguage: ["ru", "en"],
  sameAs: [whatsappLink()],
  description:
    "Частные туры по Шри-Ланке, встречи в аэропорту и комфортный транспорт для русскоязычных гостей.",
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        // Static, author-controlled object — no user input reaches this string.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <Services />
      <FeaturedPackages />
      <Destinations />
      <ReviewsTeaser />
      <EnquiryCta />
    </>
  );
}
