<script lang="ts">
    import _styles from '../ui/button.module.css';
    import type { State, Size, Type } from '../ui/button'; ;
    // import Icon from '../icon/icon.svelte';
    export let styles = _styles;
    export let size: Size = 'base';
    export let disabled : boolean = false;
    let state = disabled ? 'disabled': 'normal';
</script>

<div class="{styles.button} {state} {size} {$$props.class}">
    <!-- <Icon></Icon> -->
    {#if $$slots.prefix}
        <slot name='prefix' classes="{styles.prefix} {size}"></slot>
    {/if}
    {#if $$slots.default}
        <slot classes={styles.label}>Button</slot>
    {/if}
    {#if $$slots.subfix}
        <slot name='subfix' classes="{styles.subfix} {size}"></slot>
    {/if}
</div>
