<script lang="ts" setup>
import {computed} from 'vue';

withDefaults(defineProps<{
    src: string,
    style: object,
    title: string,
    isShowAvatar: boolean
}>(), {
    src: '',
    title: '',
    isShowAvatar: true,
});


</script>

<template>
    <div 
        class="flex justify-between h-full items-center" 
        :class="$style.color"
        :style="style"
    >
        <div class="flex items-center">
            <img
                v-if="isShowAvatar"
                :src="src"
                :style="imgStyle"
                :class="$style.rounded"
                class="mr-6 h-16 w-16" 
            >
            <span 
                :style="spanStyle"
                :class="$style.color"
            >
                {{ title }}
            </span>
        </div>
        <span>
            <i-cosmic-more />
        </span>
    </div>
</template>

<style module>
.rounded {
    border-radius: 50%;
}

.color {
    color: var(--color-gray-300);
}
</style>