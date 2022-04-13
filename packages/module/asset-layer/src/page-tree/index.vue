<script lang="ts" setup>
import { Tree, type TreeChangeEvent } from 'cosmic-vue';
import { treeSecondary } from 'cosmic-ui';
import { ref } from 'vue';
import { service } from '@cosmic/core/browser';
import { type DocumentNode, type PageNode, inject } from '@cosmic/core/parts';
import { type LayerTreeData, nodeToTree, updateSelection } from './page-tree';


const treedata = ref<LayerTreeData[]>([]);

const nodeService = inject<service.NodeService>(service.TOKENS.Node);

const isOpen = ref(true);

let doc: DocumentNode;
let selection: PageNode;

nodeService.document.subscribe(document => {
    nodeService.unwatch(doc);
    doc = document;
    treedata.value = nodeToTree(doc);
    updateSelection(treedata.value, [selection]);
    nodeService.watch(document).subscribe((updateDocument: DocumentNode) => {
        if(updateDocument.children.length === 0) isOpen.value = false;
        treedata.value = nodeToTree(updateDocument);
        updateSelection(treedata.value, [selection]);
    });
});

nodeService.currentPage.subscribe((page) => {
    if (doc) {
        selection = page;
        treedata.value = updateSelection(treedata.value, [selection]);
    }
});

function changeSelection(event: any){
    nodeService.setSelectionPage(event.nodeData.layerId);
}


function changeLabel(event: TreeChangeEvent) {
    if (doc) {
        const node = doc.findChild(node => node.id === event.id);
        if(node) {
            node.name = event.label;
            node.update();
        }
    }
}
</script>
<template>
    <div class="flex-grow-0 flex-shrink-0">
        <div class="px-20 py-8 h-40 border-bottom flex items-center text-sm">
            <span class="flex-grow-0 flex-shrink-0">页面</span>
            <div
                class="ml-12 flex-grow-0 flex-shrink-0 w-20 text-center pt-2"
                @click="() => isOpen = !isOpen"
            >
                <i-cosmic-arrow-up v-if="isOpen" class="h-full" />
                <i-cosmic-arrow-down v-else-if="!isOpen" class="mt-2" />
            </div>
            <div class="w-full text-right">
                <i-cosmic-minus v-show="isOpen" class="mr-10" @click="() => {isOpen = true; nodeService.deletePage();}" />
                <i-cosmic-plus @click="() => {isOpen = true; nodeService.addPage();}" />
            </div>
        </div>
        <tree
            v-show="isOpen"
            editable
            class="p-10 overflow-visible border-bottom"
            :class="$style.customlized"
            :data="treedata"
            :styles="treeSecondary"
            @click-node="changeSelection"
            @change-label="changeLabel"
        >
            <template #label="slotProps">
                {{ slotProps.nodeData.label }}
            </template>
            <!-- <template #subfix="slotProps">
                <i-cosmic-eye-open v-if="slotProps.nodeData.type !== 'PAGE'" />
            </template> -->
        </tree>
    </div>
</template>
<style module>
    .customlized :global(.cos-tree-arrow) {
        display: none;
    }
</style>
