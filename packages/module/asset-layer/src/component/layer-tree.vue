<script lang="ts" setup>
import { Tree, TreeNodeState, type TreeDataProps, type TreeNodeEvent } from 'cosmic-vue';
import { treeSecondary } from 'cosmic-ui';
import { ref } from 'vue';
import { service } from '@cosmic/core/browser';
import { inject, TextNode  } from '@cosmic/core/parts';
import type { DocumentNode, PageNode, SceneNode } from '@cosmic/core/parts';

const treedata = ref<TreeData[]>([]);

const nodeService = inject<service.NodeService>(service.TOKENS.Node);
nodeService.document().subscribe(document => {
   treedata.value = nodeToTree(document);
});
nodeService.selection().subscribe(node => console.log(node));

function nodeToTree(node: DocumentNode | SceneNode| PageNode) {
    const tree: TreeData[] = [];
    if (node instanceof TextNode) return [];
    node.children.forEach(n => {
        tree.push({
            id: n.id,
            label: n.name,
            children: nodeToTree(n),
        });
    });
    return tree as TreeData[];
}

interface TreeData extends TreeDataProps {
    children?: TreeData[];
}

function changeSelection(event: TreeNodeEvent){
    nodeService.change(event.id);
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
            <i-cosmic-board v-if="slotProps.nodeData.children" />
            <i-cosmic-rounded-square v-if="!slotProps.nodeData.children" />
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
