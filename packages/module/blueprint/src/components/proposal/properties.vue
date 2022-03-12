<script setup lang="ts">
import { ref, watch, watchEffect, h } from 'vue';
import { Input, Table, Card, Button, Space } from 'cosmic-vue';
// import EditableText from "../editable-text.vue";

type ComponentProperty = {
    name: string;
    type: string;
    defaultValue: string;
    desc: string;
};

type ComponentProperties = ComponentProperty[];

const props = defineProps<{
    componentId: string;
    properties: ComponentProperties;
}>();

const propertiesRef = ref(props.properties);

const oldPropertiesRef = ref<ComponentProperties>([]);
const propertiesEditedRef = ref(false);

watch(
    () => props.componentId,
    () => {
        propertiesRef.value = props.properties;
        propertiesEditedRef.value = false;
    },
);

watchEffect(() => {
    if (propertiesEditedRef.value === false) {
        oldPropertiesRef.value = [...propertiesRef.value];
    }
});

// const emptyProperty: ComponentProperty = {
//     name: "",
//     type: "",
//     defaultValue: "",
//     desc: "",
// };

function createPropertyColumn(title: string, key: keyof ComponentProperty) {
    return {
        title,
        key,
        render: (data: ComponentProperty, index: number) =>
            h(Input, {
                value: data[key],
                'onUpdate:value': (v) => {
                    propertiesEditedRef.value = true;
                    propertiesRef.value[index][key] = v;
                },
            }),
    };
}

// function saveProperties() {
//     fetch(`/api/components/${props.componentId}`, {
//         method: "PATCH",
//         body: JSON.stringify({ properties: $properties.value }),
//         headers: {
//             "Content-Type": "application/json",
//         },
//     })
//         .then((resp) => resp.text())
//         .then((text) => console.log(text));
// }

const propertiesTitle: Array<{ title: string; key: keyof ComponentProperty }> =
    [
        { title: '名称', key: 'name' },
        { title: '类型', key: 'type' },
        { title: '默认值', key: 'defaultValue' },
        { title: '说明', key: 'desc' },
    ];
</script>

<template>
    <Card title="Properties">
        <Table
            class="w-full"
            :columns="[{ type: 'selection' }, ...propertiesTitle.map((i) =>
                createPropertyColumn(i.title, i.key)
            )]"
            :data="propertiesRef"
            :row-key="row => row.name"
        />
        <template #footer>
            <Space
                justify="space-between"
                :inline="false"
            >
                <Space>
                    <Button>增加一行</Button>
                    <Button>删除 x 行</Button>
                </Space>

                <Space>
                    <Button>取消</Button>
                    <Button>保存</Button>
                </Space>
            </Space>
        </template>
    </Card>
</template>
