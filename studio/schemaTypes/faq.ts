import { defineField, defineType } from "sanity";

export const faq = defineType({
  name: "faq",
  title: "Вопрос и ответ",
  type: "document",
  fields: [
    defineField({
      name: "question",
      title: "Вопрос",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "answer",
      title: "Ответ",
      type: "array",
      of: [{ type: "block" }],
      validation: (r) => r.required(),
    }),
    defineField({
      name: "order",
      title: "Порядок сортировки",
      type: "number",
      initialValue: 0,
    }),
  ],
  preview: { select: { title: "question" } },
});
