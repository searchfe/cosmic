<script lang="ts" setup>
import { useSlots } from 'vue';
const props = withDefaults(defineProps<{
    title: string,
    coustomIcon: boolean
}>(), {
    title: '',
    coustomIcon: false,
});

const isHavePrefix = !!useSlots().prefix?.();
const isHaveSuffix = !!useSlots().suffix?.();
const emits = defineEmits(['onClick']);
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
        <span>{{ props.title }}</span>
        <span 
            :class="coustomIcon ? '' : $style.icon"
            @click.stop="(event) => emits('onClick', event)"
        >
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
    composes: w-24 h-24 inline-flex items-center justify-center -v-bg-inapparent from global;
    border-radius: .4rem;
    font-size: 1.2rem;
}

.prefix {
    margin-right: var(--margin-md);
}

.suffix {
    margin-left: var(--margin-md);
}
</style>
