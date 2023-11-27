---
title: All About Astro
---

<section>

## View Transitions
</section>

<section>

### Selectors with page events

When selecting elements with methods like `querySelector()`, make sure to call them inside the function or block of the event listener, otherwise the reference will be stale by the time it runs on the next page:

```astro
<script>
  // this won't work after you navigate
  // const menu = document.getElementById("menu");

  function initMenu() {
    const menu = document.getElementById("menu");
    // ...
  }
    
  initMenu();
    
  document.addEventListener("astro:after-swap", () => initMenu());
</script>
```
</section>

<section>

### define:vars with lifecycle events

If you use [define:vars](https://docs.astro.build/en/reference/directives-reference/#definevars) to pass frontmatter variables into your script tag, everything inside will re-run everytime that variable changes:

```astro
---
const pathname = new URL(Astro.request.url).pathname;
---
<script define:vars={{ pathname }}>
  // this will log for every pathname change, not just once on initial site load
  document.addEventListener("astro:page-load", () => console.log("page-load"), {
    once: true,
  });
</script>
```
</section>

<section>

### Fallback issues with CSS animations

There is a visual issue I've encountered with Firefox when using the `<ViewTransitions />` with the [default fallback](https://docs.astro.build/en/guides/view-transitions/#fallback-control) and a CSS opacity animation on page load.

The workaround was to use a fallback of `swap`:

```astro
<ViewTransitions fallback="swap" />
```
</section>

<section>

## Astro Image
</section>

<section>

### Remote images with subdomains

You need to specify the subdomain for any [remote image](https://docs.astro.build/en/guides/images/#remote-images) links in `astro.config.mjs`, otherwise it won't get optimized and the original source will be used:


```astro
<!-- resolves to https://fastly.picsum.photos/** -->
<Image
  src="https://picsum.photos/200/300"
  width="500"
  height="500"
  alt="remote image"
/>
```

```typescript
export default defineConfig({
  image: {
    domains: ["fastly.picsum.photos"],
    // or if you need a wildcard
    remotePatterns: [{
      protocol: 'https',
      hostname: '**.picsum.photos'
    }]
  }
});
```


</section>

<section>

## Framework Components
</section>

<section>

### Mixing frameworks

When using components from multiple frameworks together, not adding the extension (which your IDE or autocomplete may miss) results in an error of `This component likely uses @astrojs/react ...`:

```typescript
import { Gallery } from "./Gallery.tsx"; // React
import { Gallery } from "./Gallery.vue"; // Vue
import { Gallery } from "./Gallery"; // error
```

This is likely because without it, Astro doesn't know how to process that particular component.

Alternatively (although I'm not sure why you would do this), you can force the component to render for a particular framework with [client:only](https://docs.astro.build/en/reference/directives-reference/#clientonly) to make it work without the extension.
</section>

<section>

## Miscellaneous
</section>

<section>

### Importing the Astro config

If you want to import your config from `astro.config.mjs` elsewhere in your project, it will only work in development.

All of these methods will fail during build:

```typescript
// 1
import config from "../../astro.config.mjs";
console.log("Astro config", config);

// 2
const config = await Astro.glob("../../astro.config.mjs");
console.log("Astro config", config[0].default);

// 3
const config = import.meta.glob("../../astro.config.mjs");

for (const path in config) {
  config[path]().then((mod) => {
    console.log(mod.default);
  });
}
```

This is due to the use of any imported Astro functions (like `@astrojs/react`) which I guess can't be properly parsed.

One workaround is to create a separate config file that doesn't use any Astro related imports which you import in `astro.config.mjs` and anywhere else:

```typescript
// src/config.ts
export default {
  site: "example.com",
  server: {
    port: 3000,
  },
  // ...
};
```

```typescript
// astro.config.mjs
import config from "/src/config.ts";
import react from "@astrojs/react";

export default defineConfig({
  ...config,
  integrations: [
    react(),
  ], 
  // ...
});

```

```typescript
// Astro.component
import config from "../config.ts";
console.log("config", config);
```

With this method you won't be able to read the functions you set, but if you wanted to, you could set additional key values in the config object (`config.ts`) which you import in `astro.config.mjs`, and manually add the functions to the relevant key e.g. `integrations` based on which ones exist.
</section>