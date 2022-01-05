<script lang="ts">
    import 'smelte/src/tailwind.css';
    import '@cosmic/core/components/global.css';
    import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
    import { PopupRing, GroupChangeEvent } from '@cosmic/core/components';

    $: selected = -1;
    function handleChange(event) {
        selected = event.detail.selected;
    }
</script>

<Meta title="Popup Guide" component={PopupRing} />

<Template id="normal" let:args>
    <div class="w-1/2 h-full bg-cgray-50 dark:bg-cgray-800 relative">
        <div class="pt-5 pl-5 text-base">selected Item : {selected}</div>
        <PopupRing on:change={handleChange} {...args} />
    </div>
</Template>

<Story name="Ring" template="normal" args={{ title: 'Ring' }} />
