<script setup lang="ts">
import WidgetProperties from './properties.vue';
import WidgetAssets from './assets.vue';
</script>

<template>
    <div class="h-full flex">
        <widget-assets class="h-full w-270 min-w-270 border-right" />
        <div class="h-full w-full overflow-hidden" :class="$style.canvas" />
        <widget-properties class="h-full w-270 min-w-270 border-left" />
    </div>
</template>
<style module>
.canvas {
    background-color: var(--color-gray-100);
}
</style>
