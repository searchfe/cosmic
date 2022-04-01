<script lang="ts" setup>
import Card from '../../common/component/card.vue';
import { router as vueRouter } from '@cosmic/core/browser';

const { useRouter } = vueRouter;

const router = useRouter();

interface Props {
    id: string;
    name: string;
    team: string;
    img: string;
}

const props = withDefaults(defineProps<Props>(), {
    id: '',
    name: '',
    team: '',
    img: 'https://fe-dev.bj.bcebos.com/%E6%96%87%E4%BB%B6%E5%8D%A1%E7%89%87.png',
});

async function onClickCard() {
    router.push({ name: 'project:detail', query: { project: props.id } });
}

</script>

<template>
    <Card :class="$style['card']" @click="onClickCard">
        <div :class="$style['card-content']">
            <div :class="$style['card-info']">
                <div :class="$style['card-name']">
                    {{ name }}
                </div>
                <div style="flex: none;">
                    3个
                </div>
            </div>
            <div :class="$style['card-preview']">
                <div class="col-span-7 row-span-2">
                    <img
                        :src="img"
                        alt=""
                    >
                </div>
                <div class="col-span-5">
                    <img
                        :src="img"
                        alt=""
                    >
                </div>
                <div class="col-span-5">
                    <img
                        :src="img"
                        alt=""
                    >
                </div>
            </div>
        </div>
    </Card>
</template>

<style module>
.card {
    overflow: hidden;
    height: 0;
    padding-bottom: 66.66667%;
    border-radius: 8px;
}
.card-content {
    position: absolute;
    left: 0;
    top: 0;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    padding: 12px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    font-size: 12px;
}
.card-info {
    height: 26%;
    width: 100%;
    display: flex;
    align-items: center;
}
.card-name {
    flex: auto;
    font-size: 16px;
}
.card-preview {
    overflow: hidden;
    flex: auto;
    margin-top: 12px;
    box-sizing: border-box;
    width: 100%;
    border-radius: 8px;
    /* grid grid-cols-12 gap-2 */
}
.card-preview img {
    width: 100%;
    height: 100%;
}
</style>
