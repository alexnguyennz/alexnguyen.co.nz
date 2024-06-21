const eslintPluginAstro = require("eslint-plugin-astro");
const eslintConfigPrettier = require("eslint-config-prettier");
const jsxA11y = require("eslint-plugin-jsx-a11y");

/** @type {import("eslint").Linter.Config} */
module.exports = [
  ...eslintPluginAstro.configs["flat/recommended"],
  eslintConfigPrettier,
  {
    files: ["**/*.ts", "**/*.tsx", "**/*.js", "**/*.jsx", "**/*.astro"],
    plugins: {
      "jsx-a11y": jsxA11y,
    },
    rules: {
      "astro/no-conflict-set-directives": "error",
      "astro/no-unused-define-vars-in-style": "error",
      "jsx-a11y/control-has-associated-label": "error",
    },
  },
];
