<script lang="ts" setup>
import Card from '../../../common/component/card.vue';
interface CompCardOption {
    id: string;
    img: string;
    name: string;
    meta: string[];
}
withDefaults(defineProps<CompCardOption>(), {
    id: '',
    img: 'https://fe-dev.bj.bcebos.com/Button.png',
    name: '2n 按钮',
});
</script>

<template>
    <Card>
        <div class="flex flex-col overflow-hidden" :class="$style.card">
            <div :class="$style.preview" class="flex items-center justify-center">
                <img :class="$style['img-preview']" :src="img" alt="预置预览">
            </div>
            <div :class="$style.info" class="flex flex-col justify-around">
                <div class="text-lg">
                    {{ name }}
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

.img-preview {
    transform: scale(.7);
    border-radius: 8px;
}
</style>
