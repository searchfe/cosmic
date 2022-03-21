<script lang="ts">
import { inject, onMounted, ref, watch, getCurrentInstance, onBeforeUnmount, onUnmounted } from 'vue';
import { fetchModule, fetchStyle, bootstrapModule, removeStyle, removeChildStyle } from './module-util';

import type { Container } from '@cosmic/core/inversify';

</script>
<script setup lang="ts">
    const container = inject('container') as Container;
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
            type: Boolean || Array,
            default: true,
        },
    });

    const root = ref();

    function getRootProviders() {
        return Reflect.ownKeys(getCurrentInstance()?.appContext.provides || {})
            .filter((k: string | symbol) => typeof k !== 'symbol' || k.description?.indexOf('route') === -1).map(k => {
            return { k, v: inject(k) };
        });
    }

    onMounted(() => {
        prop.css && fetchStyle(prop.src);
        fetchModule(prop.src).then(bootstrapModule(prop.src, root.value, container,  getRootProviders(), prop.inherit));
    });
    watch(() => prop.src, function(a) {
        prop.css && fetchStyle(prop.src);
        fetchModule(prop.src).then(bootstrapModule(prop.src, root.value, container, getRootProviders(), prop.inherit));
    });
    onBeforeUnmount(() => {
        removeChildStyle(root.value);
    });
    onUnmounted(() => {
        removeStyle(prop.src);
    });
</script>
<template>
    <section
        ref="root"
        :class="prop.class"
        :module="prop.src"
    />
</template>
