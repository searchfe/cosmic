<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import styles from './tabs.module.css';
import { default as Option } from './option.vue';

interface Porps {
    data: Array<{
        value: string,
        label: string,
        class?: string,
    }>;
    value: string,
    size?: string;
}

const props = withDefaults(defineProps<Porps>(), {
    size: 'md',
});

const currentValue = ref(props.value || props.data[0]?.value);

watchEffect(() => {
    currentValue.value = props.value;
});

const emits = defineEmits(['change']);
function tabChange({ value }: {value: string}) {
    if (currentValue.value !== value) {
        emits('change', value);
        currentValue.value = value;
    }
}


</script>
<template>
    <div :class="styles.tabs" class="flex">
        <Option
            v-for="item of data"
            :key="item.value"
            :styles="styles"
            :value="item.value"
            :label="item.label"
            :class="item.class"
            :size="size"
            :selected="currentValue == item.value"
            @on-change="tabChange"
        />
    </div>
</template>
