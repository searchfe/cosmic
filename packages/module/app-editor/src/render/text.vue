<script lang="ts" setup>
import { getCurrentInstance, onUnmounted } from 'vue';
import  { type TextNode, util } from '@cosmic/core/parts';
import Wrapper from '../common/wrapper.vue';
import { service } from '@cosmic/core/browser';
import { inject } from '@cosmic/core/parts';

interface TextProps {
    node: TextNode,
}

const props = withDefaults(defineProps<TextProps>(), {

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

function inputAction(event: InputEvent, node: TextNode) {
    const firstChild = (event.target as HTMLElement).firstChild as HTMLTextAreaElement;
    node.name = firstChild.textContent || '';
    node.update();
}

</script>

<template>
    <div
        v-creator="{target: node}"
        v-stroke="{target: node}"
        v-effect="{target: node, field: 'textShadow'}"
        contenteditable="true"
        class="text-render"
        :style="{
            position: 'absolute', // 需要根据模式切换
            top: node.y + 'px',
            left: node.x + 'px',
            width: node.width + 'px',
            height: node.height + 'px',
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
        @blur="(event) => inputAction(event, node)"
    >   
        {{ node?.name }}
        <wrapper :node="node" :info="node.width + '×' + node.height" />
    </div>
</template>