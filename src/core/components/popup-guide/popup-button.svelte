<script lang="ts">
    import { onMount, onDestroy } from 'svelte';
    import { normalizeShortcutKey } from './util';
    export let text='';
    /** e.g.  "67" | "67,72" | "B" | "B,Z | "B,13""*/
    export let shortcutKey='';
    /** from https://fonts.google.com/icons */
    export let icon='';
    export let stopPropagation = 'false';
    export let state: 'default' | 'hover' | 'active' = 'default';
    let keyConf = normalizeShortcutKey(shortcutKey);
    let activeClass = '';
    let hoverClass = '';
    $: if (state === 'hover') {
        hoverClass = 'bg-cgray-500 dark:bg-cgray-500';
    } else {
        hoverClass = '';
    }

    function keydownHandler(event: KeyboardEvent){
        console.log(state, hoverClass);
        if (keyConf.keycodes.includes(event.keyCode)) {
            activeClass = 'bg-active dark:bg-active';
            if (stopPropagation === 'true') {
                event.stopPropagation();
                event.preventDefault();
            }
        }
    }
    function keyupHandler(event: KeyboardEvent){
        if (keyConf.keycodes.includes(event.keyCode)) {
            activeClass = '';
            if (stopPropagation === 'true') {
                event.stopPropagation();
                event.preventDefault();
            }
        }
    }
    onMount(() => {
        document.addEventListener('keydown', keydownHandler);
        document.addEventListener('keyup',keyupHandler);
    });
    onDestroy(() => {
        document.removeEventListener('keydown', keydownHandler);
        document.removeEventListener('keyup', keyupHandler);
    });
</script>
<div class="inline-block z-10 py-3 px-4 min-w-28 w-auto text-xs 
            font-normal text-gray-50 dark:text-gray-200 
            bg-cgray-400  dark:bg-cgray-600 hover:bg-cgray-500 opacity-90 hover:opacity-100
            hover:shadow shadow  rounded  button
            active:bg-active select-none {hoverClass} {activeClass}">
    {#if icon}
        <i class="float-left material-icons material-icons-round icon pr-1 min-w-min leading-none">{icon}</i>
    {/if}
    <span class="float-left pr-4">{text}</span>
    <span class="pl-4 float-right opacity-50">{keyConf.text}</span>
</div>