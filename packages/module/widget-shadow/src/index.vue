<script lang="ts" setup>
import {ref} from 'vue';
import Content from './component/content.vue';
import {MWidget, MTitle} from '@cosmic/core/browser';

const props = defineProps({
    isOpen: {
        type: Boolean,
        default: false,
    },
    isInset: {
        type: Boolean,
        default: false,
    },
});

const open = ref(props.isOpen);
const insetTitle = ref(props.isInset ? '内阴影' : '外阴影');

const clickHandler = () => {
    open.value = !open.value;
};
</script>

<template>
    <MWidget>
        <MTitle :title="insetTitle">
            <i-cosmic-plus
                v-if="!open"
                class="-v-bg-inapparent"
                @click="clickHandler"
            />
            <i-cosmic-minus
                v-else
                class="-v-bg-inapparent"
                @click="clickHandler"
            />
        </MTitle>
        <div v-if="open">
            <Content :inset-title="insetTitle" />
        </div>
    </MWidget>
</template>

<style scoped></style>

