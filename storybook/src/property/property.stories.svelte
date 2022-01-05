<script lang="ts">
    import 'smelte/src/tailwind.css';
    import '@cosmic/core/components/global.css';
    import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
    import Proterty from '@cosmic/workbench/ui/components/property/proterty.svelte';
</script>

<Meta title="Proterty Panel" component={Proterty} />

<Template let:args>
    <Proterty />
</Template>

<Story name="Default" args={{}}>
    <Proterty />
</Story>
