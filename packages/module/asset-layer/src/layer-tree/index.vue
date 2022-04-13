<script lang="ts" setup>
import { Tree, TreeNodeState } from 'cosmic-vue';
import { treeSecondary } from 'cosmic-ui';
import { ref } from 'vue';
import { service } from '@cosmic/core/browser';
import { type DocumentNode, inject } from '@cosmic/core/parts';
import { type LayerTreeData, nodeToTree, updateSelection } from './layer-tree';


const treedata = ref<LayerTreeData[]>([]);

const nodeService = inject<service.NodeService>(service.TOKENS.Node);

let doc: DocumentNode;

nodeService.document.subscribe(document => {
    nodeService.unwatch(doc);
    doc = document;
    treedata.value = nodeToTree(doc);
    nodeService.watch(document).subscribe((updateDocument) => {
        treedata.value = nodeToTree(updateDocument as DocumentNode);
    });
});

nodeService.selection.subscribe(nodes => {
    treedata.value = updateSelection(treedata.value, nodes);
});

function changeSelection(event: any){
    // console.log(event.id, treedata.value);
    nodeService.setSelection([event.nodeData.layerId]);
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
        <template #subfix="slotProps">
            <i-cosmic-eye-open v-if="slotProps.nodeData.type !== 'PAGE'" />
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
