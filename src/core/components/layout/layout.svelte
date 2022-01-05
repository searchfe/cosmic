<script lang="ts" context="module">
    export const LAYOUT = { name: 'layout' };
</script>

<script lang="ts">
    import { setContext } from 'svelte';
    import { writable } from 'svelte/store';
    const hasSider = writable(false);

    setContext(LAYOUT, { hasSider });

    export let classes = '';
</script>

<section class="flex flex-auto h-full {classes} {$hasSider ? 'flex-row' : 'flex-col'}">
    <slot />
</section>
