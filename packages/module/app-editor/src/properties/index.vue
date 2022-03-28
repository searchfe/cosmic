<script lang="ts" setup>
import { Tabs, TabPane } from 'cosmic-vue';
import { ref } from 'vue';
const activeIdx = ref('0');
function change(opt: any) {
    activeIdx.value = opt.value; }
</script>
<template>
    <div>
        <Tabs size="sm" class="h-40 px-10 border-bottom" default-active-tab="0" @on-change="change">
            <TabPane class="mx-2" label="设计" value="0" />
            <TabPane class="mx-2" label="交互" value="1" />
        </Tabs>
        <div :hidden="activeIdx != '0'">
            <m-component src="@cosmic-module/widget-text" />
            <div class="border-bottom" />
            <m-component src="@cosmic-module/widget-border" />
            <div class="border-bottom" />
            <m-component src="@cosmic-module/widget-radius" />
            <div class="border-bottom" />
            <m-component src="@cosmic-module/widget-shadow" />
            <div class="border-bottom" />
            <m-component src="@cosmic-module/widget-mask" />
        </div>
        <div :hidden="activeIdx != '1'" />
    </div>
</template>
