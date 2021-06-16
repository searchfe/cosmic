<script>
    import "smelte/src/tailwind.css";
    import "../../../src/core/components/global.css";
    import { Meta, Story, Template } from "@storybook/addon-svelte-csf";
    import Checkbox from "../../../src/core/components/checkbox";
  
  </script>
  
  <Meta title="CheckBox" component="{Checkbox}" />
  
  <Template let:args>
    <Checkbox {...args} />
  </Template>
  
  <Story name="Props" />
  