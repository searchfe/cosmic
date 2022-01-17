<script>
    import SVG from './inline-svg.svelte';
    import cursor from './cursor.svg';
    export let svg;
    let map = {
        cursor,
    }
</script>
{#if svg}
    <SVG src="./node_modules/@cosmic/modules/dist/icon/{map[svg]}" class={$$props.class} />
{/if}
