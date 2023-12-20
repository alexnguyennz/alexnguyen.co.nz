---
title: Astro dark mode and View Transitions
date: 2023-12-18T00:00:00Z
tags:
  - astro
description: How to use dark mode with View Transitions in Astro
published: true
---

This tutorial will cover how to implement a theme toggle feature in your Astro site (3.0+ or 4.0+) that works with [View Transitions](https://docs.astro.build/en/guides/view-transitions/).

Dark mode will be toggled based on a `dark` class that is added to the `<html>` element.

## Example

### Markup

First, we'll add our markup and icons we need for our dark mode toggle. 

Create a `ThemeToggle.astro` somewhere, like in your `/src/components` folder, and add:

```astro title="ThemeToggle.astro"
<button
  type="button"
  id="themeToggle"
  aria-label="toggle theme"
  class="relative rounded-full p-1.5 text-slate-700 dark:text-slate-100"
>
  <span class="sr-only">toggle theme</span>
  <Icon
    pack="lucide"
    name="sun"
    class="absolute -left-1/2 -top-1/2 h-6 w-6 rotate-0 scale-100 transition duration-200 dark:-rotate-90 dark:scale-0"
  />
  <Icon
    pack="lucide"
    name="moon"
    class="absolute -left-1/2 -top-1/2 h-6 w-6 rotate-90 scale-0 transition duration-200 dark:rotate-0 dark:scale-100"
  />
</button>
```

### Script

At the bottom of the `ThemeToggle.astro` component, add an inline script:

```js
<script is:inline>

</script>
```

It's important to set the reference to our button element within the script we're calling (and not outside it for example), otherwise the reference will be the stale by the next page. Remember that View Transitions won't re-initialize any scripts unless you specifically set it to. This means



## Page animations

We can run some other effects in combination with View Transitions when the theme is toggled. 

For example, check out [Akash Hamirwasia](https://akashhamirwasia.com/blog/full-page-theme-toggle-animation-with-view-transitions-api/)'s tutorial on creating a full page transition. We can do the same in Astro with slightly different code:

```js
const handleToggleClick = async () => {
// don't await for non-supported browsers so the toggle still works
if (document.startViewTransition)
  await document.startViewTransition().ready;
}


```

### Background colours

By default, the animation will use the same background colour as your html's element. This means the animation might look as if it's disappearing during the effect because it may blend in with the rest of your page depending on any other elements which "break" it up.

In this case, you may want to use a different background colour for the animation, so it looks distinct compared to the page. This colour could be a slightly different shade for a subtler difference.

One way to do this is to use a fallback background colour - this colour will be used for the transition:

```css
/* white is the colour for the transition while the default background colour is set to rgb(240, 249, 255) */
html {
  background: white
    linear-gradient(
      0deg,
      rgba(240, 249, 255, 1) 0%,
      rgba(240, 249, 255, 1) 100%
    );
}

/* same as above with these specific colours */
html.dark {
  background: black
    linear-gradient(0deg, rgba(5, 8, 47, 1) 0%, rgba(21, 94, 117, 1) 100%);
}
```