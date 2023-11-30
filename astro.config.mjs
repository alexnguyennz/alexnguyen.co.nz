import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import rehypeExternalLinks from "rehype-external-links";

// https://astro.build/config
export default defineConfig({
  site: "https://alexnguyen.co.nz",
  server: {
    port: 3000,
  },
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
  ],
  prefetch: true,
  markdown: {
    rehypePlugins: [
      [
        rehypeExternalLinks,
        {
          target: "_blank",
          rel: "noopener noreferrer nofollow",
          content: { type: "text", value: " ↗" },
        },
      ],
    ],
    shikiConfig: {
      theme: "dracula",
      wrap: true,
    },
  },
});
