<script setup lang="ts">
import WidgetProperties from './properties.vue';
</script>

<template>
    <div class="h-full flex">
        <div class="h-full w-27 min-w-27 border-right" />
        <div class="h-full w-full overflow-hidden" :class="$style.canvas" />
        <widget-properties class="h-full w-27 min-w-27 border-left" />
    </div>
</template>
<style module>
.canvas {
    background-color: var(--color-gray-100);
}
</style>
