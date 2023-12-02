module.exports = {
  "*.{js,jsx,ts,tsx,astro}": [
    "npx eslint --ext .js,.jsx,.ts,.tsx,.astro . --fix",
    "npx eslint --ext .js,.jsx,.ts,.tsx,.astro .",
  ],
};
