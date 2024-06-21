import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:4321",
    specPattern: "src/tests/e2e/**/*.cy.{js,jsx,ts,tsx}",
    supportFile: "src/tests/e2e/support.ts",
    fixturesFolder: false,
    screenshotOnRunFailure: false,
    video: false,
    defaultCommandTimeout: 10000,
  },
});
