<script>
    import SVG from 'svelte-inline-svg';
    import cursor from './cursor.svg';
    export let classes = '';
    export let svg;
    let map = {
        cursor,
    }
</script>
<div class="icon {classes}">
    {#if svg}
        <SVG src="./node_modules/@cosmic/modules/dist/icon/{map[svg]}" />
    {/if}
</div>
