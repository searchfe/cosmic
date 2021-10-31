<script lang="ts">
  import { ClassBuilder } from 'smelte/src/utils/classes.js';
  import { createEventDispatcher } from 'svelte';
  import Icon from 'smelte/src/components/Icon';
  import createRipple from 'smelte/src/components/Ripple/ripple.js';

  const classesDefault = 'relative overflow-hidden duration-100 cursor-pointer flex items-center z-10';
  const selectedClassesDefault = 'bg-active dark:bg-active';
  const subheadingClassesDefault = 'text-gray-200 p-0 text-base';
  const lineBreakClassesDedault = 'border-b border-cgray-500 border-opacity-60';
  const hoverClassesDedault = 'hover:bg-cgray-500';

  export let icon = '';
  export let id = '';
  export let value = '';
  export let text = '';
  export let subheading = '';
  export let disabled = false;
  export let dense = false;
  export let selected = false;
  export let tabindex = null;
  export let lineBreak = false;
  export let defaultClass = classesDefault;
  export let selectedClasses = selectedClassesDefault;
  export let subheadingClasses = subheadingClassesDefault;
  export let lineBreakClasses = lineBreakClassesDedault;
  export let hoverClasses = hoverClassesDedault;

  export let to = '';
  export const item = null;
  export const items = [];
  export const level = null;

  const ripple = createRipple();
  const dispatch = createEventDispatcher();

  function change() {
    if (disabled) return;
    value = id;
    dispatch('change', { item, to });
  }

  const cb = new ClassBuilder(classesDefault);

  $: c = cb
    .flush()
    .add(selectedClasses, selected, selectedClassesDefault)
    .add(lineBreakClasses, lineBreak, lineBreakClassesDedault)
    .add('py-1', dense)
    .add('text-gray-600', disabled)
    .add($$props.class)
    .add('break-keep-all')
    .add(hoverClasses, !selected)
    .get();
</script>

<!-- use:ripple  -->
<li class="{c}" tabindex="{tabindex}" on:keypress="{change}" on:click>
  <div class="flex flex-col p-0">
    <slot name="button">
      {#if icon}
        <Icon class="pr-6 text-h3" small="{dense}">
          {icon}
        </Icon>
      {/if}
      <div class="{$$props.class}">
        <slot>{text}</slot>
      </div>
    </slot>
  </div>
  {#if subheading}
    <div class="{subheadingClasses}">{subheading}</div>
  {/if}
</li>
