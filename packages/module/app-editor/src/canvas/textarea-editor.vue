<script lang="ts" setup>
import { service, inject } from '@cosmic/core/browser';
import { round } from '@cosmic/core/lodash';
import { NodeTransform, util, type TextNode } from '@cosmic/core/parts';
import { ref, type Ref } from 'vue';
const nodeService = inject<service.NodeService>(service.TOKENS.Node);
const toolService = inject<service.ToolService>(service.TOKENS.Tool);
const styles: Ref<Record<string, string | number>> = ref({});
const input = ref();
toolService.state().subscribe(state => {
    if (state === service.ToolState.TextEdit) {
        const selection = nodeService.getSelection();
        if (selection[0]) {
            const node = new NodeTransform(selection[0] as TextNode).transfer();
            styles.value = {
                ...node.props.style,
                ...getWapperStyle(selection[0] as TextNode),
            };
            console.log(styles.value);
        }
    }
});

function getWapperStyle(node: TextNode) {
    const canvasPos = util.toCanvasPos(node);
    return {
            position: 'absolute',
            left: round(canvasPos.x) + 'px',
            top: round(canvasPos.y) + 'px',
            width: round(node.width) + 'px',
            height: round(node.height) + 'px',
    };
}

</script>
<template>
    <div
        ref="input"
        contenteditable
        :style="{
            ...(styles)
        }"
    >
        文本
    </div>
</template>