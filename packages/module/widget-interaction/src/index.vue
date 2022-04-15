<script lang="ts" setup>
import {ref} from 'vue';
import Content from './component/content.vue';
import {MWidget, MTitle} from '@cosmic/core/browser';

import Tooltip from './component/tooltip.vue';

const props = defineProps({
    isOpen: {
        type: Boolean,
        default: true,
    },
});

const open = ref(props.isOpen);

const title = ref('交互设置');
const tooltip = ref('我是一个提示气泡框');
</script>

<template>
    <MWidget>
        <MTitle :title="title">
            <template #suffix>
                <Tooltip
                    vertical-direction="down"
                    :text="tooltip"
                    horizontal-direction="left"
                >
                    <i-cosmic-caution />
                </Tooltip>
            </template>
        </MTitle>
        <div v-if="open">
            <Content />
        </div>
    </MWidget>
</template>

<style scoped>
.icon {

}
</style>

