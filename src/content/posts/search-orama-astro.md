---
title: Astro searches with Orama
date: 2023-12-21T00:00:00Z
tags:
  - astro
description: How to add searches to Astro with Orama
published: false
---

[Orama](https://oramasearch.com/) is a search that we can add to any static site. In this tutorial, we'll cover how to add Orama to any static Astro site.

## Example

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
      search: {
        pathMatcher: /^blog\/.+$/,
        contentSelectors: ["h1", "article"],
      },
    }),
  ],
}
```

By default, body is used as the content selector which won't be ideal in most cases as this will include content like the header and footer.

### Testing in development 

By default, the Orama script won't work during development, because it needs to load the indexed JSON file that is generated during the build process. This is a common problem with static search solutions where you can't test the search in dev mode.

For an easy workaround, build your site, go into the `dist/assets/` folder and copy your database file (`oramaDB_[dbname].json`) into an `assets` folder in your `public` folder (`/public/assets/`). This works because the Orama function loads the database file from the same place ()

The script doesn't need to be changed at all as `await getOramaDB("search")` searches for the database file from the same place in both development and production (`/assets/*`) so you can freely test things out in development.

After you're finished working on your search page or component, you can just delete this file or folder, or leave it. You could also set up a script to handle these steps automatically, delete the testing file on commits, etc.

### Limitations


## Database

We'll cover creating your own database. This is where you can fully customize the data you want indexed - this could be data from collections or any other source and usable on server side Astro sites as well.


For a basic example of static Orama in action, check out [my search page](https://alexnguyen.co.nz) - code is [available here](https://github.com/alexnguyennz/alexnguyen.co.nz/blob/main/src/pages/search.astro#L25).