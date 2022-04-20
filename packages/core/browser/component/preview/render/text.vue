<script lang="ts" setup>
import { ref } from 'vue';
import  { type TextNode, util } from '@cosmic/core/parts';
import { service } from '@cosmic/core/browser';
import { inject } from '@cosmic/core/parts';
import { makeNode } from './make-node';

interface TextProps {
    node: TextNode,
}

const props = withDefaults(defineProps<TextProps>(), {

});

const nodeService = inject<service.NodeService>(service.TOKENS.Node);
const selected = ref(true);

nodeService.selection.subscribe(nodes => {
    if(nodes.filter(node => node.id == props.node.id).length) {
        selected.value = true;
    } else {
        selected.value = false;
    }
});

</script>

<template>
    <div
        v-stroke="{target: node}"
        v-effect="{target: node}"
        v-radius="{target: node}"
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
            outline: 'none'
        }"
        v-html="node?.characters"
    />
</template>
