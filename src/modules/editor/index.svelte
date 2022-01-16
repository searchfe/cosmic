<script>
      import Button from './component/button.svelte';
      import NewStyles from './ui/button-red.module.css';
      import Icon from './icon/icon.svelte';
      import './ui/global.css';
     console.log("NewStyles: ", NewStyles);
</script>

<app class="w-full bg-white">
    <toolbar class="block w-full h-44">
        <Icon svg="cursor"></Icon>
    </toolbar>
    <div class="h-full flex flex-row flex-nowrap ">
        <div class="flex-none w-270">
            <Button size="xs" class="inline-block" let:classes type="reverse">
                <!-- <Icon svg="cursor" slot="prefix" class="{classes}"></Icon> -->
                <span slot="subfix" class="{classes}">--</span>
            </Button>
            <Button size="sm" prefab="circle" class="inline-block sp-x-50" type="reverse"></Button>
            <Button class="inline-block sp-x-50">按钮</Button>
            <Button size="sm" prefab="circle" class="inline-block sp-x-50" type="reverse" disabled=true></Button>
            <Button class="inline-block sp-x-50" disabled=true>按钮</Button>
            <Button size="sm" prefab="circle" class="inline-block sp-x-50 hover" type="reverse"></Button>




            <Button class="inline-block sp-x-50 reverse" styles={NewStyles}>按钮</Button>
        </div>
        <div class="flex-1 bg-gray-100">2</div>
        <div class="flex-none w-270">3</div>
    </div>

</app>