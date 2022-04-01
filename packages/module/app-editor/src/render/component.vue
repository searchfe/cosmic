<script lang="ts" setup>
import { type ComponentNode } from '@cosmic/core/parts';
import { onMounted, ref } from 'vue';
import Wrapper from '../common/wrapper.vue';
import { service } from '@cosmic/core/browser';
import { inject } from '@cosmic/core/parts';
import { Button } from 'cosmic-vue';

interface ComponentProps {
    node: ComponentNode,
}

const props = withDefaults(defineProps<ComponentProps>(), {

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
        v-creator="{target: node}"
        class="component-render"
        :style="{
            position: 'absolute', // 需要根据模式切换
            top: node.y + 'px',
            left: node.x + 'px',
            width: node.width + 'px',
            height: node.height + 'px',
            // background: util.toBackgroundStyle(node?.backgrounds[0]),
        }"
    >
        <div class="relative">
            <Button v-if="node.cname === 'button'">按钮</Button>
            <s-component v-else-if="node.cname === 'image'" class="w-full h-ull" name="image" />
            <s-component v-else-if="node.cname === 'aladin'" class="w-full h-ull" name="aladin" />
        </div>
        <wrapper :hidden="!selected" :node="node" :info="node.width + '×' + node.height" />
    </div>
</template>
