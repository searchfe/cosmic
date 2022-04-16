<script lang="ts" setup>
import { watchEffect, ref } from 'vue';
import Region from '../../common/component/region.vue';
import CompCard from '../component/card/comp-refs.vue';
import Dropdown from '../../common/component/dropdown.vue';
import { useRoute } from '@cosmic/core/router';
import { queryOne as queryOnePrefab } from '../api/prefab';
import { query as queryColor } from '../api/color';


const id = useRoute().query.prefab as string;

const prefab = ref<Partial<gql.Prefab>>({});
const atoms = ref<Partial<gql.Color>[]>([]);

const {data: colorsData, fetching: colorFetching } = queryColor({}, ['id', 'name']);
const { data: prefabData, fetching: prefabFetching } = queryOnePrefab(id);

watchEffect(() => {
    if (id && prefabData.value?.getPrefab && !prefabFetching.value) {
        prefab.value = prefabData.value.getPrefab;
    }
    if (colorsData.value && !colorFetching.value) {
        atoms.value = (colorsData.value.colors || []).slice(0, 1);
    }
});

const menuData = [{
    label: '使用创建',
    id: '1',
}, {
    label: '删除',
    id: '2',
}];

</script>

<template>
    <Region :title="prefab.name" desc="强蓝色，用于突出意图的表达，多用于按钮">
        <template #extra>
            <div class="flex items-center">
                <div :class="[$style['extra-item'], $style['extra-link']]" class="flex items-center justify-center text-md">
                    <i-cosmic-lock />
                    <span>{{ atoms.length }}</span>
                </div>
                <div :class="$style['extra-item']" class="flex items-center justify-center text-md px-30 mx-10">
                    编辑
                </div>
                <div :class="$style['extra-item']" class="flex items-center justify-center text-md">
                    <Dropdown :data="menuData" :class="$style['extra-dropdown']" />
                </div>
            </div>
        </template>
    </Region>
    <Region title="组件变体" class="mt-20">
        <div :class="$style.preview" class="w-fll">
            <div :class="$style['preview-mask']" />
            <img src="https://fe-dev.bj.bcebos.com/%E9%A2%84%E5%88%B6%E8%AF%A6%E6%83%85%E9%A1%B5%20%E4%B8%BB%E6%8C%89%E9%92%AE-%E9%9D%A2%E5%BA%95%203%E5%80%8D.png" alt="预置变体" :class="$style.img">
        </div>
        <div class="text-2xl my-20">
            预置构成
        </div>
        <div :class="$style['card-list']">
            <comp-card v-for="item in atoms" :key="item.id" v-bind="item" />
        </div>
    </Region>
</template>

<style module>
.preview {
    position: relative;
    box-sizing: border-box;
    height: 0;
    padding-bottom: 23.25%;
    background-image: url(https://fe-dev.bj.bcebos.com/%E8%B6%85%E5%A4%A7%E8%83%8C%E6%99%AF.png);
    border: 1px solid rgba(151, 151, 151, .1);
    border-radius: 12px;
}
.preview-mask {
    width: 100%;
    padding-bottom: 23.25%;
    background: #fff;
    opacity: .55;
}
.card-list {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
    column-gap: 20px;
    row-gap: 20px;
}
.extra-item {
    height: 36px;
    border-radius: 6px;
    background: #f5f5f5;
}
.extra-link {
    padding-left: 23px;
    padding-right: 18px;
}
.extra-dropdown {
    width: 36px;
    height: 36px;
}
.img {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%) scale(0.4);
}
</style>
