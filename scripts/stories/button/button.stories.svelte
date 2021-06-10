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

  <div class="mt-5 mb-5 text-tiny">Auto（Configurable）</div>
  <Button class="w-40" {...args}>Button</Button>

  <div class="mt-5 mb-5 text-tiny">Light</div>
  <Button class="w-40" light="true">Button</Button>

  <div class="mt-5 mb-5 text-tiny">Dark</div>
  <Button class="w-40" dark="true">Button</Button>

  <!-- <p class="mt-5 mb-5"></p>
  <Button {...args} on:click="{handleClick}" class="w-40">
    {count}
  </Button> -->

  <div class="max-w-xs">

    <div class="mt-5 mb-5 text-tiny">Block</div>
    <div class="w-">
      <Button class="w-40" block="true">Button</Button>
    </div>


    <h6 class="mb-3 mt-6">Outlined</h6>
    <div class="py-2">
      <Button color="secondary" light block outlined>Button</Button>
    </div>

    <h6 class="mb-3 mt-6">Text</h6>
    <div class="py-2">
      <Button text>Button</Button>
    </div>

    <h6 class="mb-3 mt-6">Disabled</h6>
    <div class="py-2">
      <Button block disabled>Button</Button>
    </div>

    <h6 class="mb-3 mt-6">FAB <a href="https://material.io/components/buttons-floating-action-button/">(Floating action button)</a></h6>
    <div class="py-2">
      <Button color="alert" icon="change_history" />
    </div>

    <h6 class="mb-3 mt-6">Fab flat</h6>
    <div class="py-2">
      <Button color="error" icon="change_history" text light flat />
    </div>
  </div>

</Template>

<Story name="Primary" args={{primary:true}}></Story>

