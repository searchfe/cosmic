<script lang="ts" setup>
import Card from '../../common/component/card.vue';

interface Props {
    header: string;
    title: string;
    infos: Info[];
    imgs: string[];
    extra: string;
}

interface Info {
    key: string;
    value: string;
}

withDefaults(defineProps<Props>(), {
    header: '',
    title: '',
    infos: () => [],
    imgs: () => [],
    extra: '',
});

</script>

<template>
    <Card :class="$style['card-container']">
        <img
            :class="$style['card-img']"
            :src="header"
            alt=""
        >
        <div :class="$style['card-content']">
            <div :class="$style['card-content-items']">
                <div :class="$style['card-content-title']">
                    {{ title }}
                </div>
                <span
                    v-for="info in infos"
                    :key="info.key"
                    style="margin: 0 4px;"
                >{{ info.key }}&nbsp;{{ info.value }}</span>
            </div>
            <div :class="$style['card-content-extra']">
                {{ extra }}
            </div>
        </div>
        <div :class="$style['card-preview']">
            <div
                :class="$style['card-preview-list']"
                class="flex items-center justify-between"
            >
                <img
                    v-for="img in imgs"
                    :key="img"
                    :class="$style['card-preview-img']"
                    :src="img"
                    alt=""
                >
            </div>
        </div>
    </Card>
</template>

<style module>
.card-container {
    padding-bottom: 75%;
    height: 0;
    overflow: hidden;
}
.card-img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 58%;
}
.card-content {
    position: absolute;
    left: 0;
    top: 62%;
    width: 100%;
    height: 10%;
    border-left: 4px solid #1f1f1f;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.card-content-items {
    display: flex;
    justify-content: start;
    align-items: center;
}
.card-content-title {
    margin-left: 20px;
    font-size: 16px;
    color: #1f1f1f;
}
.card-content-extra {
    font-size: 16px;
    margin-right: 14px;
}
.card-preview {
    position: absolute;
    top: 76%;
    width: 100%;
    height: 20%;
    padding: 0 14px;
}
.card-preview-list {
    overflow: hidden;
    width: 100%;
    height: 100%;
    border-radius: 8px;
    /* overflow-hidden w-full height-full grid grid-cols-4 gap-x-1  */
}
.card-preview-img {
    display: flex;
    width: 100%;
    height: 100%;
}
</style>
