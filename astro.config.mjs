import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import prefetch from "@astrojs/prefetch";
import sitemap from "@astrojs/sitemap";

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
    prefetch(),
    sitemap(),
  ],
});
