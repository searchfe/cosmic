<script lang="ts">
import { onBeforeMount, onMounted, ref } from 'vue';
import render from './components/render';
import setupRuntime from './setup';


</script>
<script setup lang="ts">
    const props = defineProps({
        name: {
            type: String,
            default: 'aladin',
        },
    });

    const root = ref();

    onBeforeMount(() => {
        setupRuntime();
    });
    onMounted(() => {
        render(root.value, props.name);
    });
</script>
<template>
    <section
        ref="root"
        ondragstart="return false;"
    />
</template>
