<script lang="ts">
  import { Title } from '@cosmic/workbench/ui/components/components';
  import { VisionColor, VisionFontSize } from './components';
  import { createEventDispatcher } from 'svelte';
  import { each } from 'svelte/internal';
  export let vision: Object;
  const append = 'add';

  const dispatch = createEventDispatcher();

  const titleMap = {
    color: '颜色',
    fontSize: '字号',
  };

  const compoentMap = {
    color: VisionColor,
    fontSize: VisionFontSize,
  };

  // function addColor() {
  //   colors = [...colors, { color: 'FFFFFF', opacity: '100%' }];
  // }

  // function addFontSize() {
  //   fontSizes = [...fontSizes, { fontSize: '14' }];
  // }

  function add(key: string) {
    dispatch('addVision', key);
  }
</script>

<div>
  {#each Object.keys(vision) as key}
    <Title title="{titleMap[key]}" append="{append}" on:click="{() => add(key)}" />
    {#each vision[key] as value}
      <svelte:component this="{compoentMap[key]}" {...value} />
    {/each}
  {/each}
</div>
