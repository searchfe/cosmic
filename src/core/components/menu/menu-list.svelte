<script lang="ts">
  import { ClassBuilder } from 'smelte/src/utils/classes.js';
  import { ButtonShortcut } from '../button-shortcut';

  import MenuItem from './menu-item.svelte';

  const lightTheme = 'bg-white text-black';
  const darkTheme = 'bg-black text-white';

  export let items = [];
  export let value = '';
  export let dense = false;
  export let noTopRadius = false;
  export let theme: 'dark' | 'light' = 'light';

  export const level = null;
  export const text = '';
  export const item = {};
  export const to = null;
  export let selectedClasses = '';
  export let hoverClasses = '';
  export let itemClasses = '';

  const classesDefault = 'overflow-hidden rounded-xl py-4';

  function id(i) {
    if (i.id !== undefined) return i.id;
    if (i.value !== undefined) return i.value;
    if (i.to !== undefined) return i.to;
    if (i.text !== undefined) return i.text;
    return i;
  }

  function getText(i) {
    if (i.text !== undefined) return i.text;
    if (i.value !== undefined) return i.value;
    return i;
  }

  const cb = new ClassBuilder(classesDefault);

  $: c = cb
    .flush()
    .add($$props.class)
    .add(theme === 'light' ? lightTheme : darkTheme)
    .get();
</script>

<ul class="{c}" class:rounded-t-none="{noTopRadius}">
  {#each items as item, i}
    {#if item.to !== undefined}
      <slot>
        <a tabindex="{i + 1}" href="{item.to}">
          <MenuItem bind:value {...item} id="{id(item)}" dense="{dense}" on:change>
            {item.text}
          </MenuItem>
        </a>
      </slot>
    {:else}
      <slot>
        <MenuItem
          bind:value
          selectedClasses="{selectedClasses}"
          hoverClasses="{hoverClasses}"
          class="{itemClasses} w-full"
          {...item}
          tabindex="{i + 1}"
          id="{id(item)}"
          selected="{value === id(item)}"
          dense="{dense}"
          on:change
          on:click
        >
          <ButtonShortcut
            slot="button"
            text="{getText(item)}"
            shortcutKey="{item.shortcutKey}"
            stopPropagation="true"
            value="{item}"
            icon="{item.icon || 'blank'}"
            classes="rounded-none"
            theme="{theme}"
            on:change
            on:click
          />
        </MenuItem>
      </slot>
    {/if}
  {/each}
</ul>
