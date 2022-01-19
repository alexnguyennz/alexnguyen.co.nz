import type { AppProps } from 'next/app';

// Libraries
import { MDXProvider } from '@mdx-js/react';
import MDXComponents from '@components/mdx';

import { AnimatePresence } from 'framer-motion';

import { DefaultSeo } from 'next-seo';

import '../styles/globals.css';
import '../styles/hack.css';

const App = ({ Component, pageProps, router }: AppProps) => {

    const url = `https://alexnguyen.co.nz${router.route}`;

    const pageTitle = router.pathname.charAt(1).toUpperCase() + router.pathname.slice(2);
    
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