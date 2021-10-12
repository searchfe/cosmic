<script lang="typescript">
  import { createEventDispatcher } from 'svelte';
  import { DropdownTrigger } from './type';
  import { ClassBuilder } from 'smelte/src/utils/classes.js';
  import Menu from '../menu';
  import Icon from '../icon';

  const defaultContainerClasses = 'inline-block';
  const defaultMenuClasses = 'absolute right-0';

  export let classes = 'relative';
  export let menuClasses = '';

  const containerClassBuilder = new ClassBuilder(defaultContainerClasses);
  const menuClassBuilder = new ClassBuilder(defaultMenuClasses);

  export let trigger: DropdownTrigger = DropdownTrigger.CLICK;
  export let items = [];

  const dispatch = createEventDispatcher();

  let open = false;

  $: containerComputedClass = containerClassBuilder.flush().add(classes).get();

  $: menuComputedClass = menuClassBuilder.flush().add(menuClasses).get();

  function onClick(e) {
    open = !open;
    dispatch('visible-change', { visible: open });
  }
</script>

<div class="{containerComputedClass}" on:click|stopPropagation>
  <Icon on:click="{onClick}">more_horiz</Icon>
  <Menu class="{menuComputedClass}" theme="dark" open="{open}" items="{items}" on:change />
</div>
