<script lang="ts" setup>
import Card from '../../../common/component/card.vue';
interface CompCardOption {
    img: string;
    title: string;
    meta: string[];
}
withDefaults(defineProps<CompCardOption>(), {
    img: 'https://fe-dev.bj.bcebos.com/image.png',
    title: '2n 按钮',
});
</script>

<template>
    <Card>
        <div class="flex flex-col overflow-hidden" :class="$style.card">
            <div :class="$style.preview" class="flex items-center justify-center">
                预览区
            </div>
            <div :class="$style.info" class="flex flex-col justify-around">
                <div class="text-lg">
                    {{ title }}
                </div>
                <div :class="$style.ref" class="flex justify-start text-sm">
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
