<script lang="ts" setup>
interface CompCardOption {
    img: string;
    title: string;
    meta: string;
}
withDefaults(defineProps<CompCardOption>(), {
    img: 'https://fe-dev.bj.bcebos.com/image.png',
    title: '2n 按钮',
});
</script>

<template>
    <div class="flex flex-col overflow-hidden" :class="$style.card">
        <div :class="$style.preview" class="flex items-center justify-center">
            预览区
        </div>
        <div :class="$style.info" class="flex flex-col justify-around">
            <div class="text-lg">
                2n 按钮
            </div>
            <div :class="$style.ref" class="flex justify-start">
                <span>综合关联 23</span>
                <span class="inline-block mx-10"> | </span>
                <span>设计实例 23</span>
                <span class="inline-block mx-10"> | </span>
                <span>线上资产 23</span>
            </div>
        </div>
    </div>
</template>

<style module>
.card {
    height: 0;
    padding-bottom: 65%;
    position: relative;
    border-radius: 12px;
    background: #fff;
}
.preview {
    position: absolute;
    height: 70%;
    width: 100%;
    background: #e5e5e5;
}
.info {
    position: absolute;
    height: 30%;
    width: 100%;
    bottom: 0;
    padding: 12px 20px;
}
.ref {
    color: #636363;
}
</style>
