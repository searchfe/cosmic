<script>
      import Button from './component/button.svelte';
      import IconButton from './ui/button-icon.module.css';
      import Icon, { supported } from './icon/icon.svelte';
      import Toolbar from './module/toolbar.svelte';
      import './ui/global.css';
</script>

<app class="w-full bg-white">
    <Toolbar class="block w-full"></Toolbar>
    <div class="h-full flex flex-row flex-nowrap ">
        <div class="flex-none assets-panel">
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
            <br>
            {#each Object.keys(supported) as item}
                <Button size="sm" class="inline-block selected" styles={IconButton} let:classes>
                    <Icon svg={item} slot="prefix" class="{classes}"></Icon>
                </Button>
            {/each}
        </div>
        <div class="flex-1 canvas-pannel">2</div>
        <div class="flex-none prop-panel">3</div>
    </div>
</app>
<style>
    .assets-panel{
        min-width: calc(var(--spacing-base) * 67.5);
    }
    .canvas-pannel {
        background-color: var(--color-gray-100);
    }
    .prop-panel{
        min-width: calc(var(--spacing-base) * 67.5);
    }
</style>

