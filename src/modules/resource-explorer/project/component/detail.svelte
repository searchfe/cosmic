<script lang="typescript">
  import ProjectInfo from './info.svelte';
  import { query } from '@urql/svelte';
  import DirCard from '../../design/component/dir-card.svelte';
  import FileCard from '../../design/component/file-card.svelte';
  import { queryProjects } from '../api';

  export let params: Record<string, string> = {};
  const store = queryProjects({ parent: params.projectId });
  query(store);
</script>

<ProjectInfo title="搜索通用组件" />
<div class="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-10">
  {#if !$store.fetching && $store.data.projects}
    {#each $store.data.projects as project}
      <DirCard data={project}/>
    {/each}
  {/if}
  <FileCard></FileCard>
</div>

