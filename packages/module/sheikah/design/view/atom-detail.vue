<script lang="ts" setup>
import AtomDetailInfo from '../component/atom/preview/color.vue';
</script>
<template>
    <atom-detail-info />
    <div>
        <div class="h-26 text-lg my-26">
            组件数量 16
        </div>
        <div :class="$style['comp-list']">
            <div v-for="item in [1, 2, 3, 4]" :key="item" class="flex flex-col overflow-hidden" :class="$style.card">
                <div :class="$style.preview" class="flex items-center justify-center">
                    预览区
                </div>
                <div :class="$style.info">
                    <div class="text-lg mb-12">
                        2n 按钮
                    </div>
                    <div :class="$style.ref" class="flex justify-between">
                        <span>综合关联 23</span>
                        <span>设计实例 23</span>
                        <span>线上资产 23</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style module>
.comp-list {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    row-gap: 20px;
    column-gap: 32px;
}
.card {
    height: 0;
    padding-bottom: 65%;
    position: relative;
    border-radius: 12px;
    background: #fff;
}
.preview {
    position: absolute;
    height: 74%;
    width: 100%;
    background: #e5e5e5;
}
.info {
    position: absolute;
    height: 26%;
    width: 100%;
    bottom: 0;
    padding: 12px 20px;
}
.ref {
    color: #636363;
}
</style>
