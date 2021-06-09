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
  <blockquote class="pl-4 mt-2 mb-8 border-l-4 border-blue text-tiny py-2"><p>Buttons allow users to take actions, and make choices, with a single tap.</p></blockquote>

  <div class="mt-5 mb-5 text-tiny">Basic</div>
  <Button class="w-40" light="true">Button</Button>

  <div class="mt-5 mb-5 text-tiny">Basic</div>
  <Button class="w-40" dark="true">Button</Button>

  <div class="mt-5 mb-5 text-tiny">Auto</div>
  <Button class="w-40">Button</Button>

  <div class="mt-5 mb-5 text-tiny">Block</div>
  <div class="w-96">
    <Button class="w-40 bg-error-500" block="true">Button</Button>
  </div>

  <p class="mt-5 mb-5"></p>
  <Button {...args} on:click="{handleClick}" class="w-40">
    {count}
  </Button>

</Template>

<Story name="Primary" args={{primary:true}}></Story>

