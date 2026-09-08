import { defineField, defineType } from "sanity";

export const galleryItem = defineType({
  name: "galleryItem",
  title: "Фото галереи",
  type: "document",
  fields: [
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
    defineField({ name: "title", title: "Подпись", type: "string" }),
    defineField({ name: "tag", title: "Метка", type: "string" }),
    defineField({
      name: "order",
      title: "Порядок сортировки",
      type: "number",
      initialValue: 0,
    }),
  ],
  preview: { select: { title: "title", subtitle: "tag", media: "image" } },
});
