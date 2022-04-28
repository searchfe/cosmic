<script lang="ts" setup>
import { computed } from 'vue';
import type { SchemaType } from '../type/index';
import FormNode from './form-node.vue';

withDefaults(defineProps<{
    schema: SchemaType,
    model: any[];
    layer: number
}>(), {});

const model = computed(() => {
    if (!props.schema) return [];
    const { model, maxItems} = props;
    if (model && model.length > 0) {
        props.model.slice(0, maxItems || model.length);
    }
    return [];
});

</script>

<template>
    <div>
        <!-- <template v-if="isItemArray"> -->
        <div 
            v-for="(property, index) of schema.items"
            :key="index"
        >
            <Form-node
                :property-index="index"
                :schema="property"
                :model="model"
                :laye="layer + 1"
            />
        </div>
        <!-- </template> -->
        <!-- <template v-else>
            <div 
                v-for="(property, index) in arrayItems"
                :key="index"
            >
                <field-node 
                    :property-key="index"
                    :schema="property"
                />   
            </div>
        </template> -->
    </div>
</template>