<script setup lang="ts">
import { ref } from 'vue';
import ProposalPanel from './panel.vue';

export interface ComponentProperty {
    name: string;
    type: string;
    defaultValue: string;
    desc: string;
}

export type ComponentProperties = ComponentProperty[];

const props = defineProps<{
    componentId: string;
    properties: ComponentProperties;
}>();

const propertiesRef = ref(props.properties);

const emptyProperty: ComponentProperty = {
    name: '',
    type: '',
    defaultValue: '',
    desc: '',
};

const propertiesTitle: Array<{ title: string; key: keyof ComponentProperty }> =
    [
        { title: '名称', key: 'name' },
        { title: '类型', key: 'type' },
        { title: '默认值', key: 'defaultValue' },
        { title: '说明', key: 'desc' },
    ];
</script>

<template>
    <ProposalPanel
        title="Properties"
        :columns="propertiesTitle"
        :data="propertiesRef"
        :empty-data="emptyProperty"
    />
</template>
