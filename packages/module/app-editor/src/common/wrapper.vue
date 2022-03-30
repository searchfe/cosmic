<script lang="ts" setup>
import _styles from './wrapper.module.css';

interface WrapperProps {
    styles?: typeof _styles,
    hidden?: boolean,
    info?: string,
}

withDefaults(defineProps<WrapperProps>(), {
    styles:() => _styles,
    hidden: true,
    info: '',
    
});
</script>
<template>
    <div :hidden="hidden" class="relative" :class="styles.root">
        <div class="absolute" :class="styles.info">{{ info }}</div>
    </div>
</template>
<style>
</style>