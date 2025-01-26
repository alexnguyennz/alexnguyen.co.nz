---
title: All about Astro
date: 2023-12-07T00:00:00Z
tags:
  - astro
description: Collection of findings or quirks I've noted when using Astro
published: true
---

[Astro](https://astro.build) has recently become my favourite framework for building websites. It has a great developer experience, features, community, and it's frequently updated.

These are some findings or quirks I've noted when using it that don't warrant a separate blog post, things that you may encounter depending on the Astro version you're using. These may be things I've missed in the documentation, something I've done incorrectly (likely), or an actual issue or bug (less likely).

## Upgrading to Astro 4.0

### astro-icon with local images

Update to [astro-icon@0.8.2](https://github.com/natemoo-re/astro-icon/releases/tag/astro-icon%400.8.2) to be able to use local icons in an Astro 4.0 project.

## View Transitions

### Selectors with page events

When selecting elements, make sure to call them inside the called function of the event listener, otherwise the reference will be stale when you get to the next page:

```html title="*.astro"
<script is:inline>
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

```html title="*.astro"
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

```astro title="Layout.astro"
<head>
  <ViewTransitions fallback="swap" />
  <!-- ... --> 
</head>
```

This is something I'll look to investigate in the future.

### z-index

If you use `z-index` on an element (this could be a sticky header) that is placed over an element that uses a transition animation (for example, an `h1` heading with `transition:name`), this element may show in front of the header during page transitions.

As a workaround, set `transition:name` on this z-index element, even if that element doesn't use any animations:

```astro
<header transition:name="header"></header>
```

## Collections

### Querying all collections

There is no built-in way to query all collections. One workaround to do this is using [`Astro.glob`](https://docs.astro.build/en/reference/api-reference/#astroglob) to pull all markdown files:

```astro title="*.astro"
---
const collections = await Astro.glob("../content/**/*.md");
---
```

The data returned from this will be different from the data returned from [getCollection](https://docs.astro.build/en/reference/api-reference/#getcollection). If you needed it in the same structure, you could extract the folder names only using the data from `Astro.glob`, and then loop over them with `getCollection`.

## Images

### Remote images with subdomains

You need to specify the subdomain for any [remote image](https://docs.astro.build/en/guides/images/#remote-images) links in `astro.config.mjs`, otherwise it won't get optimized and the original source will be used:

```astro title="*.astro"
<!-- resolves to https://fastly.picsum.photos/** -->
<Image
  src="https://picsum.photos/200/300"
  width="500"
  height="500"
  alt="remote image"
/>
```

```ts title="astro.config.mjs"
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

### Content collections

When referencing [images in content collections](https://docs.astro.build/en/guides/images/#images-in-content-collections) using the `image` helper, you can also reference the image from the root directory (`src`).

```markdown title="my-post.md"
---
image: ./my-post.jpg # default
image: /src/content/posts/my-post.jpg
---
```

You may need to do this for compatibility with your CMS, for example, if it doesn't support reading relative paths for things like image previews.

### `_image` endpoint

In `hybrid` or `server` mode, you can manually use the `_image` endpoint to optimize an image in your public folder:

```
http://localhost:4321/_image?href=photo.jpg&w=100&f=jpg
```

With a `/public/photo.jpg` folder. The URL will need to be encoded properly.

### Referencing images in .md or .mdx

You can use TypeScript alias based imports for any content or body images:

```markdown
---
---

![](@/assets/image.png)

<Image src={import("@/assets/image.png") alt="" />
```

This will also work when built, unlike absolute paths (like `/src/assets/image.png`).

## Framework Components / Islands

### client:only priority

`client:only` is meant to have a high priority and behaves like `client:load` (except server rendering is skipped), but any component using `client:only` won't immediately show its static content (without hydration) resulting in a flash (unlike `client:load`). This doesn't seem to change if your page is server rendered or static.

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

```astro title="*.astro"
<Button client:load>Button Text</Button>
```

```svelte title="Button.svelte"
<button>
  <slot />
</button>
```

The same behaviour also happens with [named slots](https://svelte.dev/docs/special-elements#slot-slot-name-name).

```astro title="*.astro"
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

```astro title="*.astro"
<Fade client:visible delay={0.25}><h1>Title</h1></Fade>
```

Which results in:
```
Type '{ children: any; "client:visible": true; }' is not assignable to type 'IntrinsicAttributes & { delay: number; children: ReactNode; }.
Property 'delay' is missing in type '{ children: any; "client:visible": true; }' but required in type '{ delay: number; children: ReactNode; }'
```

A (bad) workaround is to mark these prop(s) as optional in your type or interface inside that component:

```tsx title="Fade.tsx"
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

One solution which solves a lot of the problems is using the bundled TypeScript setting. Open Settings > Preferences > Languages & Frameworks > TypeScript > Bundled.

## Forms

### Could not parse content as FormData

If you get an error of `Could not parse content as FormData` when trying to parse form data in an API endpoint, it may be because the site is static. The site will need to be in `hybrid` or `server` mode.

### Preventing a page change 

For doing things like preventing a page from changing for unsaved form changes with View Transitions, you can use the `before-preparation` event:

```js
document.addEventListener('astro:before-preparation', (e) => e.preventDefault());
```

Or normally without using View Transitions:

```js
window.addEventListener('beforeunload', (e) => e.preventDefault());
```

## Cookies

### Passing credentials

You don't need to use `credentials` in a fetch call to an Astro endpoint for it to receive your cookies. If you pass `omit` however, it naturally won't work.

```html title="*.astro"
<script>
  fetch("/api/someendpoint", {
    method: "POST",
    body: JSON.stringify(something),
    // credentials: "include",
  });
</script>
```

Make sure to not call the endpoint from the frontmatter as well - you won't receive any cookies because this call will be made from a server perspective, not the client.

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

This is due to the use of any Astro imports like `@astrojs/react` which I guess can't be properly parsed or serialized during build.

One workaround is to create a separate config file that doesn't use any Astro related imports which you import in `astro.config.mjs` and anywhere else:

```ts title="src/content.config.ts"
export default {
  site: "example.com",
  server: {
    port: 3000,
  },
  // ...
};
```

```ts title="astro.config.mjs"
import config from "/src/content.config.ts";
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
import config from "../content.config.ts";
console.log("config", config);
```

With this method you won't be able to read the functions you set, but if you wanted to, you could set additional values in the config object (`content.config.ts`) which you import in `astro.config.mjs`, and manually add the functions to the relevant key like `integrations`, based on which ones exist.

### Syntax or rehype plugins

To use a plugin like [Rehype Pretty Code](https://rehype-pretty-code.netlify.app/), you will need to disable the default Astro syntax highlighting in your `astro.config.mjs`:

```ts title="astro.config.mjs"
markdown: {
  syntaxHighlight: false
}
```

Astro's highlighting runs last, so it has priority over any existing plugins.

### CSS define:vars

When using a property like `content`, you will need to wrap your variable in additional quotes for it to work - otherwise the style will only be `content: Hello`:

```astro title="*.astro"
---
const content = "'Hello'";
---

<style define:vars={{ content }}>
  div::after {
    content: var(--content);
  }
</style>
```

### Using additional asset types e.g. zip

You can include other asset types like `.zip`s by including them in your Vite configuration's `assetsInclude` array:

```js title="astro.config.mjs"
export default defineConfig({
  vite: {
    assetsInclude: ['**!/!*.zip'],
  },
})
```

If you want to use these in content collections, you can reference the assets as strings (if the file is in the same folder as the collection for example):

```markdown title="*.md"
---
archive: ./files.zip
---
```

And then you can dynamically import them with `import.meta.glob`.