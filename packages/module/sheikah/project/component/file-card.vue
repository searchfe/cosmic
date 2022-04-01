<script lang="ts" setup>
import Card from '../../common/component/card.vue';

export interface ProjectProps {
    id: string;
    img: string;
    name: string;
    desc: string;
}

withDefaults(defineProps<ProjectProps>(), {
    id: '',
    img: 'https://fe-dev.bj.bcebos.com/file-card.png',
    name: '',
    desc: '编辑于 今天',
});

</script>

<template>
    <Card :class="$style['card-container']">
        <div class="flex flex-col" :class="$style['card-content']">
            <div class="w-full flex items-center justify-center" :class="$style['card-preview']">
                稿件预览图
            </div>
            <div :class="$style['card-content-info']">
                <div class="h-16 text-md">
                    {{ name }}
                </div>
                <div class="mt-10 text-sm">
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
    padding-bottom: 66.66667%;
    border-radius: 8px;
}
.card-content {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
.card-preview {
    flex: auto;
    height: 220px;
    background: #e5e5e5;
}
.card-content-info {
    flex: none;
    display: flex;
    box-sizing: border-box;
    height: 64px;
    padding: 0 14px;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    background: #fff;
}
</style>
