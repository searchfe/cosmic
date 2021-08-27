<script lang="ts">
  import { getContext } from 'svelte';
  import { Menu, Button } from '@cosmic/core/components';

  const menusContext = getContext('menus') as any;

  let items = [];
  export let name = '';

  let originalMenuItems = [];

  menusContext.subscribe((menuItems) => {
    originalMenuItems = menuItems;
    items = originalMenuItems.map((item) => ({ value: item.id, text: item.title }));
  });
  let open = false;
  function changeHandler({ detail }) {
    const menu = originalMenuItems.find((item) => item.id === detail);
    menu.callback(menu);
  }

  const selectedClasses = (i) => 'bg-active dark:bg-active break-normal';
</script>

<div class="ml-5 flex flex-auto items-center h-full">
  <Menu items="{items}" bind:open on:change="{changeHandler}" selectedClasses="{selectedClasses}">
    <div slot="activator">
      <Button on:click="{() => (open = !open)}">{name}</Button>
    </div>
  </Menu>
</div>
