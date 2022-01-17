<script>
      import Icon, { supported } from '../icon/icon.svelte';
      import Button from '../component/button.svelte';
      import IconButton from '../ui/button-icon.module.css';
</script>
<toolbar class="{$$props.class} toolbar flex flex-row flex-nowrap">
    <div class="pre flex">
        <Button size="sm" class="item" styles={IconButton} let:classes>
            <Icon svg="cursor" slot="prefix" class="{classes}"></Icon>
        </Button>
        <Button size="sm" class="item" styles={IconButton} let:classes>
            <Icon svg="rectangle" slot="prefix" class="{classes}"></Icon>
        </Button>
        <Button size="sm" class="item" styles={IconButton} let:classes>
            <Icon svg="vector" slot="prefix" class="{classes}"></Icon>
        </Button>
        <Button size="sm" class="item" styles={IconButton} let:classes>
            <Icon svg="text" slot="prefix" class="{classes}"></Icon>
        </Button>
        <Button size="sm" class="item" styles={IconButton} let:classes>
            <Icon svg="image" slot="prefix" class="{classes}"></Icon>
        </Button>
    </div>
    <div class="mid flex">
        <Button size="sm" class="item" styles={IconButton} let:classes>
            <Icon svg="route" slot="prefix" class="{classes}"></Icon>
        </Button>
        <Button size="sm" class="item" styles={IconButton} let:classes>
            <Icon svg="shape" slot="prefix" class="{classes}"></Icon>
        </Button>
        <Button size="sm" class="item" styles={IconButton} let:classes>
            <Icon svg="image" slot="prefix" class="{classes}"></Icon>
        </Button>
    </div>
    <div class="sub flex">
        <Button size="sm" class="item" styles={IconButton} let:classes>
            <Icon svg="play" slot="prefix" class="{classes}"></Icon>
        </Button>
        <Button size="sm" class="item" styles={IconButton} let:classes>
            <Icon svg="layout" slot="prefix" class="{classes}"></Icon>
        </Button>
    </div>
</toolbar>
<style>
    .toolbar {
        height: calc(var(--spacing-base) * 11);
        color:red;
    }
    .toolbar .pre {
        flex: 1 0 24rem;
        padding: 0.9rem 0 0.9rem 1rem;
    }
    .toolbar .mid {
        flex: 1 1 24rem;
        padding: 0.9rem 0;
        justify-content: center;
    }
    .toolbar .sub {
        flex: 1 0 24rem;
        padding: 0.9rem 1rem 0.9rem 0;
        justify-content: right;
    }
    .toolbar > div > :global(.item) {
        margin: 0 1rem;
    }
</style>
