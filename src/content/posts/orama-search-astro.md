---
title: Orama search with Astro
date: 2023-12-26T00:00:00Z
tags:
  - astro
  - orama
description: How to add searches to Astro with Orama
published: true
---

[Orama](https://oramasearch.com/) is a search engine that you can integrate with most, if not any, JavaScript site framework. In this tutorial, we'll cover how to add Orama to an Astro site.

## Static search with the Astro plugin

### Setup

Orama has an [Astro integration](https://docs.oramasearch.com/open-source/plugins/plugin-astro.html) for indexing the content for any static Astro build:

```sh
npm install @orama/plugin-astro
```

In your Astro config, add the `orama` integration:

```diff lang="js" title="astro.config.mjs"
+ import orama from "@orama/plugin-astro";

export default defineConfig({
  integrations: [
    orama({ ... }),
  ],
})
```

Orama requires a basic configuration object:
- `pathMatcher` is how you can select the static routes you want to index with a regular expression
- `language` is the output language 
- `contentSelector` sets which elements to target - by default, `<body>` is used which will include unrelated content like the header and footer, which may not be what you want

```ts title="astro.config.mjs"
import orama from "@orama/plugin-astro";

export default defineConfig({
  integrations: [
    orama({
      search: {
        pathMatcher: /^blog\/.+$/,
        language: "english", // optional - default is English 
        contentSelectors: ["h1", "article"], // default is body
      },
    })
  ],
})
```

In this example, I'm also only targeting `/blog/*` pages, and not including `/blog/`.

For simplicity, we'll create a separate `search.astro` page to demonstrate some basic search functionality. Add a search input and a placeholder element for any search results:

```astro title="pages/search.astro"
---
---
<input type="text" id="search" name="search" />

<div id="search-results"></div>
```

We'll load the database, run Orama's `search` function against it every time the search input changes, and display any results:

```astro title="pages/search.astro"
<script>
  import { getOramaDB, search } from "@orama/plugin-astro/client";
  const db = await getOramaDB("search");

  const searchInput = document.querySelector<HTMLInputElement>("input#search");

  searchInput?.addEventListener("input", async (e) => {
    const searchResults = document.querySelector("#search-results");
    const results = await search(db, { term: e.target.value });

    searchResults.innerHTML = ""; // reset displayed results

    for (const result of results.hits) {
      searchResults.innerHTML += `
      <a href="${result.document.path}">
        ${result.document.title}
      </a>`;
    }
  });
</script>
```

For an example, check out [this code](https://github.com/alexnguyennz/alexnguyen.co.nz/blob/8d1b44f5f5974f61c384878cc37f890251efe8ab/src/pages/search.astro#L25).


### Testing in development 

By default, this won't work during development as Orama has to read the database file generated during the build process. This is a common problem with static search solutions where you can't easily test things in development.

For a workaround, build your site, and copy your database file (`oramaDB_[dbname].json`) from your `dist/assets/` folder into an `assets` folder in your `public` folder (`/public/assets/`). This will allow you to work with your data (or some test data at least) in development.

After you've finished working on your search page or component, you can just delete this file or folder, or leave it. You could also add the file to your `.gitignore` so it doesn't get committed.

### Limitations

Using the Orama plugin has a few limitations. Any `h1` tags (as your main page headings for example) will be in uppercase. If you use the actual page title instead, you will likely want to extract out the real title without the site title or any dashes/separators.

It's also not very flexible - for example, if you want to add excerpts or other custom data.

## Building a search database

We can use an [endpoint](https://docs.astro.build/en/core-concepts/endpoints/) to generate a custom database ourselves with a little more work. Use a static endpoint if the data you need is only required at build-time, otherwise, use a server endpoint.

### Setup

Start by installing the [Orama TypeScript SDK](https://docs.oramasearch.com/open-source/#installation):

```sh
npm install @orama/orama
```

Create a file called `search.ts` in your `pages/api` folder (create an `api` folder if needed) and add:

```ts title="/pages/api/search/search.ts"
export const prerender = false; // for hybrid sites

import { getCollection } from "astro:content";

export async function GET() {
  const posts = await getCollection("posts");
}
```

Like with the previous example, this code is for searching against blog posts. We'll query the `posts` collection and return the data as-is.

Next, we'll create an Orama database, and insert our collection data into it::

```ts title="search.ts"
export const GET: APIRoute = async ({ request }) => {
  const url = new URL(request.url);
  const params = new URLSearchParams(url.search);

  const posts: never[] = await getCollection("posts");

  const searchDB = await create({
    schema: {
      id: "string",
      slug: "string",
      body: "string",
      collection: "string",
      data: {
        title: "string",
        tags: {
          slug: "string",
          collection: "string",
        },
        description: "string",
        published: "boolean",
      },
    },
  });

  await insertMultiple(searchDB, posts);

  const results = await search(searchDB, {
    term: params.get("term") ?? "",
  });

  return new Response(JSON.stringify(results));
};

```

The schema defined here is based on the `posts` collection schema - adjust it according to your own data. The schema will also set which properties you want as part of the database, so if you want to refine the data, you can do this at a schema level if you want.

Go to `http://localhost:4321/api/search?term=` and enter some terms to test things out.

To display the results on a page, we can adapt the plugin example and change things around a bit:

Now we can use the frontmatter's `title` instead of the page title.





Not using Astro? The Orama SDK is framework-agnostic, so you should be able to apply the same steps for creating a search database with other frameworks.