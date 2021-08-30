<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { normalizeShortcutKey } from './util';
  import { createEventDispatcher } from 'svelte';
  export let text = '';
  /** e.g.  "67" | "67,72" | "B" | "B,Z | "B,13""*/
  export let shortcutKey = '';
  /** from https://fonts.google.com/icons */
  export let icon = '';
  export let stopPropagation = 'false';
  export let state: 'default' | 'hover' | 'active' = 'default';
  let keyConf = normalizeShortcutKey(shortcutKey);
  export let bgClassDefault = 'bg-cgray-400 dark:bg-cgray-600 hover:bg-cgray-500 opacity-90 hover:opacity-100';
  export let classDefault = 'py-2 px-4 rounded hover:shadow shadow';
  export let hoverClassDefault = 'bg-cgray-500 dark:bg-cgray-500';
  export let activeClassDefault = 'bg-active dark:bg-active';
  export let value = '';
  let activeClass = '';
  let hoverClass = '';
  $: if (state === 'hover') {
    hoverClass = hoverClassDefault;
  } else {
    hoverClass = '';
  }

  export let disabled = false;
  const dispatch = createEventDispatcher();

  function change() {
    if (disabled) return;
    dispatch('change', value);
  }

  function keydownHandler(event: KeyboardEvent) {
    if (keyConf.keycodes.includes(event.keyCode)) {
      activeClass = activeClassDefault;
      if (stopPropagation === 'true') {
        event.stopPropagation();
        event.preventDefault();
      }
    }
  }
  function keyupHandler(event: KeyboardEvent) {
    if (keyConf.keycodes.includes(event.keyCode)) {
      activeClass = '';
      if (stopPropagation === 'true') {
        event.stopPropagation();
        event.preventDefault();
        change();
      }
    }
  }

  onMount(() => {
    document.addEventListener('keydown', keydownHandler);
    document.addEventListener('keyup', keyupHandler);
  });
  onDestroy(() => {
    document.removeEventListener('keydown', keydownHandler);
    document.removeEventListener('keyup', keyupHandler);
  });
</script>

<div
  class="inline-block z-10 min-w-28 w-auto text-xs
            font-normal text-gray-50 dark:text-gray-200 
            button {bgClassDefault} {classDefault}
            active:bg-active select-none {hoverClass} {activeClass}"
  on:click="{change}"
>
  <slot name="icon">
    {#if icon == 'blank'}
      <i class="float-left material-icons material-icons-round icon pr-1 min-w-min leading-none  w-8 h-2"></i>
    {:else if icon}
      <i class="float-left material-icons material-icons-round icon pr-1 min-w-min leading-none w-8">{icon}</i>
    {/if}
  </slot>
  <span class="float-left pr-4">{text}</span>
  <span class="pl-4 float-right opacity-50">{keyConf.text}</span>
</div>
