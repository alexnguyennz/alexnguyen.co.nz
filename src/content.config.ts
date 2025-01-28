import { defineCollection, z, reference } from "astro:content";
import { glob } from "astro/loaders";

const pages = defineCollection({
  loader: glob({
    pattern: "**/[^_]*.{md,mdx}",
    base: "./src/content/pages",
  }),
});

const projects = defineCollection({
  loader: glob({
    pattern: "**/[^_]*.{md,mdx}",
    base: "./src/content/projects",
  }),
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
  loader: glob({
    pattern: "**/[^_]*.{md,mdx}",
    base: "./src/content/tags",
  }),
  schema: z.object({
    name: z.string(),
    url: z.string(),
  }),
});

const posts = defineCollection({
  loader: glob({
    pattern: "**/[^_]*.{md,mdx}",
    base: "./src/content/posts",
  }),
  schema: z.object({
    title: z.string(),
    date: z.date(),
    lastUpdated: z.date().optional(),
    tags: z.array(reference("tags")),
    description: z.string(),
    published: z.boolean(),
  }),
});

export const collections = { pages, projects, tags, posts };
