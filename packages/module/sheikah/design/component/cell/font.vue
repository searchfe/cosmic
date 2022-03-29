<script lang="ts" setup>
import type { FontWeightProperty } from 'csstype';

interface FontOption {
    weight: FontWeightProperty;
    size: string;
}
withDefaults(defineProps<FontOption>(), {
    size: '12px',
    weight: 'normal',
});

</script>


<template>
    <div
        class="flex overflow-hidden"
        :class="$style.wrapper"
    >
        <div
            class="h-wull w-full flex items-center justify-center"
            :style="{
                fontSize: size,
                fontWeight: weight,
                color: '#000',
            }"
        >
            T
        </div>
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
