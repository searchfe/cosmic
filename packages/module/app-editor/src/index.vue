<script setup lang="ts">
import WidgetProperties from './properties/index.vue';
import WidgetAssets from './assets/index.vue';
import WidgetCanvas from './canvas/index.vue';
import PageNodeRender from './render/page.vue';

import { inject } from '@cosmic/core/parts';
import { service } from '@cosmic/core/browser';
import { ref } from 'vue';

const page = ref();

const nodeService = inject<service.NodeService>(service.TOKENS.Node);
nodeService.currentPage.subscribe(pageNode => {
    page.value = pageNode;
});

</script>

<template>
    <div class="h-full flex">
        <widget-assets class="h-full w-270 min-w-270 border-right" />
        <page-node-render
            v-creator="{target: page, container: 'base-point'}" :node="page" class="h-full w-full"
        >
            <widget-canvas class="h-full w-full overflow-hidden">
                <children-render :children="page.children" />
            </widget-canvas>
        </page-node-render>
        <widget-properties class="h-full w-270 min-w-270 border-left" />
    </div>
</template>
