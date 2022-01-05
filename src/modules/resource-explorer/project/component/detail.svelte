<script lang="ts">
    import ProjectInfo from './info.svelte';
    import { query } from '@urql/svelte';
    import DirCard from './dir-card.svelte';
    import FileCard from './file-card.svelte';
    import { queryProjects } from '../api';

    export let params: Record<string, string> = {};
    const store = queryProjects({ parent: params.projectId });
    query(store);

    $: {
        if (params.projectId) {
            store.reexecute({ requestPolicy: 'network-only' });
        }
    }
</script>

<ProjectInfo title="搜索通用组件" />
<div class="w-full grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-22 xl:gap-26 2xl:gap-14">
    {#if !$store.fetching && $store.data.projects}
        {#each $store.data.projects as project}
            {#if $store.data.projects.children}
                <!-- content here -->
            {/if}
            <!-- <DirCard data="{project}" /> -->
            <FileCard />
        {/each}
    {/if}
</div>
