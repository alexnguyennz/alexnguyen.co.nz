// extract metadata from .mdx files

import fs from 'fs';
import path from 'path';

export async function getMetadata(directory) {

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

    return blogMetadata

}