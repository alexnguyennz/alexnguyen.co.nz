/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      fontFamily: {
        sans: ["DM Sans", "sans-serif"],
      },
      typography: {
        DEFAULT: {
          css: {
            color: "#ecfeff",
            h2: {
              color: "#ecfeff",
            },
            a: {
              color: "#ecfeff",
            },
            code: {
              color: "#67e8f9",
            },
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("tailwindcss-animate")],
};
