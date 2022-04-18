<script lang="ts" setup>
import Card from '../../../common/component/card.vue';
interface CompCardOption {
    id: string;
    img: string;
    name: string;
    hideInfo: boolean;
}
const meta = ['关联 2'];
withDefaults(defineProps<CompCardOption>(), {
    id: '',
    img: 'https://fe-dev.bj.bcebos.com/%E9%A2%84%E5%88%B6%E5%88%97%E8%A1%A8%20%20%E4%B8%BB%E6%8C%89%E9%92%AE-%E9%9D%A2%E5%BA%95%203%E5%80%8D.png',
    name: '2n 按钮',
    hideInfo: false,
});
</script>

<template>
    <Card>
        <div class="flex flex-col overflow-hidden" :class="$style.card">
            <div :class="$style.preview" class="flex items-center justify-center">
                <img style="width: 75%; height: 75%;" :src="img" alt="预置预览">
            </div>
            <div :class="$style.info" class="flex flex-col justify-around">
                <div class="text-lg">
                    {{ name }}
                </div>
                <div v-if="!hideInfo" :class="$style.ref" class="flex justify-start text-sm">
                    <template v-for="str, index of meta" :key="index">
                        <span>{{ str }}</span>
                        <span v-if="index !== meta.length - 1" class="inline-block mx-10"> | </span>
                    </template>
                </div>
            </div>
        </div>
    </Card>
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
    overflow: hidden;
    background: rgb(229, 229, 229);
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
