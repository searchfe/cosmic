<script lang="ts">
import { inject, onMounted, ref, watch, getCurrentInstance } from 'vue';
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
        inherit: {
            type: Array || Boolean,
            default: true,
        },
    });
    const root = ref();
    const cssPath = ref('');

    function getRootProviders() {
        return Reflect.ownKeys(getCurrentInstance()?.appContext.provides || {})
            .filter((k: string | symbol) => typeof k !== 'symbol' || k.description?.indexOf('route') === -1).map(k => {
            return { k, v: inject(k) };
        });
    }

    onMounted(() => {
        prop.css && fetchStyle(prop.src, cssPath);
        fetchModule(prop.src).then(bootstrapModule(prop.src, root.value, container, prop.inherit, getRootProviders()));
    });
    watch(() => prop.src, function(a) {
        prop.css && fetchStyle(prop.src, cssPath);
        fetchModule(prop.src).then(bootstrapModule(prop.src, root.value, container, prop.inherit, getRootProviders()));
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
