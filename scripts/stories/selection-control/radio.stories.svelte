<script>
  import "smelte/src/tailwind.css";
  import "../../../src/core/components/global.css";
  import { Meta, Story, Template } from "@storybook/addon-svelte-csf";
  import {RadioButton, RadioButtonGroup} from "../../../src/core/components/radio-button";

</script>

<Meta title="Selection Control" component="{RadioButtonGroup}" />

<Template let:args>
  <RadioButtonGroup
    name="test"
    items="{[
      { value: 1, label: 'One' },
      { value: 2, label: 'Two' },
    ]}"
  />
</Template>

<Story name="Radio" />
