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
            "--tw-prose-code": theme("colors.red[500]"),
            "--tw-prose-invert-code": theme("colors.red[300]"),
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
            figure: {
              marginTop: 0,
            },
            figcaption: {
              display: "inline-block",
              marginTop: 0,
              padding: "0.5rem",
              backgroundColor: "#24292e" /* github-dark */,
              color: "#E1E4E8" /* github-dark */,
              borderBottom: "2px solid #4A88C7" /* WebStorm tab */,
            },
            pre: {
              borderRadius: 0,
            },
          },
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
