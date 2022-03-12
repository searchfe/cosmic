<script lang="ts" setup>
import { ref } from 'vue';


interface Props {
    text: string;
    num: string;
    hoverIcon: string;
    icon: string;
}

withDefaults(defineProps<Props>(), {
    text: '',
    num: '',
    hoverIcon: '',
    icon: '',
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
        :class="$style['filter-item']"
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
        <img
            :class="$style['filter-item-img']"
            :src="hovering ? hoverIcon : icon"
            alt=""
        >
    </div>
</template>

<style module>
.filter-item {
    flex: none;
    position: relative;
    display: flex;
    justify-content: space-between;
    margin-right: 10px;
    padding: 14px;
    width: 168px;
    height: 68px;
    border-radius: 9px;
    background: #f5f5f5;
    color: #1f1f1f;
}
.filter-item:hover {
    background: #546bff;
    color: #fff;
}
.filter-item-info {
    flex: auto;
}
.filter-item-text {
    font-size: 16px;
    font-weight: 600;
}
.filter-item-num {
    font-size: 12px;
    margin-top: 14px;
}
.filter-item-img {
    display: flex;
    height: 40px;
    width: 40px;
}
</style>
