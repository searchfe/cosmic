<script setup lang="ts">
import WidgetProperties from './properties/index.vue';
import WidgetAssets from './assets/index.vue';
import WidgetCanvas from './canvas/index.vue';
import { inject } from '@cosmic/core/parts';
import { service } from '@cosmic/core/browser';
const nodeService = inject<service.NodeService>(service.TOKENS.Node);
nodeService.currentPage.subscribe(page => {
    console.log(page.type);
});
// import StoryButton from './story-button.vue';
</script>

<template>
    <div class="h-full flex">
        <widget-assets class="h-full w-270 min-w-270 border-right" />
        <widget-canvas class="h-full w-full overflow-hidden">
            <!-- <story-button class="p-20" /> -->
        </widget-canvas>
        <widget-properties class="h-full w-270 min-w-270 border-left" />
    </div>
</template>