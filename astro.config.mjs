import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import icon from "astro-icon";
import orama from "@orama/plugin-astro";
import astroExpressiveCode from "astro-expressive-code";
import { readingTime, modifiedTime } from "./src/lib/remark.mjs";

// https://astro.build/config
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
    orama({
      search: {
        pathMatcher: /^blog\/.+$/,
        contentSelectors: ["h1", "article"],
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
