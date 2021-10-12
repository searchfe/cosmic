<script lang="typescript">
  import { getContext } from 'svelte';
  import { ClassBuilder } from 'smelte/src/utils/classes.js';
  import { COLLAPSE } from './collapse.svelte';

  export let headerClass = 'pl-8 font-semibold';
  export let contentClass = '';
  export let header = '';
  export let key = '';
  export let isSelected = false;

  const defaultHeaderClasses = `
    collapse-item-header box-border 
    h-12 py-3.5 pr-3
    flex flex-row justify-start items-center 
    rounded-md text-sm 
    hover:bg-cgray-100
  `;
  const defaultContentClasses = '';

  const headerClassesBuilder = new ClassBuilder(defaultHeaderClasses);
  const contentClassesBuilder = new ClassBuilder(defaultContentClasses);

  let hovering = false;

  const {onClickItem, selectedSet} = getContext(COLLAPSE);

  $: isSelected = $selectedSet.has(key.toString());

  $: headerComputedClass = headerClassesBuilder
    .flush()
    .add(headerClass)
    .add('bg-cgray-100', isSelected)
    .get();

  $: contentComputedClass = contentClassesBuilder
    .flush()
    .add(contentClass)
    .add('hidden', !isSelected)
    .get();


  function onClick() {
    onClickItem(key.toString());
  }

  function onMouseEnter() {
    hovering = true;
  }

  function onMouseLeave() {
    hovering = false;
  }
</script>

<div
  class={headerComputedClass}
  on:click|stopPropagation={onClick}
  on:mouseenter={onMouseEnter}
  on:mouseleave={onMouseLeave}
>
  <div class="mr-4 flex-none">
    <slot name="prefix"  {isSelected}></slot>
  </div>
  <div class="flex-auto">{header}</div>
  {#if $$slots.extra}
    <div class="flex-none" on:click|stopPropagation class:invisible={!hovering}>
      <slot name="extra"></slot>
    </div>
  {/if}
</div>
<div class={contentComputedClass}>
  <slot />
</div>
