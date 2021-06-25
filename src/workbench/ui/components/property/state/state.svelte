<script>
  import { Button, List } from '@cosmic/core/components';
  import { createEventDispatcher } from 'svelte';
  export let widgets = [];
  export let stateList = [];
  export let stateValue = '';
  export let widgetValue = '';
  const dispatch = createEventDispatcher();
</script>

<div class="flex flex-col px-4 ">
  <span class="flex flex-glow-0 h-8 items-center">交互状态</span>
  <div class="flex border-b h-12">
    <div class="border-r flex-auto flex flex-col px-6 py-4 justify-around">
      {#each stateList as item}
        <Button
          on:click="{() => dispatch('stateChange', item)}"
          selected="{stateValue === item}"
          class="w-40 {stateValue === item ? 'dark:bg-active bg-active' : ''}">{item}</Button
        >
      {/each}
    </div>
    <div class="flex-auto flex flex-col px-4 mb-4">
      <header class="flex flex-grow-0 h-8 items-center">基础组件</header>
      <div class="flex flex-col justify-around flex-auto ">
        <List value="{widgetValue}" on:change="{(event) => dispatch('widgetChange', event.detail)}" items="{widgets}" />
      </div>
    </div>
  </div>
</div>
