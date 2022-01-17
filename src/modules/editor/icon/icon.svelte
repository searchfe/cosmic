<script context="module">
    import SVG from './svg.svelte';
    import cursor from './cursor.svg';
    import vector from './vector.svg';
    import rectangle from './rectangle.svg';
    import text from './text.svg';
    import image from './image.svg';
    import route from './route.svg';
    import shape from './todo-shape.svg';
    import play from './play.svg';
    import layout from './layout.svg';
    export const supported = {
        cursor,
        rectangle,
        vector,
        text,
        image,
        route,
        shape,
        play,
        layout,
    }
</script>

<script>


    export let svg;
    console.log(svg, supported);
</script>
{#if svg}
    <SVG src="./node_modules/@cosmic/modules/dist/icon/{supported[svg]}" class={$$props.class} />
{/if}
