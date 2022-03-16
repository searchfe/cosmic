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
        class="flex justify-between items-center"
    >
        <span>{{ props.title }}</span>
        <slot />
    </div>
</template>

<style module>
.wrapper {
    height: var(--height-md);
    padding: 0 var(--padding-md); 
    font-weight: 700;
}
</style>