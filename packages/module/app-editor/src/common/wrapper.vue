<script lang="ts" setup>
import { BaseNodeMixin } from '@cosmic/core/parts';
import { ref } from 'vue';

import { service } from '@cosmic/core/browser';
import { inject } from '@cosmic/core/parts';

interface WrapperProps {
    node: BaseNodeMixin,
    hidden?: boolean,
    info?: string,
}

const props = withDefaults(defineProps<WrapperProps>(), {
    hidden: false,
    info: '',

});
const selected = ref(false);

const nodeService = inject<service.NodeService>(service.TOKENS.Node);

nodeService.selection.subscribe(nodes => {
    if(nodes.filter(node => node.id == props.node.id).length) {
        selected.value = true;
    } else {
        selected.value = false;
    }
});

</script>
<template>
    <div v-if="selected" class="absolute w-full h-full flex flex-col-reverse items-center" :class="$style.root">
        <div class="absolute w-full h-full" :class="$style.dragGroup">
            <div v-for="item in (new Array(8))" :key="item" class="absolute" :class="$style.dragItem" />
        </div>
        <div :class="$style.info">{{ info }}</div>
    </div>
</template>
<style module>
.dragGroup {
    left: 0;
    top: 0;
}
.dragGroup div:nth-child(1) {
    left: -4px;
    top: -4px;
    cursor: nwse-resize;
}
.dragGroup div:nth-child(2) {
    left: 50%;
    top: -4px;
    margin-left: -4px;
    cursor: ns-resize;
}
.dragGroup div:nth-child(3) {
    right: -4px;
    top: -4px;
    cursor: nesw-resize;
}
.dragGroup div:nth-child(4) {
    right: -4px;
    top: 50%;
    margin-top: -4px;
    cursor: ew-resize;
}
.dragGroup div:nth-child(5) {
    right: -4px;
    bottom: -4px;
    cursor: nwse-resize;
}
.dragGroup div:nth-child(6) {
    left: 50%;
    bottom: -4px;
    margin-left: -4px;
    cursor: ns-resize;
}
.dragGroup div:nth-child(7) {
    left: -4px;
    bottom: -4px;
    cursor: nesw-resize;
}
.dragGroup div:nth-child(8) {
    left: -4px;
    top: 50%;
    margin-top: -4px;
    cursor: ew-resize;
}
.dragItem {
    width: 8px;
    height: 8px;
    border: 1px solid var(--color-primary-500);
    background-color: var(--color-light);
    pointer-events: all;
}

.root {
    border: 1px solid var(--color-primary-500);
    top: 0;
    pointer-events :none;
    letter-spacing: 0;
}

.info {
    position: absolute;
    bottom: -2.5rem;
    color: var(--color-light);
    font-size: 1.0rem;
    line-height: 1.4rem;
    padding: 0 0.2rem 0.1rem 0.2rem;
    border-radius: 0.2rem;
    background-color: var(--color-primary-500);
}

</style>
