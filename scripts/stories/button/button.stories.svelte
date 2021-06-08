<script>
  import 'smelte/src/tailwind.css';
  import '../../../src/core/components/global.css';
  import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
  import Button from '../../../src/core/components/button';
  let count = 0;
  function handleClick() {
      console.log(count);
    count += 1;
  }
</script>

<Meta title="Button" component="{Button}" />

<!-- <Story name="默认" >
  <Button on:click="{handleClick}" class="w-40">{count}</Button>
</Story> -->


<Template let:args>
  <Button {...args} on:click="{handleClick}" class="w-40">
    {count}
  </Button>
</Template>

<Story name="Primary" args={{primary:true}}></Story>

