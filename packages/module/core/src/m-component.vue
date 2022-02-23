<script lang="ts">
import { createApp, onMounted, ref, watch } from 'vue';
import { loadModule, moduleAssetPath} from './loader';
async function startupModule(src: string, withCss: boolean, container: HTMLElement) {
    if(!src || !container) return;
    loadModule(src).then((module: any) => {
        if (module?.default?.root) {
            createApp(module.default.root).mount(container);
        }
    });
    // load()
}
</script>
<script setup lang="ts">
    const prop = defineProps({
        src: {
            type: String,
            default: '',
        },
        css: {
            type: Boolean,
            default: true,
        },
    });
    const container = ref();
    const cssPath = ref('');

    function loadStyle() {
        if (prop.css && prop.src) {
            const linkSrc = moduleAssetPath(prop.src, 'index.css');
            if (linkSrc) cssPath.value = linkSrc;
        } 
    }
    onMounted(() => {
        loadStyle();
        startupModule(prop.src, prop.css, container.value);
    });
    watch(() => prop.src, function(a) {
        loadStyle();
        startupModule(prop.src, prop.css, container.value);
    });

</script>
<template>
  <link
    v-if="cssPath"
    rel="stylesheet"
    :href="cssPath"
  >
  <section ref="container" />
</template>