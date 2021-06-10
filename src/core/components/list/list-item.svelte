<script lang="ts">
  import { ClassBuilder } from 'smelte/src/utils/classes.js';
  import { createEventDispatcher } from 'svelte';
  import Icon from 'smelte/src/components/Icon';
  import createRipple from 'smelte/src/components/Ripple/ripple.js';

  const classesDefault = 'bg-cgray-400 dark:bg-cgray-600 relative overflow-hidden duration-100 py-2 px-4 cursor-pointer text-gray-50 flex items-center z-10';
  const selectedClassesDefault = 'bg-active dark:bg-active';
  const subheadingClassesDefault = 'text-gray-200 p-0 text-sm';

  export let icon = '';
  export let id = '';
  export let value = '';
  export let text = '';
  export let subheading = '';
  export let disabled = false;
  export let dense = false;
  export let selected = false;
  export let tabindex = null;
  export let defaultClass = classesDefault;
  export let selectedClasses = selectedClassesDefault;
  export let subheadingClasses = subheadingClassesDefault;




  export let to = '';
  export const item = null;
  export const items = [];
  export const level = null;

  const ripple = createRipple();
  const dispatch = createEventDispatcher();

  function change() {
    if (disabled) return;
    value = id;
    dispatch('change', id, to);
  }

  export let classes = defaultClass;
  const cb = new ClassBuilder(classes, classesDefault);

  $: c = cb
    .flush()
    .add(selectedClasses, selected, selectedClassesDefault)
    .add('py-2', dense)
    .add('text-gray-600', disabled)
    .add($$props.class)
    .add('active:bg-active')
    .get();

</script>
<!-- use:ripple  -->
<li
  class={c}
  {tabindex}
  on:keypress={change}
  on:click={change}
  on:click>
  {#if icon}
    <Icon
      class="pr-6"
      small={dense}
    >
      {icon}
    </Icon>
  {/if}

  <div class="flex flex-col p-0">
    <div class={$$props.class}>
      <slot>{text}</slot>
    </div>
    {#if subheading}
      <div class={subheadingClasses}>{subheading}</div>
    {/if}
  </div>
</li>
