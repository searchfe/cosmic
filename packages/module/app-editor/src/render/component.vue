<script lang="ts" setup>
import { type ComponentNode } from '@cosmic/core/parts';
import { getCurrentInstance, onUnmounted } from 'vue';
import Wrapper from '../common/wrapper.vue';
import { service } from '@cosmic/core/browser';
import { inject } from '@cosmic/core/parts';
import { Button } from 'cosmic-vue';

interface ComponentProps {
    node: ComponentNode,
}

const props = withDefaults(defineProps<ComponentProps>(), {

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
        class="component-render"
        :style="{
            position: 'absolute', // 需要根据模式切换
            top: node.y + 'px',
            left: node.x + 'px',
            width: node.width + 'px',
            height: node.height + 'px',
        }"
    >
        <div class="relative">
            <Button v-if="node.cname === 'button'">按钮</Button>
            <s-component v-else-if="node.cname === 'image'" class="w-full h-ull" name="image" />
            <s-component v-else-if="node.cname === 'aladin'" class="w-full h-ull" name="aladin" />
            <s-component v-else-if="node.cname === 'scroll'" class="w-full h-ull" name="scroll" />
        </div>
        <wrapper :node="node" :info="node.width + '×' + node.height" />
    </div>
</template>
