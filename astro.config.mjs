import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import netlify from "@astrojs/netlify/functions";

export default defineConfig({
  server: {
    port: 3000
  },
  integrations: [tailwind()],
  output: "server",
  adapter: netlify(),
  build: {
    inlineStylesheets: 'always'
  }
});