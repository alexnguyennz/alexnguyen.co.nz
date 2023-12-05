---
title: All About Astro
date: 2023-12-06T00:00:00Z
---

<p class="mt-0"><a
  href="https://astro.build"
  target="_blank"
  rel="noreferrer noopener nofollow">Astro <span>↗</span></a> has recently become my favourite framework for building websites. It has a great developer experience, features, community, and it's frequently updated. 
</p>

<p>These are some findings or quirks I've noted when using it. These may be things I've missed in the documentation, something I've done incorrectly (very likely), or an actual issue/bug (less likely).</p>

## Upgrade to 4.0

### astro-icon

Update to [0.8.2](https://github.com/natemoo-re/astro-icon/releases/tag/astro-icon%400.8.2) for Astro 4.0 (which uses Vite 5) compatibility with local icons.

## View Transitions

### Selectors with page events

When selecting elements, make sure to call them inside the function or block of the event listener, otherwise the reference will be stale when you get to the next page:

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

### Issues with CSS animations

There is a visual issue I've encountered with Firefox when using `<ViewTransitions />` with the [default fallback](https://docs.astro.build/en/guides/view-transitions/#fallback-control) (for browsers that don't support the View Transitions API yet) and a CSS opacity animation on page load.

The opacity was set to 0 and set to animate to 100% with a CSS animation but using View Transitions resulted in the animation never running (or the opacity not being set).

The workaround was to use a fallback of `swap`:

```astro
<ViewTransitions fallback="swap" />
```

## Astro Image

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


## Framework Components / Islands


### Mixing frameworks

When using components from multiple frameworks together, not adding the extension may result in an error of `This component likely uses @astrojs/react ...`:

```ts
import { Gallery } from "./Gallery"; 
```

Change this to: 

```ts
import { Gallery } from "./Gallery"; // React
import { Gallery } from "./Gallery.vue"; // Vue
import { Gallery } from "./Gallery.svelte"; // Svelte
```

Alternatively (although I'm not sure why you would do this), you can force the component to hydrate for a particular framework with [client:only](https://docs.astro.build/en/reference/directives-reference/#clientonly) to make it work without the extension.

### Svelte without client directive

You must use a [client directive](https://docs.astro.build/en/reference/directives-reference/#client-directives) for a Svelte component's slot to appear, even if this component doesn't need to hydrate.

```astro
<Button client:load>Button Text</Button>
```

```svelte title="Button.svelte"
<button>
  <slot />
</button>
```

The same behaviour also happens with [named slots](https://svelte.dev/docs/special-elements#slot-slot-name-name). 

```astro
<Button>
  <Fragment slot="text">Button Text</Fragment>
</Button>
```

```svelte title="Button.svelte"
<button>
  <slot name="text" />
</button>
```

You don't need to do this with React or Vue.

## TypeScript

### Props with client directives

You may get various type errors when using [client directives](https://docs.astro.build/en/reference/directives-reference/#client-directives) with any props other than `children` (not sure if this applies to other non-React frameworks):

```tsx
<Fade client:visible delay={0.25}><h1>Title</h1></Fade>
```

Which results in:
```
Type '{ children: any; "client:visible": true; }' is not assignable to type 'IntrinsicAttributes & { delay: number; children: ReactNode; }.
Property 'delay' is missing in type '{ children: any; "client:visible": true; }' but required in type '{ delay: number; children: ReactNode; }'
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

There is likely a better solution as this hides the error even if the prop(s) isn't optional.

### WebStorm

There are some issues resolving types with WebStorm with an [active issue here](https://youtrack.jetbrains.com/issue/WEB-59503). 

One solution which solves a lot of the problems is using the bundled TypeScript - Settings > Preferences > Languages & Frameworks > TypeScript > Bundled.

## Miscellaneous

### Importing the Astro config

If you want to import your config from `astro.config.mjs` elsewhere in your project, it will only work in development.

All of these methods will fail during build:

```ts title="*.astro"
import config from "../../astro.config.mjs";
console.log("Astro config", config);
```

```ts title="*.astro"
const config = await Astro.glob("../../astro.config.mjs");
console.log("Astro config", config[0].default);
```

```ts title="*.astro"
const config = import.meta.glob("../../astro.config.mjs");

for (const path in config) {
  config[path]().then((mod) => {
    console.log(mod.default);
  });
}
```

This is due to the use of any Astro imports like `@astrojs/react` which I guess can't be properly parsed during build. 

One workaround is to create a separate config file that doesn't use any Astro related imports which you import in `astro.config.mjs` and anywhere else:

```ts title="src/config.ts"
export default {
  site: "example.com",
  server: {
    port: 3000,
  },
  // ...
};
```

```ts title="astro.config.mjs"
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

```ts title="*.astro"
import config from "../config.ts";
console.log("config", config);
```

With this method you won't be able to read the functions you set, but if you wanted to, you could set additional key values in the config object (`config.ts`) which you import in `astro.config.mjs`, and manually add the functions to the relevant key e.g. `integrations` based on which ones exist.

### Syntax or rehype plugins

To use a plugin like [Rehype Pretty Code](https://rehype-pretty-code.netlify.app/), you will need to disable the default Astro syntax highlighting in your `astro.config.mjs`:

```ts title="astro.config.mjs"
markdown: {
  syntaxHighlight: false
}
```

Astro's highlighting runs last, so it has priority over any existing plugins.

<p class="text-sm">Credit to <a
  href="https://kld.dev/toc-animation/"
  target="_blank"
  rel="noreferrer noopener nofollow">Kevin Drum <span>↗</span></a
> and <a
  href="https://lab.hakim.se/progress-nav/"
  target="_blank"
  rel="noreferrer noopener nofollow">Hakim El Hattab <span>↗</span></a
> for the table of contents code.</p>
