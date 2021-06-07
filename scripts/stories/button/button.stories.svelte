<script>
  import "smelte/src/tailwind.css";
  import "../utils/global.css";
  import { Meta, Story, Template } from "@storybook/addon-svelte-csf";
  import Button from "../../../src/core/components/button";
  let count = 0;
  function handleClick() {
      console.log(count)
    count += 1;
  }

</script>

<Meta title="Button" component="{Button}" />

<Template let:args>
  <Button {...args} on:click="{handleClick}">
    {count}
  </Button>
</Template>

<Story name="Primary" args={{primary:true}}></Story>

<Story name="默认" >
  <Button on:click="{handleClick}">{count}</Button>
</Story>
