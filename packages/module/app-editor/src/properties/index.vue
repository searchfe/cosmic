<script lang="ts" setup>
import { ref } from 'vue';
import { Tabs, TabPane } from 'cosmic-vue';
import { hasMixin, MinimalStrokesMixin, BlendMixin, DefaultFrameMixin } from '@cosmic/core/parts';
import { service, inject } from '@cosmic/core/browser';
import MComponent from '@cosmic-module/core/src/m-component.vue';


const activeIdx = ref('0');

const properties = ref<string[]>([]);

function change(opt: any) {
    activeIdx.value = opt.value;
}

const nodeService = inject<service.NodeService>(service.TOKENS.Node);

nodeService.selection.subscribe((nodes) => {
    const arr = [];
    if (nodes.some(node => hasMixin(node, DefaultFrameMixin))) arr.push('@cosmic-module/widget-radius');
    if (nodes.some(node => node.type === 'TEXT')) arr.push('@cosmic-module/widget-text');
    if (nodes.some(node => hasMixin(node, MinimalStrokesMixin))) arr.push('@cosmic-module/widget-border');
    if (nodes.some(node => hasMixin(node, BlendMixin))) arr.push('@cosmic-module/widget-shadow');
    properties.value = arr;
});

</script>
<template>
    <div>
        <Tabs size="sm" class="h-40 px-10 border-bottom" default-active-tab="0" @on-change="change">
            <TabPane class="mx-2" label="设计" value="0" />
            <TabPane class="mx-2" label="数据" value="1" />
            <TabPane class="mx-2" label="发布" value="2" />
        </Tabs>
        <div :hidden="activeIdx != '0'">
            <m-component src="@cosmic-module/widget-page" />
            <m-component src="@cosmic-module/widget-frame" />

            <m-component src="@cosmic-module/widget-break-point" />
            <m-component src="@cosmic-module/widget-frame-base" />
            <m-component src="@cosmic-module/widget-layout" />
            <template v-for="item of properties" :key="item">
                <div class="border-bottom" />
                <m-component :src="item" />
            </template>
            <!-- <div class="border-bottom" />
            <m-component src="@cosmic-module/widget-radius" />
            <div class="border-bottom" />
            <m-component src="@cosmic-module/widget-shadow" />
            <div class="border-bottom" />
            <m-component src="@cosmic-module/widget-mask" /> -->
        </div>
        <div :hidden="activeIdx !== '1'">
            <m-component src="@cosmic-module/widget-property" />
            <!-- <m-component src="@cosmic-module/widget-interaction" /> -->
        </div>
    </div>
</template>
