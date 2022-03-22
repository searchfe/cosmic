<script lang="ts" setup>
import Region from '../../common/component/region.vue';
import CompCard from '../component/card/comp-refs.vue';
</script>

<template>
    <Region title="4n 卡片模板" desc="强蓝色，用于突出意图的表达，多用于按钮" />
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
</style>
