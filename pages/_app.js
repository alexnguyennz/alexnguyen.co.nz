// can only import global CSS files in _app.js
import '@styles/globals.css'

import "prismjs/themes/prism-okaidia.css"

import { MDXProvider } from '@mdx-js/react';
import MDXComponents from '@components/mdx';

import { AnimatePresence } from 'framer-motion'

// SEO 
import { DefaultSeo } from 'next-seo';

import Layout from '@components/layout'

export default function App({ Component, pageProps, router }) {

    const url = `https://alexnguyen.co.nz${router.route}`

    let pageTitle = router.pathname.charAt(1).toUpperCase() + router.pathname.slice(2);
    
    if (!pageTitle) pageTitle = 'Home';

    return (

        <>
        <DefaultSeo 
            title = {pageTitle + ' - Alex Nguyen'}
            description = "Alex Nguyen's website"
            openGraph = {{
                type: 'website',
                locale: 'en_IE',
                url: url,
                site_name: 'Alex Nguyen',
            }}
            additionalLinkTags={[
                {
                rel: 'icon',
                href: '/favicon.ico'
                }
            ]}
        />
        
        <AnimatePresence initial={false}>
            <MDXProvider components={MDXComponents}>
                <Component {...pageProps} />
            </MDXProvider>
        </AnimatePresence>
        </>

    )
}

/* 

import SEOConfig from 'seo.config';

SEOConfig.url = {url}; // replace SEOConfig's URL with current page route

<DefaultSeo {...SEOConfig} />
<DefaultSeo 
                openGraph = {{
                    type: 'website',
                    locale: 'en_IE',
                    url: url,
                    site_name: 'Alex Nguyen',
                }}
            />
            */

/*import { motion, animatePresence } from 'framer-motion';
<animatePresence
exitBeforeEnter
initial={false}
onExitComplete={() => window.scrollTo(0, 0)}
>
<Component {...pageProps} />
</animatePresence>*/