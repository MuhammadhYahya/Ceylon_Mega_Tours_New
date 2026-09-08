import type { Destination } from "@/lib/types";

/**
 * Six photos cover six destinations, with Mirissa reusing Galle's coastal
 * shot — the only unavoidable repeat given the current asset count. Each
 * needs its own photograph; that is what the Sanity image field is for.
 */
export const destinations: Destination[] = [
  {
    slug: "sigiriya",
    title: "Сигирия",
    tag: "Культура",
    summary:
      "Яркий культурный символ с впечатляющими видами и доступом к сердцу исторической Шри-Ланки.",
    image: { src: "/images/sigiriya.jpg", alt: "Скала Сигирия" },
    relatedTourSlugs: [
      "sigiriya-dambulla",
      "dream-tour",
      "majestic-island",
      "culture-experience",
    ],
  },
  {
    slug: "ella",
    title: "Элла",
    tag: "Чайный регион",
    summary:
      "Свежий воздух чайного региона, горные виды и один из самых спокойных живописных уголков острова.",
    image: { src: "/images/train.jpg", alt: "Поезд в горах у Эллы" },
    relatedTourSlugs: [
      "ella-hill-country",
      "ella-yala-safari",
      "majestic-island",
      "pearl-of-sri-lanka",
    ],
  },
  {
    slug: "galle",
    title: "Галле",
    tag: "Южное побережье",
    summary:
      "Исторический форт, уютная атмосфера и элегантный выход к южному побережью.",
    image: { src: "/images/coast.jpg", alt: "Галле, южное побережье" },
    relatedTourSlugs: ["galle-river-safari"],
  },
  {
    slug: "kandy",
    title: "Канди",
    tag: "Горы и святыни",
    summary:
      "Храм Зуба Будды, ботанический сад Перадении и чайные плантации в прохладном горном климате.",
    image: { src: "/images/tea.jpg", alt: "Чайные плантации у Канди" },
    relatedTourSlugs: ["last-kingdom-kandy", "pearl-of-sri-lanka", "culture-experience"],
  },
  {
    slug: "yala",
    title: "Яла",
    tag: "Дикая природа",
    summary:
      "Один из главных национальных парков острова: леопарды, слоны и джип-сафари среди золотых саванн.",
    image: { src: "/images/elephant.jpg", alt: "Слоны в национальном парке Яла" },
    relatedTourSlugs: ["yala-jungle-safari", "ella-yala-safari"],
  },
  {
    slug: "mirissa",
    title: "Мирисса",
    tag: "Океан",
    summary:
      "Отправная точка для наблюдения за китами и дельфинами, с песчаным пляжем и спокойным ритмом побережья.",
    image: { src: "/images/coast.jpg", alt: "Побережье Мириссы" },
    relatedTourSlugs: ["whale-watching-mirissa"],
  },
];

export function getDestinationBySlug(slug: string) {
  return destinations.find((d) => d.slug === slug);
}
