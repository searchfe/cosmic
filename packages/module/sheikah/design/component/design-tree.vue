<script lang="ts" setup>
    // import { Tree } from 'cosmic-vue';
    // import type { TreeNodeOption } from 'cosmic-vue';

    // interface Props extends gql.Team{
    //     _style: Record<string, string>;
    // }

    // withDefaults(defineProps<Props>(), {})

    // const leaves = {
    //     label: '设计资产',
    //     key: '0',
    //     children: [
    //         {
    //             key: '1',
    //             label: '视觉原子',
    //         },
    //         {
    //             key: '2',
    //             label: '组件预置',
    //         },
    //         {
    //             key: '3',
    //             label: '上线资产',
    //         },
    //     ],
    // };

    // export let team: Team;

    // // const keySelectHandlers = {
    // //     0: function () {},
    // //     1: function () {
    // //         push(urlFor(ROUTES.DESIGN_ATOM, { teamId: team.id }));
    // //     },
    // //     2: function () {},
    // //     3: function () {},
    // // };

    // function projectNodeClickedHandler(event) {
    //     // keySelectHandlers[event.detail.selectedKey]();
    // }
</script>

<template>
    design-tree
    <!-- <Tree data={leaves} primaryIndent={2.2} treeIcon="grid_view" on:click={projectNodeClickedHandler} /> -->
</template>
