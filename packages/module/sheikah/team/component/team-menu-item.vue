<script lang="ts" setup>
import { Tree as RTree, TreeNode } from 'cosmic-vue';
interface ProjectNode {
    title: string;
    key: string;
    children: ProjectNode[];
    parent?: string;
}

interface ProjectOptions {
    data: ProjectNode;
}

withDefaults(defineProps<ProjectOptions>(), {
    data: () => {
        return {
            title: '',
            key: '',
            parent: '',
            children: [],
        };
    },
});

</script>

<template>
    <r-tree>
        <tree-node title="设计资产">
            <tree-node title="原子" />
            <tree-node title="组件" />
        </tree-node>
    </r-tree>
    <r-tree :data="[data]" />
</template>

<style module>
</style>
