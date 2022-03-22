<script lang="ts" setup>
import {ref} from 'vue';
import { MTitle, MWidget, MClolorWidget } from '@cosmic/core/browser';
import Raduis from './radius.vue';
import { Standard } from '../data';

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
            <m-clolor-widget :standard-list="Standard" />
        </div>
    </MWidget>
</template>


<style module>

.container {
    padding-bottom: var(--padding-md);
}
</style>