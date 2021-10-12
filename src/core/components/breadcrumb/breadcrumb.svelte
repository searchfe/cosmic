<script lang="typescript" context="module">
  export const BREADCRUMB = { name: 'breadcrumb' };
</script>

<script lang="typescript">
  import { setContext } from 'svelte';

  /* separator icon */
  export let separator = 'navigate_next';

  setContext(BREADCRUMB, { separator });
</script>

<nav class="text-h3 font-semibold">
  <ol class="flex h-11 leading-11">
    <slot />
  </ol>
</nav>
