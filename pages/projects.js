import Layout from '@components/layout';
import Link from 'next/link';
import Image from 'next/image';

import fs from 'fs';
import path from 'path';

const pageTitle = 'Projects'

export default function Page( {projectsMetadata} ) {
    return (
        <Layout title={pageTitle} className="container px-6 py-4 mx-auto">

        <div className="flex flex-wrap first:bg-red-400">

            {projectsMetadata.map(({title, id, description, img}) => (
                <div className="md:flex-1 sm:flex-auto text-center w-full my-3 sm:my-0 sm:mx-5" key={id}>
                    <h2 className="text-lg font-semibold"><Link href={`/projects/${id}`}><a>{title}</a></Link></h2>
                    <p className="mt-0 2xl:h-14">{description}</p>
                    <div className="xl:p-10 border border-gray-300 w-1/2 mx-auto md:w-full">
                        <Link href={`/projects/${id}`}><a><Image src={img} width={400} height={400} alt={`${title} Image`} placeholder="blur" blurDataURL={`data:image/png:base64, iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+ip1sAAAAASUVORK5CYII=`} /></a></Link>
                    </div>
                </div>
            ))}

        </div>


        </Layout>
    )
}

async function getMetadata(directory) {

    const filenames = fs.readdirSync(path.join(process.cwd(), directory));
    const modules = await Promise.all(
        filenames.map(async (p) => import(`${directory}/${p}`))
    );

    const metadata = modules.map((exports) => exports.metadata);

    /* const sortedMetadata = metadata.sort(( { date: a }, { date: b }) => {
        if (a < b) {
            return 1
        } else if (a > b) {
            return -1
        } else {
            return 0
        }
    }); */

    return metadata;
}


export async function getStaticProps() {

    const projectsMetadata = await getMetadata('pages/projects');

    return {
      props: {
        projectsMetadata
      }
    }
  }