
export async function getPosts() {

    const url = 'https://dev.to/api/articles/me/all';

    // MPyqxgfxy9Qi9X3ViuHMd5wJ

    const settings = {
        headers: {
            'api-key': process.env.DEVTO_API_KEY,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }

    const response = await fetch(url, settings);
    const postsData = await response.json();

    return postsData;

}

export async function getAllPostIds() {
    const url = 'https://dev.to/api/articles/me/all';

    // MPyqxgfxy9Qi9X3ViuHMd5wJ

    const settings = {
        headers: {
            'api-key': process.env.DEVTO_API_KEY,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }

    const response = await fetch(url, settings);
    const postsData = await response.json();

    return postsData.map(({ canonical_url, id, slug }) => {
        return {
            params: {
                id: canonical_url.slice(30),
                articleId: String(id),
                slug: slug
            }
        }
    });

}

export async function getPostData(slug) {

    const url = `https://dev.to/api/articles//nguyen//${slug}`;

    console.log("URL = " + url);
    // MPyqxgfxy9Qi9X3ViuHMd5wJ

    const settings = {
        headers: {
            'api-key': process.env.DEVTO_API_KEY,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }

    const response = await fetch(url, settings);
    const data = await response.json();

    return data;

}


/* return fileNames.map(fileName => {
    return {
      params: {
        id: fileName.replace(/\.mdx$/, '')
      }
    }
  })
*/

// fetch JSON object
    /*const data = await fetch(`https://dev.to/api/articles?username=olawanle_joel`)
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.log(error));*/