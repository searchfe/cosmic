<script lang="ts" setup>
import { type FrameNode, util } from '@cosmic/core/parts';
import { onMounted, getCurrentInstance, onUnmounted } from 'vue';
import Wrapper from '../common/wrapper.vue';
import { service } from '@cosmic/core/browser';
import { inject } from '@cosmic/core/parts';

interface FrameProps {
    node: FrameNode,
}

const props = withDefaults(defineProps<FrameProps>(), {

});
onMounted(() => {
    // console.log(props.node, props.node.height, props.node.x);
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

</script>
<template>
    <div
        v-creator="{target: node}"
        v-stroke="{target: node}"
        v-effect="{target: node}"
        class="frame-render"
        :style="{
            position: 'absolute', // 需要根据模式切换
            top: node.y + 'px',
            left: node.x + 'px',
            width: node.width + 'px',
            height: node.height + 'px',
            background: util.toBackgroundStyle(node?.backgrounds[0]),
        }"
    >
        <div class="relative">
            <children-render :children="node.children" />
        </div>
        <wrapper :node="node" :info="node.width + '×' + node.height" />
    </div>
</template>
