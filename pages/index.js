import Layout from '@components/layout';
import Link from 'next/link';

import fs from 'fs';
import path from 'path';

const pageTitle = 'Home';

export default function Page( { blogMetadata, projectsMetadata } ) {
    return (
        <Layout title={pageTitle} >

      <section className="mb-10">
        <p>Hi, I&apos;m Alex and I work in IT. I&apos;m based in Wellington, New Zealand.</p>

        <p>I like to dabble in various technologies and projects. This site is a showcase of things I&apos;ve done.</p>
        
        <p>All my projects can be <Link href="/projects"><a>found here</a></Link>. I plan to write articles eventually once I&apos;m happy with this site (which may never happen).</p>
      </section>

        <section>
            <div className="flex">
            {/*<div className="flex flex-col w-full items-center">
                <h2 className="text-xl font-semibold">Latest Posts</h2>

                
                {blogMetadata.slice(0, 3).map(({ id, title, description, date }) => (
                    <div key={id}>
                        <p><Link href={`/blog/${id}`}><a>{title}</a></Link><br />
                        {date}<br />
                        {description}<br />
                        </p>
                    </div>
                ))} 
            </div>*/}

            <div className="flex flex-col w-full items-center text-center">
                <h2 className="text-xl font-semibold">Latest Project</h2>

                {projectsMetadata.slice(0, 1).map(({ id, title, description }) => (
                    <div key={id} className="">
                        <p><Link href={`/projects/${id}`}><a>{title}</a></Link><br />
                        {description}<br />
                        </p>
                    </div>
                ))}
            </div>
            </div>
        </section>
      
      

    </Layout>
  )
}

async function getMetadata(directory) {

    const filenames = fs.readdirSync(path.join(process.cwd(), directory));
    const modules = await Promise.all(
        filenames.map(async (p) => import(`${directory}/${p}`))
    );

    const metadata = modules.map((exports) => exports.metadata);

    const sortedMetadata = metadata.sort(( { date: a }, { date: b }) => {
        if (a < b) {
            return 1
        } else if (a > b) {
            return -1
        } else {
            return 0
        }
    });

    return sortedMetadata;
}

export async function getStaticProps() {

    const blogMetadata = await getMetadata('pages/blog');
    const projectsMetadata = await getMetadata('pages/projects');
    
    return {
      props: {
        blogMetadata,
        projectsMetadata
      }
    }
  }