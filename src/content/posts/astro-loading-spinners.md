---
title: Astro Loading Spinners
date: 2023-11-30T00:00:00Z
tags:
  - astro
published: true
description: How to use loading spinners with Astro framework components
---

<section>

## Loading spinners with framework components

If you use a framework component with a [client directive](https://docs.astro.build/en/reference/directives-reference/#clientonly) of `client:only`, you may see a flash of no content until the component renders.

In this case, it may be useful to show a loading state like a spinner or skeleton until the component loads - especially if it will take longer than a second.

One way to do this is to use a separate loading element alongside your framework component, and hide or remove that element once the component mounts.

</section>

<section>

### React example

```astro title="*.astro"
<!-- some sort of indicator or spinner --> 
<svg
  class="spinner"
  ...
  >
</svg>
<ReactComponent client:only="react" />
```

```tsx  title="ReactComponent.tsx"
import { useEffect } from "react";

export function ReactComponent() {
  useEffect(() => {
    const spinner = document.querySelector(".spinner");
    if (spinner) spinner.remove();
  }, []);

  return <div>React content</div>;
}

```

</section>

<section>

### Vue example

```astro
<VueComponent client:only="vue" />
```

```vue title="VueComponent.vue"
<script setup lang="ts">
  import { onMounted } from "vue";

  onMounted(() => {
    const spinner = document.querySelector(".spinner");
    if (spinner) spinner.remove();
  });
</script>

<template>
  <div>Vue content</div>
</template>
```

</section>

<section>

### Svelte example

```astro
<SvelteComponent client:only="svelte" />
```

```svelte title="SvelteComponent.svelte"
<script lang="ts">
  import { onMount } from 'svelte';

  onMount(() => {
    const spinner = document.querySelector(".spinner");
    if (spinner) spinner.remove();
  });
</script>

<div>Svelte content</div>
```

</section>

<section>

### Alternative

If you're using another directive like `client:load` or `client:visible`, your component's initial view (before it hydrates) may render right away. 

In this case, you probably don't need to do anything. But if you still need to show a loading state, then you can handle this within the component itself. For example, you could add a loading spinner within the component, and then conditionally render the final view once it's ready (with state).
</section>
