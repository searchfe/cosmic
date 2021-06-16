<script lang="ts">
  import { Icon } from '@cosmic/core/components';
  import { getContext } from 'svelte';
  import { get } from 'svelte/store';
  export let key: number | null = null;
  export let header = '';
  export let append = '';
  export let prepend = 'arrow_drop_down';

  let expand = false;
  const accordionStore: any = getContext('accordion');
  const activeKeyStore: any = getContext('activeKey');
  let accordion = get(accordionStore);
  let activeKey = get(accordionStore);

  activeKeyStore?.subscribe((cKey: number) => {
    console.log(accordion);
    activeKey = cKey;
    if (accordion) {
      expand = key === activeKey ? !expand : false;
      return;
    }
    expand = key === activeKey ? !expand : expand;
  });

  accordionStore?.subscribe((value: boolean) => {
    accordion = value;
  });

  const headerDefault =
    'flex h-8 flex-row justify-between items-center text-gray-50  dark:text-cgray-200 bg-cgray-400 dark:bg-cgray-700 dark:border-cgray-500 text-sm px-2 py-1 cursor-pointer';

  function changeKeyHandler() {
    if (activeKey !== key) {
      activeKeyStore.set(key as number);
      return;
    }
    expand = !expand;
    console.log(expand);
  }

</script>

<div class="w-full flex flex-col my-1">
  <header on:click="{changeKeyHandler}" class="{headerDefault}">
    <div class="flex flex-row items-center">
      {#if !!prepend}
        <Icon class="mr-4" reverse="{expand}">{prepend}</Icon>
      {/if}
      {header}
    </div>
    {#if !!append}
      <Icon reverse="{expand}">{append}</Icon>
    {/if}
  </header>
  {#if expand}
    <div class="m-2 text-sm">
      <slot />
    </div>
  {/if}
</div>
