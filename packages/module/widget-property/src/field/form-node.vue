<script lang="ts" setup>
import { computed } from 'vue';
import type { SchemaType } from '../type/index';
import ArrayField from './array-field.vue';
import CustomField from './custom-field.vue';
import ObjectField from './object-field.vue';
const Type2Component = {
    array: ArrayField,
    object: ObjectField,
    string: CustomField,
    integer: CustomField,
    boolean: CustomField,
    number: CustomField,
};

type fileType = keyof typeof Type2Component;

const emits = defineEmits(['change', 'dataTypeChange']);

const props = withDefaults(defineProps<{
     schema: SchemaType;
     model: Record<string, any>;
     layer: number;
     propertyIndex: number;
     propertyKey: string;
     index: number;
}>(), {});

const renerComponent = computed(() => {
    return Type2Component[props.schema?.type as fileType] || CustomField;
});

// 如果存在const表示当前节点为固定值，不需要渲染
const isNeedReder = computed(() => props.schema && props.schema.const === undefined);

function dataTypeChange(event: Record<string, string>) {
    emits('dataTypeChange', event);
}

</script>

<template>
    <div v-if="schema && isNeedReder">
        <component
            :is="renerComponent"
            v-bind="props"
            @change="(event) => emits('change', event)"
            @data-type-change="(event) => dataTypeChange(event)"
        />
    </div>
</template>