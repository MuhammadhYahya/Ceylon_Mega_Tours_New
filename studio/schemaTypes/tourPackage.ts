import { defineField, defineType } from "sanity";
import { TOUR_ICON_OPTIONS } from "./tourIconOptions";

/**
 * Wording for the little pills on a programme card. A fixed list, not free
 * text: these are claims the business is making about a tour ("ТОП ВЫБОР"),
 * so they stay deliberate and consistently worded rather than being invented
 * per card — or worse, assigned automatically by position.
 */
const BADGE_OPTIONS = [
  "ТОП ВЫБОР",
  "РАННИЙ СТАРТ",
  "ВЫБОР ГОСТЕЙ",
  "ОБЯЗАТЕЛЬНО УВИДЕТЬ",
  "ЛУЧШИЙ ФОТОСТОП",
  "ОТЛИЧНО С ДЕТЬМИ",
];

/**
 * Icon picker, shared by programme steps and inclusions. `icon` covers the
 * common case from a fixed set; `iconImage` is the escape hatch for artwork
 * the set doesn't have (there is no whale, dolphin or elephant in it) and
 * wins over `icon` when both are filled.
 */
const iconFields = [
  defineField({
    name: "icon",
    title: "Icon",
    description:
      "Site content — pick the icon shown in the circle. Leave empty for a neutral default.",
    type: "string",
    options: { list: TOUR_ICON_OPTIONS },
  }),
  defineField({
    name: "iconImage",
    title: "Custom icon (overrides the choice above)",
    description:
      "Optional. Upload your own drawing when nothing in the list fits — a whale or an elephant, say. Use a square PNG or SVG with a transparent background.",
    type: "image",
  }),
];

/**
 * Sanity's built-in slugifier strips Cyrillic, so a Russian title would
 * generate an empty slug. Transliterate to Latin instead — that keeps URLs
 * shareable in messengers, where percent-encoded Cyrillic turns unreadable.
 */
const RU_TO_LATIN: Record<string, string> = {
  а: "a", б: "b", в: "v", г: "g", д: "d", е: "e", ё: "e", ж: "zh",
  з: "z", и: "i", й: "y", к: "k", л: "l", м: "m", н: "n", о: "o",
  п: "p", р: "r", с: "s", т: "t", у: "u", ф: "f", х: "kh", ц: "ts",
  ч: "ch", ш: "sh", щ: "shch", ъ: "", ы: "y", ь: "", э: "e", ю: "yu",
  я: "ya",
};

function slugifyRu(input: string): string {
  return input
    .toLowerCase()
    .split("")
    .map((char) => RU_TO_LATIN[char] ?? char)
    .join("")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 96);
}

export const tourPackage = defineType({
  name: "tourPackage",
  title: "Tour Package",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96, slugify: slugifyRu },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "summary",
      title: "Summary",
      type: "text",
      rows: 3,
      validation: (r) => r.required().max(220),
    }),
    defineField({
      name: "category",
      title: "Category",
      description:
        "Site content — the value shown as the category badge on the site is in Russian, since the site is Russian-only.",
      type: "string",
      options: {
        list: [
          "История и культура",
          "Горы и чай",
          "Побережье",
          "Океан и рыбалка",
          "Дикая природа",
          "Шопинг и ремёсла",
        ],
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "priceUsd",
      title: "Price from (USD)",
      type: "number",
      description:
        "Optional. If left empty, no price is shown on the site at all. Fill in when ready to publish a price.",
      validation: (r) => r.positive(),
    }),
    defineField({
      name: "duration",
      title: "Duration",
      type: "string",
      description: 'Site content, in Russian. Example: "5 дней"',
      validation: (r) => r.required(),
    }),
    defineField({
      name: "suitableFor",
      title: "Suitable for",
      description:
        "Optional. Tick everyone this tour suits — shown on the site as tags, in Russian. Leave empty to show nothing.",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          "Семьи с детьми",
          "Пары",
          "Компании друзей",
          "Соло-путешественники",
          "Пожилые гости",
        ],
        layout: "grid",
      },
    }),
    defineField({
      name: "image",
      title: "Main photo",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt text",
          type: "string",
          description: "Site content, in Russian — read by screen readers and search engines.",
          validation: (r) => r.required(),
        }),
      ],
      validation: (r) => r.required(),
    }),
    defineField({
      name: "gallery",
      title: "Photo gallery",
      description:
        "Optional. Extra photos for this tour, shown as a scrollable filmstrip under the main photo — a visitor clicks one to move it into the large frame. Leave empty and only the main photo is shown, with no filmstrip.",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Alt text",
              type: "string",
              description:
                "Site content, in Russian — read by screen readers and search engines.",
              validation: (r) => r.required(),
            }),
          ],
        },
      ],
      options: { layout: "grid" },
    }),
    defineField({
      name: "featured",
      title: "Show on homepage",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "highlights",
      title: "Highlights (legacy)",
      description:
        "Older, plain-text version of the programme — one bullet per line. Used only when «Tour programme» below is empty, so a tour that hasn't been upgraded still renders. Fill in «Tour programme» instead for new work.",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "programme",
      title: "Tour programme",
      description:
        "Site content, in Russian — the steps shown along the winding path. Order here is the order on the site, and steps are numbered 01, 02, … automatically.",
      type: "array",
      of: [
        {
          type: "object",
          name: "programmeStep",
          fields: [
            defineField({
              name: "title",
              title: "Title",
              description: "The bold line on the card. Keep it short — 2–5 words reads best.",
              type: "string",
              validation: (r) => r.required(),
            }),
            defineField({
              name: "subtitle",
              title: "Subtitle",
              description:
                "Optional. The smaller line under the title — one short sentence about what the guest actually does.",
              type: "string",
            }),
            ...iconFields,
            defineField({
              name: "badge",
              title: "Badge",
              description:
                "Optional pill above the card. Only add one where it is actually true — they read as a promise.",
              type: "string",
              options: { list: BADGE_OPTIONS },
            }),
            defineField({
              name: "day",
              title: "Day",
              description:
                'Optional, for multi-day tours — e.g. "День 1". Steps sharing a day are grouped under one heading.',
              type: "string",
            }),
          ],
          preview: {
            select: { title: "title", subtitle: "subtitle", media: "iconImage" },
          },
        },
      ],
    }),
    defineField({
      name: "itinerary",
      title: "Day-by-day itinerary",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "day", title: "Day", type: "string" }),
            defineField({ name: "title", title: "Title", type: "string" }),
            defineField({
              name: "description",
              title: "Description",
              type: "text",
              rows: 3,
            }),
          ],
          preview: { select: { title: "title", subtitle: "day" } },
        },
      ],
    }),
    defineField({
      name: "inclusions",
      title: "What's included (legacy)",
      description:
        "Older, plain-text version — one line per item. Used only when «What's included» below is empty. Fill in that one instead for new work.",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "inclusionItems",
      title: "What's included",
      description:
        "Site content, in Russian. Each item becomes a compact card with an icon — pick one below, or leave it and a neutral default is shown.",
      type: "array",
      of: [
        {
          type: "object",
          name: "inclusionItem",
          fields: [
            defineField({
              name: "text",
              title: "Text",
              type: "string",
              validation: (r) => r.required(),
            }),
            ...iconFields,
          ],
          preview: { select: { title: "text", media: "iconImage" } },
        },
      ],
    }),
    defineField({
      name: "order",
      title: "Sort order",
      type: "number",
      initialValue: 0,
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "category", media: "image" },
  },
});
