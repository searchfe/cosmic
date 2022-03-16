<script lang="ts" setup>
interface ColorPreviewOption {
    day?: string;
    night?: string;
    dark?: string;
}
withDefaults(defineProps<ColorPreviewOption>(), {
    day: 'none',
    night: 'none',
    dark: 'none',
});

</script>


<template>
    <div
        class="flex overflow-hidden"
        :class="$style.wrapper"
    >
        <div
            class="h-wull"
            :class="$style.cell"
            :style="{ background: day }"
        />
        <div
            class="h-wull"
            :class="[$style.cell, $style.middle]"
            :style="{ background: night }"
        />
        <div
            class="h-wull"
            :class="$style.cell"
            :style="{ background: dark }"
        />
    </div>
</template>

<style module>
.wrapper {
    width: 72px;
    height: 72px;
    border-radius: var(--rounded-md);
}
.cell {
    flex: 1 1 30%;
}
.middle {
    margin: 0 1px;
}
</style>
