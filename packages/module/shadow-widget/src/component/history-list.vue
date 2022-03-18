<script lang="ts" setup>
import {ref} from 'Vue';

const props = defineProps({
    current: {
        type: Number,
        default: 0,
    },
    dataList: {
        type: Array,
        default: () => [],
    },
});

const sIndex = ref(props.current);


const emits = defineEmits(['onMouseenter', 'onMouseleave', 'onEdit', 'editBoxShadow']);
const onMouseenter = (item: object, index: number) => {
    sIndex.value = index;
    console.error('onMouseenter', item, index === sIndex.value, index, sIndex.value, typeof index, typeof sIndex.value);
    // emits('onMouseenter');
};

const onMouseleave = () => {
    sIndex.value = -1;
    console.log('onMouseleave', sIndex.value);
    // emits('onMouseleave');
};

const onEdit = (item: object, index: number) => {
    console.log('onEdit');
    sIndex.value = index;
    emits('onEdit', {data: item, index});
};

const editBoxShadow = (item: object, index: number) => {
    sIndex.value = index;
    emits('editBoxShadow', {data: item, index});
};
</script>

<template>
    <div
        v-for="(item, index) in dataList"
        :key="index"
        :class="[$style['li'], sIndex === index ? $style['selected'] : '', 'flex items-center']"
        @mouseenter="onMouseenter(item, index)"
        @mouseleave="onMouseleave"
        @click="editBoxShadow(item, index)"
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
                    v-show="sIndex === index"
                    :class="[$style['icon-edit']]"
                    @click="onEdit(item, index)"
                />
            </div>
        </div>
    </div>
</template>

<style module>
.li {
    padding: var(--spacing-12);
    margin: 0 -12px;
}

.selected {
    background-color: rgba(255, 255, 255, .3);
}

.selected .left {
    background: url(https://psstatic.cdn.bcebos.com/operation/demo-border_1647516533000.png) no-repeat scroll center center / contain;
}

.left {
    border-radius: var(--rounded-md);
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
    padding-left: var(--spacing-12);
    font-size: var(--font-sm);
    line-height: var(--leading-sm);
}

.right .text {
    color: var(--color-white);
}

.right .text:not(:first-child) {
    color: var(--color-gray-200);
}
</style>
