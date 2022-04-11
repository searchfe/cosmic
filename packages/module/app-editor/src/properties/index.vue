<script lang="ts" setup>
import { ref } from 'vue';
import { Tabs, TabPane } from 'cosmic-vue';
import { inject, hasMixin, MinimalStrokesMixin, BlendMixin } from '@cosmic/core/parts';
import { service } from '@cosmic/core/browser';


const activeIdx = ref('0');

const properties = ref([]);

function change(opt: any) {
    activeIdx.value = opt.value; 
}

const nodeService = inject<service.NodeService>(service.TOKENS.Node);

nodeService.selection.subscribe((nodes) => {
    const arr = [];
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
            <TabPane class="mx-2" label="交互" value="1" />
        </Tabs>
        <div :hidden="activeIdx != '0'">
            <m-component src="@cosmic-module/widget-frame" />
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
        <div :hidden="activeIdx != '1'" />
    </div>
</template>
