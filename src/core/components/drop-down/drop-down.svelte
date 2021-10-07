<script lang="typescript">
  import { createEventDispatcher } from 'svelte';
  import { DropdownTrigger } from './type';
  import { ClassBuilder } from 'smelte/src/utils/classes.js';

  const defaultContainerClasses = 'inline-block relative';
  const defaultMenuClasses = '';

  let containerClasses = defaultContainerClasses;
  let menuClasses = defaultMenuClasses;

  const containerClassBuilder = new ClassBuilder(containerClasses, defaultContainerClasses);
  const menuClassBuilder = new ClassBuilder(menuClasses, defaultMenuClasses);

  export let trigger: DropdownTrigger = DropdownTrigger.CLICK;

  const dispatch = createEventDispatcher();


  let showContent = false;

  $: containerClasses = containerClassBuilder
    .flush()
    .add($$props.class)
    .get();

  $: menuClasses = menuClassBuilder
    .flush()
    .add()
    .get();

  function onClick() {
    showContent = !showContent;
    console.log(1111)
    dispatch('click');
  }
</script>

<div class={containerClasses}>
  <div on:click|stopPropagation={onClick}>
    <slot />
  </div>
  <div class="absolute top-full" class:hidden={!showContent}>
    <slot name="dropdown" />
  </div>
</div>
