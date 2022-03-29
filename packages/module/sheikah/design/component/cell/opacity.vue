<script lang="ts" setup>

withDefaults(defineProps<{ opacity: number }>(), {
    opacity: 1,
});

</script>


<template>
    <div
        class="flex overflow-hidden"
        :class="$style.wrapper"
    >
        <div
            class="h-wull w-full"
            :style="{
                background: '#000',
                opacity,
            }"
        />
    </div>
</template>

<style module>
.wrapper {
    box-sizing: border-box;
    padding: 23px;
    width: 72px;
    height: 72px;
    border: 1px solid #f5f5f5;
    border-radius: var(--rounded-md);
}
</style>
