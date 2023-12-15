/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            "--tw-prose-body": "black",
            "--tw-prose-invert-body": "white",
            "--tw-prose-links": "black",
            "--tw-prose-invert-links": "white",
            "--tw-prose-bullets": "black",
            "--tw-prose-invert-bullets": "white",
            maxWidth: "64rem",
            h2: {
              textAlign: "left",
            },
            a: {
              textDecoration: "none",
              fontWeight: 400,
            },
            li: {
              margin: 0,
            },
          },
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
