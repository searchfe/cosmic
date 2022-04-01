<script lang="ts" setup>
import { BaseNodeMixin } from '@cosmic/core/parts';
import _styles from './wrapper.module.css';

interface WrapperProps {
    node: BaseNodeMixin,
    styles?: typeof _styles,
    hidden?: boolean,
    info?: string,
}

withDefaults(defineProps<WrapperProps>(), {
    styles:() => _styles,
    hidden: false,
    info: '',

});

</script>
<template>
    <div v-if="!hidden" class="absolute w-full h-full flex flex-col-reverse items-center" :class="styles.root">
        <div :class="styles.info">{{ info }}</div>
    </div>
</template>
<style>
</style>
