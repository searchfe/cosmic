<script lang="ts" setup>
import { computed, ref } from 'vue';
import FloatInput from '../form/float-input.vue';
import FloatCheck from '../form/float-check.vue';
import FloatSelect from '../form/float-select.vue';
import type { SchemaType } from '../type/index';

const props = withDefaults(defineProps<{
    schema: SchemaType;
    model: string | boolean | number;
    propertyKey: string;
    layer: number
}>(), {});

const emits = defineEmits(['change']);

const Type2Component = {
    'text': FloatInput,
    'check': FloatCheck,
    'select': FloatSelect,
};

const componentData = computed(() =>  {
    const schema = props.schema;
    let componentName = 'text';
    let prop = {} as Record<string, any>;
    prop.label = schema.title || schema.description || '';
    if (schema.const) {
        prop.disabled = true;
    }
    if (schema.enum) {
        componentName = 'select';
    } 
    if (schema.type === 'string') {
        switch (schema.format) {
            case 'data-time':
            case 'time':
                componentName = 'datetime';
                break;
            case 'date':
                componentName = 'date';
                break;
        }
    }
    if (schema.type === 'number' || schema.type === 'integer') {
        if (schema.maximum && schema.minimum) {
            componentName = 'select';
            const enumArr = [];
            const enumNameArr = [];
            for (let num = schema.minimum; num <= schema.maximum; num++) {
                enumArr.push(num);
                enumNameArr.push(`${num}`);
            }
            schema.enum = enumArr;
            schema.enumName = enumNameArr;
        }
    }

    if (schema.type === 'boolean') {
        componentName = 'check';
    }

    return {componentName, prop};
});

// 计算当前节点的model
const model = ref<ReturnType<typeof getCurrentModel>>(getCurrentModel(props.model, props.schema, undefined));

function getCurrentModel(model: string | boolean | number, schema: SchemaType, unset: any) {
    if (!schema || unset) return;
    if (schema.const !== undefined) {
        return schema.const;
    }
    let newModel: string | number | boolean = '';
    if (model != null && typeof model !== 'object') {
        if (!schema.enum) newModel = model;
        if (schema.enum && schema.enum.includes(model as string | number)) {
             newModel = model;
        } else if (schema.enum && schema.enum.length > 0) {
            newModel = schema.enum[0];
        }
    } else if (schema.default || schema.example) {
        newModel = schema.default ?? schema.example as string;
    } else if (schema.enum && schema.enum.length > 0) {
        newModel = schema.enum[0];
    } else if (schema.type === 'boolean' && model === undefined && schema.default === undefined) {
        newModel = false;
    }
    return newModel;
}

function change(key: string, value: any) {
    emits('change', {propertyKey:key, value: value});
}

</script>

<template>
    <div class="flex">
        <component
            :is="Type2Component[componentData.componentName]"
            :type="schema.type"
            :property-key="propertyKey"
            :component-name="componentData.componentName"
            :component-props="componentData.prop"
            :model="model"
            :schema="schema"
            @change="(event) => change(propertyKey, event)"
        />
        <template v-if="schema.dataType === 'both'" />
    </div>
</template>