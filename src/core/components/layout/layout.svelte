<script lang="typescript" context="module">
  export const LAYOUT = { name: 'layout' };
</script>

<script lang="typescript">
  import { setContext } from 'svelte';
  import { writable } from 'svelte/store';
  const hasSider = writable(false);

  setContext(LAYOUT, { hasSider });
</script>

<section class="flex flex-auto {$hasSider ? 'flex-row' : 'flex-col'}">
  <slot/>
</section>
