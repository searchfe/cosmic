<script lang="ts" setup>
import  { type PageNode } from '@cosmic/core/parts';
import { getCurrentInstance, onUnmounted } from 'vue';
import { service } from '@cosmic/core/browser';
import { inject, util } from '@cosmic/core/parts';

interface PageProps {
    node: PageNode,
}

const props = withDefaults(defineProps<PageProps>(), {

});
const instance = getCurrentInstance();

const nodeService = inject<service.NodeService>(service.TOKENS.Node);
const toolService = inject<service.ToolService>(service.TOKENS.Tool);
const canvasService = inject<service.CanvasService>(service.TOKENS.Canvas);

const subject = nodeService.watch(props.node);
subject.subscribe(() => {
    instance?.proxy?.$forceUpdate();
});
onUnmounted(() => {
    nodeService.unwatch(subject);
});

function onMouseDown(event: MouseEvent) {
     if (toolService.getState() === service.ToolState.Null) {
        // 转换canvas坐标系
        const pos = canvasService.getPosition(event.clientX, event.clientY);
        // 获得点击节点
        const node = util.getSelectionInPageNode(props.node, pos);
        nodeService.setSelection(node ? [node.id] : []);
     }
}

function onMouseUp() {
    // do sth.
}
</script>
<template>
    <div
        :style="{
            background: util.toBackgroundStyle(node?.backgrounds[0]),
        }"
        @mousedown="onMouseDown"
        @mouseup="onMouseUp"
    >
        <slot />
    </div>
</template>
