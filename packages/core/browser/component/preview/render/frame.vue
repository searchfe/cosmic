<script lang="ts" setup>
import { type FrameNode, util } from '@cosmic/core/parts';
import { onMounted, ref } from 'vue';
import { service } from '@cosmic/core/browser';
import { inject } from '@cosmic/core/parts';
import { makeNode } from './make-node';

interface FrameProps {
    node: FrameNode,
}

const props = withDefaults(defineProps<FrameProps>(), {

});
onMounted(() => {
    // console.log(props.node, props.node.height, props.node.x);
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
        class="frame-render"
        :style="{
            position: 'absolute', // 需要根据模式切换
            background: util.toBackgroundStyle(node?.backgrounds[0]),
            ...makeNode(node).styles,
        }"
    >
        <children-render :node="node" />
    </div>
</template>
