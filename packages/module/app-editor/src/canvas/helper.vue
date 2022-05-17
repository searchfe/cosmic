<script lang="ts" setup>
import { ref, type Ref } from 'vue';
import { service, inject } from '@cosmic/core/browser';
import { SceneNode } from '@cosmic/core/parts';
import CanvasWrapper from './wrapper/index.vue';
// import TextareaEditor from './textarea-editor.vue';

const nodeService = inject<service.NodeService>(service.TOKENS.Node);

const selections: Ref<SceneNode[]> = ref([]);

nodeService.selection.subscribe(sels => {
    selections.value = sels;
});

</script>
<template>
    <div class="absolute w-0 h-0">
        <!-- <textarea-editor /> -->
        <canvas-wrapper v-for="node in selections" :key="node.id" :node="node" />
    </div>
</template>