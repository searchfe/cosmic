<script lang="ts" setup>
import { Select as CSelect, SelectOption } from 'cosmic-vue';
import type { SchemaType } from '../type/index';
 withDefaults(defineProps<{
    componentName: string;
    model: string | number | boolean;
    schema: SchemaType;
    propertyKey: string;
}>(), {});

const emits = defineEmits(['change']);

function change(event) {
    emits('change', event.value);
}

</script>
<template>
    <div class="mb-8">
        <div 
            :class="$style.description"
            class="h-16 w-full mb-4"
        >
            {{ schema.description }}
        </div>
        <div class="w-full">
            <c-select
                size="md"
                :class="$style.border"
                :placeholder="propertyKey"
                :value="model"
                @on-change="change"
            >
                <select-option
                    v-for="(value, index) of schema.enum"
                    :key="value"
                    :value="value"
                    :label="schema.enumName[index]"
                />
            </c-select>
        </div>
    </div>
</template>

<style module>
.description {
    color: var(--color-gray-300);
}

.border {
    border-width: .1rem;
    border-style: solid;
    border-color: var(--color-gray-300);
}

</style>