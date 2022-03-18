<script lang="ts" setup>
import {ref} from 'vue';
import Content from './component/content.vue';
import {MTitle} from '@cosmic/core/browser';

interface Props {
    isOpen?: boolean;
    // 是否内阴影
    isInset?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
    isOpen: true,
    isInset: false,
});

const open = ref(props.isOpen);
const insetTitle = ref(props.isInset ? '内阴影' : '外阴影');

const clickHandler = () => {
    open.value = !open.value;
};
</script>

<template>
    <MTitle :title="insetTitle">
        <i-cosmic-plus
            v-if="!open"
            @click="clickHandler"
        />
        <i-cosmic-minus
            v-else
            @click="clickHandler"
        />
    </MTitle>
    <Content
        v-if="open"
        :inset-title="insetTitle"
    />
</template>

<style scoped></style>

