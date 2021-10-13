import type { AppProps } from 'next/app';

// Libraries
import { MDXProvider } from '@mdx-js/react';
import MDXComponents from '@components/mdx';

import { AnimatePresence } from 'framer-motion';

import { DefaultSeo } from 'next-seo';

import '../styles/globals.css';
import '../styles/hack.css';

function App({ Component, pageProps, router }: AppProps): JSX.Element {

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
        />
        
        <AnimatePresence initial={false}>
            <MDXProvider components={MDXComponents}>
                <Component {...pageProps} />
            </MDXProvider>
        </AnimatePresence>
        </>
    )
}

export default App;