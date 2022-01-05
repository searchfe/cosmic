<script lang="ts">
    import 'smelte/src/tailwind.css';
    import '@cosmic/core/components/global.css';
    import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
    import { TextField } from '@cosmic/core/components';
</script>

<Meta title="Input" component={TextField} />

<Template let:args id="normal">
    <div class="w-80">
        <TextField {...args} />
    </div>
</Template>

<Story name="Default" template="normal" args={{ outlined: false }} />

<Story name="Error" template="normal" args={{ error: 'this is a error', value: 'this is a error' }} />

<Story name="Textarea" template="normal" args={{ rows: 4, textarea: true }} />

<Story name="Prepend" template="normal" args={{ prepend: 'search' }} />

<Story name="Append" template="normal" args={{ append: 'search' }} />
