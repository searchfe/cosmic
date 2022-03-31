<script lang="ts" setup>
import { ref } from 'vue';
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

</script>

<template>
    <div
        v-creator="{target: node}"
        class="frame-render"
        :style="{
            position: 'absolute', // 需要根据模式切换
            top: node.y + 'px',
            left: node.x + 'px',
            width: node.width + 'px',
            height: node.height + 'px',
            fontSize: node.fontSize + 'px',
            color: util.toBackgroundStyle(node?.fills[0]),
        }"
    >
        {{ node?.name }}
        <wrapper :hidden="!selected" :info="node.width + '×' + node.height" />
    </div>
</template>