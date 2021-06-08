<script>
  import "smelte/src/tailwind.css";
  import "../../../src/core/components/global.css";
  import { Meta, Story, Template } from "@storybook/addon-svelte-csf";
  import { List } from "../../../src/core/components";

  const items = [
    { value: 1, text: "One" },
    { value: 2, text: "Two" },
    { value: 3, text: "Three" },
    { value: 4, text: "Four" },
  ];
  function change(event) {
    console.log(event);
  }

</script>

<Meta title="List" component="{List}" />

<Template let:args>
  <List {...args} on:change="{change}" class="w-80"/>
</Template>

<Story name="Default" args="{{ items }}" />
