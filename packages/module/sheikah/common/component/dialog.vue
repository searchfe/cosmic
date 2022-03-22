<script lang="ts" setup>
interface DialogOptions {
    open: boolean;
    width: string | number;
    height: string | number;
}

withDefaults(defineProps<DialogOptions>(), {
    open: false,
    width: 'auto',
    height: 'auto',
});

</script>

<template>
    <div :class="$style.dialog" style="width: {width}; height: {height}" :style="{ display: open ? 'block' : 'none'}">
        <div class="text-xl font-bold">
            <slot name="title" />
        </div>
        <div class="my-20">
            <slot />
        </div>
        <div class="w-full flex justify-center items-center">
            <slot name="actions" />
        </div>
    </div>
</template>

<style module>
.dialog {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%);
    box-sizing: border-box;
    padding: 24px;
    background: #fff;
    color: #1f1f1f;
    z-index: 50;
    border-radius: 15px;
    font-weight: var(--font-bold);
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.5);
}
</style>
