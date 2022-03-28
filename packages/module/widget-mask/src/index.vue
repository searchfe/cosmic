<script lang="ts" setup>
import {ref} from 'vue';
import { MTitle, MWidget, MClolorWidget } from '@cosmic/core/browser';
import { Standard } from './data';

const open = ref(false);

const clickHandler = () => {
    open.value = !open.value;
};
</script>

<template>
    <MWidget>
        <MTitle title="蒙层">
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
        <m-clolor-widget
            v-if="open"
            :standard-list="Standard"
        />
    </MWidget>
</template>

