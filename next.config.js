// MDX
const rehypePrism = require('@mapbox/rehype-prism');

const withMDX = require('@next/mdx')({
    extension: /\.mdx$/,
    options: {
        remarkPlugins: [],
        rehypePlugins: [rehypePrism],
    }
});
  

// Next.js recommends enabling Strict Mode to highlight potential problems in an app; identifies unsafe lifecycles, legacy API usage, other features
module.exports = withMDX(
    {
        pageExtensions: ['js', 'jsx', 'md', 'mdx'], // have Next.js treat .mdx in /pages as pages
        reactStrictMode: true,
        images: {
            loader: 'cloudinary',
            path: 'https://res.cloudinary.com/gladius/image/upload'
        }
    }
);

// MDX
/*const withMDX = require('@next/mdx')({
    extension: /\.mdx$/,
    options: {
        remarkPlugins: [],
        rehypePlugins: [],
      }
  })
  
module.exports = withMDX({
pageExtensions: ['js', 'jsx', 'md', 'mdx'] // treat .mdx files in /pages as pages
})

// Next.js recommends enabling Strict Mode to highlight potential problems in an app; identifies unsafe lifecycles, legacy API usage, other features
module.exports = {
    reactStrictMode: true,
    images: {
      domains: ['res.cloudinary.com'],
      //loader: 'cloudinary',
    },
}*/
