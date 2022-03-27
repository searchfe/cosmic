<script lang="ts" setup>
import { useSlots, computed  } from 'vue';


const slots = useSlots();
const hasDefault = computed(() => slots.default?.());
const hasBottom = computed(() => slots.bottom?.());

interface PropRegion {
    title: string;
    desc: string;
    inverse: boolean;
    level: number;
}

withDefaults(defineProps<PropRegion>(), {
    title: '',
    desc: '',
    inverse: false,
    level: 2,
});

</script>

<template>
    <div class="text-2xl padding-2xl" :class="{ [$style.info]: true, [$style.inverse]: inverse }">
        <div
            class="flex justify-between items-center"
            :class="{[$style['inverse-title']]: inverse, 'mb-20': hasDefault }"
        >
            <span :class="{'font-semibold': level === 1}">{{ title }}</span>
            <slot name="extra" />
        </div>
        <slot />
        <div v-if="desc" class="text-sm mt-20">
            {{ desc }}
        </div>
        <div :class="{ 'mt-20': hasBottom }">
            <slot name="bottom" />
        </div>
    </div>
</template>

<style module>
.info {
    margin: 32px 40px 24px;
    padding: var(--padding-2xl);
    background: #fff;
    border-radius: 8px;
}
.inverse {
    background: none;
    padding: 0;
}
.inverse-title {
    padding-left: 4px;
    padding-right: 4px;
}
</style>
