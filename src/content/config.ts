import { defineCollection, z, reference } from "astro:content";

const tools = defineCollection({
  type: "content",
  schema: () =>
    z.object({
      name: z.string(),
      url: z.string(),
      order: z.number(),
    }),
});

const projects = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      description: z.string(),
      cover: image(),
      image: image(),
      url: z.string(),
      tags: z.array(reference("tags")),
      order: z.number(),
    }),
});

const tags = defineCollection({
  type: "content",
  schema: () =>
    z.object({
      name: z.string(),
      url: z.string(),
    }),
});

export const collections = { tools, projects, tags };
