<script lang="ts" setup>
import { Tabs, TabPane } from 'cosmic-vue';
import { type Ref, ref } from 'vue';
const activeIdx = ref('0');
function change(opt: Ref<string>) {
    activeIdx.value = opt.value;
}
</script>
<template>
    <div>
        <Tabs size="sm" class="h-40 px-10 border-bottom" default-active-tab="0" @on-change="change">
            <TabPane class="mx-2" label="图层" value="0" />
            <TabPane class="mx-2" label="组件" value="1" />
            <TabPane class="mx-2" label="预制" value="2" />
        </Tabs>
        <m-component :hidden="activeIdx != '0'" src="@cosmic-module/asset-layer" class="h-full" />
        <m-component :hidden="activeIdx != '1'" src="@cosmic-module/asset-component" class="h-full" />
        <m-component :hidden="activeIdx != '2'" src="@cosmic-module/asset-prefab" class="h-full" />
    </div>
</template>