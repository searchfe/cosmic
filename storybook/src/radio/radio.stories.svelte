<script>
  import 'smelte/src/tailwind.css';
  import '@cosmic/core/components/global.css';
  import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
  import { RadioButtonGroup } from '@cosmic/core/components/radio-button';
</script>

<Meta title="Radio" component="{RadioButtonGroup}" />

<Template>
  <RadioButtonGroup
    name="test"
    items="{[
      { value: 1, label: 'One' },
      { value: 2, label: 'Two' },
    ]}"
  />
</Template>

<Story name="Radio" />
