---
title: Custom Client Directives with Astro
date: 2023-12-06T00:00:00Z
tags:
  - astro
description: Creating a hover or mouseover Client Directive with Astro
published: true
---

Creating [custom client directives](https://docs.astro.build/en/reference/directives-reference/#custom-client-directives) is useful when you want a little more control over how framework components (islands) hydrate. The direct benefit is improved page loads and performance, especially if you have a lot of islands that need to hydrate.

One common application I can think of is if you have two menus (one for mobile, one for desktop) - the mobile menu can use `client:visible` (for example, it has a hamburger button) as there's no "hover" on mobile devices but the desktop menu has dropdown menus that don't need to hydrate once they're visible. In this case, this menu could be hydrated using a hover or `mouseover` event instead, cutting out a few requests/scripts needed for the initial page load.

I tried this on an [Astro site I recently built](https://vsctrust.org.nz). By moving the desktop menu component to this type of hydration, the critical chain request stat dropped from 10 to 5 requests. 

Did it improve the performance to where I could perceive it? Of course not, but it was a fun exercise, and it's always satisfying seeing numbers drop like the amount of requests a page is making. And maybe this would make a real difference on a heavier, more interactive site.

## Example

We'll look at creating our custom hover (mouseover) client directive.

In a folder in your project, (`lib` or similar), create a folder called `client-directives`.

In this folder, create a `mouseover.ts` file and add:

```ts title="mouseover.ts"
type DirectiveLoad = () => Promise<() => Promise<void>>;

export default (load: DirectiveLoad) => {
  window.addEventListener(
    "mouseover",
    async () => {
      const hydrate = await load();
      await hydrate();
    },
    { once: true },
  );
};
```

This will hydrate the component once the mouseover event is detected

We then need to create the integration code which will setup this client directive code as an Astro integration. Create a `register.ts` file and add:

```ts title="register.ts"
import { type AstroIntegration } from "astro";

export default (): AstroIntegration => ({
  name: "client:mouseover",
  hooks: {
    "astro:config:setup": ({ addClientDirective }) => {
      addClientDirective({
        name: "mouseover",
        entrypoint: "./src/lib/client-directives/mouseover.ts",
      });
    },
  },
});
```

We'll also add types for the directive. Create an `index.d.ts` file and add:

```ts title="index.d.ts"
import "astro";
declare module "astro" {
  interface AstroClientDirectives {
    "client:mouseover"?: boolean;
  }
}
```
I'm not sure how well this works - I still get warnings with WebStorm (but its Astro support is a little shaky anyway).

### Bringing it all together

Finally, we'll add the client directive to our Astro config:

```js title="astro.config.mjs"
import mouseoverDirective from "/src/lib/client-directives/register.ts";

export default defineConfig({
  integrations: [
    mouseoverDirective(),
    // ...
  ],
});
```

After this, the client directive should be up and running. To test it, open up your browser's network tab, and check if your component's scripts are fetched once you hover it. 

If it doesn't work, you may need to restart your development server.

There's likely many more useful custom client directives that could be made, although probably people since hydration isn't an Astro specific thing. 

One could be similar to [`client:directive`](https://docs.astro.build/en/reference/directives-reference/#clientvisible) (hydrated once visible) but delayed, used for a page that uses controlled or custom smooth scrolling between sections where an animation doesn't need to load right away.

You may not ever need to use a custom client directive, but it's a pretty cool feature that helps highlight how powerful and customizable Astro is.