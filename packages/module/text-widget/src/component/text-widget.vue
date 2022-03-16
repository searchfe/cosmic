<script lang="ts" setup>
import {ref} from 'vue';
import { MTitle } from '@cosmic/core/browser';
import Content from './widget/content.vue';

const open = ref(false);

const boardSwitch = () => {
    open.value = !open.value;
};

</script>

<template>
    <div class="container">
        <MTitle
            title="文字"
            :is-open="open"
            @click="boardSwitch"
        >
            <i-cosmic-arrow-down />
        </MTitle>
        <Content v-if="open" />
    </div>
</template>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    background-color: var(--color-background);
}
</style>

