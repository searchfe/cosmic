<script lang="ts" setup>
import {ref} from 'vue';
import { MTitle, MWidget } from '@cosmic/core/browser';
import Raduis from './radius.vue';
import Color from './color.vue';
const open = ref(false);


const clickHandler = () => {
    open.value = !open.value;
};
</script>

<template>
    <MWidget>
        <MTitle title="矩形">
            <i-cosmic-plus
                v-if="!open"
                @click="clickHandler"
            />
            <i-cosmic-minus
                v-else
                @click="clickHandler"
            />
        </MTitle>
        <div
            v-if="open"
            :class="$style.container"
        >
            <Raduis />
            <Color />
        </div>
    </MWidget>
</template>


<style module>

.container {
    padding-bottom: var(--padding-md);
}
</style>