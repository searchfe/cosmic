<script lang="typescript">
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

<Card classes="flex px-5 py-7 {classes || ''}">
  <div class="w-32 h-32 mr-5 flex-none rounded-xl bg-black">temp</div>
  <div class="flex-auto py-1 flex flex-col justify-around text-black text-base">
    <div>一级标题</div>
    <div class="opacity-70">FC001</div>
    <div class="opacity-70">三图模版</div>
  </div>
  <div class="absolute flex bottom-7 right-5 text-base text-black">
    <div class="h-10 leading-10 mr-4">
      <Icon classes="inline-block mr-2 align-middle">swap_horiz</Icon>
      <span class="inline-block align-middle opacity-70">3</span>
    </div>
    <div class="h-10 leading-10">
      <Icon classes="inline-block mr-2 align-middle">link</Icon>
      <span class="inline-block align-middle opacity-70">3</span>
    </div>
  </div>
  <Dropdown classes="absolute top-7 right-5" items="{items}" />
</Card>
