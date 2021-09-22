<script>
  import { getContext } from 'svelte';
  import { COLLAPSE } from './collapse.svelte';

  export let extra = '';
  export let header = '';
  export let key = '';

  let instance;

  const {onClickItem, selectedSet} = getContext(COLLAPSE);

  $: isSelected = $selectedSet.has(key.toString());

  function onClick() {
    onClickItem(key.toString());
  }
</script>

<div bind:this={instance}>
  <div class="flex flex-row" class:selected={isSelected} on:click|stopPropagation={onClick}>
    <div>{header}</div>
    <div>{extra}</div>
  </div>
  {#if isSelected && instance !== null }
    <slot/>
  {/if}
</div>

<style>
	.selected {
		background-color: #ff3e00;
		color: white;
	}
</style>
