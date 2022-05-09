<script lang="ts" setup>
import  { type SceneNode, NodeTransform} from '@cosmic/core/parts';

import { ref, onUnmounted, onMounted } from 'vue';
import { service, type Renderer as RendererType} from '@cosmic/core/browser';
import { inject } from '@cosmic/core/parts';

interface NodeRendererProps {
    node: SceneNode,
}

const props = withDefaults(defineProps<NodeRendererProps>(), {});
const wrapper = ref();

const nodeTransform = new NodeTransform(props.node);
let renderer: RendererType;

const rendererService = inject<service.RendererService>(service.TOKENS.Renderer);

onMounted(() => {
    rendererService.getRenderer(RendererConstrutor => {
        renderer = new RendererConstrutor();
        renderer.create(wrapper.value, nodeTransform.transfer());
    });
});

const nodeService = inject<service.NodeService>(service.TOKENS.Node);

nodeService.watch(props.node).subscribe(() => {
    if(!renderer) return;
    renderer.update(nodeTransform.transfer());
});

onUnmounted(() => {
    renderer.dispose();
});

</script>
<template>
    <section ref="wrapper" />
</template>
