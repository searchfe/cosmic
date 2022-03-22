<script lang="ts" setup>
import { ref, watchEffect } from 'vue';
import { router as vueRouter } from '@cosmic/core/browser';
import Region from '../../common/component/region.vue';
import AtomMicroCard from '../component/card/atom.vue';
import AtomFilter from '../component/filter.vue';
import { query as queryColor } from '../api/common';

const { useRouter } = vueRouter;
const router = useRouter();

const colors = ref<gql.Color[]>([]);

// let active = {
//     key: 'color',
//     text: '颜色',
// };

const { data, fetching } = queryColor<{ colors: gql.Color[] }, gql.QueryColorDTO>('color', {}, ['team', 'color']);
watchEffect(() => {
    if (data.value && !fetching.value) {
        colors.value = data.value.colors.map(color => {
            return {
                ...color,
                name: '原子名称',
                value: {
                    day: color.color,
                    dark: color.color,
                    night: color.color,
                },
                meta: '原子元信息',
            };
        });
    }
});

function onItemClick(id: string) {
    if (id) {
        router.push({ name: 'atom:detail', query: { id } });
    }
}

</script>

<template>
    <Region title="原子">
        <div
            class="flex items-center text-black w-full"
            :class="$style.filter"
        >
            <atom-filter text="颜色" num="12">
                <template #icon>
                    <img class="w-40 h-40" src="https://fe-dev.bj.bcebos.com/Table-%E9%A2%9C%E8%89%B2%EF%BC%88%E6%9C%AA%E9%80%89%E4%B8%AD%EF%BC%89.png" alt="color">
                </template>
                <template #hover-icon>
                    <img class="w-40 h-40" src="https://fe-dev.bj.bcebos.com/Table-%E9%A2%9C%E8%89%B2.png" alt="color">
                </template>
            </atom-filter>
            <atom-filter text="字形" num="12">
                <template #icon>
                    <i-cosmic-text />
                </template>
                <template #hover-icon>
                    <i-cosmic-text style="color: white" />
                </template>
            </atom-filter>
            <atom-filter text="边角" num="12">
                <template #icon>
                    <i-cosmic-corner />
                </template>
                <template #hover-icon>
                    <i-cosmic-corner style="color: white" />
                </template>
            </atom-filter>
            <atom-filter text="边框" num="12">
                <template #icon>
                    <i-cosmic-border />
                </template>
                <template #hover-icon>
                    <i-cosmic-border style="color: white" />
                </template>
            </atom-filter>
            <atom-filter text="阴影" num="12">
                <template #icon>
                    <i-cosmic-shadow />
                </template>
                <template #hover-icon>
                    <i-cosmic-shadow style="color: white" />
                </template>
            </atom-filter>
            <atom-filter text="透明度" num="12">
                <template #icon>
                    <i-cosmic-intersection />
                </template>
                <template #hover-icon>
                    <i-cosmic-intersection style="color: white" />
                </template>
            </atom-filter>
        </div>
    </Region>
    <Region inverse>
        <div :class="$style['atom-grid']">
            <div v-for="color in colors" :key="color.id" @click="onItemClick(color.id)">
                <atom-micro-card :title="color.name" :value="color.value" :meta="color.meta" />
            </div>
        </div>
    </Region>
</template>

<style module>
.atom-grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    column-gap: 24px;
    row-gap: 24px;
    margin-top: 12px;
    /* grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-22 xl:gap-26 2xl:gap-14 */
}
.filter {
    overflow-x: scroll;
}
.filter::-webkit-scrollbar {
    display: none; /* Chrome Safari */
}
</style>
