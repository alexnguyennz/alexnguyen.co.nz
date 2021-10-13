import Layout from '@components/layout'
import Link from 'next/link';
import { GetStaticProps } from 'next';

const pageTitle = 'Blog';

import fs from 'fs';
import path from 'path';


interface BlogMetadata {
    id: number;
    title: string;
    description: string;
}

interface Props {
    blogMetadata: BlogMetadata[];
}


export default function Page( { blogMetadata }: Props ): JSX.Element {

    return (
        <Layout title={pageTitle}>
            <section>
                { blogMetadata.map(({ id, title, description }) => (
                    <div key={id}>
                        <p><Link href={`/blog/${id}`}><a>{title}</a></Link><br />
                        {description}<br />
                        </p>
                    </div>
                ))}
                
            </section>

            {/* <Pagination total={blogMetadata.length} sizes={[4, 10]} /> */}
             {/* use total number of posts for Pagination 'page' total*/}
        </Layout>
    )
}

async function getMetadata(directory: string) {

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

export const getStaticProps: GetStaticProps = async () => {

    const blogMetadata = await getMetadata('pages/blog');

    return {
      props: {
        blogMetadata
      }
    }
  }


