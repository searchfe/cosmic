<script lang="ts" setup>
import { Tree as RTree, TreeNode } from 'cosmic-vue';

</script>

<template>
    <r-tree>
        <tree-node title="设计资产">
            <tree-node title="原子" />
            <!-- <tree-node title="组件"></tree-node> -->
        </tree-node>
    </r-tree>
    <r-tree>
        <tree-node title="项目类别">
            <tree-node title="项目1" />
            <tree-node title="项目2" />
        </tree-node>
    </r-tree>
</template>

<style module>
</style>
