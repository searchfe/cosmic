<script lang="ts">
    import { LAYOUT } from './layout.svelte';
    import { getContext } from 'svelte';

    const { hasSider } = getContext(LAYOUT);
    $hasSider = true;
</script>

<aside class="w-270 pt-24 px-14 flex-none relative box-border bg-white height-full">
    <slot />
</aside>
