<script lang='ts'>
    import { createEventDispatcher } from 'svelte';
    import Button from '../../../src/core/components/button';
    export let label = '';
    const dispatch = createEventDispatcher();
    function onClick(event) {
        dispatch('customEventHandler', event);
    }
</script>

<Button on:click={onClick} {...$$props}>{label}</Button>