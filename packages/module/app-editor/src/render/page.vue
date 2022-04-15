<script lang="ts" setup>
import  { type PageNode, util } from '@cosmic/core/parts';
import { getCurrentInstance, onUnmounted } from 'vue';
import { service } from '@cosmic/core/browser';
import { inject } from '@cosmic/core/parts';

interface PageProps {
    node: PageNode,
}

const props = withDefaults(defineProps<PageProps>(), {

});
const instance = getCurrentInstance();

const nodeService = inject<service.NodeService>(service.TOKENS.Node);
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
        :style="{
            background: util.toBackgroundStyle(node?.backgrounds[0]),
        }"
    >
        <slot />
    </div>
</template>
