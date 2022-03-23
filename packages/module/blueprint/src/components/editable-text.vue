<script setup lang="ts">
import { ref, nextTick, type Component } from 'vue';
import { Input } from 'cosmic-vue';

const props = defineProps<{
    value: string;
    textComponent: Component<any, any, any>;
    onUpdateValue?: (v: string) => void;
}>();

const emits = defineEmits(['on-update:value']);

const isEdit = ref(false);
const inputRef = ref();
const inputValue = ref(props.value);
function handleOnClick() {
    isEdit.value = true;
    nextTick(() => {
        inputRef.value.focus();
    });
}
function handleChange() {
    emits('on-update:value', inputValue.value);
    props.onUpdateValue?.(inputValue.value);
    isEdit.value = false;
}
</script>

<template>
    <section @click="handleOnClick">
        <Input
            v-if="isEdit || value === ''"
            ref="inputRef"
            :value="inputValue"
            @update:value="v => inputValue = v"
            @on-blur="handleChange"
        />
        <component :is="textComponent" v-else>{{ value }}</component>
    </section>
</template>
