import { defineField, defineType } from "sanity";

export const review = defineType({
  name: "review",
  title: "Отзыв",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Имя гостя",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({ name: "location", title: "Город или страна", type: "string" }),
    defineField({
      name: "rating",
      title: "Оценка",
      type: "number",
      options: { list: [1, 2, 3, 4, 5] },
      initialValue: 5,
      validation: (r) => r.required().min(1).max(5),
    }),
    defineField({
      name: "quote",
      title: "Текст отзыва",
      type: "text",
      rows: 4,
      validation: (r) => r.required(),
    }),
    defineField({ name: "date", title: "Дата поездки", type: "date" }),
    defineField({
      name: "source",
      title: "Источник",
      type: "string",
      options: { list: ["Google", "WhatsApp", "Email", "Сайт"] },
      initialValue: "Google",
    }),
    defineField({
      name: "published",
      title: "Опубликован",
      type: "boolean",
      description: "Отзывы показываются на сайте только после проверки.",
      initialValue: false,
    }),
  ],
  preview: { select: { title: "name", subtitle: "quote" } },
});
