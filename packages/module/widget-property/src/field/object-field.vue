<script lang="ts" setup>
import { computed } from 'vue';
import { MTitle } from '@cosmic/core/browser';
import type { SchemaType } from '../type/index';
import FormNode from './form-node.vue';
const props = withDefaults(defineProps<{
    model: Record<string, any>,
    schema: SchemaType,
    layer: number,
    propertyIndex: number;
    propertyKey: string;
}>(), {});

const propertyKeys = computed(() => getPropertyKey(props.schema));

// const curModel = ref(getModel(props.schema, props.model));

const curSchema = computed(() =>  props.schema);

// function getModel(schema, model){
//     if (!schema) return null;
//     if (model != null && typeof model === 'object') {
//         return props.model;
//     }
//     return {};
// }

function getPropertyKey(schema: SchemaType) {
    if (!schema) return [];
    let propertyKeys = [] as string[];
    if (schema.properties) {
        propertyKeys = Object.getOwnPropertyNames(schema.properties);
    }

    if (schema.title === 'table') {
        propertyKeys = ['isRowJump', 'layout', 'cols', 'rows', 'scroll'];
    }
    console.log(propertyKeys);
    return propertyKeys;
}

function isRequired(schema: SchemaType, key: string) {
    if (schema.required) {
        return schema.required.includes(key);
    }
    return true;
}

function change(model: Record<string, any>, key: string, data: {value: any}) {
    model[key] = data.value;
}


</script>

<template>
    <div v-if="curSchema.properties">
        <MTitle :title="curSchema.description" />
        
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
                @change="(event) => change(model, key, event)"
            />
        </div>
    </div>
</template>