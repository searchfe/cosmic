<script setup lang="ts">
import { inject } from '@cosmic/core/parts';
import {service } from '@cosmic/core/browser';
import { ref } from 'vue';

import WidgetProperties from './properties/index.vue';
import WidgetAssets from './assets/index.vue';
import WidgetCanvas from './canvas/index.vue';
import PageNodeRender from './render/page.vue';
import CanvasHelper from './canvas/helper.vue';
import NodeRenderer from './node-renderer.vue';
import NodeControllService from './service/node-controll.service';

const page = ref();
const nodeService = inject<service.NodeService>(service.TOKENS.Node);
nodeService.currentPage.subscribe(async pageNode => {
    page.value = pageNode;
});

const nodeControllService = inject(NodeControllService);

</script>

<template>
    <div
        class="h-full flex"
        @mousedown="(event) => nodeControllService.mousedown(event)"
        @mouseup="(event) => nodeControllService.mouseup(event)"
        @mousemove="(event) => nodeControllService.mousemove(event)"
    >
        <widget-assets class="h-full w-270 min-w-270 border-right" />
        <page-node-render :node="page" class="h-full w-full">
            <widget-canvas class="h-full w-full overflow-hidden">
                <template v-for="child in page.children" :key="child.id">
                    <node-renderer :node="child" />
                </template>
                <!-- <children-render :node="page" /> -->
                <canvas-helper />
            </widget-canvas>
        </page-node-render>
        <widget-properties class="h-full w-270 min-w-270 border-left" />
    </div>
</template>
