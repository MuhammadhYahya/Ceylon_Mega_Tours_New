import { defineField, defineType } from "sanity";

/**
 * Singleton. Contact details and headline copy the client may want to change
 * without a developer. Keep this small — it is settings, not a page builder.
 */
export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "whatsappNumber",
      title: "WhatsApp number",
      type: "string",
      description: "Digits only, no + or spaces. Example: 94778000008",
      validation: (r) => r.required().regex(/^\d{8,15}$/),
    }),
    defineField({
      name: "phoneDisplay",
      title: "Phone (display format)",
      type: "string",
      description: "How the number is shown on the site. Example: +94 77 800 0008",
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
      title: "Homepage headline",
      description: "Site content, in Russian.",
      type: "string",
      validation: (r) => r.max(80),
    }),
    defineField({
      name: "heroText",
      title: "Homepage subtext",
      description: "Site content, in Russian.",
      type: "text",
      rows: 3,
      validation: (r) => r.max(300),
    }),
    defineField({
      name: "yearsExperience",
      title: "Years of experience",
      type: "string",
      description: 'Example: "15+"',
    }),
    defineField({
      name: "googleRating",
      title: "Google rating",
      type: "number",
      validation: (r) => r.min(0).max(5),
    }),
    defineField({
      name: "googleReviewCount",
      title: "Google review count",
      type: "number",
    }),
  ],
  preview: {
    prepare: () => ({ title: "Site Settings" }),
  },
});
