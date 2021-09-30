import Link from 'next/link';
import { useRouter } from 'next/router';

import { motion } from 'framer-motion'; // Framer motion components
import FramerConfig from '@config/framer.config'; // Framer settings

import Head from 'next/head';


export default function Layout({ children, home, title }, props) {

    const router = useRouter();

    const pageName = 'alex nguyen';

    const navigation = [
        { name: 'Home', href: '/' },
        /* { name: 'Blog', href: '/blog' }, */
        { name: 'Projects', href: '/projects' },
        { name: 'Contact', href: '/contact' },
    ]

    const email = 'me@alexnguyen.co.nz';
    

  return (

    
    <div className="flex flex-col min-h-screen "> {/* turn "body" into vertical flex container with .flex/.flex-col */}
      
      <Head><title>{title} - {pageName}</title>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#ffc40d" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
     

     {/*  sm:px-16 md:px-36 lg:px-52 xl:px-80 2xl:px-96 pt-10* */}
      <header className="pt-5">
            <div className="container mx-auto flex w-full justify-between items-center px-5">
                <h1 className="text-white font-light text-2xl sm:text-4xl py-3 sm:py-2"><Link href="/"><a className="hover:no-underline">{pageName}</a></Link></h1>
                
                <nav>
                    <ul>
                        {navigation.map(( { name, href }) => (
                            <li key={name} className={`inline text-lg ${router.pathname == `${href}` ? "active-link" : ""}`}><Link href={href}><a className="p-4 hover:no-underline">{name}</a></Link></li>
                        ))}
                    </ul>
                </nav>
            </div>
      </header>
      
      <motion.main {...FramerConfig} className="container mx-auto flex-auto my-10 sm:my-20 px-5">{children}</motion.main> {/* flex-auto expands main to fill available space. */}

        <footer className="text-center bg-gray-100 py-4">
            
            <a href="https://github.com/alexnguyennz/" target="_blank" rel="noreferrer noopener nofollow" aria-label="GitHub"><div className="inline-block align-middle opacity-80 hover:opacity-100 transition duration-200 ease-in-out"><svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 496 512" height="24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z" stroke="none"/></svg></div></a><br />
            
            <a href={`mailto:${email}`}>{email}</a><br />
 
                Built with <a href="https://nextjs.org/" target="_blank" rel="noreferrer noopener nofollow" aria-label="Next.js"><div className="inline-block align-middle opacity-80 hover:opacity-100 transition duration-200 ease-in-out">
                    <svg viewBox="0.5 -0.2 1023 1024.1" height="24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M478.5.6c-2.2.2-9.2.9-15.5 1.4C317.7 15.1 181.6 93.5 95.4 214c-48 67-78.7 143-90.3 223.5C1 465.6.5 473.9.5 512s.5 46.4 4.6 74.5C32.9 778.6 169.6 940 355 999.8c33.2 10.7 68.2 18 108 22.4 15.5 1.7 82.5 1.7 98 0 68.7-7.6 126.9-24.6 184.3-53.9 8.8-4.5 10.5-5.7 9.3-6.7-.8-.6-38.3-50.9-83.3-111.7l-81.8-110.5L487 587.7c-56.4-83.4-102.8-151.6-103.2-151.6-.4-.1-.8 67.3-1 149.6-.3 144.1-.4 149.9-2.2 153.3-2.6 4.9-4.6 6.9-8.8 9.1-3.2 1.6-6 1.9-21.1 1.9h-17.3l-4.6-2.9c-3-1.9-5.2-4.4-6.7-7.3l-2.1-4.5.2-200.5.3-200.6 3.1-3.9c1.6-2.1 5-4.8 7.4-6.1 4.1-2 5.7-2.2 23-2.2 20.4 0 23.8.8 29.1 6.6 1.5 1.6 57 85.2 123.4 185.9s157.2 238.2 201.8 305.7l81 122.7 4.1-2.7c36.3-23.6 74.7-57.2 105.1-92.2 64.7-74.3 106.4-164.9 120.4-261.5 4.1-28.1 4.6-36.4 4.6-74.5s-.5-46.4-4.6-74.5C991.1 245.4 854.4 84 669 24.2 636.3 13.6 601.5 6.3 562.5 1.9c-9.6-1-75.7-2.1-84-1.3zM687.9 310c4.8 2.4 8.7 7 10.1 11.8.8 2.6 1 58.2.8 183.5l-.3 179.8-31.7-48.6-31.8-48.6V457.2c0-84.5.4-132 1-134.3 1.6-5.6 5.1-10 9.9-12.6 4.1-2.1 5.6-2.3 21.3-2.3 14.8 0 17.4.2 20.7 2z"/><path d="M784.3 945.1c-3.5 2.2-4.6 3.7-1.5 2 2.2-1.3 5.8-4 5.2-4.1-.3 0-2 1-3.7 2.1zm-6.9 4.5c-1.8 1.4-1.8 1.5.4.4 1.2-.6 2.2-1.3 2.2-1.5 0-.8-.5-.6-2.6 1.1zm-5 3c-1.8 1.4-1.8 1.5.4.4 1.2-.6 2.2-1.3 2.2-1.5 0-.8-.5-.6-2.6 1.1zm-5 3c-1.8 1.4-1.8 1.5.4.4 1.2-.6 2.2-1.3 2.2-1.5 0-.8-.5-.6-2.6 1.1zm-7.6 4c-3.8 2-3.6 2.8.2.9 1.7-.9 3-1.8 3-2 0-.7-.1-.6-3.2 1.1z"/></svg>
                </div></a>
        </footer>

    </div>
  )
}