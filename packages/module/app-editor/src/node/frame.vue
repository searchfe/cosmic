<script lang="ts" setup>
import type { FrameNode } from '@cosmic/core/parts';
import Wrapper from '../common/wrapper.vue';
interface FrameProps {
    node: FrameNode,
}

withDefaults(defineProps<FrameProps>(), {

});

</script>
<template>
    <div
        :style="{
            top: node.x,
            left: node.y,
            width: node.width,
            height: node.height,
        }"
    >
        <wrapper hidden />
        <slot />
    </div>
</template>