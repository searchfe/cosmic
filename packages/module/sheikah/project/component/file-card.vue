<script lang="ts" setup>
import Card from '../../common/component/card.vue';

export interface ProjectProps {
    img: string;
    title: string;
    desc: string;
}

withDefaults(defineProps<ProjectProps>(), {
    img: 'https://fe-dev.bj.bcebos.com/file-card.png',
    title: '',
    desc: '编辑于 昨天',
});

</script>

<template>
    <Card :class="$style['card-container']">
        <div :class="$style['card-content']">
            <div style="flex: auto;">
                <img
                    :src="img"
                    alt=""
                >
            </div>
            <div :class="$style['card-content-info']">
                <div :class="$style['card-title']">
                    {{ title }}
                </div>
                <div :class="$style['card-date']">
                    {{ desc }}
                </div>
            </div>
        </div>
    </Card>
</template>

<style module>
.card-container {
    position: relative;
    overflow: hidden;
    height: 0;
    padding-bottom: 75%;
    border-radius: 8px;
}
.card-content {
    position: absolute;
    display: flex;
    flex-direction: column;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
.card-content-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    height: 78px;
    padding: 0 14px;
    background: #fff;
}
.card-title {
    font: 16px;
    height: 16px;
}
.card-date {
    margin-top: 10px;
    font-size: 12px;
}
</style>
