<script lang="ts" setup>
import { type ComponentNode } from '@cosmic/core/parts';
import { getCurrentInstance, onUnmounted } from 'vue';
import { service, inject } from '@cosmic/core/browser';
import { Button } from 'cosmic-vue';
import { makeNode } from './make-node';
import { IImage, IAvatar, IImageList } from '@cosmic/core/browser';
import { buttonLight } from 'cosmic-ui';

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
const style = {
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
};

</script>
<template>
    <div
        class="component-render"
        :style="{
            position: 'absolute', // 需要根据模式切换
            ...makeNode(node).styles,
        }"
    >
        <Button
            v-if="node.cname === 'button'"
            size="sm"
            :styles="buttonLight"
        >
            按钮
        </Button>
        <i-image
            v-if="node.cname === 'v-image'"
            :src="node.getPluginData('imageSrc')"
        />
        <i-image-list
            v-if="node.cname === 'v-image-list'"
            :style="style"
            :images="node.getPluginData('imageList')"
        />
        <i-avatar
            v-if="node.cname === 'v-avatar'"
            style="font-size: 12px"
            :is-show-avatar="node.getPluginData('isShowAvatar') == '1'"
            :src="node.getPluginData('avatar')"
            :title="node.getPluginData('avatarTitle')"
        />
    </div>
</template>
