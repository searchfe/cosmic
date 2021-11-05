<script lang="ts">
  import { Icon, Dropdown } from '@cosmic/core/components';
  import Card from '../../../common/components/card.svelte';

  const items = [
    {
      value: 1,
      text: '编辑',
    },
    {
      value: 2,
      text: '删除',
    },
  ];

  export let classes = '';
</script>

<Card classes="relative h-106 flex p-14 {classes}">
  <div class="w-78 h-78 mr-12 flex-none rounded-xl bg-black">temp</div>
  <div class="flex flex-auto pr-10">
    <div class="flex flex-col justify-between py-10 text-gray-700 text-base">
      <div class="text-black">一级标题</div>
      <div>FC001</div>
      <div>三图模版</div>
    </div>
  </div>
  
  <div class="absolute flex items-center bottom-14 right-14 h-26 text-base text-black">
    <div class="mr-10">
      <Icon classes="inline-block mr-10 align-middle">swap_horiz</Icon>
      <span class="num">3</span>
    </div>
    <div>
      <Icon classes="inline-block mr-10 align-middle">link</Icon>
      <span class="num">3</span>
    </div>
  </div>
  <Dropdown classes="absolute top-14 right-14" items="{items}" />
</Card>

<style>
  .num {
    @apply inline-block;
    @apply align-middle;
    @apply opacity-70;
    @apply max-w-sm;
    @apply whitespace-nowrap;
  }
</style>
