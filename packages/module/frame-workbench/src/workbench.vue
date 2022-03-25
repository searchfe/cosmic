<script setup lang="ts">
import WidgetProperties from './properties.vue';
import WidgetAssets from './assets.vue';
</script>

<template>
    <div class="h-full flex">
        <widget-assets class="h-full w-270 min-w-270 border-right" />
        <div class="h-full w-full overflow-hidden flex items-center justify-center" :class="$style.canvas">
            <div class="w-270 h-360" :class="$style.board">
                <div class="absolute" :class="$style.title">画板-1</div>
            </div>
        </div>
        <widget-properties class="h-full w-270 min-w-270 border-left" />
    </div>
</template>
<style module>
.canvas {
    background-color: var(--color-gray-100);
}
.board {
    position: relative;
    background-color: var(--color-white);
    border: 1px solid var(--color-gray-200);
    font-size: 1.2rem;
    color: var(--color-gray-300);
}
.title {
    position: absolute;
    top: -2rem;
    left:0;
}
</style>
