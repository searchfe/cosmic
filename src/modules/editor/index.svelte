<script>
      import SVG from 'svelte-inline-svg';
      import corsor from './icon/cursor.svg';
      import Button from './component/button.svelte';
</script>

<app class="w-full bg-white">
    <toolbar class="block w-full h-44">
        <SVG src="./node_modules/@cosmic/modules/dist/icon/{corsor}" width="30" height="30" class="inline-block" />
        <Button size="xs" class="inline-block" let:classes>
            <span slot="prefix" class="{classes}">-></span>
            <span slot="subfix" class="{classes}">--</span>
        </Button>
        <Button size="xs" prefab="circle" class="inline-block"></Button>
        <Button class="inline-block">按钮</Button>
    </toolbar>
    <div class="h-full flex flex-row flex-nowrap ">
        <div class="flex-none w-270">1</div>
        <div class="flex-1 bg-gray-100">2</div>
        <div class="flex-none w-270">3</div>
    </div>

</app>
<style>
</style>