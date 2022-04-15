<script lang="ts" setup>
import { Tree, TreeNodeState, type TreeChangeEvent } from 'cosmic-vue';
import { treeSecondary } from 'cosmic-ui';
import { ref } from 'vue';
import { service } from '@cosmic/core/browser';
import { type PageNode, inject, SceneNode, ChildrenMixin, BaseNodeMixin } from '@cosmic/core/parts';
import { type LayerTreeData, nodeToTree, updateSelection } from './layer-tree';
import { type Subject } from '@cosmic/core/rxjs';


const treedata = ref<LayerTreeData[]>([]);

const nodeService = inject<service.NodeService>(service.TOKENS.Node);

let page: PageNode;
let selections: SceneNode[] = [];
let subject: Subject<BaseNodeMixin>;

nodeService.currentPage.subscribe(newPage => {
    nodeService.unwatch(subject);
    page = newPage;
    treedata.value = nodeToTree(page);
    updateSelection(treedata.value, selections);
    subject = nodeService.watch(page);
    subject.subscribe((updatePage) => {
        treedata.value = nodeToTree(updatePage as PageNode);
        updateSelection(treedata.value, selections);
    });
});

nodeService.selection.subscribe(nodes => {
    selections = nodes as SceneNode[];
    treedata.value = updateSelection(treedata.value, nodes);
});

function changeSelection(event: any){
    nodeService.setSelection([event.nodeData.layerId]);
}

function changeLabel(event: TreeChangeEvent) {
    if (page) {
        const node = page.findOne(node => node.id === event.id);
        if(node) {
            node.name = event.label;
            node.update();
        }
    }
}
function moveTo(event: TreeChangeEvent) {
    if (!selections?.length || !page) return;
    const selection = selections[0];
    const target = page.findOne((node:SceneNode) => node.id == event.id);
    selection.remove();
    const index = target.parent?.children.findIndex(node => node.id === event.id) || 0;
    if (target.parent) {
        target.parent.insertChild(index + 1, selection);
        selection.update();
    }
}
function moveInto(event: TreeChangeEvent) {
    if (!selections?.length || !page) return;
    const selection = selections[0];
    const target = page.findOne((node:SceneNode) => node.id == event.id) as ChildrenMixin;
    if(target) {
        selection.remove();
        target.insertChild(0, selection);
        selection.update();
    }
}
</script>
<template>
    <tree
        editable
        class="m-10"
        :class="$style.customlized"
        :data="treedata"
        :styles="treeSecondary"
        @click-node="changeSelection"
        @change-label="changeLabel"
        @move-to="moveTo"
        @move-into="moveInto"
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
<style module>
    .customlized {
        --font-md : 1.2rem;
        --icon-md : 1.4rem;
        --leading-md: 0;
    }
    .customlized input {
        font-size: 1.2rem;
    }
</style>
