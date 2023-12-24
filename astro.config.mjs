import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import orama from "@orama/plugin-astro";

import rehypeExternalLinks from "rehype-external-links";
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
          "https://alexnguyen.co.nz/blog/third-party-authentication-with-surrealdb/" &&
        page !==
          "https://alexnguyen.co.nz/blog/astro-dark-mode-view-transitions/",
    }),
    expressiveCode({ themes: ["dracula"] }),
    orama({
      search: {
        pathMatcher: /^blog\/.+$/,
        contentSelectors: ["h1", "article"],
      },
    }),
  ],
  prefetch: true,
  markdown: {
    syntaxHighlight: false,
    remarkPlugins: [readingTime, modifiedTime],
    rehypePlugins: [
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
