<script lang="ts">
  import { query } from '@urql/svelte';
  import Info from './info.svelte';
  import DesignCard from '../../design/component/micro-card.svelte';
  import ProjectCard from '../../project/component/micro-card.svelte';
  import { queryProjects } from '../../project/api';

  export let params: Record<string, string> = {};
  const store = queryProjects({ team: params.teamId });

  query(store);

  const tempItem = {
    header: 'https://fe-dev.bj.bcebos.com/design-card-header.png',
    title: '视觉原子',
    infos: [{ key: '引用', value: '36' }, { key: '自荐', value: '2' }],
    imgs: [
      'https://fe-dev.bj.bcebos.com/%E5%8D%A1%E7%89%87%E5%86%85%E7%BC%A9%E7%95%A5%E5%9B%BE%2001.png',
      'https://fe-dev.bj.bcebos.com/%E5%8D%A1%E7%89%87%E5%86%85%E7%BC%A9%E7%95%A5%E5%9B%BE%2002.png',
      'https://fe-dev.bj.bcebos.com/%E5%8D%A1%E7%89%87%E5%86%85%E7%BC%A9%E7%95%A5%E5%9B%BE%2003.png',
      'https://fe-dev.bj.bcebos.com/%E5%8D%A1%E7%89%87%E5%86%85%E7%BC%A9%E7%95%A5%E5%9B%BE%2004.png'
    ],
    extra: '38个',
  };
  const teamAssestData = [tempItem, {
    ...tempItem,
    title: '组件预设',
  }, {
    ...tempItem,
    title: '视觉原子',
  }];
</script>

<div>
  <Info title="百度搜索" />
  <div class="text-h1 mb-30">设计资产</div>
  <div class="grid grid-cols-2 gap-22 lg:grid-cols-3 xl:gap-26 2xl:gap-14">
    {#each teamAssestData as item}
      <DesignCard {...item}/>
    {/each}
  </div>
  <div class="text-h1 mt-40 mb-30">项目类别</div>
  <div class="grid grid-cols-2 gap-22 lg:grid-cols-3 xl:gap--26 2xl:grid-cols-4 2xl:gap-14">
    {#if !$store.fetching && $store.data.projects}
      {#each $store.data.projects as project}
        <ProjectCard data="{project}" />
      {/each}
    {/if}
  </div>
</div>
