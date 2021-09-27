import Layout from '@components/layout'
import Link from 'next/link';

const pageTitle = 'Blog';

/* import { getMetadata } from '@lib/metadata' */
import fs from 'fs';
import path from 'path';
// import { getMetadataApi } from '@api/blog'

import React, { Component } from 'react';
import Pagination from 'next-pagination';
import ReactPaginate from 'react-paginate';


export default function Page( { blogMetadata } ) {

    return (
        <Layout title={pageTitle} className="container px-6 py-4 mx-auto">
            <section>
                { blogMetadata.map( ( { id, title, description } ) => (
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
    //const blogMetadata = await getMetadataApi();
     
    /*
    const directory = 'pages/blog';
    const filenames = fs.readdirSync(path.join(process.cwd(), directory));
    const modules = await Promise.all(
        filenames.map(async (p) => import(`${directory}/${p}`))
    );

    const postsMetadata = modules.map((exports) => exports.metadata);

    const blogMetadata = postsMetadata.sort(( { date: a }, { date: b }) => {
        if (a < b) {
            return 1
        } else if (a > b) {
            return -1
        } else {
            return 0
        }
    });

    */

    return {
      props: {
        blogMetadata
      }
    }
  }



  /*

  export async function getStaticProps() {

    //const postsData = getPosts();

    const url = 'https://dev.to/api/articles/me/all';

    // MPyqxgfxy9Qi9X3ViuHMd5wJ

    const settings = {
        headers: {
            'api-key': 'MPyqxgfxy9Qi9X3ViuHMd5wJ',
            //'Accept': 'application/json',
            //'Content-Type': 'application/json'
        }
    }

    const response = await fetch(url, settings);
    const postsData = await response.json();



    return {
      props: {
        postsData
      }
    }
  }

  */





  /* 
  export async function getStaticProps() {
    const allPostsData = getSortedPostsData()
    return {
      props: {
        allPostsData
      }
    }
  }
  */