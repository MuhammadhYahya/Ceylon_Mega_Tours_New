import { defineField, defineType } from "sanity";

export const review = defineType({
  name: "review",
  title: "Review",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Guest name",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({ name: "location", title: "City or country", type: "string" }),
    defineField({
      name: "rating",
      title: "Rating",
      type: "number",
      options: { list: [1, 2, 3, 4, 5] },
      initialValue: 5,
      validation: (r) => r.required().min(1).max(5),
    }),
    defineField({
      name: "quote",
      title: "Review text",
      type: "text",
      rows: 4,
      validation: (r) => r.required(),
    }),
    defineField({ name: "date", title: "Trip date", type: "date" }),
    defineField({
      name: "source",
      title: "Source",
      description: "Internal only — never shown to site visitors.",
      type: "string",
      options: { list: ["Google", "WhatsApp", "Email", "Website"] },
      initialValue: "Google",
    }),
    defineField({
      name: "published",
      title: "Published",
      type: "boolean",
      description:
        "Guest-submitted reviews (via the site's own form) are created with this already set to true — this toggle mainly matters for a review you draft by hand here in Studio.",
      initialValue: false,
    }),
  ],
  preview: { select: { title: "name", subtitle: "quote" } },
});
