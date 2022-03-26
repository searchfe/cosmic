<script lang="ts" setup>
import { Tree, TreeNodeState } from 'cosmic-vue';
import { treeSecondary } from 'cosmic-ui';
import { ref } from 'vue';
const treedata = ref([
    {
        label: '画板-1',
        id: '0-0',
        readonly: '1',
        children: [
            {
                label: '头部卡片',
                id: '0-0-0',
                open: '0',
                children: [
                    { label: '标题', id: '0-0-0-0' },
                    { label: '副标题', id: '0-0-0-1' },
                    { label: '日期', id: '0-0-0-2' },
                ],
            },
            {
                label: '图片组件',
                id: '0-0-2',
            },
        ],
    },
    {
        label: '画板-2',
        id: '0-1',
        open: '0',
        children: [
            { label: '图层-21', id: '0-1-0-0' },
            { label: '图层-22', id: '0-1-0-1' },
            { label: '图层-23', id: '0-1-0-2' },
        ],
    },
    {
        label: '画板-3',
        id: '0-2',
    },
]);
</script>
<template>
    <tree
        editable
        class="m-10 customlized"
        :data="treedata"
        :styles="treeSecondary"
    >
        <template #arrow="slotProps">
            <span v-if="slotProps.state == TreeNodeState.open" class="inline-block w-10 pb-2">▾</span>
            <span v-if="slotProps.state == TreeNodeState.close" class="inline-block w-10 pb-2">▸</span>
        </template>
        <template #prefix="slotProps">
            <i-cosmic-board v-if="slotProps.nodeData.children" />
            <i-cosmic-rounded-square v-if="!slotProps.nodeData.children" />
        </template>
        <template #label="slotProps">
            {{ slotProps.nodeData.label }}
        </template>
        <template #subfix>
            <i-cosmic-eye-open />
        </template>
    </tree>
</template>
<style>
    .customlized {
        --font-md : 1.2rem;
        --icon-md : 1.4rem;
        --leading-md: 0;
    }
    .customlized input {
        font-size: 1.2rem;
    }
</style>
