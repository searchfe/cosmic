<script lang="ts" setup>
type CornerItem = number[] | string;

interface ColorPreviewOption {
    tl?: CornerItem;
    tr?: CornerItem;
    br?: CornerItem;
    bl: CornerItem;
}

withDefaults(defineProps<ColorPreviewOption>(), {
    bl: 'none',
    br: 'none',
    tl: 'none',
    tr: 'none',
});

function renderRadius(data: CornerItem) {
    return typeof data === 'string' ? data : data.join(' ');
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
                border: '2px solid #000',
                borderTopLeftRadius: renderRadius(tl),
                borderBottomRightRadius: renderRadius(br),
                borderBottomLeftRadius: renderRadius(bl),
                borderTopRightRadius: renderRadius(tr),
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
