<script lang="ts" setup>
import { Tree, TreeNodeState, type TreeNodeEvent } from 'cosmic-vue';
import { treeSecondary } from 'cosmic-ui';
import { ref } from 'vue';
import { service } from '@cosmic/core/browser';
import { inject } from '@cosmic/core/parts';
import { type LayerTreeData, nodeToTree } from './layer-tree';


const treedata = ref<LayerTreeData[]>([]);

const nodeService = inject<service.NodeService>(service.TOKENS.Node);

nodeService.document.subscribe(document => {
    treedata.value = nodeToTree(document);
    console.log(treedata.value);
});

nodeService.selection.subscribe(node => console.log(node));

function changeSelection(event: TreeNodeEvent){
    nodeService.setSelection([event.id]);
}

</script>
<template>
    <tree
        editable
        class="m-10 customlized"
        :data="treedata"
        :styles="treeSecondary"
        @click-node="changeSelection"
    >
        <template #arrow="slotProps">
            <span v-if="slotProps.state == TreeNodeState.open" class="inline-block w-10 pb-2">▾</span>
            <span v-if="slotProps.state == TreeNodeState.close" class="inline-block w-10 pb-2">▸</span>
        </template>
        <template #prefix="slotProps">
            <i-cosmic-board v-if="slotProps.nodeData.type === 'PAGE'" />
            <i-cosmic-comp v-else-if="slotProps.nodeData.type === 'COMPONENT'" />
            <i-cosmic-text v-else-if="slotProps.nodeData.type === 'TEXT'" />
            <i-cosmic-square v-else />
        </template>
        <template #label="slotProps">
            {{ slotProps.nodeData.label }}
        </template>
        <template #subfix>
            <i-cosmic-eye-open />
        </template>
    </tree>
</template>
<style>
    .customlized {
        --font-md : 1.2rem;
        --icon-md : 1.4rem;
        --leading-md: 0;
    }
    .customlized input {
        font-size: 1.2rem;
    }
</style>
