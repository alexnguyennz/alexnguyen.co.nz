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
            h1: {
              color: "#ecfeff",
            },
            h2: {
              color: "#ecfeff",
              textAlign: "left",
            },
            h3: {
              color: "#ecfeff",
              fontSize: "1.125rem",
            },
            a: {
              color: "#ecfeff",
              textDecoration: "none",
            },
            strong: {
              color: "#ecfeff",
            },
            code: {
              color: "#67e8f9",
            },
            ol: {
              li: {
                "&::marker": { color: "#ecfeff" },
              },
            },
            li: {
              margin: 0,
            },
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("tailwindcss-animate")],
};
