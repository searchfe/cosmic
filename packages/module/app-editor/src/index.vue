<script setup lang="ts">
import { service, inject } from '@cosmic/core/browser';
import { BaseNodeMixin, util } from '@cosmic/core/parts';
import { onUnmounted, ref } from 'vue';
import { type Subject } from '@cosmic/core/rxjs';

import WidgetProperties from './properties/index.vue';
import WidgetAssets from './assets/index.vue';
import WidgetCanvas from './canvas/index.vue';
import CanvasHelper from './canvas/helper.vue';
import NodeRenderer from './node-renderer.vue';
import NodeControllService from './service/node-controll.service';

const page = ref();
const nodeService = inject<service.NodeService>(service.TOKENS.Node);
const backgroundPaint = ref();
let subject: Subject<BaseNodeMixin>;
nodeService.currentPage.subscribe(pageNode => {
    page.value = pageNode;
    backgroundPaint.value = pageNode.backgrounds[0];
    subject = nodeService.watch(pageNode);
    subject.subscribe((p: any) => {
        backgroundPaint.value = p.backgrounds[0];
    });
});

const nodeControllService = inject(NodeControllService);

onUnmounted(() => {
    nodeService.unwatch(subject);
});
</script>

<template>
    <div
        class="h-full flex"
        @mousedown="(event) => nodeControllService.mousedown(event)"
        @mouseup="(event) => nodeControllService.mouseup(event)"
        @mousemove="(event) => nodeControllService.mousemove(event)"
    >
        <widget-assets class="h-full w-270 min-w-270 border-right" />
        <div
            :style="{
                background: util.toBackgroundStyle(backgroundPaint),
            }"
            class="h-full w-full"
        >
            <widget-canvas class="h-full w-full overflow-hidden">
                <template v-for="child in page.children" :key="child.id">
                    <node-renderer :node="child" />
                </template>
                <!-- <children-render :node="page" /> -->
                <canvas-helper />
            </widget-canvas>
        </div>

        <widget-properties class="h-full w-270 min-w-270 border-left" />
    </div>
</template>
