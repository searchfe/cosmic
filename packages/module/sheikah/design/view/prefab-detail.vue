<script lang="ts" setup>
import { watchEffect, ref } from 'vue';
import Region from '../../common/component/region.vue';
import CompCard from '../component/card/comp-refs.vue';
import Dropdown from '../../common/component/dropdown.vue';
import { useRoute } from '@cosmic/core/router';
import { queryOne as queryOnePrefab } from '../api/prefab';
// import { query as queryColor } from '../api/color';
import { useQuery } from '@cosmic/core/urql';


const id = useRoute().query.prefab as string;

const prefab = ref<Partial<gql.Prefab>>({});
const comp = ref<Partial<gql.Component>>({});

const {data: compsData, fetching: compsFetching } = useQuery<{ components: gql.Component[] }>({
    query: `
        query components {
            components {
                id
                displayName
                preview
            }
    }`,
    requestPolicy: 'cache-and-network',
});

const imgMap: Record<string, string> = {
    '文本段落': 'https://fe-dev.bj.bcebos.com/%E7%BB%84%E4%BB%B6%E5%88%97%E8%A1%A8-1%E6%96%87%E6%9C%AC%E6%AE%B5%E8%90%BD%20%20x4.png',
    '单图': 'https://fe-dev.bj.bcebos.com/%E7%BB%84%E4%BB%B6%E5%88%97%E8%A1%A8-2%E5%8D%95%E5%9B%BE%20%20x4.png',
    '图集': 'https://fe-dev.bj.bcebos.com/%E7%BB%84%E4%BB%B6%E5%88%97%E8%A1%A8-3%E5%9B%BE%E9%9B%86%20%20x4.png',
    '来源': 'https://fe-dev.bj.bcebos.com/%E7%BB%84%E4%BB%B6%E5%88%97%E8%A1%A8-4%E6%9D%A5%E6%BA%90%20%20x4.png',
};

const { data: prefabData, fetching: prefabFetching } = queryOnePrefab(id);

watchEffect(() => {
    if (id && prefabData.value?.getPrefab && !prefabFetching.value) {
        prefab.value = prefabData.value.getPrefab;
    }
    if (compsData.value && !compsFetching.value && prefab.value.id) {
        comp.value = compsData.value.components.filter(c => {
            c.preview = imgMap[(c.displayName || '图集')];
            return c.id === prefab.value.component;
        })[0] || {};
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
    <Region :title="prefab.name" :desc="prefab.name">
        <template #extra>
            <div class="flex items-center">
                <div :class="[$style['extra-item'], $style['extra-link']]" class="flex items-center justify-center text-md">
                    <i-cosmic-lock />
                    <span>1</span>
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
            <img :src="prefab.preview" alt="预置变体" :class="$style.img">
        </div>
        <div class="text-2xl my-20">
            预置构成
        </div>
        <div :class="$style['card-list']">
            <comp-card v-for="item in [comp]" :key="item.id" v-bind="item" :img="item.preview" />
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
    transform: translate(-50%, -50%) scale(0.3);
}
</style>
