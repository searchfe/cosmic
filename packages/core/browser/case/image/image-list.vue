<script lang="ts" setup>
import { computed } from 'vue';
import IImage from './image.vue';

const props = withDefaults(defineProps<{
    images: string[],
    style: Record<string, string>
}>(), {});

function getStyle(index: number, images: string[], style: Record<string, string>) {
    if (!style) return {};
    if (index === 0) {
        return {
            borderTopLeftRadius: (style.borderTopLeftRadius ?? 0) + 'px',
            borderBottomLeftRadius: (style.borderBottomLeftRadius ?? 0) + 'px',
        };
    }
    if (index === images.length - 1) {
        return {
            borderTopRightRadius: (style.borderTopRightRadius ?? 0) + 'px',
            borderBottomRightRadius: (style.borderBottomRightRadius ?? 0) + 'px',
        };
    }
}

</script>

<template>
    <div
        :style="style"
        class="flex h-full"
    >
        <div
            v-for="(image, index) of images"
            :key="image"
            :class="index === images.length - 1 ? [''] : ['mr-4']"
        >
            <i-image
                :src="image"
                :style="getStyle(index, images, style)"
            />
        </div>
    </div>
</template>