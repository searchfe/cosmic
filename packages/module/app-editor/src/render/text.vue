<script lang="ts" setup>
import { ref, getCurrentInstance } from 'vue';
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
const selected = ref(true);

nodeService.selection.subscribe(nodes => {
    if(nodes.filter(node => node.id == props.node.id).length) {
        selected.value = true;
    } else {
        selected.value = false;
    }
});
const instance = getCurrentInstance();
nodeService.watch(props.node).subscribe(() => {
    instance?.proxy?.$forceUpdate();
});

</script>

<template>
    <div
        v-creator="{target: node}"
        v-stroke="{target: node}"
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
            textDecoration: node.textDecoration === 'STRIKETHROUGH' ? 'line-through' : node.textDecoration ?? 'none',
            lineHeight: node.lineHeight?.value + 'px',
            background: util.toBackgroundStyle(node?.backgrounds?.[0]),
            color: util.toBackgroundStyle(node?.fills?.[0]),
        }"
    >
        北京2002年冬奥会专题
        <wrapper :hidden="!selected" :node="node" :info="node.width + '×' + node.height" />
    </div>
</template>