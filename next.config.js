// MDX
const rehypePrism = require('@mapbox/rehype-prism');

const withMDX = require('@next/mdx')({
    extension: /\.mdx$/,
    options: {
        remarkPlugins: [],
        rehypePlugins: [rehypePrism],
    }
});


const securityHeaders = [
    {
        key: 'Strict-Transport-Security', // informs browsers site should only be accessed using HTTPS for a max-age of 2 years
        value: 'max-age=63072000; includeSubDomains; preload'
    },
    {
        key: 'Content-Security-Policy',  // specify allowed origins for content - help prevent XSS, clickjacking and other code injection attacks
        value: `img-src 'self' *.cloudinary.com data:; media-src 'self' *.cloudinary.com; script-src 'self'; frame-ancestors 'none'`
    },
    {
        key: 'X-XSS-Protection', // stops pages from loading when reflected XSS attacks are detected
        value: '1; mode=block'
    },
    {
        key: 'X-Content-Type-Options',  // prevents browser from attempting to guess type of content if Content-Type header is not explicitly set
        value: 'nosniff'
    },
    {
        key: 'X-Frame-Options', // only allow site to be in iframe with same origin; superceded by CSP's frame-ancestors
        value: 'DENY'
    },
    {
        key: 'Referrer-Policy', // controls how much information the browser includes when navigating from the current website (origin) to another.
        value: 'strict-origin-when-cross-origin' 
    },
    {
        key: 'X-DNS-Prefetch-Control', // allows browsers to perform DNS on external links, images, CSS, JS
        value: 'on'
    },
    {
        key: 'Permissions-Policy',
        value: 'accelerometer=(), camera=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), payment=(), usb=()'
    }
];

/* */

// Next.js recommends enabling Strict Mode to highlight potential problems in an app; identifies unsafe lifecycles, legacy API usage, other features
module.exports = withMDX(
    {
        pageExtensions: ['js', 'jsx', 'md', 'mdx'], // have Next.js treat .mdx in /pages as pages
        reactStrictMode: true,
        images: {
            loader: 'cloudinary',
            path: 'https://res.cloudinary.com/gladius/image/upload'
        },
        i18n: {
            locales: ['en'],
            defaultLocale: 'en',
        },
        compress: true, /* gzip compression to compress rendered content and static files */
        /*
        async headers() {
            return [
                {
                    // Apply these headers to all routes in your application
                    source: '/(.*)',
                    headers: securityHeaders,
                },
            ]
        },
        */
    }
);