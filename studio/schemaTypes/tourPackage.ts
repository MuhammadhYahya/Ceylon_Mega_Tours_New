import { defineField, defineType } from "sanity";

export const tourPackage = defineType({
  name: "tourPackage",
  title: "Турпакет",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Название",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "Ссылка (slug)",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "summary",
      title: "Краткое описание",
      type: "text",
      rows: 3,
      validation: (r) => r.required().max(220),
    }),
    defineField({
      name: "category",
      title: "Категория",
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
      title: "Цена от (USD)",
      type: "number",
      description:
        "Необязательно. Если поле пустое, цена на сайте не показывается вообще. Заполните, когда будете готовы её опубликовать.",
      validation: (r) => r.positive(),
    }),
    defineField({
      name: "duration",
      title: "Длительность",
      type: "string",
      description: "Например: 5 дней",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "difficulty",
      title: "Сложность",
      type: "string",
      options: { list: ["Лёгкая", "Средняя", "Высокая"] },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "image",
      title: "Главное фото",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Альтернативный текст",
          type: "string",
          description: "Описание фото для читателей экрана и поисковиков.",
          validation: (r) => r.required(),
        }),
      ],
      validation: (r) => r.required(),
    }),
    defineField({
      name: "featured",
      title: "Показывать на главной",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "highlights",
      title: "Ключевые моменты",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "itinerary",
      title: "Маршрут по дням",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "day", title: "День", type: "string" }),
            defineField({ name: "title", title: "Заголовок", type: "string" }),
            defineField({
              name: "description",
              title: "Описание",
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
      title: "Что включено",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "order",
      title: "Порядок сортировки",
      type: "number",
      initialValue: 0,
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "category", media: "image" },
  },
});
