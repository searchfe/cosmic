<script lang="ts" setup>
import { computed } from 'vue';
import { cloneDeep } from '@cosmic/core/lodash';
import type { SchemaType } from '../type/index';
import FormNode from './form-node.vue';
import { MTitle } from '@cosmic/core/browser';

const props = withDefaults(defineProps<{
    schema: SchemaType,
    model: any[];
    layer: number
}>(), {});

const model = computed(() => {
    if (!props.schema) return [];
    const { model } = props;
    if (model && model.length > 0) {
        return props.model.slice(0, model.length);
    }
    return [];
});

const renderItems = computed(() => {
    return props.model && props.model.length ? props.model.map(() => {
        return cloneDeep(props.schema.items);
    }) :[];
});

</script>

<template>
    <div>
        <MTitle :title="schema.description" />
        <div 
            v-for="(item, index) of renderItems"
            :key="index"
        >
            <form-node
                :property-index="index"
                :schema="item"
                :model="model[index]"
                :laye="layer + 1"
                :index="index"
            />
        </div>
    </div>
</template>