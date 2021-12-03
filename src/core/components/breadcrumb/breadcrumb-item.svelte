<style>
  :global(.breadcrumb-item:last-child .separator) {
    overflow: hidden;
  }
  .breadcrumb-item:last-child {
    color: #1f1f1f;
  }
</style>

<script lang="ts">
  import { getContext } from 'svelte';
  import Icon from '../icon';
  import { BREADCRUMB } from './breadcrumb.svelte';

  export let active = false;

  const { separator } = getContext(BREADCRUMB);
</script>

<li class="breadcrumb-item flex items-center text-gray-30" class:active>
  <slot name="prefix" />
  <slot />
  <Icon classes="separator">{separator}</Icon>
</li>
