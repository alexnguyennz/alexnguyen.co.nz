/** @type {import("eslint").Linter.Config} */
module.exports = {
  parser: "@typescript-eslint/parser",
  extends: ["plugin:astro/recommended", "plugin:astro/jsx-a11y-recommended"],
  overrides: [
    {
      files: ["*.astro"],
      parser: "astro-eslint-parser",
      parserOptions: {
        parser: "@typescript-eslint/parser",
        extraFileExtensions: [".astro"],
      },
      rules: {
        "astro/no-conflict-set-directives": "error",
        "astro/no-unused-define-vars-in-style": "error",
        "jsx-a11y/control-has-associated-label": "error",
      },
    },
  ],
};
