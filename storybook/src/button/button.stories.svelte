<script>
  import 'smelte/src/tailwind.css';
  import '@cosmic/core/components/global.css';
  import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
  import { Button, ButtonShortcut } from '@cosmic/core/components';
  let count = 0;
  function handleClick() {
    count += 1;
  }
</script>

<Meta title="Button" component="{Button}" />

<!-- <Story name="默认" >
  <Button on:click="{handleClick}" class="w-40">{count}</Button>
</Story> -->

<Template let:args>
  <blockquote class="pl-4 mt-2 mb-20 border-l-4 border-blue text-base py-2">
    <p>Buttons allow users to take actions, and make choices, with a single tap.</p>
  </blockquote>

  <div class="mt-5 mb-5 text-base">Auto（Configurable）</div>
  <Button class="w-40 uppercase" {...args}>Button</Button>

  <div class="mt-5 mb-5 text-base">Light</div>
  <Button class="w-40 uppercase" light="true">Button</Button>

  <div class="mt-5 mb-5 text-base">Dark</div>
  <Button class="w-40 uppercase" dark="true">Button</Button>

  <!-- <p class="mt-5 mb-5"></p>
  <Button {...args} on:click="{handleClick}" class="w-40">
    {count}
  </Button> -->

  <div class="max-w-xs">
    <div class="mt-5 mb-5 text-base">Block</div>
    <div class="w-40">
      <Button class="w-40 uppercase" block="true">Button</Button>
    </div>

    <h6 class="mb-3 mt-15">Outlined</h6>
    <div class="py-2">
      <Button color="secondary" class="uppercase" light block outlined>Button</Button>
    </div>

    <h6 class="mb-3 mt-15">Text</h6>
    <div class="py-2">
      <Button class="uppercase" text>Button</Button>
    </div>

    <h6 class="mb-3 mt-15">Disabled</h6>
    <div class="py-2">
      <Button class="uppercase" block disabled>Button</Button>
    </div>

    <h6 class="mb-3 mt-15">
      FAB <a href="https://material.io/components/buttons-floating-action-button/">(Floating action button)</a>
    </h6>
    <div class="py-2">
      <Button color="alert" icon="change_history" />
    </div>

    <h6 class="mb-3 mt-15">Fab flat</h6>
    <div class="py-2">
      <Button color="error" icon="change_history" text light flat />
    </div>
  </div>
</Template>

<Story name="Primary" args="{{ primary: true }}" />

<Story name="Button With ShortcutKey">
  <div class="pt-4"></div>
  <ButtonShortcut text="Front" shortcutKey="70" stopPropagation="true" />
  <div class="pt-4"></div>
  <ButtonShortcut text="Back" shortcutKey="B,66" icon="arrow_back_ios" />
  <div class="pt-4"></div>
  <ButtonShortcut text="Back" shortcutKey="B,66" icon="blank" />
  <div class="pt-4"></div>
  <ButtonShortcut text="Active" shortcutKey="A" stopPropagation="true" state="hover" />
</Story>
