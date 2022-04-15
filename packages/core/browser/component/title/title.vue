<script lang="ts" setup>
import { useSlots } from 'vue';
const props = withDefaults(defineProps<{
    title: string,
}>(), {
    title: '',
});

const isHavePrefix = !!useSlots().prefix?.();
const isHaveSuffix = !!useSlots().suffix?.();
</script>

<template>
    <div
        :class="[$style.wrapper]"
        class="flex justify-between items-center w-full"
    >
        <div class="flex items-center">
            <span
                v-if="isHavePrefix"
                :class="[$style.prefix, 'flex items-center justify-center']"
            >
                <slot
                    name="prefix"
                />
            </span>
            <span>{{ props.title }}</span>
            <span
                v-if="isHaveSuffix"
                :class="[$style.suffix, 'flex items-center justify-center']"
            >
                <slot
                    name="suffix"
                />
            </span>
        </div>
        <span :class="$style.icon">
            <slot />
        </span>
    </div>
</template>

<style module>
.wrapper {
    height: var(--height-md);
    font-size: 1.2rem;
    font-weight: 500;
    padding: 0 0.8rem;
    margin: 0.4rem 0;
}

.icon {
    font-size: 1.2rem;
}

.prefix {
    margin-right: var(--margin-md);
}

.suffix {
    margin-left: var(--margin-md);
}
</style>
