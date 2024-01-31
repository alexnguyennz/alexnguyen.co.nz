import { defineCollection, z, reference } from "astro:content";

const tools = defineCollection({
  type: "content",
  schema: z.object({
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
      cover: image().optional(),
      image: image(),
      url: z.string(),
      source: z.string().optional(),
      tags: z.array(reference("tags")),
      order: z.number(),
    }),
});

const tags = defineCollection({
  type: "content",
  schema: z.object({
    name: z.string(),
    url: z.string(),
  }),
});

const posts = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    date: z.date(),
    lastUpdated: z.date().optional(),
    tags: z.array(reference("tags")),
    description: z.string(),
    published: z.boolean(),
  }),
});

export const collections = { tools, projects, tags, posts };
