<script setup lang="ts">
defineProps({
    icon: {
        type: String,
        default: '',
    },
});
</script>

<template>
    <i-cosmic-arrow-left v-if="icon === 'arrow-left'" class="icon" />
    <i-cosmic-arrow-right v-if="icon === 'arrow-right'" class="icon" />
    <i-cosmic-atom v-if="icon === 'atom'" class="icon" />
    <i-cosmic-board v-if="icon === 'board'" class="icon" />
    <i-cosmic-arrow-up v-if="icon === 'arrow-up'" class="icon" />
    <i-cosmic-arrow-down v-if="icon === 'arrow-down'" class="icon" />
</template>
