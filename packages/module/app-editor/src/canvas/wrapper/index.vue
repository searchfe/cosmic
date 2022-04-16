<script lang="ts" setup>
import { BaseNodeMixin, SceneNode } from '@cosmic/core/parts';

import { service } from '@cosmic/core/browser';
import { inject, util } from '@cosmic/core/parts';
import { onUnmounted, ref } from 'vue';

interface WrapperProps {
    node: BaseNodeMixin,
}

const props = withDefaults(defineProps<WrapperProps>(), {});
const nodeService = inject<service.NodeService>(service.TOKENS.Node);

const subject = nodeService.watch(props.node);
subject.subscribe((node: any) => {
    wrapperStyle.value = getWapperStyle(node);
});
onUnmounted(() => {
    nodeService.unwatch(subject);
});
const wrapperStyle = ref(getWapperStyle(props.node as any));
function getWapperStyle(node: SceneNode) {
    const canvasPos = util.toCanvasPos(node);
    return {
            left: canvasPos.x + 'px',
            top: canvasPos.y + 'px',
            width: node.width + 'px',
            height: node.height + 'px',
    };
}

</script>
<template>
    <div
        class="absolute w-full h-full flex flex-col-reverse items-center"
        :class="$style.root"
        :style="wrapperStyle"
    >
        <div class="absolute w-full h-full" :class="$style.dragGroup">
            <div v-for="item in (new Array(8))" :key="item" class="absolute" :class="$style.dragItem" />
        </div>
        <div :class="$style.info">{{ node.width }} × {{ node.height }}</div>
    </div>
</template>
<style module>
.dragGroup {
    left: 0;
    top: 0;
}
.dragGroup div:nth-child(1) {
    left: -4px;
    top: -4px;
    cursor: nwse-resize;
}
.dragGroup div:nth-child(2) {
    left: 50%;
    top: -4px;
    margin-left: -4px;
    cursor: ns-resize;
}
.dragGroup div:nth-child(3) {
    right: -4px;
    top: -4px;
    cursor: nesw-resize;
}
.dragGroup div:nth-child(4) {
    right: -4px;
    top: 50%;
    margin-top: -4px;
    cursor: ew-resize;
}
.dragGroup div:nth-child(5) {
    right: -4px;
    bottom: -4px;
    cursor: nwse-resize;
}
.dragGroup div:nth-child(6) {
    left: 50%;
    bottom: -4px;
    margin-left: -4px;
    cursor: ns-resize;
}
.dragGroup div:nth-child(7) {
    left: -4px;
    bottom: -4px;
    cursor: nesw-resize;
}
.dragGroup div:nth-child(8) {
    left: -4px;
    top: 50%;
    margin-top: -4px;
    cursor: ew-resize;
}
.dragItem {
    width: 8px;
    height: 8px;
    border: 1px solid var(--color-primary-500);
    background-color: var(--color-light);
    pointer-events: all;
}

.root {
    border: 1px solid var(--color-primary-500);
    top: 0;
    pointer-events :none;
    letter-spacing: 0;
}

.info {
    position: absolute;
    bottom: -2.5rem;
    color: var(--color-light);
    font-size: 1.0rem;
    line-height: 1.4rem;
    padding: 0 0.2rem 0.1rem 0.2rem;
    border-radius: 0.2rem;
    background-color: var(--color-primary-500);
    white-space: nowrap;
}

</style>
