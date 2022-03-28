<script setup lang="ts">
import { ref, watchEffect, h } from 'vue';
import { Table, Card, Button, Space, Input } from 'cosmic-vue';

const emit = defineEmits(['update:data']);
defineExpose({ save });

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
            h(Input, {
                value: data[key],
                onInput: ({ target }) => {
                    const value = target.value;
                    isEditedRef.value = true;
                    dataRef.value[index][key] = value;
                    emit('update:data', [...dataRef.value]);
                },
            }),
    };
}

function save() {
    isEditedRef.value = false;
    emit('update:data', [...dataRef.value]);
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
        <template #footer>
            <Space justify="space-between" :inline="false" size="sm">
                <Space>
                    <Button @click="dataRef.push({ ...emptyData });">增加一行</Button>
                    <Button
                        v-if="checkedRowSizeRef"
                        :disabled="!checkedRowSizeRef"
                    >
                        删除 {{ checkedRowSizeRef }} 行
                    </Button>
                </Space>

                <Space v-if="isEditedRef">
                    <Button @click="dataRef = [...oldDataRef]; isEditedRef = false;">取消</Button>
                    <Button @click="save">保存</Button>
                </Space>
            </Space>
        </template>
    </Card>
</template>
