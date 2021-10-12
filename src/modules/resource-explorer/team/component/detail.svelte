<script lang="typescript">
  import { query } from '@urql/svelte';
  import Info from './info.svelte';
  import DesignCard from '../../design/component/micro-card.svelte';
  import ProjectCard from '../../project/component/micro-card.svelte';
  import { queryProjects } from '../../project/api';

  export let params: Record<string, string> = {}
  const store = queryProjects({ team: params.teamId });

  query(store);
</script>
<div>
  <Info title="百度搜索"/>
  <div class="text-h1 mb-12">设计资产</div>
  <div class="grid grid-cols-1 sm:grid-cols-3 gap-10">
    <DesignCard/>
  </div>
  <div class="text-h1 mt-16 mb-11">项目类别</div>
  <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
    {#if !$store.fetching && $store.data.projects}
      {#each $store.data.projects as project}
        <ProjectCard data={project}/>
      {/each}
    {/if}
  </div>
</div>
