module.exports = {
    purge: [
        './pages/**/*.{js,jsx,ts,tsx,md,mdx}',
        './components/**/*.{js,jsx,ts,tsx,md,mdx}',
    ],
    darkMode: 'media', // media = enabled, class to toggle dark mode manually
    theme: {
        extend: {
            screens: {
                'xs': '480px'
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
}
