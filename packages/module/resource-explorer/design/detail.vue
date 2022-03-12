<script lang="ts" setup>
    import Info from '../common/component/info.vue';
    import AtomMicroCard from './component/atom/micro-card.vue';
    import Filter from './component/atom/filter/index.vue';
    // import Operation from './component/atom/operation.vue';
    // import Dialog from './dialog/index.vue';
    // import { query as queryColor, onCreate } from './api/common';
    // import { subscription, query } from '@urql/vue';

    // export let params: Record<string, string> = {};

    // let colors: gql.Color[] = [];
    // let showDilaog = false;
    // // let usedFields = ['team', 'color'];

    // let active = {
    //     key: 'color',
    //     text: '颜色',
    // };

    // const data = [
    //     {
    //         key: 'atom1',
    //         name: '纯色',
    //     },
    //     {
    //         key: 'atom2',
    //         name: '渐变',
    //     },
    // ];

    // const store = queryColor<{ colors: gql.Color[] }, gql.QueryColorDTO>('color', {}, usedFields);

    // subscription(onCreate<gql.Color>('color', usedFields), (...args) => {
    //     console.log('🚀 ~ file: detail.svelte ~ line 35 ~ subscription ~ args', args);
    //     return args;
    // });

    // query(store);

    // function createHandler() {
    //     showDilaog = true;
    // }

    // function reQuery() {
    //     store.reexecute({ requestPolicy: 'network-only' });
    // }

    // $: {
    //     if (!$store.fetching && $store.data?.colors) {
    //         colors = $store.data.colors;
    //     }
    // }
</script>

<template>
    <Info title="原子">
        <Filter style="margin: 20px 0" />
        <!-- <Operation on:create={createHandler} /> -->
    </Info>

    <div :class="$style['atom-grid']">
        <AtomMicroCard />
    </div>

    <!-- <Dialog bind:show={showDilaog} team={params.teamId} on:created={reQuery} /> -->
</template>

<style module>
.atom-grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    column-gap: 22px;
    /* grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-22 xl:gap-26 2xl:gap-14 */
}
</style>
