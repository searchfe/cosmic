<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import { Space, Input, Button } from 'cosmic-vue';
import { inject, createComponentQuery, KeyNode, Property, Variant, type QueryComponentResult, updateComponentQuery } from '@cosmic/core/parts';
import { service, urql } from '@cosmic/core/browser';
import Panel from './components/panel.vue';

const { useMutation } = urql;

const routerService = inject<service.RouterService>(service.TOKENS.Router);
const componentService = inject<service.ComponentService>(service.TOKENS.Component);

const { executeMutation: createComponent } = useMutation<
    { createComponent: QueryComponentResult },
    { data: gql.CreateComponentDTO }
>(createComponentQuery);

const { executeMutation: updateComponent } = useMutation<
    { updateComponentByTeamAndName: boolean },
    { data: gql.CreateComponentDTO }
>(updateComponentQuery);

const teamRef = ref<string>();
const nameRef = ref<string>();

const displayNameRef = ref('');
const descRef = ref('');

const keyNodesRef = ref<KeyNode.Type[]>([]);
const propertiesRef = ref<Property.Type[]>([]);
const variantsRef = ref<Variant.Type[]>([]);

const isNewRef = ref(true);

watchEffect(() => {
    const route = routerService.getRouterConfig().currentRoute.value;
    if (route.name === 'blueprint') {
        isNewRef.value = true;
        const { team, name, raw } = route.params as { team?: string, name?: string, raw?: string };

        if (typeof raw === 'string') {
            const { team, name, displayName, desc, keyNodes, properties, variants } = JSON.parse(raw) as gql.CreateComponentDTO;
            isNewRef.value = false;
            teamRef.value = team;
            nameRef.value = name;
            displayNameRef.value = displayName;
            descRef.value = desc;
            keyNodesRef.value = keyNodes as KeyNode.Type[];
            propertiesRef.value = properties as Property.Type[];
            variantsRef.value = variants as Variant.Type[];
        } else {
            teamRef.value = team;
            nameRef.value = name;
            displayNameRef.value = descRef.value = '';
            keyNodesRef.value = propertiesRef.value = variantsRef.value = [];
        }
    }
});

const keyNodePart = ref<InstanceType<typeof Panel>>();
const propertyPart = ref<InstanceType<typeof Panel>>();
const variantPart = ref<InstanceType<typeof Panel>>();

function save() {
    if (teamRef.value && nameRef.value) {
        const team = teamRef.value;
        const name = nameRef.value;
        keyNodePart.value!.save();
        propertyPart.value!.save();
        variantPart.value!.save();
        const data = {
            team,
            name,
            displayName: displayNameRef.value,
            desc: descRef.value,
            keyNodes: keyNodesRef.value,
            properties: propertiesRef.value,
            variants: variantsRef.value,
        };
        if (isNewRef.value) {
            createComponent({ data }).then(res => {
                const data = res.data?.createComponent;
                if (data) {
                    componentService.component.next(data);
                    routerService.back();
                }
            });
        } else {
            console.log(data);
            updateComponent({ data }).then(res => {
                if (res.data?.updateComponentByTeamAndName) {
                    componentService.component.next(data);
                    routerService.back();
                }
            });
        }
    }
}
</script>

<template>
    <Space direction="vertical" :class="$style.main">
        <Input v-model:value="displayNameRef" placeholder="组件名称" size="lg" />
        <Input v-model:value="descRef" placeholder="组件描述" size="md" />
        <Panel
            ref="keyNodePart"
            v-model:data="keyNodesRef"
            title="关键节点"
            :columns="KeyNode.tableColumns"
            :empty-data="KeyNode.empty"
        />
        <Panel
            ref="propertyPart"
            v-model:data="propertiesRef"
            title="属性"
            :columns="Property.tableColumns"
            :empty-data="Property.empty"
        />
        <Panel
            ref="variantPart"
            v-model:data="variantsRef"
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
