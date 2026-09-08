import { defineField, defineType } from "sanity";

export const service = defineType({
  name: "service",
  title: "Service",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "eyebrow",
      title: "Eyebrow",
      type: "string",
      description: 'Short line above the title, site content in Russian. Example: "Готово к прилёту"',
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      validation: (r) => r.required().max(240),
    }),
    defineField({
      name: "icon",
      title: "Icon",
      type: "string",
      description: "Icon name used on the site — this is a technical value, not translated content.",
      options: { list: ["compass", "plane", "car", "map", "shield", "users"] },
      initialValue: "compass",
    }),
    defineField({
      name: "details",
      title: "Details",
      description: "Bullet points shown on the dedicated /services page. Site content, in Russian.",
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
  preview: { select: { title: "title", subtitle: "eyebrow" } },
});
