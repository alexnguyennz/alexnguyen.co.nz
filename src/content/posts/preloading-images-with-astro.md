---
title: Preloading images with Astro
date: 2023-12-13T00:00:00Z
tags:
  - astro
description: How to preload images with Astro
published: true
---

It is fairly straightforward to preload images in an Astro site that are served straight from your `public` folder - get the path to the image and add it to a preload tag in the page's `<head>`:

```html title="Layout.astro"
<!-- /public/image.png -->
<link rel="preload" href="/image.png" as="image" />
```

But what if you're using the [Image](https://docs.astro.build/en/guides/images/#image--astroassets) or [Picture](https://docs.astro.build/en/guides/images/#picture-) components to dynamically optimize your images? 

There's no easy way like Next.js's [priority feature](https://nextjs.org/docs/pages/api-reference/components/image#priority) for their `<Image />` component but there is an alternative.

You can use Astro's getImage helper to generate an optimized image serverside (or during the build for static sites) and use this image path in the preload and on the page instead.

## Example

We'll preload an image from our `/src/assets` folder called `project.png`. This image will

We'll check that the preloading worked correctly. You can build your project and preview it locally:
- if using `static`, run `npm run build` and then `npm run preview`
- if using `hybrid` or `server`, you can use the [Node.js adapter](https://docs.astro.build/en/guides/integrations-guide/node/) and run `npm run build` and then `npm run preview`

You can also check the page source - the paths in the preload tag and img tag should match:
```html
<link rel="preload" href="/_astro/image.xCZHVmaS_29nlmI.webp" as="image">

<img src="/_astro/carbonsarhat.xCZHVmaS_29nlmI.webp" />
```

There doesn't seem to be an easy way to check for preloading, but in your browser's network tab, filter for images - the preloaded image should be at the top (or among the top if you've preloaded other images on this page):

Also, if you're using Chrome or Edge, you'll get a warning in your console if the preload didn't work (`The resource image.webp was preloaded using link preload but not used within a few seconds ...`) so this is also a quick way to check if preloading worked. Other browsers may do something similar.

This is a reasonably ok solution for preloading.

If you're using View Transitions also, preloading should help avoid flashes where the image is still being loaded for the first time between pages and you're not using the exact same image. For example, if you have a product carousel with smaller product images which link to a product page with a larger resolution of the same image, preloading on this product page should help avoid flashes where the image is still being loaded - this can look jarring when using View Transitions.