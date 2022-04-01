<script lang="ts" setup>
import { service } from '@cosmic/core/browser';
import  { type SceneNode, inject} from '@cosmic/core/parts';
import { ref } from 'vue';
import FrameRender from './frame.vue';
import TextRender from './text.vue';
import ComponentRender from './component.vue';
interface RenderNodeProps {
    children: SceneNode[],
}
interface updateList {
    [id: string]: string;
}

withDefaults(defineProps<RenderNodeProps>(), {

});
const nodeService = inject<service.NodeService>(service.TOKENS.Node);

nodeService.renderNodes.subscribe(([nodes, timestamp]) => {
    const value: updateList = {};
    nodes.forEach(node => {
        value[node.id] = timestamp;
    });
    changeNode.value = value;
});

const changeNode = ref<updateList>({});

</script>
<template>
    <template
        v-for="child in children"
        :key="child.id"
    >
        <frame-render v-if="child.type === 'FRAME'" v-select="child" :timestamp="changeNode[child.id]" :node="child" />
        <text-render v-if="child.type === 'TEXT'" v-select="child" :timestamp="changeNode[child.id]" :node="child" />
        <component-render v-else-if="child.type === 'COMPONENT'" v-select="child" :timestamp="changeNode[child.id]" :node="child" />
    </template>
</template>
