<style>
  :global(.breadcrumb-item:last-child .separator) {
    @apply hidden;
  }
  .breadcrumb-item:last-child {
    @apply text-black;
  }
</style>

<script lang="ts">
  import { getContext } from 'svelte';
  import { Icon } from '@cosmic/core/components';
  import { BREADCRUMB } from './breadcrumb.svelte';

  export let active = false;

  const { separator } = getContext(BREADCRUMB);
</script>

<li class="breadcrumb-item flex items-center text-gray-30" class:active>
  <slot name="prefix" />
  <slot />
  <Icon classes="separator">{separator}</Icon>
</li>
