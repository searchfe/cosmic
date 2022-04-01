<script lang="ts" setup>
import Card from '../../common/component/card.vue';

interface Props {
    header: string;
    title: string;
    imgs: string[];
    extra: string;
}

withDefaults(defineProps<Props>(), {
    header: '',
    title: '',
    imgs: () => [],
    extra: '',
});

</script>

<template>
    <Card :class="$style['card-container']">
        <div :class="$style['card-content']" class="w-full h-full">
            <img :class="$style['card-img']" class="w-full" :src="header" alt="">
            <div :class="$style['card-info']" class="flex justify-start items-center py-12 pr-12">
                <div :class="$style['card-info-prefix']" />
                <div :class="$style['card-content-title']" class="ml-12 text-lg">
                    {{ title }}
                </div>
                <div :class="$style['card-content-extra']" class="text-lg">
                    {{ extra }}
                </div>
            </div>
            <div :class="$style['card-preview']" class="w-full px-12">
                <div v-for="img, idx in imgs" :key="img" :class="$style['img-container']">
                    <img
                        class="w-full h-full overflow-hidden"
                        :style="{
                            borderTopLeftRadius: idx === 0 ? '7px' : '',
                            borderTopRightRadius: idx === 3 ? '7px' : '',
                            borderBottomLeftRadius: idx === 0 ? '7px' : '',
                            borderBottomRightRadius: idx === 3 ? '7px' : '',
                        }"
                        :src="img"
                        :class="$style.img"
                        alt=""
                    >
                </div>
            </div>
        </div>
    </Card>
</template>

<style module>
.card-container {
    position: relative;
    padding-bottom: 60.9%;
    height: 0;
    box-sizing: border-box;
    overflow: hidden;
}
.card-content {
    position: absolute;
    overflow: hidden;
    font-size: 0;
}
.card-img {
    top: 0;
    height: 58.3%;
}
.card-info {
    position: relative;
    box-sizing: border-box;
    height: 17.9%;
}
.card-info-prefix {
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    height: 53.6%;
    width: 4px;
    background: #1f1f1f;
}
.card-content-title {
    color: #1f1f1f;
}
.card-content-extra {
    position: absolute;
    top: 50%;
    right: 12px;
    transform: translateY(-50%);
}
.card-preview {
    position: absolute;
    box-sizing: border-box;
    height: 23.7%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    column-gap: 12px;
}
.img {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background-size: 100%;
}
.img-container {
    position: relative;
    width: 100%;
    height: 0;
    padding-top: 53.45%;
}
</style>
