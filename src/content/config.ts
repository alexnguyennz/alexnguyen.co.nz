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
      source: z.string().optional(),
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

const posts = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      date: z.date(),
      image: image(),
      tags: z.array(reference("tags")),
      published: z.boolean(),
    }),
});

const notes = defineCollection({
  type: "content",
  schema: () =>
    z.object({
      title: z.string(),
      date: z.date(),
    }),
});

export const collections = { tools, projects, tags, posts, notes };
