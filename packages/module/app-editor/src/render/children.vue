<script lang="ts" setup>
import  { type SceneNode} from '@cosmic/core/parts';
import FrameRender from './frame.vue';
import TextRender from './text.vue';
import ComponentRender from './component.vue';

import { getCurrentInstance, onUnmounted } from 'vue';
import { service, inject } from '@cosmic/core/browser';

interface RenderNodeProps {
    node: SceneNode,
}
const props = withDefaults(defineProps<RenderNodeProps>(), {

});

const nodeService = inject<service.NodeService>(service.TOKENS.Node);

const instance = getCurrentInstance();
const subject = nodeService.watch(props.node);
subject.subscribe(() => {
    instance?.proxy?.$forceUpdate();
});
onUnmounted(() => {
    nodeService.unwatch(subject);
});
</script>
<template>
    <template
        v-for="child in node.children"
        :key="child.id"
    >
        <frame-render v-if="child.type === 'FRAME'" :node="child" />
        <text-render v-if="child.type === 'TEXT'" :node="child" />
        <component-render v-else-if="child.type === 'COMPONENT'" :node="child" />
    </template>
</template>
