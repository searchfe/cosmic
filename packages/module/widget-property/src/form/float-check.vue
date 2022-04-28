<script lang="ts" setup>
import InputRadio from './input-radio.vue';
import type { SchemaType } from '../type/index';

withDefaults(defineProps<{
    componentName: string;
    model: string | number | boolean;
    schema: SchemaType;
    propertyKey: string;
}>(), {});

const emits = defineEmits(['change']);

function change(event) {
    emits('change', event);
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
        <div class="w-full flex h-32 items-center">
            否
            <div class="w-32 mx-8">
                <input-radio :picked="0" @change="change" />
            </div>
            
            是
        </div>
    </div>
</template>

<style module>
.description {
    color: var(--color-gray-300);
}
</style>