<script lang="ts" setup>

withDefaults(defineProps<{
    isOpen: boolean;
    title: string;
}>(),{
    isOpen: false,
});

const emits = defineEmits(['change']);



</script>

<template>
    <div class="flex px-10 flex-col">
        <header
            class="flex items-center h-32 py-4"
            @click="() => emits('change', !isOpen)"
        >
            <i-cosmic-arrow-down v-if="isOpen" />
            <i-cosmic-arrow-right v-else />
            <span class="ml-4">{{ title }}</span>
        </header>
        <div v-if="isOpen">
            <slot />
        </div>
    </div>
</template>