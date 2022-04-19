/* eslint-disable vue/no-v-html */
<script lang="ts" setup>
import { getCurrentInstance, onUnmounted, Ref, ref } from 'vue';
import  { type TextNode, util } from '@cosmic/core/parts';
import { service } from '@cosmic/core/browser';
import { inject } from '@cosmic/core/parts';
import { makeNode } from './make-node';

interface TextProps {
    node: TextNode,
}

enum EditState {
    Disbaled,
    Prepare,
    Enable
}

const ableEdit = ref(EditState.Disbaled);

const props = withDefaults(defineProps<TextProps>(), {

});
const input = ref() as Ref<HTMLDivElement>;

const nodeService = inject<service.NodeService>(service.TOKENS.Node);
const toolService = inject<service.ToolService>(service.TOKENS.Tool);
toolService.state().subscribe((state) => {
    if (state === service.ToolState.MoveNode && ableEdit.value == EditState.Enable) {
        ableEdit.value = EditState.Prepare;
        input.value.blur();
    }
});

const instance = getCurrentInstance();
const subject = nodeService.watch(props.node);
subject.subscribe(() => {
    instance?.proxy?.$forceUpdate();
});

onUnmounted(() => {
    nodeService.unwatch(subject);
});

function inputAction() {
    const node = props.node as TextNode;
    if (!node) return;
    node.characters = input.value.innerHTML.replace(/<div>/g, '<br/>').replace(/<\/div>/g, '');
    node.height = input.value.getBoundingClientRect().height;
    node.update();
    ableEdit.value = EditState.Disbaled;
}
function prepareEdit() {
    if (ableEdit.value == EditState.Disbaled) {
        input.value.blur();
        ableEdit.value = EditState.Prepare;
    }
}
function enableEdit(event: MouseEvent) {
    if (ableEdit.value == EditState.Prepare) {
        ableEdit.value = EditState.Enable;
    } else if (ableEdit.value == EditState.Enable) {
        event.stopPropagation();
    }
}
</script>

<template>
    <div
        ref="input"
        v-creator="{target: node}"
        v-stroke="{target: node}"
        v-effect="{target: node, field: 'textShadow'}"
        :contenteditable="ableEdit === EditState.Enable"
        class="text-render"
        :style="{
            position: 'absolute', // 需要根据模式切换
            ...makeNode(node).styles,
            fontSize: node.fontSize + 'px',
            fontFamily: node.fontName?.family,
            fontWeight: node.fontName?.style ?? '400',
            letterSpacing: node.letterSpacing?.value + 'px',
            textDecoration: node.textDecoration === 'STRIKETHROUGH' ? 'line-through' : node.textDecoration ?? 'none',
            lineHeight: node.lineHeight?.value + 'px',
            background: util.toBackgroundStyle(node?.backgrounds?.[0]),
            color: util.toBackgroundStyle(node?.fills?.[0]),
            outline: 'none',
            textAlign: node.textAlignHorizontal
        }"
        @mouseup="prepareEdit"
        @mousedown="enableEdit"
        @blur="inputAction"
        v-html="node?.characters"
    />
</template>
