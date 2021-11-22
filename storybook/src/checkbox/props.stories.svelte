<script>
  import 'smelte/src/tailwind.css';
  import '@cosmic/core/components/global.css';
  import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
  import Checkbox from '@cosmic/core/components/checkbox';
</script>

<Meta title="CheckBox" component="{Checkbox}" />

<Template let:args>
  <Checkbox {...args} />
</Template>

<Story name="Props" />
