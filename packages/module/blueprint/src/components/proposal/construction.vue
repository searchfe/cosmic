<script setup lang="ts">
import { ref } from 'vue';
import ProposalPanel from './panel.vue';

export interface ComponentSlot {
    name: string;
    desc: string;
}

export type ComponentSlots = ComponentSlot[];

const props = defineProps<{
    componentId: string;
    slots: ComponentSlots;
}>();

const slotsRef = ref(props.slots);

const emptySlot: ComponentSlot = {
    name: '',
    desc: '',
};

const slotsTitle: Array<{ title: string; key: keyof ComponentSlot }> =
    [
        { title: '名称', key: 'name' },
        { title: '说明', key: 'desc' },
    ];
</script>

<template>
    <ProposalPanel title="Slots" :columns="slotsTitle" :data="slotsRef" :empty-data="emptySlot" />
</template>
