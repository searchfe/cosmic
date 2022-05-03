<script lang="ts" setup>
import { Select as CSelect, SelectOption } from 'cosmic-vue';
 withDefaults(defineProps<{
    value: string;
}>(), {
    value: 'var',
});

const emits = defineEmits(['change']);

const items = [{
    label: '动态数据',
    value: 'var',
}, {
    label: '静态数据',
    value: 'const',
}];

function change(event: {value: string}) {
    emits('change', event.value);
}

</script>
<template>
    <div class="mb-8">
        <div 
            :class="$style.description"
            class="h-16 w-full mb-4"
        >
            动态/静态数据
        </div>
        <div class="w-full">
            <c-select
                size="sm"
                :class="$style.border"
                :placeholder="propertyKey"
                :value="value"
                @on-change="change"
            >
                <select-option
                    v-for="item of items"
                    :key="item.value"
                    :value="item.value"
                    :label="item.label"
                />
            </c-select>
        </div>
    </div>
</template>

<style module>
.description {
    color: var(--color-gray-300);
}

/* .border {
    border-width: .1rem;
    border-style: solid;
    border-color: var(--color-gray-300);
    border-radius: .4rem;
    margin: -1px;
} */

</style>