<script lang="ts" setup>
import {ref} from 'vue';
import { MTitle, MWidget } from '@cosmic/core/browser';
import Content from './widget/content.vue';

const open = ref(false);

const boardSwitch = () => {
    open.value = !open.value;
};

</script>

<template>
    <MWidget>
        <div class="container w-full">
            <MTitle
                title="文字"
                :is-open="open"
                @click="boardSwitch"
            >
                <i-cosmic-arrow-down />
            </MTitle>
            <Content v-if="open" />
        </div>
    </MWidget>
</template>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
}
</style>

