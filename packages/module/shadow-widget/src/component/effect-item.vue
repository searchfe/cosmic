<script lang="ts" setup>
import {ref} from 'vue';

defineProps({
    item: {
        type: Object,
        default: () => ({}),
    },
});

const selected = ref(false);

const emits = defineEmits(['onMouseenter', 'onMouseleave', 'onEdit', 'onUnlock']);
const onMouseenter = () => {
    selected.value = !selected.value;
    emits('onMouseenter');
};
const onMouseleave = () => {
    selected.value = !selected.value;
    emits('onMouseleave');
};
const edit = () => {
    emits('onEdit');
};
const unlock = () => {
    emits('onUnlock');
};
</script>

<template>
    <div :class="[$style['li']]">
        <div
            :class="[$style['wrap'], selected ? $style['selected'] : '', 'flex items-center justify-center']"
            @mouseenter="onMouseenter"
            @mouseleave="onMouseleave"
        >
            <div :class="[$style['left'], 'flex items-center justify-center']">
                <div
                    :class="[$style['demo']]"
                    :style="{'box-shadow': item.boxShadow}"
                />
            </div>
            <div :class="[$style['right']]">
                <div :class="[$style['text']]">
                    {{ item.title }}
                </div>
                <div :class="[$style['text']]">
                    {{ item.desc }}
                </div>
            </div>
            <div class="flex">
                <div :class="[$style['icon-wrap'], 'flex items-center justify-center']">
                    <i-cosmic-more
                        v-show="selected"
                        :class="[$style['icon-edit']]"
                        @click="edit"
                    />
                </div>
                <div :class="[$style['icon-wrap'], 'flex items-center justify-center']">
                    <i-cosmic-lock
                        v-show="selected"
                        :class="[$style['icon-lock']]"
                        @click="unlock"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<style module>
.li {
    margin: 0 var(--leading-xs);
}

.wrap {
    border: 1px solid var(--color-gray-100);
    border-radius: var(--rounded-md);
    padding: var(--spacing-6);
    box-sizing: border-box;
}

.selected {
    background-color: var(--color-gray-100);
}

.left {
    border: 1px solid transparent;
    box-sizing: border-box;
    width: 50px;
    height: 50px;
    flex-shrink: 0;
    overflow: hidden;
}

.demo {
    width: var(--width-xs);
    height: var(--height-xs);
    background: var(--color-white);
}

.right {
    flex-grow: 1;
    flex-shrink: 1;
    padding-left: var(--spacing-12);
    font-size: var(--font-sm);
    line-height: var(--leading-sm);
}

.right .text {
    color: var(--color-gray-900);
}

.right .text:not(:first-child) {
    color: var(--color-gray-400);
}

.icon-wrap {
    flex-shrink: 0;
    width: var(--width-sm);
    height: var(--height-sm);
}
</style>
