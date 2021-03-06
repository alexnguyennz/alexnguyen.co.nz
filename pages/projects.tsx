import Link from 'next/link';
import Image from 'next/image';
import { GetStaticProps } from 'next';

import fs from 'fs';
import path from 'path';

import Layout from '@components/layout';

interface ProjectsMetadata {
    title: string;
    id: string;
    description: string;
    img: string;
}

interface Props {
    projectsMetadata: ProjectsMetadata[];
}


export default function Page( {projectsMetadata}: Props ) {

    const pageTitle = 'Projects';

    return (
        <Layout title={pageTitle}>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

                {projectsMetadata.map(({title, id, description, img}) => (
                    <div className="text-center" key={id}>
                        <h2 className="text-lg font-semibold"><Link href={`/projects/${id}`}><a>{title}</a></Link></h2>
                        <p className="mt-0 2xl:h-14">{description}</p>
                        <div className="p-3 xl:p-10  w-1/2 mx-auto md:w-full  dark:bg-gray-600">
                            <Link href={`/projects/${id}`}><a><Image src={img} width={400} height={400} alt={`${title} Image`} placeholder="blur" blurDataURL={`data:image/png:base64, iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+ip1sAAAAASUVORK5CYII=`} /></a></Link>
                        </div>
                    </div>
                ))}

            </div>

        </Layout>
    )
}

async function getMetadata(directory: string) {

    const filenames = fs.readdirSync(path.join(process.cwd(), directory));
    const modules = await Promise.all(
        filenames.map(async (p) => import(`${directory}/${p}`))
    );

    const metadata = modules.map((exports) => exports.metadata);

    return metadata;
}

export const getStaticProps: GetStaticProps = async () => {

    const projectsMetadata = await getMetadata('pages/projects');

    return {
        props: {
            projectsMetadata
        }
    }
}