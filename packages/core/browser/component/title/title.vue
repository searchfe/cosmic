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
        <span :class="$style.icon">
            <slot />
        </span>
    </div>
</template>

<style module>
.wrapper {
    height: var(--height-md);
    font-size: 1.2rem;
    font-weight: 500;
    padding: 0 0.8rem;
    margin: 0.4rem 0;
}   

.icon {
    font-size: 1.2rem;
}
</style>