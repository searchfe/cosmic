<script>
  import "smelte/src/tailwind.css";
  import "../../../src/core/components/global.css";
  import { Meta, Story, Template } from "@storybook/addon-svelte-csf";
  import { Select } from "../../../src/core/components";
  let value = false;
  function valueChange({ detail }) {
    value = detail.value;
    console.log(value);
  }

  const items = [
    { value: 1, text: "One" },
    { value: 2, text: "Two" },
    { value: 3, text: "Three" },
    { value: 4, text: "Four" },
  ];

</script>

<Meta title="Select" component="{Select}" />

<Template let:args>
  <Select {...args} on:valueChange="{valueChange}" class="w-80"/>
</Template>

<Story name="Default" args="{{ items }}" />
