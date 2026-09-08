import { defineField, defineType } from "sanity";

/**
 * Singleton. Contact details and headline copy the client may want to change
 * without a developer. Keep this small — it is settings, not a page builder.
 */
export const siteSettings = defineType({
  name: "siteSettings",
  title: "Настройки сайта",
  type: "document",
  fields: [
    defineField({
      name: "whatsappNumber",
      title: "Номер WhatsApp",
      type: "string",
      description: "Только цифры, без + и пробелов. Например: 94778000008",
      validation: (r) => r.required().regex(/^\d{8,15}$/),
    }),
    defineField({
      name: "phoneDisplay",
      title: "Телефон для показа",
      type: "string",
      description: "Как номер отображается на сайте. Например: +94 77 800 0008",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      validation: (r) => r.required().email(),
    }),
    defineField({
      name: "heroTitle",
      title: "Заголовок на главной",
      type: "string",
      validation: (r) => r.max(80),
    }),
    defineField({
      name: "heroText",
      title: "Текст под заголовком",
      type: "text",
      rows: 3,
      validation: (r) => r.max(300),
    }),
    defineField({
      name: "yearsExperience",
      title: "Лет опыта",
      type: "string",
      description: "Например: 15+",
    }),
    defineField({
      name: "googleRating",
      title: "Оценка Google",
      type: "number",
      validation: (r) => r.min(0).max(5),
    }),
    defineField({
      name: "googleReviewCount",
      title: "Количество отзывов Google",
      type: "number",
    }),
  ],
  preview: {
    prepare: () => ({ title: "Настройки сайта" }),
  },
});
