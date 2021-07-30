<script lang="ts">
  import 'smelte/src/tailwind.css';
  import '../../../src/core/components/global.css';
  import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
  import { Menu, Button } from '../../../src/core/components';
  let selected = '';
  let open = true;
  const items = [
    { value: 1, text: 'One' },
    { value: 2, text: 'Two' },
    { value: 3, text: 'Three' },
    { value: 4, text: 'Four' },
    { value: 5, text: 'Five' },
  ];
</script>

<Meta title="Menu" component="{Menu}" />

<Story name="Default">
  <Menu bind:open items="{items}" bind:value="{selected}">
    <div slot="activator">
      <Button on:click="{() => (open = !open)}" class="w-40">A menu</Button>
    </div>
  </Menu>
</Story>
