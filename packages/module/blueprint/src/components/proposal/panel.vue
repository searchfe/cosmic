<script setup lang="ts">
import { ref, watchEffect, h } from 'vue';
import { Table, Card, Button, Space } from 'cosmic-vue';
import EditableText from '../editable-text.vue';

const props = defineProps<{
    title: string
    columns: Array<{ title: string; key: string }>
    data: any[]
    emptyData: any
}>();

const dataRef = ref(props.data);
const oldDataRef = ref<any[]>([]);
const isEditedRef = ref(false);
const checkedRowSizeRef = ref(0);

watchEffect(() => {
    if (isEditedRef.value === false) {
        oldDataRef.value = [...dataRef.value.map(i => ({ ...i }))];
    }
});

function createColumn(title: string, key: string) {
    return {
        title,
        key,
        render: (data: Record<string, any>, index: number) =>
            h(EditableText, {
                textComponent: h('span'),
                value: data[key],
                onUpdateValue: (v) => {
                    isEditedRef.value = true;
                    dataRef.value[index][key] = v;
                },
            }),
    };
}
</script>

<template>
    <Card :title="title">
        <Table
            class="w-full"
            :columns="[{ type: 'selection' }, ...columns.map((i) =>
                createColumn(i.title, i.key)
            )]"
            :data="dataRef"
            :row-key="row => row.name"
            @on-update:checked-row-keys="v => checkedRowSizeRef = v.length"
        />
        <template v-if="isEditedRef || checkedRowSizeRef" #footer>
            <Space justify="space-between" :inline="false">
                <Space>
                    <Button @click="dataRef.push({ ...emptyData });">增加一行</Button>
                    <Button :disabled="!checkedRowSizeRef">删除 {{ checkedRowSizeRef }} 行</Button>
                </Space>

                <Space>
                    <Button @click="dataRef = [...oldDataRef]; isEditedRef = false;">取消</Button>
                    <Button @click="isEditedRef = false">保存</Button>
                </Space>
            </Space>
        </template>
    </Card>
</template>
