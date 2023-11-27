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