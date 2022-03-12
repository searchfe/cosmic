<script lang="ts">
import { inject, onMounted, ref, watch } from 'vue';
import { fetchModule, fetchStyle, bootstrapModule } from './module-util';

import type { inversify } from '@cosmic/core/parts';

</script>
<script setup lang="ts">
    const container = inject('container') as typeof inversify.Container;
    const prop = defineProps({
        src: {
            type: String,
            default: '',
        },
        css: {
            type: Boolean,
            default: true,
        },
        class: {
            type: String,
            default: '',
        },
    });
    const root = ref();
    const cssPath = ref('');

    onMounted(() => {
        prop.css && fetchStyle(prop.src, cssPath);
        fetchModule(prop.src).then(bootstrapModule(prop.src, root.value, container));
    });
    watch(() => prop.src, function(a) {
        prop.css && fetchStyle(prop.src, cssPath);
        fetchModule(prop.src).then(bootstrapModule(prop.src, root.value, container));
    });

</script>
<template>
    <link
        v-if="cssPath"
        rel="stylesheet"
        :href="cssPath"
    >
    <section
        ref="root"
        :class="prop.class"
    />
</template>
