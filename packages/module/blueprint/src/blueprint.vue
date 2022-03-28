<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import { Space, Input, Button } from 'cosmic-vue';
import { inject } from '@cosmic/core/parts';
import { service } from '@cosmic/core/browser';
import type Panel from './components/panel.vue';
import { useCreateComponent } from './api';
import type { KeyNode, Property, Variant } from './data';

const routerService = inject<service.RouterServiceAPI>(service.TOKENS.Router);
const { executeMutation: createComponent } = useCreateComponent();

const teamRef = ref<string>();
const nameRef = ref<string>();

watchEffect(() => {
    const route = routerService.getRouterConfig().currentRoute.value;
    if (route.name === 'blueprint') {
        const { team, name } = route.params as { team: string, name: string };
        teamRef.value = team;
        nameRef.value = name;
    }
});

const displayNameRef = ref('');
const descRef = ref('');

const keyNodes = ref<KeyNode.Type[]>([]);
const properties = ref<Property.Type[]>([]);
const variants = ref<Variant.Type[]>([]);

const keyNodePart = ref<InstanceType<typeof Panel>>();
const propertyPart = ref<InstanceType<typeof Panel>>();
const variantPart = ref<InstanceType<typeof Panel>>();

function save() {
    if (teamRef.value && nameRef.value) {
        keyNodePart.value!.save();
        propertyPart.value!.save();
        variantPart.value!.save();
        createComponent({
            data: {
                team: teamRef.value,
                name: teamRef.value,
                displayName: displayNameRef.value,
                desc: descRef.value,
                keyNodes: keyNodes.value,
                properties: properties.value,
                variants: variants.value,
            },
        });
    }
}
</script>

<template>
    <Space direction="vertical" :class="$style.main">
        <Input v-model:value="displayNameRef" placeholder="组件名称" size="lg" />
        <Input v-model:value="descRef" placeholder="组件描述" size="md" />
        <Panel
            ref="keyNodePart"
            v-model:data="keyNodes"
            title="关键节点"
            :columns="KeyNode.tableColumns"
            :empty-data="KeyNode.empty"
        />
        <Panel
            ref="propertyPart"
            v-model:data="properties"
            title="属性"
            :columns="Property.tableColumns"
            :empty-data="Property.empty"
        />
        <Panel
            ref="variantPart"
            v-model:data="variants"
            title="变体"
            :columns="Variant.tableColumns"
            :empty-data="Variant.empty"
        />
        <Space justify="end">
            <Button @click="save">保存</Button>
        </Space>
    </Space>
</template>

<style module>
.main {
    padding: 24px;
    width: 100%;
}

.main > :not(:last-child) {
    margin-bottom: 8px;
}
</style>
