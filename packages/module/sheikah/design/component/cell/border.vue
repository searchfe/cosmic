<script lang="ts" setup>
type  BorderItem = {
    weight: string;
    style: string;
} | string;

interface ColorPreviewOption {
    top?: BorderItem;
    bottom?: BorderItem;
    left?: BorderItem;
    right?: BorderItem;
}

withDefaults(defineProps<ColorPreviewOption>(), {
    top: 'none',
    bottom: 'none',
    left: 'none',
    right: 'none',
});

function renderBorder(data: BorderItem) {
    return typeof data === 'string' ? data : `${data.weight} ${data.style} #000`;
}

</script>


<template>
    <div
        class="flex overflow-hidden"
        :class="$style.wrapper"
    >
        <div
            class="h-wull w-full"
            :style="{
                borderTop: renderBorder(top),
                borderBottom: renderBorder(bottom),
                borderLeft: renderBorder(left),
                borderRight: renderBorder(right),
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
