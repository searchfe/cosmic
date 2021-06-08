<script lang="ts">
  import { ClassBuilder } from "smelte/src/utils/classes.js";

  import ListItem from "./list-item.svelte";

  export let items = [];
  export let value = "";
  export let dense = false;
  export let select = false;

  export const level = null;
  export const text = "";
  export const item = {};
  export const to = null;
  export const selectedClasses = (i) => i;
  export const itemClasses = (i) => i;

  const classesDefault = "text-gray-50 dark:text-gray-200 bg-cgray-400 dark:bg-cgray-600 rounded";

  export let classes = classesDefault;

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

  const cb = new ClassBuilder($$props.class);

  $: c = cb.flush().add(classes, true, classesDefault).add($$props.class).get();

</script>

<ul class="{c}" class:rounded-t-none="{select}">
  {#each items as item, i}
    {#if item.to !== undefined}
      <slot name="item" item="{item}" dense="{dense}" value="{value}">
        <a tabindex="{i + 1}" href="{item.to}">
          <ListItem bind:value {...item} id="{id(item)}" dense="{dense}" on:change>
            {item.text}
          </ListItem>
        </a>
      </slot>
    {:else}
      <slot name="item" item="{item}" dense="{dense}" value="{value}">
        <ListItem
          bind:value
          selectedClasses="{selectedClasses}"
          itemClasses="{itemClasses}"
          {...item}
          tabindex="{i + 1}"
          id="{id(item)}"
          selected="{value === id(item)}"
          dense="{dense}"
          on:change
          on:click
        >
          {getText(item)}
        </ListItem>
      </slot>
    {/if}
  {/each}
</ul>
