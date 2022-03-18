<script lang="ts" setup>
import {ref} from 'vue';
import {MTitle} from '@cosmic/core/browser';
import Content from './component/content.vue';

const open = ref(false);

const clickHandler = () => {
    open.value = !open.value;
};
</script>

<template>
    <MTitle title="蒙层">
        <i-cosmic-plus
            v-if="!open"
            @click="clickHandler"
        />
        <i-cosmic-minus
            v-else
            @click="clickHandler"
        />
    </MTitle>
    <Content v-if="open" />
</template>

<style scoped></style>

