<script lang="ts">
    import 'smelte/src/tailwind.css';
    import '@cosmic/core/components/global.css';
    import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
    import { Menu, Button } from '@cosmic/core/components';
    let selected = { text: '' };
    let open = true;
    const items = [
        { value: 1, text: 'Home', icon: 'home', lineBreak: true },
        { value: 2, text: 'New', icon: 'article', shortcutKey: 'N' },
        { value: 3, text: 'Open', icon: 'folder_open', shortcutKey: 'O' },
        { value: 4, text: 'Save', icon: 'save', shortcutKey: 'S', lineBreak: true },
        { value: 5, text: 'Perferences', icon: 'settings', shortcutKey: 'P' },
        { value: 6, text: 'Exit', icon: 'close', shortcutKey: 'E' },
    ];
</script>

<Meta title="Menu" component={Menu} />

<Story name="Default">
    Select: {selected.text || ''}
    <br />
    <br />
    <Menu bind:open {items} bind:value={selected}>
        <div slot="activator">
            <Button
                on:click={() => (open = !open)}
                bgClasses={open ? '' : 'bg-opacity-0 dark:bg-opacity-0 hover:bg-opacity-100'}>Files</Button
            >
        </div>
    </Menu>
</Story>
