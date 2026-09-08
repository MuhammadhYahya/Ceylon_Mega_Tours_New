import { defineField, defineType } from "sanity";

export const destination = defineType({
  name: "destination",
  title: "Направление",
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
      name: "tag",
      title: "Метка",
      type: "string",
      description: "Например: Культура, Чайный регион, Южное побережье",
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
      name: "image",
      title: "Фото",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Альтернативный текст",
          type: "string",
          validation: (r) => r.required(),
        }),
      ],
      validation: (r) => r.required(),
    }),
    defineField({
      name: "body",
      title: "Подробное описание",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "featured",
      title: "Показывать на главной",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "order",
      title: "Порядок сортировки",
      type: "number",
      initialValue: 0,
    }),
  ],
  preview: { select: { title: "title", subtitle: "tag", media: "image" } },
});
