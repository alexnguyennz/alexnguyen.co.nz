---
title: Orama search with Astro
date: 2023-12-21T00:00:00Z
tags:
  - astro
  - orama
description: How to add searches to Astro with Orama
published: true
---

In this tutorial we'll cover how to add [Orama](https://oramasearch.com/), a search engine, to an Astro site.

## Static search with the Orama plugin

### Setup

Orama has an official [Astro plugin](https://docs.oramasearch.com/open-source/plugins/plugin-astro.html) for indexing the content for any static Astro build.

Start by installing the Orama Astro plugin:

```sh
npm install @orama/plugin-astro
```

In your Astro config, add the `orama` integration:

```diff lang="js" title="astro.config.mjs"
+ import orama from "@orama/plugin-astro";

export default defineConfig({
  integrations: [
    orama({
      // config
    }),
  ],
}
```

There's some configuration we can use:

```ts title="astro.config.mjs"
orama({
  search: {
    pathMatcher: /^blog\/.+$/,
    language: "english", // optional - default is English 
    contentSelectors: ["h1", "article"], // default is body
  },
})
```

By default, the `<body>` tag is used as the content selector. This may not be what you want, as this will include unrelated content from each page in the results, like the header and footer.

In the above example, I'm also only targeting `/blog/*` pages (not including `/blog/`). With the `pathSelector` regular expression, you can select any pages you like.

### Script

In an Astro page or component, add 


For an example of static Orama search in action, check out [my search page](/search). Code is [available here](https://github.com/alexnguyennz/alexnguyen.co.nz/blob/main/src/pages/search.astro#L25).

### Testing in development 

By default, this won't work during development, because it needs to read the database file generated during the build process. This is a common problem with static search solutions where you can't test things in development.

For an easy workaround, build your site, and copy your database file (`oramaDB_[dbname].json`) from your `dist/assets/` folder into an `assets` folder in your `public` folder (`/public/assets/`). This will allow you to work with your data (or some test data at least) in development.

After you're finished working on your search page or component, you can just delete this file or folder, or leave it. You could also set up a script to handle these steps automatically, or add the file to your `.gitignore` so it doesn't get committed.

### Limitations

Using the Orama plugin has a few limitations. Any `h1` tags (as your main page headings for example) will be in uppercase. If you use the actual page title instead, you will likely want to extract out the real title without the site title, any dashes, etc.

You will also need to generate any excerpts yourself.

## Building a static search database

Instead of using the plugin to generate a database by scanning our build folder, we can use a [static endpoint](https://docs.astro.build/en/core-concepts/endpoints/#static-file-endpoints) to generate a more user-friendly database with a little more work.

### Setup

Start by installing the [Orama TypeScript SDK](https://docs.oramasearch.com/open-source/#installation):

```sh
npm install @orama/orama
```

Create a file called `search.ts` in your `pages/api` folder (create an `api` folder if needed) and add:

```ts title="search.ts"
import { getCollection } from "astro:content";

export async function GET() {
  const posts = await getCollection("posts");
}
```

Here we're following the plugin example - we want to be able to search our blog posts. So we'll query the `posts` collection and return the default data - if you want to refine this, go ahead.

Next, we'll create an Orama database, and insert our collection data into it with `insertMultiple`:

```diff lang="ts" title="search.ts"
import { getCollection } from "astro:content";
+ import { create, insertMultiple } from "@orama/orama";

export async function GET() {
  const posts = await getCollection("posts");

  return new Response(JSON.stringify(posts));
}
```

The schema defined here is based on my collection schema - adjust it according to your own data.




### Usage

Now we have a static search endpoint that can be used even in development mode without any extra steps.



## Server-side 

Orama can also be used on server-side sites. You'll need to build the search database yourself - this could be data from any data source like an API, or from [Astro collections](https://docs.astro.build/en/guides/content-collections/).


### Setup

Start by installing the [Orama TypeScript SDK](https://docs.oramasearch.com/open-source/#installation):

```sh
npm install @orama/orama
```

This method can also be used with a [static endpoint](https://docs.astro.build/en/core-concepts/endpoints/#static-file-endpoints) so the database is generated during build-time. This would be a  