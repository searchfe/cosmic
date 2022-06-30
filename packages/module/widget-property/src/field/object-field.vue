<script lang="ts" setup>
import { computed } from 'vue';
import { MTitle, service, inject } from '@cosmic/core/browser';
import type { SchemaType } from '../type/index';
import FormNode from './form-node.vue';
import { ComponentNode } from '@cosmic/core/parts';

const nodeService = inject<service.NodeService>(service.TOKENS.Node);
const componentService = inject<service.ComponentService>(service.TOKENS.Component);

let node = nodeService.getSelection()[0];

nodeService.selection.subscribe(nodes => {
    node = nodes[0];
});

const props = withDefaults(defineProps<{
    model: Record<string, any>,
    schema: SchemaType,
    layer: number,
    propertyIndex: number;
    propertyKey: string;
    index: number;
}>(), {});

const propertyKeys = computed(() => getPropertyKey(props.schema));

const curSchema = computed(() =>  props.schema);

function getPropertyKey(curSchemas: SchemaType) {
    if (!curSchemas) return [];
    let curPropertyKeys = [] as string[];
    if (curSchemas.properties) {
        curPropertyKeys = Object.getOwnPropertyNames(curSchemas.properties);
    }

    if (curSchemas.title === 'table') {
        curPropertyKeys = ['isRowJump', 'layout', 'cols', 'rows', 'scroll'];
    }
    return curPropertyKeys;
}

function isRequired(schema: SchemaType, key: string) {
    if (schema.required) {
        return schema.required.includes(key);
    }
    return true;
}

function change(model: Record<string, any>, key: string, data: {value: any}, properties: Record<string, any>) {
    model[key] = data.value;
    if (properties[key].dataType === 'slot') {
        const slot = {...componentService.getSlot(node as ComponentNode)};
        slot[key] = data.value;
        componentService.setSlot(node as ComponentNode, slot);
    }
    componentService.setData(node as ComponentNode, model);
    node.update();
}

const renderDescription = computed(() => {
    if (props.index === undefined) return props.schema.description;
    return props.schema.description.replace('${index}', (props.index + 1).toString());
});

function dataTypeChange(model: Record<string, any>, event: Record<string, string>) {
    model.customNewDataType = {...(model.customNewDataType || {}), ...event};
    componentService.setData(node as ComponentNode, model);
    node.update();
}

function slotTypeChange(model: Record<string, any>, event: Record<string, string>) {
    model.customSlotType = {...(model.customSlotType || {}), ...event};
    componentService.setData(node as ComponentNode, model);
    node.update();
}

</script>

<template>
    <div v-if="curSchema.properties">
        <MTitle :title="renderDescription" />
        
        <div 
            v-for="key of propertyKeys"
            :key="key"
        > 
            <form-node
                v-if="curSchema.properties[key]"
                :key="key"
                :property-key="key"
                :required="isRequired(curSchema, key)"
                :schema="curSchema.properties[key]"
                :model="model[key]"
                :layer="layer + 1"
                @change="(event) => change(model, key, event, curSchema.properties)"
                @data-type-change="(event) => dataTypeChange(model, event)"
                @slot-type-change="(event) => slotTypeChange(model, event)"
            />
        </div>
    </div>
</template>