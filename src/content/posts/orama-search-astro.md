---
title: Orama search with Astro
date: 2023-12-26T00:00:00Z
tags:
  - astro
  - orama
description: How to add search to Astro with Orama
published: true
---

[Orama](https://oramasearch.com/) is a search engine that you can integrate with most, if not any, JavaScript site framework. In this tutorial, we'll cover how to add Orama to an Astro site.

Not using Astro? The [Orama SDK](https://docs.oramasearch.com/open-source/#installation) is framework-agnostic, so you should be able to apply the following methods with other frameworks.

## Static search from the build folder

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

For an example of this search in action, check out my [search page](https://alexnguyen.co.nz/search) - code is [available here](https://github.com/alexnguyennz/alexnguyen.co.nz/blob/main/src/pages/search.astro).

### Testing in development 

By default, this won't work during development as Orama has to read the database file generated during the build process. This is a common problem with static search solutions where you can't easily test things in development.

For a workaround, build your site, and copy your database file (`oramaDB_[dbname].json`) from your `dist/assets/` folder into an `assets` folder in your `public` folder (`/public/assets/`). This will allow you to work with your data (or some test data at least) in development.

After you've finished working on your search page or component, you can just delete this file or folder, or leave it. You could also add the file to your `.gitignore` so it doesn't get committed.

### Limitations

Using the Orama plugin has a few limitations. If you use the page title for the search result headings, you will likely want to extract out the real title without the site title or any dashes/separators.

It's also not very flexible - for example, if you want to add excerpts or other custom data.

## Building a search database

We can use a server [endpoint](https://docs.astro.build/en/core-concepts/endpoints/) to generate a custom database ourselves with a little more work. This database could have data from your Astro collections or from any other source (like an API). This endpoint will be called by our page's script.

### Server

Start by installing the [Orama TypeScript SDK](https://docs.oramasearch.com/open-source/#installation):

```sh
npm install @orama/orama
```

Create an endpoint file called `[term].ts` in `/pages/api/search` (create the `api` and `search` folders) and add:

```ts title="/pages/api/search/[term].ts"
export const prerender = false; // for output: "hybrid" sites
import { getCollection } from "astro:content";

export async function GET() {
  const posts = await getCollection("posts");
}
```

Like with the previous example, we'll search against blog posts. We'll query the `posts` collection and return the data as-is.  Then we'll create an Orama database, and insert our collection data into it:

```ts title="/pages/api/search/[term].ts"
export const GET: APIRoute = async ({ params }) => {
  const posts: never[] = await getCollection("posts");

  const db = await create({
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

  await insertMultiple(db, posts);

  const results = await search(db, {
    term: params.term ?? "",
  });

  return new Response(JSON.stringify(results));
};

```

The schema defined here is based on the `posts` collection - adjust it according to your own data. Anything not defined in the schema won't be included in the database, so you can actually refine/reduce the data at a schema level instead of modifying the data directly.

Go to `http://localhost:4321/api/search?term=` and enter some terms to test things out.

To display the results on a page, we can use the previous example, and change things around a bit:

```astro title="pages/search.astro"
<script>
  const searchInput = document.querySelector<HTMLInputElement>("input#search");

  searchInput?.addEventListener("input", async (e) => {
    const searchResults = document.querySelector("#search-results");
    const response = await fetch(`/api/search?term=${e.target.value}`);
    const results = await response.json();

    searchResults.innerHTML = ""; // reset displayed results

    for (const result of results.hits) {
      searchResults.innerHTML += `
      <a href="/blog/${result.document.slug}">
        ${result.document.data.title}
      </a>`;
    }
  });
</script>
```

Head to `http://localhost:4321/search` to make sure everything works similar to the Orama integration example.

### Static

We can also generate a database statically. We can do this by fetching or getting the data in an Astro page or component - the database will be generated server-side during development mode (meaning you can test things without needing any workarounds), and statically at build-time.

In an Astro page or component, fetch the data you want (again, this could be from a collection or from another source like an API):

```astro title="pages/search.astro"
---
import { getCollection } from "astro:content";
const posts = await getCollection("posts");
---
```

Next, we'll [pass this data to our script](https://docs.astro.build/en/guides/client-side-scripts/#pass-frontmatter-variables-to-scripts) so we can use it with Orama - it'll need to be serialized from server to client:

```astro title="pages/search.astro"
<input type="text" id="search" name="search" />

<div id="search-results"></div>

<astro-search data-posts={JSON.stringify(posts)}></astro-search>

<script>
  class AstroSearch extends HTMLElement {
    constructor() {
      super();

      const posts = JSON.parse(this.dataset.posts);
    }
  }

  customElements.define("astro-search", AstroSearch);
</script>
```

Finally, we'll add the search functionality (similar to the previous scripts):

```astro title="pages/search.astro"
<script>
  import { create, insertMultiple, search } from "@orama/orama";

  const db = await create({
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

  class AstroSearch extends HTMLElement {
    constructor() {
      super();

      const posts = JSON.parse(this.dataset.posts);

      insertMultiple(db, posts);

      const searchInput =
        document.querySelector<HTMLInputElement>("input#search");

      searchInput?.addEventListener("input", async (e) => {
        const searchResults = document.querySelector("#search-results");
        const results = await search(db, { term: e.target.value });

        searchResults.innerHTML = ""; // reset displayed results

        for (const result of results.hits) {
          searchResults.innerHTML += `
          <a href="/blog/${result.document.slug}">
            ${result.document.data.title}
          </a>`;
        }
      });
    }
  }

  customElements.define("astro-search", AstroSearch);
</script>
```

