<script lang="ts" setup>
import { service, inject } from '@cosmic/core/browser';
import { round } from '@cosmic/core/lodash';
import { NodeTransform, TextNode, util, hasMixin } from '@cosmic/core/parts';
import { ref, type Ref } from 'vue';
const nodeService = inject<service.NodeService>(service.TOKENS.Node);
const toolService = inject<service.ToolService>(service.TOKENS.Tool);
let transform: NodeTransform | undefined;
let node = ref<TextNode | undefined>();
const styles: Ref<Record<string, string | number>> = ref({});

nodeService.selection.subscribe(nodes => {
    if (nodes[0] === node.value) return;
    node.value = undefined;
    transform = undefined;
    if (nodes[0] && hasMixin(nodes[0], TextNode)) {
        node.value = nodes[0];
        transform = new NodeTransform(node.value);
        setStyle();
        nodeService.watch(node.value).subscribe(() => {
            setStyle();
        });
    }
});


// const input = ref();
let editable = false;
toolService.state().subscribe(state => {
    editable = false;
    if (state === service.ToolState.TextEdit) {
        if (node.value) {
            editable = true;
        }
    }
    setStyle();
});

function setStyle() {
    let s: Record<string, string> = {};
    if (transform && node.value) {
        const cnode = transform.transfer();
        s = cnode.props.style || {};
        const canvasPos = util.toCanvasPos(node.value);
        styles.value = {
            ...s,
            position: 'absolute',
            left: round(canvasPos.x) + 'px',
            top: round(canvasPos.y) + 'px',
            width: round(node.value.width) + 'px',
            height: round(node.value.height) + 'px',
            color: 'black',
            background: 'white',
            outline: 'none',
            cursor: editable ? 'text': 'default',
            opacity: editable ? 1: 0,
        };
    }

}

function inputAction(event: MouseEvent) {
    const input = event.target as HTMLDivElement;
    if (!node.value) return;
    node.value.characters = input.innerHTML.replace(/<div>/g, '<br/>').replace(/<\/div>/g, '');
    node.value.height = input.getBoundingClientRect().height;
    node.value.update();
}
</script>
<template>
    <div
        v-if="node"
        contenteditable
        :style="styles"
        @blur="inputAction"
        v-html="node?.characters"
    />
</template>