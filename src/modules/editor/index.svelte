<script>
      import Button from './component/button.svelte';
      import IconButton from './ui/button-icon.module.css';
      import Icon from './icon/icon.svelte';
      import './ui/global.css';
</script>

<app class="w-full bg-white">
    <toolbar class="block w-full h-44">
        <Icon svg="cursor"></Icon>
    </toolbar>
    <div class="h-full flex flex-row flex-nowrap ">
        <div class="flex-none w-270">
            <!-- <Button size="xs" class="inline-block" let:classes type="reverse">
                <Icon svg="cursor" slot="prefix" class="{classes}"></Icon>
                <span slot="subfix" class="{classes}">--</span>
            </Button> -->
            <Button size="xs" class="inline-block">Button</Button>
            <Button size="sm" class="inline-block">Button</Button>
            <Button size="base" class="inline-block">Button</Button>
            <Button size="lg" class="inline-block">Button</Button>
            <br>
            <Button size="xs" class="inline-block" styles={IconButton} let:classes>
                <Icon svg="cursor" slot="prefix" class="{classes}"></Icon>
            </Button>
            <Button size="sm" class="inline-block hover" styles={IconButton} let:classes>
                <Icon svg="cursor" slot="prefix" class="{classes}"></Icon>
            </Button>
            <Button size="base" class="inline-block active" styles={IconButton} let:classes>
                <Icon svg="cursor" slot="prefix" class="{classes}"></Icon>
            </Button>
            <Button size="lg" class="inline-block selected" styles={IconButton} let:classes>
                <Icon svg="cursor" slot="prefix" class="{classes}"></Icon>
            </Button>
        </div>
        <div class="flex-1 bg-gray-100">2</div>
        <div class="flex-none w-270">3</div>
    </div>

</app>
