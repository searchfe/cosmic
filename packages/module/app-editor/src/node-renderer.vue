<script lang="ts" setup>
import  { type SceneNode, NodeTransform} from '@cosmic/core/parts';

import { ref, onUnmounted, onMounted } from 'vue';
import { service, inject, type Renderer as RendererType} from '@cosmic/core/browser';

interface NodeRendererProps {
    node: SceneNode,
}

const props = withDefaults(defineProps<NodeRendererProps>(), {});
const wrapper = ref();

const nodeTransform = new NodeTransform(props.node, {needGuide: true});
let renderer: RendererType;

const rendererService = inject<service.RendererService>(service.TOKENS.Renderer);

onMounted(() => {
    rendererService.create(wrapper.value, nodeTransform.transfer()).then(r => {
        renderer = r;
    });
});

const nodeService = inject<service.NodeService>(service.TOKENS.Node);

nodeService.watch(props.node).subscribe(() => {
    if(!renderer) return;
    console.log();
    renderer.update(nodeTransform.transfer());
});

onUnmounted(() => {
    renderer.dispose();
});

</script>
<template>
    <section ref="wrapper" />
</template>
