<script lang="ts" setup>
import Region from '../../common/component/region.vue';
import CompCard from '../component/card/comp-refs.vue';
import Dropdown from '../../common/component/dropdown.vue';

const menuData = [{
    label: '使用创建',
    id: '1',
}, {
    label: '删除',
    id: '2',
}];

</script>

<template>
    <Region title="4n 卡片模板" desc="强蓝色，用于突出意图的表达，多用于按钮">
        <template #extra>
            <div class="flex items-center">
                <div :class="[$style['extra-item'], $style['extra-link']]" class="flex items-center justify-center text-md">
                    <i-cosmic-lock />
                    <span>100</span>
                </div>
                <div :class="$style['extra-item']" class="flex items-center justify-center text-md px-30 mx-10">
                    编辑
                </div>
                <div :class="$style['extra-item']" class="flex items-center justify-center text-md">
                    <Dropdown :data="menuData" :class="$style['extra-dropdown']" />
                </div>
            </div>
        </template>
    </Region>
    <Region title="组件变体" class="mt-20">
        <div :class="$style.preview" class="w-fll" />
        <div class="font-semibold text-2xl my-20">
            组件构成
        </div>
        <div :class="$style['card-list']">
            <comp-card v-for="item in [1, 2, 3, 4, 5, 6]" :key="item" />
        </div>
    </Region>
</template>

<style module>
.preview {
    box-sizing: border-box;
    height: 0;
    padding-bottom: 23.25%;
    background-color: #eee;
    background-image: url(https://fe-dev.bj.bcebos.com/%E5%8E%9F%E5%AD%90%E6%96%B9%E5%9D%97%E8%83%8C%E6%99%AF.png);
    opacity: .2;
    border: 1px solid #979797;
    border-radius: 12px;
}
.card-list {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
    column-gap: 20px;
    row-gap: 20px;
}
.extra-item {
    height: 36px;
    border-radius: 6px;
    background: #f5f5f5;
}
.extra-link {
    padding-left: 23px;
    padding-right: 18px;
}
.extra-dropdown {
    width: 36px;
    height: 36px;
}
</style>
