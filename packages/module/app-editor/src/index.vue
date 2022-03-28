<script setup lang="ts">
import WidgetProperties from './properties/index.vue';
import WidgetAssets from './assets/index.vue';
import WidgetCanvas from './canvas/index.vue';
</script>

<template>
    <div class="h-full flex">
        <widget-assets class="h-full w-270 min-w-270 border-right" />
        <widget-canvas class="h-full w-full overflow-hidden" />
        <widget-properties class="h-full w-270 min-w-270 border-left" />
    </div>
</template>