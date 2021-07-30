<script>
  import 'smelte/src/tailwind.css';
  import '../../../src/core/components/global.css';
  import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
  import { Switch } from '../../../src/core/components';
  let value = false;
  function valueChange({ detail }) {
    value = detail.value;
  }
</script>

<Meta title="Switch" component="{Switch}" />

<Template let:args>
  <Switch {...args} on:valueChange="{valueChange}" />
</Template>

<Story name="Default" args="{{ label: 'switch' }}" />
