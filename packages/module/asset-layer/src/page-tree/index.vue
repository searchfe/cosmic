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
const isShowArrow = ref(true);

let doc: DocumentNode;
let selection: PageNode;

nodeService.document.subscribe(document => {
    nodeService.unwatch(doc);
    doc = document;
    treedata.value = nodeToTree(doc);
    if (selection) {
        updateSelection(treedata.value, [selection]);
    }
    nodeService.watch(document).subscribe((updateDocument) => {
        if((updateDocument as DocumentNode).children.length === 0) {
            isShowArrow.value = false;
            isOpen.value = false;
        } else {
            isShowArrow.value = true;
        }
        treedata.value = nodeToTree(updateDocument as DocumentNode);
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

function moveTo(event: TreeChangeEvent) {
    if (!selection) return;
    selection.remove();
    const document = nodeService.getDocument();
    const index = document.children.findIndex(node => node.id === event.id);
    document.insertChild(index + 1, selection);
    document.update();
}
</script>
<template>
    <div class="flex-grow-0 flex-shrink-0">
        <div class="px-20 py-8 h-40 border-bottom flex items-center text-sm">
            <span class="flex-grow-0 flex-shrink-0">页面</span>
            <div
                v-if="isShowArrow"
                class="ml-12 flex-grow-0 flex-shrink-0 w-20 text-center"
                @click="() => isOpen = !isOpen"
            >
                <i-cosmic-arrow-up v-if="isOpen" class="h-full" />
                <i-cosmic-arrow-down v-else-if="!isOpen" />
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
            @move-to="moveTo"
        >
            <template #label="slotProps">
                {{ slotProps.nodeData.label }}
            </template>
            <!-- <template #subfix="">
                <i-cosmic-trash />
            </template> -->
        </tree>
    </div>
</template>
<style module>
    .customlized :global(.cos-tree-arrow) {
        display: none;
    }
    .customlized {
        --font-md : 1.2rem;
        --leading-md: 0;
    }
    .customlized input {
        font-size: 1.2rem;
    }
</style>
