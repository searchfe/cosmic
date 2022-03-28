<script lang="ts" setup>
import { useDrag, useWheel } from '@vueuse/gesture';
import { ref, onMounted } from 'vue';
import { useSpring } from './gesturer';

const gesturer = ref<HTMLElement>();
const content = ref<HTMLElement>();

const { set, setCenter } = useSpring(content, gesturer);

useDrag(({ movement: [x, y], dragging, event }) => {
    if (event.target !== gesturer.value) return;
    set({ x, y, cursor: dragging ? 'grabbing' : 'grab', end: !dragging });
},{ domTarget: gesturer });

useWheel(({ movement: [x, y], wheeling }) => {
    set({ x, y, cursor: wheeling ? 'grabbing': 'grab', end: !wheeling });
}, { domTarget: gesturer });

onMounted(() => {
    setCenter();
});

</script>
<template>
    <div ref="gesturer" :class="$style.canvas" :style="{cursor: 'grabbing'}">
        <div ref="content" class="ease-in-out cursor-default inline-block">
            <div class="w-32 h-32" :style="{ background: 'red' }" />
        </div>
    </div>
</template>
<style module>
.canvas {
    background-color: var(--color-gray-100);
}
.board {
    position: relative;
    background-color: var(--color-white);
    border: 1px solid var(--color-gray-200);
    font-size: 1.2rem;
    color: var(--color-gray-300);
}
.title {
    position: absolute;
    top: -2rem;
    left: 0;
}
</style>
