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
    <div class="text-2xl relative" :class="{ [$style.info]: true, [$style.inverse]: inverse }">
        <div
            v-if="title"
            class="flex justify-between items-center h-20 text-xl font-normal"
            :class="{[$style['inverse-title']]: inverse, 'mb-24': hasDefault }"
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
        <div class="absolute" :class="$style['rb-actions']">
            <slot name="rb-actions" />
        </div>
    </div>
</template>

<style module>
.info {
    margin: 24px 24px 0;
    padding: 24px;
    background: #fff;
    border-radius: 12px;
}
.inverse {
    background: none;
    padding: 0;
}
.inverse-title {
    padding-left: 4px;
    padding-right: 4px;
}
.rb-actions {
    right: 32px;
    bottom: 32px;
}
</style>
