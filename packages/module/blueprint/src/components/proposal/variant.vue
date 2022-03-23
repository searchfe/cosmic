<script setup lang="ts">
import { ref } from 'vue';
import ProposalPanel from './panel.vue';

export interface ComponentVariant {
    name: string;
    type: string;
    defaultValue: string;
    desc: string;
}

export type ComponentVariants = ComponentVariant[];

const props = defineProps<{
    componentId: string;
    variants: ComponentVariants;
}>();

const variantsRef = ref(props.variants);

const emptyVariant: ComponentVariant = {
    name: '',
    type: '',
    defaultValue: '',
    desc: '',
};

const variantsTitle: Array<{ title: string; key: keyof ComponentVariant }> =
    [
        { title: '名称', key: 'name' },
        { title: '类型', key: 'type' },
        { title: '默认值', key: 'defaultValue' },
        { title: '说明', key: 'desc' },
    ];
</script>

<template>
    <ProposalPanel
        title="Variants"
        :columns="variantsTitle"
        :data="variantsRef"
        :empty-data="emptyVariant"
    />
</template>
