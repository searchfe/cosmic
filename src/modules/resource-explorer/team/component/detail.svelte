<script lang="ts">
  import { query } from '@urql/svelte';
  import Info from './info.svelte';
  import DesignCard from '../../design/component/micro-card.svelte';
  import ProjectCard from '../../project/component/micro-card.svelte';
  import { queryProjects } from '../../project/api';

  export let params: Record<string, string> = {};
  const store = queryProjects({ team: params.teamId });

  query(store);

  let tempIMG = 'https://fe-dev.bj.bcebos.com/design-card-micro.png';
  const tempItem = {
    header: 'https://fe-dev.bj.bcebos.com/design-card-header.png',
    title: '视觉原子',
    infos: [{ key: '引用', value: '36' }, { key: '自荐', value: '2' }],
    imgs: [tempIMG, tempIMG, tempIMG, tempIMG],
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
