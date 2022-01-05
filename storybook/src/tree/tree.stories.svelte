<script>
    import 'smelte/src/tailwind.css';
    import '@cosmic/core/components/global.css';
    import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
    import { Treeview } from '@cosmic/core/components';

    const items = [
        {
            text: 'test',
            items: [
                { text: 'subtest' },
                { text: 'subtest2' },
                { text: 'subtest3' },
                {
                    text: 'subtest4',
                    items: [{ text: 'subtest' }, { text: 'subtest2' }, { text: 'subtest3' }, { text: 'subtest4' }],
                },
            ],
        },
        {
            text: 'test2',
            items: [{ text: 'subtest' }, { text: 'subtest2' }, { text: 'subtest3' }, { text: 'subtest4' }],
        },
        {
            text: 'test3',
            items: [{ text: 'subtest' }, { text: 'subtest2' }, { text: 'subtest3' }, { text: 'subtest4' }],
        },
    ];
</script>

<Meta title="Treeview" component={Treeview} />

<Template let:args>
    <Treeview {...args} class="w-80 overflow-hidden" />
</Template>

<Story name="Default" args={{ items, select: true }} />
