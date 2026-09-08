/**
 * Single source of truth for business constants.
 * Anything a client might one day want to edit belongs in Sanity instead —
 * this file holds only what is structural to the site.
 */
export const site = {
  name: "Ceylon Mega Tours",
  url: "https://www.ceylonmegatours.com",
  locale: "ru_RU",
  lang: "ru",

  email: "info@ceylonmegatours.com",
  phoneDisplay: "+94 77 800 0008",
  // wa.me requires digits only, no +, spaces or dashes
  whatsappNumber: "94778000008",

  // Mirrors siteSettings.googleRating / googleReviewCount in Sanity. Update
  // both here and in the Studio until the homepage query is wired to read
  // this live instead.
  googleRating: 5.0,
  googleReviewCount: 12,
} as const;

/** Prefilled WhatsApp deep link. `text` is encoded for us. */
export function whatsappLink(
  text =
    "Здравствуйте! Хотелось бы узнать больше об услугах, предоставляемых компанией Ceylon Mega Tours."
) {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(text)}`;
}

export const nav = [
  { href: "/about", label: "Обо мне" },
  { href: "/services", label: "Услуги" },
  { href: "/tours", label: "Пакеты" },
  { href: "/destinations", label: "Направления" },
  { href: "/reviews", label: "Отзывы" },
  { href: "/contact", label: "Запрос" },
] as const;
