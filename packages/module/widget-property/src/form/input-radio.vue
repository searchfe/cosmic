<script setup lang="ts">
import {ref, watchEffect} from 'vue';

const props = defineProps({
    picked: {
        default: false,
    },
});

const picked = ref(false);

watchEffect(() => {
    const val = !!props.picked;
    picked.value = val;
    // emits('change', val);
});

const emits = defineEmits(['change']);

const change = (val: boolean) => {
    picked.value = val;
    emits('change', val);
};
</script>

<template>
    <div
        :class="[$style['radio-group'], picked ? 'active' : '']"
        class="w-full h-full relative flex items-center"
    >
        <div :class="[$style['radio-left'], 'h-full absolute']" @click="() => change(false)" />
        <div :class="[$style['radio-separator'], 'w-full h-2']" />
        <div :class="[$style['radio-right'], 'h-full absolute']" @click="() => change(true)" />
        <div
            :class="[
                $style['radio'],
                '-v-border-apparent w-12 h-12 absolute',
                picked ? $style['right'] : $style['left']
            ]"
        />
    </div>
</template>

<style module>
.radio-left,
.radio-right {
    width: 45%;
    top: 50%;
    transform: translate(0, -50%);
}

.radio-left {
    left: 0;
}

.radio-right {
    right: 0;
}

.radio-separator {
    border-radius: var(--border-md);
    flex-shrink: 0;
}

.radio-group .radio-separator {
    background-color: var(--color-gray-300);
}

.radio-group.hover .radio-separator,
.radio-group:hover .radio-separator,
.radio-group.active .radio-separator,
.radio-group:active .radio-separator {
    background-color: var(--color-gray-900);
}

.radio-group.disabled .radio-separator,
.radio-group:disabled .radio-separator {
    background-color: var(--color-gray-300);
}

.radio-group.active .radio-separator,
.radio-group:active .radio-separator {
    background-color: var(--color-primary-400);
}



.radio {
    background-color: var(--color-white);
    border-radius: 50%;
    border-width: .1rem;
    border-style: solid;
    top: 50%;
    transform: translateY(-50%);
}

.radio.left {
    left: 0;
}

.radio.right {
    right: 0;
}

.radio-group .radio {
    border-color: var(--color-gray-300);
}

.radio-group.hover .radio,
.radio-group:hover .radio,
.radio-group.active .radio,
.radio-group:active .radio {
    border-color: var(--color-gray-900);
}

.radio-group.disabled .radio,
.radio-group:disabled .radio {
    border-color: var(--color-gray-300);
}
</style>
