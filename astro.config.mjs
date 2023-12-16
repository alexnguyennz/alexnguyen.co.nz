import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import rehypeExternalLinks from "rehype-external-links";
import rehypePrettyCode from "rehype-pretty-code";
import expressiveCode from "astro-expressive-code";
import { readingTime, modifiedTime } from "./src/lib/remark.mjs";

// https://astro.build/config
export default defineConfig({
  site: "https://alexnguyen.co.nz",
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false,
    }),
    sitemap({
      filter: (page) =>
        page !==
        "https://alexnguyen.co.nz/blog/third-party-authentication-with-surrealdb/",
    }),
    expressiveCode({ themes: ["dracula"] }),
  ],
  prefetch: true,
  markdown: {
    syntaxHighlight: false,
    remarkPlugins: [readingTime, modifiedTime],
    rehypePlugins: [
      [
        rehypePrettyCode,
        {
          theme: "github-dark",
        },
      ],
      [
        rehypeExternalLinks,
        {
          target: "_blank",
          rel: "noopener noreferrer nofollow",
          content: {
            type: "text",
            value: " ↗",
          },
        },
      ],
    ],
  },
});
