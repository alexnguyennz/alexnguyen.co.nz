/// <reference types="vitest" />
import { getViteConfig } from "astro/config";
import path from "path";

export default getViteConfig({
  resolve: {
    alias: {
      "@/": path.resolve(__dirname, "./src"),
    },
  },
});
