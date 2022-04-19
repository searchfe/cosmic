<script lang="ts" setup>
import {ref} from 'vue';
import { MTitle, MWidget } from '@cosmic/core/browser';
import Content from './component/index.vue';
import { service } from '@cosmic/core/browser';
import { CornerMixin , FrameNode, inject, hasMixin} from '@cosmic/core/parts';

const nodeService = inject<service.NodeService>(service.TOKENS.Node);

let cornerNode = nodeService.getSelection().find(item => hasMixin(item, CornerMixin)) as FrameNode;

const isFirst = cornerNode.radiusStyleId === undefined;

const open = ref(isFirst);

nodeService.selection.subscribe((nodes) => {
    cornerNode = nodes.find(item => hasMixin(item, CornerMixin)) as FrameNode;
    if (!cornerNode) return;
    open.value = cornerNode.radiusStyleId === undefined;
});

const clickHandler = () => {
    open.value = !open.value;
};
</script>

<template>
    <MWidget>
        <MTitle title="矩形">
            <i-cosmic-plus
                v-if="!open"
                @click="clickHandler"
            />
            <i-cosmic-minus
                v-else
                @click="clickHandler"
            />
        </MTitle>
        <div
            v-if="open"
            :class="$style.container"
        >
            <Content />
        </div>
    </MWidget>
</template>


<style module>

.container {
    padding-bottom: var(--padding-md);
}
</style>