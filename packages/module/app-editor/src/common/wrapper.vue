<script lang="ts" setup>
import { BaseNodeMixin, inject } from '@cosmic/core/parts';
import _styles from './wrapper.module.css';
import { service } from '@cosmic/core/browser';

interface WrapperProps {
    node: BaseNodeMixin,
    styles?: typeof _styles,
    hidden?: boolean,
    info?: string,
}

const props = withDefaults(defineProps<WrapperProps>(), {
    styles:() => _styles,
    hidden: false,
    info: '',

});

const nodeService = inject<service.NodeService>(service.TOKENS.Node);

function select() {
    nodeService.setSelection([props.node.id]);
}

</script>
<template>
    <div v-if="!hidden" class="absolute w-full h-full flex flex-col-reverse items-center" :class="styles.root">
        <div :class="styles.info">{{ info }}</div>   
    </div>
    <div v-else class="absolute w-full h-full" style="top:0;background-color: transparent;" @mousedown.stop="select" />
</template>
<style>
</style>
