<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { ClassBuilder } from 'smelte/src/utils/classes.js';
  import { normalizeShortcutKey } from './util';
  import { createEventDispatcher } from 'svelte';

  const lightTheme = 'bg-white text-black';
  const darkTheme = 'bg-black text-white';

  const defaultContainerClass = 'flex items-center h-12 inline-block z-10 min-w-28 w-auto hover:shadow shadow text-sm font-normal';

  export let theme: 'dark' | 'light' = 'light';
  export let text = '';
  /** e.g.  "67" | "67,72" | "B" | "B,Z | "B,13""*/
  export let shortcutKey = '';
  /** from https://fonts.google.com/icons */
  export let icon = '';
  export let stopPropagation = 'false';
  export let value = '';
  export let disabled = false;
  export let classes = 'rounded';
  
  let keyConf = normalizeShortcutKey(shortcutKey);

  const containerClassBuilder = new ClassBuilder(defaultContainerClass);

  $: containerComputedClass = containerClassBuilder.flush()
      .add(theme === 'light' ? lightTheme : darkTheme)
      .add(classes)
      .get();

  const dispatch = createEventDispatcher();

  function change() {
    if (disabled) return;
    dispatch('change', value);
  }

  function keydownHandler(event: KeyboardEvent) {
    if (keyConf.keycodes.includes(event.keyCode)) {
      if (stopPropagation === 'true') {
        event.stopPropagation();
        event.preventDefault();
      }
    }
  }

  function keyupHandler(event: KeyboardEvent) {
    if (keyConf.keycodes.includes(event.keyCode)) {
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

<div class={containerComputedClass} on:click="{change}" >
  <slot name="icon">
    {#if icon == 'blank'}
      <i class="float-left material-icons material-icons-round icon pr-1 min-w-min leading-none  w-8 h-2"></i>
    {:else if icon}
      <i class="float-left material-icons material-icons-round icon pr-1 min-w-min leading-none w-8">{icon}</i>
    {/if}
  </slot>
  <span class="float-left">{text}</span>
  <span class="pl-8 float-right opacity-50">{keyConf.text}</span>
</div>
