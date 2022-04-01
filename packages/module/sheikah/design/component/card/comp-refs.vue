<script lang="ts" setup>
import Card from '../../../common/component/card.vue';

withDefaults(defineProps<{ name: string }>(), {
    name: '2n 按钮',
});
</script>
<template>
    <Card style="border: 1px solid rgba(151, 151, 151, .1);">
        <div :class="$style.card">
            <div :class="$style['card-content']" class="w-full h-full">
                <div :class="$style.preview" class="w-full">
                    <img class="w-full h-full" src="https://fe-dev.bj.bcebos.com/%E7%BB%84%E4%BB%B6%E5%B0%81%E9%9D%A2-%E6%8C%89%E9%92%AE1.png" alt="">
                </div>
                <div :class="$style.info" class="w-full flex items-center pl-20 text-md">
                    按钮
                </div>
            </div>
        </div>
    </Card>
</template>

<style module>
.card {
    position: relative;
    box-sizing: border-box;
    height: 0;
    padding-bottom: 95.4%;
    border-radius: 12px;
    overflow: hidden;
    font-size: 0;
}
.card-content {
    position: absolute;
    overflow: hidden;
    font-size: 0;
}
.preview {
    height: 79%;
    background: #e5e5e5;
}
.info {
    height: 21%;
}
</style>
