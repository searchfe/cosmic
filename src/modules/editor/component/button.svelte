<script lang="ts">
    import { element } from '../blueprint/button'; 
    import type { State, Size, Type } from '../blueprint/button'; 
    export let state: State = 'normal';
    export let size: Size = 'base';
    export let type: Type = 'default';
    export let prefab: string = '';
</script>

<div class="{element.button} {prefab} {state} {size} {type} {$$props.class}">
    {#if $$slots.prefix}
        <slot name='prefix' classes={element.prefix}></slot>
    {/if}
    <slot classes={element.label}>Button</slot>
    {#if $$slots.subfix}
        <slot name='subfix' classes={element.subfix}></slot>
    {/if}
</div>