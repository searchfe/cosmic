<script lang="ts">
import { onMounted, ref } from 'vue';
import render from './components/render';
import './module-util';


</script>
<script setup lang="ts">
    const props = defineProps({
        name: {
            type: String,
            default: 'aladin',
        },
    });

    const root = ref();


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
