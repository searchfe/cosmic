<script lang="ts" setup>
import { ref } from 'vue';


interface Props {
    text: string;
    num: string;
    selected: boolean;
}

withDefaults(defineProps<Props>(), {
    text: '',
    num: '',
    selected: false,
});

const hovering = ref(false);

function mouseleaveHandler() {
    hovering.value = false;

}
function mouseenterHandler() {
    hovering.value = true;

}

</script>

<template>
    <div
        :class="{
            [$style['filter-item']]: true,
            [$style['filter-selected']]: selected,
        }"
        @mouseleave="mouseleaveHandler"
        @mouseenter.stop="mouseenterHandler"
    >
        <div :class="$style['filter-item-info']">
            <div :class="$style['filter-item-text']">
                {{ text }}
            </div>
            <div :class="$style['filter-item-num']">
                {{ num }}
            </div>
        </div>
        <div :class="$style['filter-item-icon']" :style="{ display: selected || hovering ? 'block' : 'none' }">
            <slot name="hover-icon" />
        </div>
        <div :class="$style['filter-item-icon']" :style="{ display: !hovering && !selected ? 'block' : 'none' }">
            <slot name="icon" />
        </div>
    </div>
</template>

<style module>
.filter-item {
    flex: none;
    position: relative;
    display: flex;
    justify-content: space-between;
    margin-right: 12px;
    padding: 12px;
    width: 164px;
    height: 64px;
    box-sizing: border-box;
    border-radius: 9px;
    background: #f5f5f5;
    color: #1f1f1f;
}
.filter-item:hover, .filter-selected {
    background: #546bff;
    color: #fff;
}
.filter-item-info {
    flex: auto;
    height: 100%;
}
.filter-item-text {
    font-size: 16px;
    font-weight: 400;
}
.filter-item-num {
    font-size: 12px;
    margin-top: 4px;
}
.filter-item-icon {
    height: 40px;
    width: 40px;
    font-size: 40px;
}
</style>
