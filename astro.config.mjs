import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import icon from "astro-icon";
import astroExpressiveCode from "astro-expressive-code";
import { readingTime, modifiedTime } from "./src/lib/remark.mjs";

export default defineConfig({
  site: "https://alexnguyen.co.nz",
  integrations: [
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
    icon({
      iconDir: "src/assets/icons",
      include: {
        lucide: [
          "info",
          "hammer",
          "sun-medium",
          "moon",
          "search",
          "rss",
          "arrow-right",
        ],
      },
      svgoOptions: {
        plugins: [
          {
            name: "inlineStyles",
            params: {
              onlyMatchedOnce: false,
            },
          },
        ],
      },
    }),
    astroExpressiveCode({ themes: ["dracula"] }),
  ],
  prefetch: {
    prefetchAll: true,
  },
  markdown: {
    syntaxHighlight: false,
    remarkPlugins: [readingTime, modifiedTime],
  },
});
