---
title: All About Astro
---

<p class="mt-0">I've recently fallen in love with <a
  href="https://astro.build"
  target="_blank"
  rel="noreferrer noopener nofollow">Astro <span>↗</span></a> for building websites. It has a great developer experience, features, community, and frequent updates. 
</p>

<p>These are some findings or quirks I've noted when using it. These may be things I've missed in the documentation, something I've done incorrectly (very likely), or an actual issue/bug (less likely).</p>

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

### Issues with CSS animations

There is a visual issue I've encountered with Firefox when using `<ViewTransitions />` with the [default fallback](https://docs.astro.build/en/guides/view-transitions/#fallback-control) (for browsers that don't support the View Transitions API yet) and a CSS opacity animation on page load.

The opacity was set to 0 and set to animate to 100% with a CSS animation but using View Transitions resulted in the animation never running (or the opacity not being set).

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

```ts
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

```ts
import { Gallery } from "./Gallery.tsx"; // React
import { Gallery } from "./Gallery.vue"; // Vue
import { Gallery } from "./Gallery"; // error
```

This is likely because without it, Astro doesn't know how to process that particular component.

Alternatively (although I'm not sure why you would do this), you can force the component to render for a particular framework with [client:only](https://docs.astro.build/en/reference/directives-reference/#clientonly) to make it work without the extension.
</section>

<section>

## TypeScript
</section>

<section>

### Props with client directives

You may get various type errors when using [client directives](https://docs.astro.build/en/reference/directives-reference/#client-directives) alongside any props (other than `children`):

```tsx
<Fade client:visible delay={0.25}><h1>Title</h1></Fade>

/* 
Type '{ children: any; "client:visible": true; }' is not assignable to type 'IntrinsicAttributes & { delay: number; children: ReactNode; }.
Property 'delay' is missing in type '{ children: any; "client:visible": true; }' but required in type '{ delay: number; children: ReactNode; }' */
```

A (bad) workaround is to mark these prop(s) as optional in your type or interface inside that component:

```tsx
export function Fade({
  delay,
  children,
}: {
  delay?: number;
  children: React.ReactNode;
}) {}
```

There is likely something better as this just hides the error even if the prop(s) isn't optional.
</section>

<section>

### WebStorm

There are some issues resolving types with WebStorm with an [active issue here](https://youtrack.jetbrains.com/issue/WEB-59503). 

One solution which solves a lot of the problems is using the bundled TypeScript - Settings > Preferences > Languages & Frameworks > TypeScript > Bundled. 

</section>


<section>

## Miscellaneous
</section>

<section>

### Importing the Astro config

If you want to import your config from `astro.config.mjs` elsewhere in your project, it will only work in development.

All of these methods will fail during build:

```ts
import config from "../../astro.config.mjs";
console.log("Astro config", config);
```

```ts
const config = await Astro.glob("../../astro.config.mjs");
console.log("Astro config", config[0].default);
```

```ts
const config = import.meta.glob("../../astro.config.mjs");

for (const path in config) {
  config[path]().then((mod) => {
    console.log(mod.default);
  });
}
```

This is due to the use of any Astro imports like `@astrojs/react` which I guess can't be properly statically parsed. 

One workaround is to create a separate config file that doesn't use any Astro related imports which you import in `astro.config.mjs` and anywhere else:

```ts
// src/config.ts
export default {
  site: "example.com",
  server: {
    port: 3000,
  },
  // ...
};
```

```ts
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

```ts
// Astro.component
import config from "../config.ts";
console.log("config", config);
```

With this method you won't be able to read the functions you set, but if you wanted to, you could set additional key values in the config object (`config.ts`) which you import in `astro.config.mjs`, and manually add the functions to the relevant key e.g. `integrations` based on which ones exist.
</section>

<section>

### Rehype plugins

To use a plugin like [Rehype Pretty Code](https://rehype-pretty-code.netlify.app/), you will need to disable the default Astro syntax highlighting in your `astro.config.mjs`:

```ts
markdown: {
  syntaxHighlight: false,
}
```

</section>

<p class="text-sm">Credit to <a
  href="https://kld.dev/toc-animation/"
  target="_blank"
  rel="noreferrer noopener nofollow">Kevin Drum <span>↗</span></a
> and <a
  href="https://lab.hakim.se/progress-nav/"
  target="_blank"
  rel="noreferrer noopener nofollow">Hakim El Hattab <span>↗</span></a
> for the table of contents.</p>
