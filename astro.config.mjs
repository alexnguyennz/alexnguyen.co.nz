import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import netlify from "@astrojs/netlify/functions";
import image from '@astrojs/image';

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), image({
    serviceEntryPoint: '@astrojs/image/sharp'
  })],
  output: "server",
  adapter: netlify(),
  build: {
    inlineStylesheets: 'always'
  }
});