import { defineField, defineType } from "sanity";

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
      name: "featured",
      title: "Show on homepage",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "highlights",
      title: "Highlights",
      description: "Site content, in Russian — one bullet per line.",
      type: "array",
      of: [{ type: "string" }],
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
      title: "What's included",
      description: "Site content, in Russian — one line per item.",
      type: "array",
      of: [{ type: "string" }],
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
