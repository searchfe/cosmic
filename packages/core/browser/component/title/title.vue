<script lang="ts" setup>
const props = withDefaults(defineProps<{
    title: string,
}>(), {
    title: '',
});

</script>

<template>
    <div
        :class="[$style.wrapper]"
        class="flex justify-between items-center w-full"
    >
        <span>{{ props.title }}</span>
        <slot />
    </div>
</template>

<style module>
.wrapper {
    height: var(--height-md);
    font-size: 1.2rem;
    font-weight: 700;
}
</style>