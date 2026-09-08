import { defineField, defineType } from "sanity";

export const service = defineType({
  name: "service",
  title: "Услуга",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Название",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "eyebrow",
      title: "Надзаголовок",
      type: "string",
      description: "Короткая строка над названием, например: Готово к прилёту",
    }),
    defineField({
      name: "description",
      title: "Описание",
      type: "text",
      rows: 3,
      validation: (r) => r.required().max(240),
    }),
    defineField({
      name: "icon",
      title: "Иконка",
      type: "string",
      description: "Имя иконки, используемой на сайте.",
      options: { list: ["compass", "plane", "car", "map", "shield", "users"] },
      initialValue: "compass",
    }),
    defineField({
      name: "order",
      title: "Порядок сортировки",
      type: "number",
      initialValue: 0,
    }),
  ],
  preview: { select: { title: "title", subtitle: "eyebrow" } },
});
