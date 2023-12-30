import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:4321",
    fixturesFolder: false,
    screenshotOnRunFailure: false,
    video: false,
  },
});
