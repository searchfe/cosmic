<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import List from './menu-list.svelte';
    import { ClassBuilder } from 'smelte/src/utils/classes';

    const containerClassesDefault = 'cursor-pointer bg-none';
    const listClassesDefault = 'w-auto z-20';

    export let items = [];
    export let open = false;
    export let value = null;
    export let listClasses = '';
    export let listProps = {};
    export let theme: 'dark' | 'light' = 'light';

    const containerClassBuilder = new ClassBuilder(containerClassesDefault);
    const listClassBuilder = new ClassBuilder(listClassesDefault);

    $: containerComputedClass = containerClassBuilder.flush().add($$props.class).get();

    $: listComputedClass = listClassBuilder.flush().add(listClasses).get();

    const dispatch = createEventDispatcher();
</script>

<svelte:window on:click={() => (open = false)} />

<div class={containerComputedClass} on:click|stopPropagation>
    <slot name="activator" />
    <slot name="menu">
        {#if open}
            <div class={listComputedClass}>
                <List
                    bind:value
                    select
                    dense
                    {theme}
                    {items}
                    noTopRadius={Boolean($$slots.activator)}
                    on:change
                    on:change={e => {
                        open = false;
                        value = e.detail;
                    }}
                    {...listProps}
                />
            </div>
        {/if}
    </slot>
</div>
