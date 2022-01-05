<script lang="ts">
    import { WidgetCard } from '../../components';
    export let search = '';
    export let items = [
        {
            title: '输入框',
            icon: '',
        },
        {
            title: '文本域',
            icon: '',
        },
        {
            title: '输入框',
            icon: '',
        },
        {
            title: '输入框',
            icon: '',
        },
    ];

    let searchItems = [];

    $: searchItems = items.filter(item => item.title.includes(search));
</script>

<div class="grid grid-cols-3">
    {#each searchItems as item}
        <WidgetCard text={item.title} />
    {/each}
</div>
