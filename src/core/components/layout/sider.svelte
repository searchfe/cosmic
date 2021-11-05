<style>
  .sider {
    padding: 24px 14px 0;
    width: 270px;
  }
</style>

<script lang="ts">
  import { LAYOUT } from './layout.svelte';
  import { getContext } from 'svelte';

  const { hasSider } = getContext(LAYOUT);
  $hasSider = true;
</script>

<aside class="sider flex-none relative box-border bg-white height-full">
  <slot />
</aside>
