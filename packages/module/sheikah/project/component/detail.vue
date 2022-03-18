<script lang="ts" setup>
    import ProjectInfo from '../../common/component/region.vue';
    // import { query } from '@urql/vue';
    // import DirCard from './dir-card.vue';
    import FileCard from './file-card.vue';
    // import { queryProjects } from '../api';

    // export let params: Record<string, string> = {};
    // const store = queryProjects({ parent: params.projectId });
    // query(store);

    // $: {
    //     if (params.projectId) {
    //         store.reexecute({ requestPolicy: 'network-only' });
    //     }
    // }
</script>

<template>
    <project-info title="搜索通用组件" />
    <div :class="$style.content">
        <FileCard />
        <!-- {#if !$store.fetching && $store.data.projects}
            {#each $store.data.projects as project}
                {#if $store.data.projects.children}
                    content here
                {/if}
                <DirCard data="{project}" />

            {/each}
        {/if} -->
    </div>
</template>

<style module>
.content {
    width: 100%;
    /* grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-22 xl:gap-26 2xl:gap-14 */
}
</style>
