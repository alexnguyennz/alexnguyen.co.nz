const eslintPluginAstro = require("eslint-plugin-astro");
const eslintTypeScriptParser = require("@typescript-eslint/parser");
const eslintConfigPrettier = require("eslint-config-prettier");
const jsxA11y = require("eslint-plugin-jsx-a11y");

/** @type {import("eslint").Linter.Config} */
module.exports = [
  ...eslintPluginAstro.configs["flat/recommended"],
  eslintConfigPrettier,
  {
    languageOptions: {
      parser: eslintTypeScriptParser,
    },
    files: ["**/*.ts", "**/*.tsx", "**/*.js", "**/*.jsx"],
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
